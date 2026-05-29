import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET: Paginated query with search and filters
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search') || '';
    const model = url.searchParams.get('model') || '';
    const category = url.searchParams.get('category') || '';

    const offset = (page - 1) * limit;

    let query = `
      SELECT p.id, p.model_id, p.category, p.name, p.part_number, p.created_at, m.name as model_name, m.flag as model_flag, m.type as model_type
      FROM parts p
      JOIN models m ON p.model_id = m.id
      WHERE 1=1
    `;
    let countQuery = `
      SELECT COUNT(*) as total
      FROM parts p
      JOIN models m ON p.model_id = m.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (p.part_number ILIKE $${paramIndex} OR p.name ILIKE $${paramIndex} OR m.name ILIKE $${paramIndex})`;
      countQuery += ` AND (p.part_number ILIKE $${paramIndex} OR p.name ILIKE $${paramIndex} OR m.name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (model) {
      query += ` AND p.model_id = $${paramIndex}`;
      countQuery += ` AND p.model_id = $${paramIndex}`;
      params.push(model);
      paramIndex++;
    }

    if (category) {
      query += ` AND p.category = $${paramIndex}`;
      countQuery += ` AND p.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    // Add ordering and pagination
    query += ` ORDER BY p.created_at DESC, p.id DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    
    const countResult = await sql.query(countQuery, params);
    const total = parseInt(countResult[0]?.total || '0');

    // Add limit and offset params for parts retrieval
    const queryParams = [...params, limit, offset];
    const partsResult = await sql.query(query, queryParams);

    return NextResponse.json({
      success: true,
      data: partsResult,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Failed to query parts:', error);
    return NextResponse.json({ error: 'Failed to query parts' }, { status: 500 });
  }
}

// POST: Add new part (can also create a new model dynamically)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      model_id, 
      part_number, 
      name, 
      category,
      // Optional new model details
      is_new_model,
      new_model_id,
      new_model_name,
      new_model_year,
      new_model_flag,
      new_model_type
    } = body;

    if (!part_number || !name || !category) {
      return NextResponse.json({ error: 'Part number, name, and category are required' }, { status: 400 });
    }

    let targetModelId = model_id;

    // Create a new model if the user requested it
    if (is_new_model) {
      if (!new_model_id || !new_model_name || !new_model_type) {
        return NextResponse.json({ error: 'New model ID, name, and type are required' }, { status: 400 });
      }
      
      const modelSlug = new_model_id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      
      await sql.query(`
        INSERT INTO models (id, name, year, flag, type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO NOTHING
      `, [modelSlug, new_model_name.trim(), new_model_year || '', new_model_flag || '', new_model_type || 'Japan']);

      targetModelId = modelSlug;
    }

    if (!targetModelId) {
      return NextResponse.json({ error: 'Car model is required' }, { status: 400 });
    }

    // Insert the part
    const insertResult = await sql.query(`
      INSERT INTO parts (model_id, category, name, part_number)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (model_id, part_number, name) DO NOTHING
      RETURNING id
    `, [targetModelId, category.trim(), name.trim(), part_number.trim()]);

    if (insertResult.length === 0) {
      return NextResponse.json({ error: 'Part already exists for this car model' }, { status: 409 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Part added successfully', 
      data: { id: insertResult[0].id } 
    });
  } catch (error) {
    console.error('Failed to add part:', error);
    return NextResponse.json({ error: 'Failed to add part' }, { status: 500 });
  }
}
