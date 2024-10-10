import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, name } = body;

        if (!id || !name) {
            return NextResponse.json({ error: 'ID and name are required' }, { status: 400 });
        }

        const updatedTaluka = await prisma.talukasData.update({
            where: { id: BigInt(id) },
            data: {
                name,
                status: "active",
            },
        });

        // Convert BigInt fields to strings
        return NextResponse.json({
            ...updatedTaluka,
            id: updatedTaluka.id.toString(), // Convert ID to string
        }, { status: 200 });
    } catch (error :any) {
        console.error("Error during update:", error);
        
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Taluka not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}