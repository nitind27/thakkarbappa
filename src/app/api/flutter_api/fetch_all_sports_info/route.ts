
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
        SELECT student_id, current_std, gender, type_of_students, full_name, gr_no, cluster_id, school_id, first_name, middle_name, last_name
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

    // Get students
    const [students] = await pool.execute(sql, params);

    // Get sports info
    const [sportsInfo] = await pool.execute(
      "SELECT * FROM tbl_sports_info_new WHERE status='Active'"
    );

    // Build a map for quick lookup of student by student_id
    const studentMap = new Map();
    for (const s of students as any[]) {
      studentMap.set(s.student_id, s);
    }

    // Build the response
    const sportInfoResponse: any[] = [];
    for (const sportInfo of sportsInfo as any[]) {
      const parts = (sportInfo.sports_record || '').split('|');
      if (parts.length >= 2) {
        const student = studentMap.get(parts[1]);
        if (student) {
          sportInfo.gr_no = student.gr_no;
          sportInfo.name = student.full_name;
          sportInfo.first_name = student.first_name ?? '';
          sportInfo.middle_name = student.middle_name ?? '';
          sportInfo.last_name = student.last_name ?? '';
          sportInfoResponse.push(sportInfo);
        }
      }
    }

    return NextResponse.json(sportInfoResponse, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching sports info:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
