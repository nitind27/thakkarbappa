
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const sports_id = form.get('sports_id')?.toString() ?? '';
    const student_id = form.get('student_id')?.toString() ?? '';
    const standard_id = form.get('standard_id')?.toString() ?? '';
    const school_id = form.get('school_id')?.toString() ?? '';
    const competition_date = form.get('competition_date')?.toString() ?? '';
    const rank = form.get('rank')?.toString() ?? '';
    const levels = form.get('levels')?.toString() ?? '';
    const details = form.get('details')?.toString() ?? '';
    const player_time = form.get('player_time')?.toString() ?? '';
    const winning_time = form.get('winning_time')?.toString() ?? '';
    const state_level = form.get('state_level')?.toString() ?? '';
    const ins_date_time = form.get('ins_date_time')?.toString() ?? '';

    const sql = `
      INSERT INTO tbl_achivments
      (sports_id, student_id, standard_id, school_id, competition_date, rank, levels, details, player_time, winning_time, state_level, ins_date_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      sports_id,
      student_id,
      standard_id,
      school_id,
      competition_date,
      rank,
      levels,
      details,
      player_time,
      winning_time,
      state_level,
      ins_date_time
    ].map(v => v === undefined ? null : v);

    const [result]: any = await pool.execute(sql, params);

    if (result.affectedRows > 0) {
      return NextResponse.json({ success: true, message: 'Success' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error inserting achievement:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
