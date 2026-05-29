import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`
      SELECT DISTINCT category 
      FROM parts 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category ASC
    `;
    
    const categories = rows.map(r => r.category);
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
