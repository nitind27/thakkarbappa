
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const student_id = form.get('student_id')?.toString();
        const serial_number = form.get('serial_number')?.toString();
        const uid = form.get('uid')?.toString();
        const gr_no = form.get('gr_no')?.toString();
        const date_of_admision_raw = form.get('date_of_admision')?.toString();
        const year_add = form.get('year_add')?.toString();
        const current_std = form.get('current_std')?.toString();
        const division = form.get('division')?.toString();
        const first_name = form.get('first_name')?.toString();
        const middle_name = form.get('middle_name')?.toString();
        const last_name = form.get('last_name')?.toString();
        const date_of_birth_raw = form.get('date_of_birth')?.toString();
        const place_of_birth = form.get('place_of_birth')?.toString();
        const gender = form.get('gender')?.toString();
        const height = form.get('height')?.toString();
        const weight = form.get('weight')?.toString();
        const mother_name = form.get('mother_name')?.toString();
        const religion = form.get('religion')?.toString();
        const lang_id = form.get('lang_id')?.toString();
        const cast = form.get('cast')?.toString();
        const address = form.get('address')?.toString();
        const contact_no = form.get('contact_no')?.toString();
        const update_date_time = form.get('update_date_time')?.toString();
        const type_of_students = form.get('type_of_students')?.toString();
        const stream = form.get('stream')?.toString();
        const sickle_cell = form.get('sickle_cell')?.toString();

        // Compose full name

        let date_of_admision: Date | any = null;
        let date_of_birth: Date | any = null;

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


        const full_name = [first_name, middle_name, last_name].filter(Boolean).join(' ');

        const sql = `
      UPDATE tbl_students SET
        full_name = ?,
        serial_number = ?,
        uid = ?,
        gr_no = ?,
        date_of_admision = ?,
        year_add = ?,
        current_std = ?,
        division = ?,
        first_name = ?,
        middle_name = ?,
        last_name = ?,
        date_of_birth = ?,
        place_of_birth = ?,
        gender = ?,
        height = ?,
        weight = ?,
        mother_name = ?,
        religion = ?,
        lang_id = ?,
        cast = ?,
        address = ?,
        contact_no = ?,
        update_date_time = ?,
        type_of_students = ?,
        stream = ?,
        sickle_cell = ?
      WHERE student_id = ?
    `;

        const params = [
            full_name,
            serial_number,
            uid,
            gr_no,
            date_of_admision,
            year_add,
            current_std,
            division,
            first_name,
            middle_name,
            last_name,
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
            update_date_time,
            type_of_students,
            stream,
            sickle_cell,
            student_id
        ];

        const safeParams = params.map(v => v === undefined ? null : v);

        const [result] = await pool.execute(sql, safeParams);

        if ((result as any).affectedRows > 0) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'No rows updated' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error updating student:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
