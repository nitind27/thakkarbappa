import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Get the request body
        const body = await req.json();
        const { parivahan_date, outward_no, sup_id, yojana_year_id, yojana_type, yojana_id,parivahan_no, beneficiary_id } = body;

        // Ensure parivahan_no is treated as a bigint
        // const parivahan_no = BigInt(100); // Replace 100 with the actual value you want to use

        // Validate and format parivahan_date
        const formattedDate = new Date(parivahan_date);
        if (isNaN(formattedDate.getTime())) {
            throw new Error('Invalid date format. Please provide a valid ISO-8601 date.');
        }

        const supIdNumber = Number(sup_id);
        const yojana_yearid = Number(yojana_year_id);
        const yojanaid = Number(yojana_id);
        const parivahanno = Number(parivahan_no);

        // Split beneficiary_id if it contains multiple values
        const beneficiaryIds = beneficiary_id.split(',').map((id: string) => id.trim());

        // Insert each beneficiary_id separately
        const insertPromises = beneficiaryIds.map(async (beneficiary: any) => {
            return prisma.parivahanbeneficiary.create({
                data: {
                    parivahan_no: parivahanno, // Convert BigInt to string
                    parivahan_date: formattedDate.toISOString(), // Ensure it's in ISO-8601 format
                    outward_no,
                    sup_id: supIdNumber,
                    yojana_year_id: yojana_yearid,
                    yojana_type,
                    yojana_id: yojanaid,
                    installment:"100",
                    beneficiary_id: beneficiary,
                    status: "Active", // Default status
                    ins_date: new Date().toISOString() // Add actual insertion date if needed
                },
            });
        });

        // Wait for all insertions to complete
        const newCategories = await Promise.all(insertPromises);

        // Convert BigInt fields to string if necessary before returning
        return NextResponse.json(
            newCategories.map((category) => ({
                ...category,
                parivahan_no: category.parivahan_no.toString(), // Convert BigInt to string for response
            })),
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error during insertion:", error); // Log the error for debugging

        // Return a 500 error if something goes wrong
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
