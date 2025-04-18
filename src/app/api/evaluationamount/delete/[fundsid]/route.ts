import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { fundsid: string } }) {
    const { fundsid } = params;
    const { verification } = await req.json(); // Get new status from request body

    try {

        await prisma.tbl_evaluation_amount.update({
            where: { id: Number(fundsid) },
            data: { verification }, // Update with new status
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("Error during status update:", error);

        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Disbursementfundes not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}