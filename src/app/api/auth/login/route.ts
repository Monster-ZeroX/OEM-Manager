import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';

const APP_PASSWORD = process.env.APP_PASSWORD || 'Gasith@2026';
const JWT_SECRET = process.env.JWT_SECRET || 'e0f7e1b590fa1db4ad5c490a61250269f826315263d898a3e790bf7e820c74fb';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (password !== APP_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate JWT token (expires in 7 days)
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const token = await signJWT({ authenticated: true, exp: expiry }, JWT_SECRET);

    const response = NextResponse.json({ success: true, message: 'Logged in successfully' });

    // Set HTTP-Only secure cookie
    response.cookies.set({
      name: 'oem_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
