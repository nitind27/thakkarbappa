import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// POST - Create a new category


// GET - Fetch all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: {
                for_app: 'Yes'
            }
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
