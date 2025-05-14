import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Optionally parse form data if you expect fields
  // const form = await req.formData();

  return new NextResponse('Yes', { status: 200 });
}
