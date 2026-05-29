import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { createHash } from 'crypto';

function hashKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

export async function GET(request: Request) {
  try {
    // 1. Authenticate via header 'x-api-key' or 'Authorization: Bearer <key>'
    const authHeader = request.headers.get('Authorization');
    let apiKey = request.headers.get('x-api-key');

    if (!apiKey && authHeader && authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.substring(7);
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing API Key in request headers' }, 
        { status: 401 }
      );
    }

    const keyHash = hashKey(apiKey);

    // 2. Query database for API Key
    const keyQuery = await sql.query(`
      SELECT id, name, expires_at 
      FROM api_keys 
      WHERE key_hash = $1
    `, [keyHash]);

    if (keyQuery.length === 0) {
      return NextResponse.json(
        { error: 'Forbidden: Invalid API Key' }, 
        { status: 403 }
      );
    }

    const keyData = keyQuery[0];

    // 3. Check expiry
    if (keyData.expires_at && new Date(keyData.expires_at) <= new Date()) {
      return NextResponse.json(
        { error: 'Forbidden: API Key has expired' }, 
        { status: 403 }
      );
    }

    // 4. Update last_used_at asynchronously (non-blocking)
    sql.query('UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP WHERE id = $1', [keyData.id])
      .catch(err => console.error('Failed to update API key last_used_at:', err));

    // 5. Parse parts query filters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search') || '';
    const model = url.searchParams.get('model') || '';
    const category = url.searchParams.get('category') || '';

    const offset = (page - 1) * limit;

    let query = `
      SELECT p.id, p.category, p.name, p.part_number, m.name as model_name, m.year as model_year, m.type as model_type
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
    query += ` ORDER BY p.id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    
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
    console.error('External API query failure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
