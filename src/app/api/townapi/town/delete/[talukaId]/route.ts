import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { talukaId: string } }) {
    const { talukaId } = params;
    console.log("Received talukaId:", talukaId); // Debugging log

    try {
        // Ensure ID is converted to BigInt
        await prisma.talukasData.delete({
            where: { id: BigInt(talukaId) },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("Error during deletion:", error);

        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Cluster not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}