
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const sub_category_id = form.get('sub_category_id')?.toString() ?? '';

    const [rows] = await pool.execute(
      'SELECT * FROM tbl_sub_category WHERE sub_category_id = ? AND status = "Active"',
      [sub_category_id]
    );

    // Return the first (or null if not found)
    const result = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching sub category:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
