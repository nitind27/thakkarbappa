import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let student_id;
        let sports_id;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {

            const body = await req.json();
            student_id = body.student_id;
            sports_id = body.sports_id;
        } else if (contentType.includes('multipart/form-data')) {

            const formData = await req.formData();
            student_id = formData.get('student_id');
            sports_id = formData.get('sports_id');

        }
        // Delete records matching student_id
        const result = await prisma.tbl_achivments.findMany({
            where: { student_id: Number(student_id), sports_id: Number(sports_id), status: "Active" },

        });

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error during deletion:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
