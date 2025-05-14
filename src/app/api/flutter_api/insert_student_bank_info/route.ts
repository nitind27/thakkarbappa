
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const gr_no = form.get('gr_no')?.toString() ?? '';
    const ac_holder = form.get('ac_holder')?.toString() ?? '';
    const acoount_holder2 = form.get('acoount_holder2')?.toString() ?? '';
    const ac_no = form.get('ac_no')?.toString() ?? '';
    const ifsc_code = form.get('ifsc_code')?.toString() ?? '';
    const bank_name = form.get('bank_name')?.toString() ?? '';
    const bank_branch = form.get('bank_branch')?.toString() ?? '';
    const ins_date_time = form.get('ins_date_time')?.toString() ?? '';
    const student_id = form.get('student_id')?.toString() ?? '';
    const school_id = form.get('school_id')?.toString() ?? '';
    const user_id = form.get('user_id')?.toString() ?? '';

    const sql = `
      INSERT INTO tbl_stud_finance
      (gr_no, ac_holder, acoount_holder2, ac_no, ifsc_code, bank_name, bank_branch, ins_date_time, student_id, school_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      gr_no,
      ac_holder,
      acoount_holder2,
      ac_no,
      ifsc_code,
      bank_name,
      bank_branch,
      ins_date_time,
      student_id,
      school_id,
      user_id
    ].map(v => v === undefined ? null : v);

    const [result]: any = await pool.execute(sql, params);

    if (result.affectedRows > 0) {
      return NextResponse.json({ success: true, message: 'Success' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error inserting finance record:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
