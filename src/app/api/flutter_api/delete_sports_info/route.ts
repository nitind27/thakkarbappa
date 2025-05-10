import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let sports_info_id;

        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {

            const body = await req.json();
            sports_info_id = body.sports_info_id;
        } else if (contentType.includes('multipart/form-data')) {

            const formData = await req.formData();
            sports_info_id = formData.get('sports_info_id');

        }
        console.log("sports_info_id",sports_info_id)
        // Delete records matching student_id
        const result = await prisma.sportsInfo.deleteMany({
            where: { sports_info_id : Number(sports_info_id) },
        });

        return NextResponse.json({ deletedCount: result.count }, { status: 200 });
    } catch (error: any) {
        console.error("Error during deletion:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
