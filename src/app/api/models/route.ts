import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, year, flag, type 
      FROM models 
      ORDER BY type ASC, name ASC
    `;
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Failed to fetch models:', error);
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}
