import { getJwtSecretKey } from '@/app/api/auth';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (body.username === 'admin' && body.password === 'admin') {
    const token = await new SignJWT({
      username: body.username,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30s')
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { 'content-type': 'application/json' } },
    );

    response.cookies.set({
      name: 'token',
      value: token,
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ success: false });
}
