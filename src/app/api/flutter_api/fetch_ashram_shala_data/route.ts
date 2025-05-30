
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

// Get all scheme categories
export async function GET() {
  try {
    const [rows] = await pool.query("select * from tbl_school where status='Active'");
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error); // Use the error variable
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
