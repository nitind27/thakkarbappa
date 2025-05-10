import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// POST - Create a new category


// GET - Fetch all categories
export async function GET() {
    try {
        const illness = await prisma.illness.findMany({

        });

        return NextResponse.json(illness, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching illness:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
