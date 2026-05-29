import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// Establish an HTTP-based serverless client. Excellent for Vercel edge/serverless functions.
export const sql = neon(process.env.DATABASE_URL);
