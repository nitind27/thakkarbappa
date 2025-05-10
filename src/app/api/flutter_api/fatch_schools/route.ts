import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await prisma.school.findMany({
            where: {
                status: 'Active'
            }
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching app:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
