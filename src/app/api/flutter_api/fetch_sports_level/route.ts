import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // You can parse form data if needed:
  // const form = await req.formData();

  const result = [
    'School',
    'Taluka',
    'District',
    'Kendra',
    'Prakalp',
    'Division',
    'State',
    'National',
    'Intrnational',
  ];

  return NextResponse.json(result, { status: 200 });
}
