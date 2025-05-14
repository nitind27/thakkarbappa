
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const categoryId = form.get('category_id')?.toString() ?? '';

    let sql: string;
    let params: any[] = [];

    if (categoryId === 'all') {
      sql = "SELECT * FROM tbl_options WHERE status='Active' ORDER BY serial_number ASC";
    } else {
      sql = "SELECT * FROM tbl_options WHERE category_id = ? AND status='Active' ORDER BY serial_number ASC";
      params = [categoryId];
    }

    const [rows] = await pool.execute(sql, params);

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching options:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
