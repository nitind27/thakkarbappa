import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// POST - Create a new category


// GET - Fetch all categories
export async function GET() {
    try {
        const categories = await prisma.tblapp.findMany({

        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching app:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
