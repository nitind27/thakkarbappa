import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

function convertBigIntToString(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)])
    );
  } else if (typeof obj === 'bigint') {
    return obj.toString();
  }
  return obj;
}

export async function POST(req: Request) {
    try {
        let id;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            id = body.id;
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            id = formData.get('id');
        }

        // Fetch record
        const result = await prisma.talukasData.findFirst({
            where: { id: Number(id) },
        });

        // Convert BigInt fields to string
        const safeResult = convertBigIntToString(result);

        return NextResponse.json(safeResult, { status: 200 });
    } catch (error: any) {
        console.error("Error during fetch:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
