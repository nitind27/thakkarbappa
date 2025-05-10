import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let achivment_id;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {

            const body = await req.json();
            achivment_id = body.achivment_id;
        } else if (contentType.includes('multipart/form-data')) {

            const formData = await req.formData();
            achivment_id = formData.get('achivment_id');

        }
        // Delete records matching student_id
        const result = await prisma.tbl_achivments.deleteMany({
            where: { achivment_id: Number(achivment_id) },
        });

        return NextResponse.json({ deletedCount: result.count }, { status: 200 });
    } catch (error: any) {
        console.error("Error during deletion:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
