
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const student_id = form.get('student_id')?.toString() ?? '';

    const sql = `
      SELECT 
        ts.current_std, 
        tsf.finance_id, 
        tsf.gr_no, 
        tsf.ac_holder, 
        tsf.acoount_holder2, 
        tsf.ac_no, 
        tsf.ifsc_code, 
        tsf.bank_name, 
        tsf.bank_branch, 
        tsf.student_id, 
        tsf.school_id, 
        tsf.user_id, 
        tsf.ins_date_time,
        tsf.update_date_time
      FROM tbl_stud_finance tsf
      JOIN tbl_students ts ON tsf.student_id = ts.student_id
      WHERE 
        ts.student_id = ? 
        AND tsf.status = 'Active'
        AND ts.status = 'Active'
        AND ts.school_id <> 0
        AND ts.admited_in_std <> 0
        AND ts.current_std <> 0
        AND ts.type_of_students <> ''
        AND (ts.dropout = 'Not' OR ts.dropout = 'Transfer')
    `;

    const [result] = await pool.execute(sql, [student_id]);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching student finance:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
