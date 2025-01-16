import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Get the cluster_name from the request body
        const body = await req.json();
        const { parivahan_date, outward_no, sup_id, yojana_year_id, yojana_type,yojana_id,beneficiary_id } = body;

        // Check if cluster_name is provided
        // if (!category_id || !sub_category_name || !yojana_year_id || !bank_id || !amount) {
        //     return NextResponse.json({ error: 'All filed required' }, { status: 400 });
        // }

        // const categoryid = parseInt(category_id, 10);
        // const bankid = parseInt(bank_id, 10);
        // const yojanayearid = parseInt(yojana_year_id, 10);
        // Insert the new category into the database
        const newCategory = await prisma.tblparivahan.create({
            data: {
                parivahan_id :1,
                parivahan_no:1,
                parivahan_date,
                outward_no,
                sup_id,
                yojana_year_id,
                yojana_type,
                yojana_id,
                beneficiary_id,
                status: "Active", // Add default status if needed
                ins_date:""
  
            },
        });

        // Return the newly created category with a 201 Created status
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error: any) {
        console.error("Error during insertion:", error); // Log the error for debugging

        // Return a 500 error if something goes wrong
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}