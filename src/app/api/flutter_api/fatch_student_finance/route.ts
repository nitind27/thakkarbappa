import pool from '@/lib/pool';
import { NextRequest, NextResponse } from 'next/server';

// GET: /api/finance?student_id=123
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const student_id = searchParams.get('student_id');

  if (!student_id) {
    return NextResponse.json({ error: 'Missing student_id' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query<any[]>(
      `
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
      `,
      [student_id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// POST: /api/finance  (with JSON body: { "student_id": 123 })
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const student_id = body.student_id;

    if (!student_id) {
      return NextResponse.json({ error: 'Missing student_id' }, { status: 400 });
    }

    const [rows] = await pool.query<any[]>(
      `
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
      `,
      [student_id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
