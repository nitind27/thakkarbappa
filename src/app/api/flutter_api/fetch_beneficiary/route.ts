import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const beneficiary = await prisma.beneficiary.findMany({

        });

        return NextResponse.json(beneficiary, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching beneficiary:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
