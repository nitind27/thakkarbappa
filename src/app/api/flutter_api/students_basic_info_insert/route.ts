import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const form = await req.formData();
     
        // Extract fields from FormData
        const serial_number = form.get('serial_number') as string;
        const uid = form.get('uid') as string;
        const gr_no = form.get('gr_no') as string;
        const date_of_admision_raw = form.get('date_of_admision') as string;
        const year_add = form.get('year_add') as string;
        const admited_in_std = Number(form.get('admited_in_std'));
        const current_std = form.get('current_std') as string;
        const division = form.get('division') as string;
        const first_name = form.get('first_name') as string;
        const middle_name = form.get('middle_name') as string;
        const last_name = form.get('last_name') as string;
        const full_name = form.get('full_name') as string;
        const date_of_birth_raw = form.get('date_of_birth') as string;
        const place_of_birth = form.get('place_of_birth') as string;
        const gender = form.get('gender') as string;
        const height = form.get('height') as string;
        const weight = form.get('weight') as string;
        const mother_name = form.get('mother_name') as string;
        const religion = form.get('religion') as string;
        const lang_id = Number(form.get('lang_id'));
        const cast = form.get('cast') as string;
        const address = form.get('address') as string;
        const contact_no = form.get('contact_no') as string;
        const ins_date_time_raw = form.get('ins_date_time') as string;
        const type_of_students = form.get('type_of_students') as string;
        const stream = form.get('stream') as string;
        const school_id = form.get('school_id') as string;
        const cluster_id = Number(form.get('cluster_id'));
        const user_id = Number(form.get('user_id'));
        const sickle_cell = form.get('sickle_cell') as string;

        // Convert numeric fields
        const schoolid = parseInt(school_id, 10);
        const currentstd = parseInt(current_std, 10);

        if (isNaN(schoolid)) {
            return NextResponse.json(
                { error: "school_id must be a valid number" },
                { status: 400 }
            );
        }


        let date_of_admision: Date | any = null;
        let date_of_birth: Date | any = null;
        let ins_date_time: Date | any = null;
        if (
            typeof date_of_admision_raw === 'string' &&
            date_of_admision_raw.trim() !== ''
        ) {
            const parsedDate = new Date(date_of_admision_raw);
            if (!isNaN(parsedDate.getTime())) {
                date_of_admision = parsedDate;
            } else {
                return NextResponse.json({ error: 'Invalid competition_date format' }, { status: 400 });
            }
        }
        if (
            typeof date_of_birth_raw === 'string' &&
            date_of_birth_raw.trim() !== ''
        ) {
            const parsedDate = new Date(date_of_birth_raw);
            if (!isNaN(parsedDate.getTime())) {
                date_of_birth = parsedDate;
            } else {
                return NextResponse.json({ error: 'Invalid competition_date format' }, { status: 400 });
            }
        }
        if (
            typeof ins_date_time_raw === 'string' &&
            ins_date_time_raw.trim() !== ''
        ) {
            const parsedDate = new Date(ins_date_time_raw);
            if (!isNaN(parsedDate.getTime())) {
                ins_date_time = parsedDate;
            } else {
                return NextResponse.json({ error: 'Invalid competition_date format' }, { status: 400 });
            }
        }
        // Create new Student entry
        const newStudent = await prisma.student.create({
            data: {
                serial_number,
                uid,
                gr_no,
                date_of_admision,
                year_add,
                admited_in_std,
                current_std: currentstd,
                division,
                first_name,
                middle_name,
                last_name,
                full_name,
                date_of_birth,
                place_of_birth,
                gender,
                height,
                weight,
                mother_name,
                religion,
                lang_id,
                cast,
                address,
                contact_no,
                ins_date_time,
                type_of_students,
                stream,
                school_id: schoolid,
                cluster_id,
                user_id,
                sickle_cell,
            },
        });

        // Convert BigInt fields to string if needed
        function convertBigIntToString(obj: any): any {
            if (Array.isArray(obj)) {
                return obj.map(convertBigIntToString);
            } else if (obj !== null && typeof obj === 'object') {
                return Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)])
                );
            } else if (typeof obj === 'bigint') {
                return obj.toString();
            }
            return obj;
        }

        const responseData = convertBigIntToString(newStudent);

        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        console.error("Error during student creation:", error);
        return NextResponse.json(
            { error: error || "Internal Server Error" },
            { status: 500 }
        );
    }
}
