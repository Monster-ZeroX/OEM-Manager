import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { createHash, randomBytes } from 'crypto';

function hashKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

// GET: List all API Key metadata
export async function GET() {
  try {
    const result = await sql`
      SELECT id, key_prefix, name, created_at, expires_at, last_used_at
      FROM api_keys
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Failed to list API keys:', error);
    return NextResponse.json({ error: 'Failed to list API keys' }, { status: 500 });
  }
}

// POST: Generate a new API Key
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, expires_in_days } = body;

    if (!name) {
      return NextResponse.json({ error: 'Key name is required' }, { status: 400 });
    }

    // Generate 32 bytes of secure random hex characters for the secret part
    const secretPart = randomBytes(24).toString('hex');
    const rawKey = `oem_pk_${secretPart}`;
    const keyHash = hashKey(rawKey);
    const keyPrefix = `oem_pk_${secretPart.substring(0, 6)}`;

    // Expiry calculation
    let expiresAt = null;
    if (expires_in_days) {
      const days = parseInt(expires_in_days);
      if (!isNaN(days) && days > 0) {
        expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      }
    }

    // Save key metadata and hashed value
    const insertResult = await sql.query(`
      INSERT INTO api_keys (key_hash, key_prefix, name, expires_at)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `, [keyHash, keyPrefix, name.trim(), expiresAt]);

    return NextResponse.json({
      success: true,
      message: 'API Key generated successfully. Make sure to copy it now, it will not be shown again.',
      data: {
        id: insertResult[0].id,
        name: name.trim(),
        key: rawKey, // Return raw key once
        key_prefix: keyPrefix,
        created_at: insertResult[0].created_at,
        expires_at: expiresAt
      }
    });
  } catch (error) {
    console.error('Failed to generate API key:', error);
    return NextResponse.json({ error: 'Failed to generate API key' }, { status: 500 });
  }
}

// DELETE: Revoke (delete) an API Key
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Key ID is required' }, { status: 400 });
    }

    const deleteResult = await sql.query('DELETE FROM api_keys WHERE id = $1 RETURNING name', [id]);

    if (deleteResult.length === 0) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `API Key "${deleteResult[0].name}" revoked successfully`
    });
  } catch (error) {
    console.error('Failed to revoke API key:', error);
    return NextResponse.json({ error: 'Failed to revoke API key' }, { status: 500 });
  }
}
