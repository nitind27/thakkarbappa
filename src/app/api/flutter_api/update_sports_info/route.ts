
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const sports_record = form.get('sports_record');
        const update_date_time = form.get('update_date_time');
        const sports_info_id = form.get('sports_info_id');


        // Validate required fields (optional, but recommended)
        if (
            !sports_record || !update_date_time || !sports_info_id
        ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const sql = `
     UPDATE tbl_sports_info_new SET sports_record=?,update_date_time=? WHERE sports_info_id=?
    `;

        const params = [
            sports_record,
            update_date_time,
            sports_info_id,

        ];

        const [result] = await pool.execute(sql, params);

        // Check affected rows for success
        // result.affectedRows is available in mysql2, but with execute it may be result[0].affectedRows
        if ((result as any).affectedRows > 0) {
            return NextResponse.json({ message: 'Success' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'No record updated' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating finance record:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
