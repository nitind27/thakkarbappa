
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
console.log("formdatat",form)
    const finance_id = form.get('finance_id');
    const gr_no = form.get('gr_no');
    const ac_holder = form.get('ac_holder');
    const rel_ac_holder = form.get('rel_ac_holder');
    const acoount_holder2 = form.get('acoount_holder2');
    const ac_no = form.get('ac_no');
    const ifsc_code = form.get('ifsc_code');
    const bank_name = form.get('bank_name');
    const bank_branch = form.get('bank_branch');
    const update_date_time = form.get('update_date_time');
    const student_id = form.get('student_id');
    const school_id = form.get('school_id');
    const user_id = form.get('user_id');

    // Validate required fields (optional, but recommended)
    if (
      !finance_id || !gr_no || !ac_holder || !rel_ac_holder || !acoount_holder2 ||
      !ac_no || !ifsc_code || !bank_name || !bank_branch || !update_date_time ||
      !student_id || !school_id || !user_id
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sql = `
      UPDATE tbl_stud_finance
      SET gr_no = ?, ac_holder = ?, rel_ac_holder = ?, acoount_holder2 = ?, ac_no = ?, ifsc_code = ?, bank_name = ?, bank_branch = ?, update_date_time = ?, student_id = ?, school_id = ?, user_id = ?
      WHERE finance_id = ?
    `;

    const params = [
      gr_no,
      ac_holder,
      rel_ac_holder,
      acoount_holder2,
      ac_no,
      ifsc_code,
      bank_name,
      bank_branch,
      update_date_time,
      student_id,
      school_id,
      user_id,
      finance_id
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
