
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

// Get all scheme categories
export async function GET() {
  try {
    const [rows] = await pool.query<any[]>("select * from tbl_contacts where contact_status='Start'");
    return NextResponse.json(rows[0] || {});
  } catch (error) {
    console.error('Database error:', error); // Use the error variable
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
