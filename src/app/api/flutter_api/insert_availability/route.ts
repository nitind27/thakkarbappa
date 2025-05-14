
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const availability_record = form.get('availability_record')?.toString() ?? '';

    const sql = `
      INSERT INTO tbl_availability (availability_record)
      VALUES (?)
    `;

    const params = [availability_record];

    const [result]: any = await pool.execute(sql, params);

    if (result.affectedRows > 0) {
      return NextResponse.json({ success: true, message: 'Success' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Insert failed' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error inserting availability record:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
