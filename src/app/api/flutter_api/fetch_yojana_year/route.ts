import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await prisma.yojanaYear.findMany({
            where: {
                year_status: 'Y',
                app: 'Y',
            }
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
