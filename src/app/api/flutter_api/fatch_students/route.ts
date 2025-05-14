
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const school_id = form.get('school_id')?.toString() ?? '';
    const current_std = form.get('current_std')?.toString() ?? '';

    let sql = '';
    let params: any[] = [];

    if (current_std === 'user') {
      sql = `
        SELECT student_id, current_std, gender, type_of_students, full_name, gr_no, cluster_id, school_id
        FROM tbl_students
        WHERE user_id = ? AND status='Active' AND school_id<>0 AND current_std<>0 AND (dropout = 'Not' OR dropout = 'Transfer')
      `;
      params = [school_id];
    } else if (current_std === 'not') {
      sql = `
        SELECT student_id, current_std, gender, type_of_students, full_name, gr_no, cluster_id
        FROM tbl_students
        WHERE school_id = ? AND status='Active' AND school_id<>0 AND admited_in_std<>0 AND current_std<>0 AND type_of_students<>'' AND (dropout = 'Not' OR dropout = 'Transfer')
      `;
      params = [school_id];
    } else {
      sql = `
        SELECT *
        FROM tbl_students
        WHERE current_std = ? AND school_id = ? AND status='Active' AND school_id<>0 AND admited_in_std<>0 AND current_std<>0 AND type_of_students<>'' AND (dropout = 'Not' OR dropout = 'Transfer')
      `;
      params = [current_std, school_id];
    }

    const [result] = await pool.execute(sql, params);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
