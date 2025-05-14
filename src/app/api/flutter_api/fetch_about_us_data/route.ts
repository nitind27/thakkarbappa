import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

// Get the first item from tbl_about_us where is_delete="No"
export async function GET() {
  try {
    const [rows] = await pool.query<any[]>('SELECT * FROM tbl_about_us WHERE is_delete="No"');

    // Return only the first item
    return NextResponse.json(rows[0] || {}); // fallback to empty object if no data
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
