import * as fs from 'fs';
import * as path from 'path';
import { neon } from '@neondatabase/serverless';

// Load env variables manually since this script runs outside Next.js server context
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  console.log('--- Starting OEM Parts Migration ---');

  // 1. Create Tables
  try {
    console.log('Creating database tables...');
    
    // Create models table
    await sql`
      CREATE TABLE IF NOT EXISTS models (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        year VARCHAR(20),
        flag VARCHAR(10),
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create parts table
    await sql`
      CREATE TABLE IF NOT EXISTS parts (
        id SERIAL PRIMARY KEY,
        model_id VARCHAR(50) NOT NULL REFERENCES models(id) ON DELETE CASCADE,
        category VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        part_number VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_model_part_name UNIQUE (model_id, part_number, name)
      );
    `;

    // Create api_keys table
    await sql`
      CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        key_hash VARCHAR(64) NOT NULL UNIQUE,
        key_prefix VARCHAR(24) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE,
        last_used_at TIMESTAMP WITH TIME ZONE
      );
    `;

    // Create Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_parts_part_number ON parts(part_number);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_parts_category ON parts(category);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_parts_model ON parts(model_id);`;

    console.log('Database schema verified/created successfully.');
    
    // Clean start: Truncate existing models and parts to ensure synchronization with the updated dataset
    console.log('Truncating parts and models tables for a clean seed...');
    await sql`TRUNCATE TABLE parts, models CASCADE;`;
    console.log('Truncation complete.');
  } catch (err) {
    console.error('Failed to create or clean tables:', err);
    process.exit(1);
  }

  // 2. Parse data.jsx
  const dataJsxPath = path.join(process.cwd(), 'data.jsx');
  const tempJsPath = path.join(process.cwd(), 'temp_parts.cjs');

  if (!fs.existsSync(dataJsxPath)) {
    console.error('data.jsx not found at path:', dataJsxPath);
    process.exit(1);
  }

  console.log('Parsing data.jsx...');
  try {
    const rawContent = fs.readFileSync(dataJsxPath, 'utf8');
    
    // Replace const data = with module.exports =
    const jsContent = rawContent.replace(/^\s*const\s+data\s*=\s*/, 'module.exports = ');
    fs.writeFileSync(tempJsPath, jsContent, 'utf8');

    // Dynamic import of the temporary commonjs file
    const data = require(tempJsPath);

    console.log('Successfully loaded parts data from data.jsx.');

    // 3. Seed Models & Parts
    let modelsCount = 0;
    let partsCount = 0;

    for (const region of Object.keys(data)) {
      const modelsList = data[region];
      console.log(`Seeding region [${region}] with ${modelsList.length} models...`);

      for (const modelData of modelsList) {
        const { id, name, year, flag, type, parts: categories } = modelData;

        console.log(`Seeding model [${id}] - ${name}...`);

        // Insert model using sql.query
        await sql.query(`
          INSERT INTO models (id, name, year, flag, type)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO UPDATE SET 
            name = EXCLUDED.name,
            year = EXCLUDED.year,
            flag = EXCLUDED.flag,
            type = EXCLUDED.type
        `, [id, name, year || '', flag || '', type || '']);
        
        modelsCount++;

        const partPromises: Promise<any>[] = [];

        // Collect part inserts for this model
        for (const catData of categories) {
          const categoryName = catData.category;
          const items = catData.items || [];

          for (const item of items) {
            const partName = item.name;
            const partNum = item.pn || '—';

            // Clean data
            if (!partName && !partNum) continue;

            // Insert part using sql.query (stored as promise)
            partPromises.push(
              sql.query(`
                INSERT INTO parts (model_id, category, name, part_number)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (model_id, part_number, name) DO NOTHING
              `, [id, categoryName.trim(), partName.trim(), partNum.trim()])
            );
            
            partsCount++;
          }
        }

        // Wait for all parts of this model to be inserted in parallel
        await Promise.all(partPromises);
        console.log(`Model [${id}] seeded with ${partPromises.length} parts.`);
      }
    }

    console.log(`Migration Complete: Seeded ${modelsCount} models and approximately ${partsCount} parts.`);

  } catch (err) {
    console.error('Error during data parsing and database seeding:', err);
  } finally {
    // Clean up temporary file
    if (fs.existsSync(tempJsPath)) {
      fs.unlinkSync(tempJsPath);
      console.log('Cleaned up temporary CommonJS files.');
    }
  }
}

runMigration()
  .then(() => {
    console.log('Migration process finished successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration process failed:', err);
    process.exit(1);
  });
