
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const gr_no = form.get('gr_no')?.toString() ?? '';
        const current_std = form.get('current_std')?.toString() ?? '';
        const school_id = form.get('school_id')?.toString() ?? '';
        const first_name = form.get('first_name')?.toString() ?? '';
        const middle_name = form.get('middle_name')?.toString() ?? '';
        const last_name = form.get('last_name')?.toString() ?? '';
        const cluster_id = form.get('cluster_id')?.toString() ?? '';
        const user_id = form.get('user_id')?.toString() ?? '';

        const full_name = [first_name, middle_name, last_name].filter(Boolean).join(' ');
        // Set timezone to Asia/Kolkata and get current datetime
        const ins_date_time = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace(' ', 'T').replace('T', ' ');

        const sql = `
      INSERT INTO tbl_students
      (gr_no, current_std, first_name, middle_name, last_name, full_name, ins_date_time, school_id, cluster_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const params = [
            gr_no,
            current_std,
            first_name,
            middle_name,
            last_name,
            full_name,
            ins_date_time,
            school_id,
            cluster_id,
            user_id
        ].map(v => v === undefined ? null : v);

        const [result]: any = await pool.execute(sql, params);

        // result.insertId contains the last inserted ID
        return NextResponse.json({
            error: false,
            message: 'Record inserted successfully',
            id: result.insertId
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error inserting student:', error);
        return NextResponse.json({
            error: true,
            message: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}
