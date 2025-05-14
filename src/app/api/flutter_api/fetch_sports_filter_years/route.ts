import { NextResponse } from 'next/server';

export async function GET() {
  const result = [
    '2023-2024',
    '2024-2025',
    '2025-2026',
  ];
  return NextResponse.json(result, { status: 200 });
}
