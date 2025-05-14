import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let yojana_year_id;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            yojana_year_id = body.yojana_year_id;
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            yojana_year_id = formData.get('yojana_year_id');
        }

        // Fetch records matching yojana_type_id
        const result = await prisma.yojanaYear.findFirst({
            where: { yojana_year_id: Number(yojana_year_id) },
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error during fetch:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
