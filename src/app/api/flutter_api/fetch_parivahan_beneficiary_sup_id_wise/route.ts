import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let sup_id;
      
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {

            const body = await req.json();
            sup_id = body.sup_id;
           
        } else if (contentType.includes('multipart/form-data')) {

            const formData = await req.formData();
            sup_id = formData.get('sup_id');
      

        }
        // Delete records matching student_id
        const result = await prisma.parivahanbeneficiary.findMany({
            where: { sup_id: Number(sup_id),status: "Active" },

        });

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error during deletion:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
