import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    let modelsImported = 0;
    let partsImported = 0;
    let skipped = 0;
    const logs: string[] = [];

    // Mode A: Flat array of parts
    if (Array.isArray(data)) {
      logs.push(`Detected flat array containing ${data.length} items. Starting validation...`);
      
      // Verify models exist or group them
      for (const item of data) {
        const { model_id, category, name, part_number } = item;
        
        if (!model_id || !category || !name || !part_number) {
          skipped++;
          continue;
        }

        try {
          // Check if model exists, if not, skip or alert
          const modelCheck = await sql.query('SELECT id FROM models WHERE id = $1', [model_id.trim().toLowerCase()]);
          
          if (modelCheck.length === 0) {
            logs.push(`Skipped: Car model "${model_id}" does not exist in the database. Create the model first.`);
            skipped++;
            continue;
          }

          const insertResult = await sql.query(`
            INSERT INTO parts (model_id, category, name, part_number)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (model_id, part_number, name) DO NOTHING
          `, [model_id.trim().toLowerCase(), category.trim(), name.trim(), part_number.trim()]);

          if (insertResult.length > 0) {
            partsImported++;
          } else {
            skipped++; // Already exists
          }
        } catch (e) {
          skipped++;
        }
      }
      
      logs.push(`Import completed. Imported ${partsImported} parts. Skipped/Duplicates: ${skipped}.`);
    } 
    // Mode B: Structured regions -> models -> categories -> items (like parts.jsx)
    else if (typeof data === 'object') {
      logs.push(`Detected structured region/model JSON database. Starting deep import...`);
      
      for (const region of Object.keys(data)) {
        const modelsList = data[region];
        if (!Array.isArray(modelsList)) continue;

        logs.push(`Processing region [${region}] with ${modelsList.length} models...`);

        for (const modelData of modelsList) {
          const { id, name, year, flag, type, parts: categories } = modelData;

          if (!id || !name) {
            skipped++;
            continue;
          }

          try {
            // Upsert Model
            const modelSlug = id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
            await sql.query(`
              INSERT INTO models (id, name, year, flag, type)
              VALUES ($1, $2, $3, $4, $5)
              ON CONFLICT (id) DO UPDATE SET 
                name = EXCLUDED.name,
                year = EXCLUDED.year,
                flag = EXCLUDED.flag,
                type = EXCLUDED.type
            `, [modelSlug, name.trim(), year || '', flag || '', type || region || '']);
            
            modelsImported++;

            const partPromises: Promise<any>[] = [];
            let modelPartsCount = 0;

            if (Array.isArray(categories)) {
              for (const catData of categories) {
                const categoryName = catData.category;
                const items = catData.items || [];

                if (!categoryName || !Array.isArray(items)) continue;

                for (const item of items) {
                  const partName = item.name;
                  const partNum = item.pn || item.part_number || '—';

                  if (!partName && !partNum) continue;

                  partPromises.push(
                    sql.query(`
                      INSERT INTO parts (model_id, category, name, part_number)
                      VALUES ($1, $2, $3, $4)
                      ON CONFLICT (model_id, part_number, name) DO NOTHING
                    `, [modelSlug, categoryName.trim(), partName.trim(), partNum.trim()])
                    .then((res) => {
                      if (res && res.length > 0) {
                        partsImported++;
                        modelPartsCount++;
                      } else {
                        skipped++;
                      }
                    })
                  );
                }
              }
              await Promise.all(partPromises);
              logs.push(`Model [${modelSlug}] loaded. Added ${modelPartsCount} new parts.`);
            }
          } catch (e: any) {
            logs.push(`Error importing model "${id}": ${e.message}`);
          }
        }
      }
      
      logs.push(`Import completed. Loaded ${modelsImported} models and ${partsImported} new parts. Duplicate/Skipped items: ${skipped}.`);
    } else {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      summary: {
        modelsImported,
        partsImported,
        skipped
      },
      logs
    });
  } catch (error) {
    console.error('Failed to import JSON data:', error);
    return NextResponse.json({ error: 'Failed to parse JSON or complete database insertion' }, { status: 500 });
  }
}
