import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            work_master_id,
            date,
            installment,
            amount,
            photo,
            latitude,
            longitude,
            address
        } = body;

        // Validate input
        if (!work_master_id || !date || !address || !installment || !amount || !photo || !latitude || !longitude) {
            return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
        }

        // Convert work_master_id to BigInt
        const workmasterid = BigInt(work_master_id);

        // Create new entry
        const newSchool = await prisma.nidhiVitaran.create({
            data: {
                work_master_id: workmasterid,
                date,
                installment,
                amount,
                photo,
                latitude,
                longitude,
                address,
                status: 'Active',
            },
        });

        // Convert BigInt fields to string before sending the response
        const responseData = {
            ...newSchool,
            id: newSchool.id.toString(), // Assuming id is a BigInt
            work_master_id: newSchool.work_master_id.toString(), // Convert work_master_id if it's a BigInt
        };

        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        console.error("Error during school creation:", error);
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}