import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let category_id;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {

            const body = await req.json();
            category_id = body.category_id;
        } else if (contentType.includes('multipart/form-data')) {

            const formData = await req.formData();
            category_id = formData.get('category_id');

        }
        // Delete records matching student_id
        const result = await prisma.subCategory.findFirst({
            where: { category_id: Number(category_id), for_app: "Yes" },

        });

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error during deletion:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
