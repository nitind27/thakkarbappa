
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const date_leave_raw = form.get('txt_date_leave')?.toString();
    const reason = form.get('selReason')?.toString();
    const remarks = form.get('txt_Remarks')?.toString();
    const school = form.get('selSchool')?.toString();
    const stream = form.get('selStream')?.toString();
    const standard = form.get('selStandard')?.toString();
    const student_id = form.get('txt_stud_id')?.toString();
    const current_std = form.get('current_std')?.toString();

    // Format date_leave as YYYY-MM-DD
    const date_leave = date_leave_raw
      ? new Date(date_leave_raw).toISOString().slice(0, 10)
      : null;

    const dateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let sql, params;

    if (reason === 'Transfer') {
      sql = `
        UPDATE tbl_students
        SET
          dropout = ?,
          current_std = ?,
          dropout_date_time = ?,
          school_id = ?,
          date_leave = ?,
          remarks = ?,
          stream = ?,
          current_std = ?
        WHERE student_id = ?
      `;
      params = [
        reason,
        current_std,
        dateTimeNow,
        school,
        date_leave,
        remarks,
        stream,
        standard,
        student_id
      ];
    } else {
      sql = `
        UPDATE tbl_students
        SET
          dropout = ?,
          current_std = ?,
          dropout_date_time = ?,
          date_leave = ?,
          remarks = ?
        WHERE student_id = ?
      `;
      params = [
        reason,
        current_std,
        dateTimeNow,
        date_leave,
        remarks,
        student_id
      ];
    }

    const [result] = await pool.execute(sql, params);

    if ((result as any).affectedRows > 0) {
      return NextResponse.json([{ success: true }], { status: 200 });
    } else {
      return NextResponse.json([{ success: false }], { status: 200 });
    }
  } catch (error) {
    console.error('Error updating student dropout:', error);
    return NextResponse.json([{ success: false, error: 'Internal Server Error' }], { status: 500 });
  }
}
