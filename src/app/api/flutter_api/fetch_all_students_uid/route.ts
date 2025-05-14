
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // If you want to accept form data, you can parse it here:
    // const form = await req.formData();

    const [result] = await pool.execute(
      `SELECT uid FROM tbl_students
       WHERE status='Active'
         AND school_id<>0
         AND admited_in_std<>0
         AND current_std<>0
         AND type_of_students<>''
         AND (dropout = 'Not' OR dropout = 'Transfer')`
    );

    // Extract only the 'uid' values into a flat array
    const uids = (result as any[]).map(row => row.uid);

    return NextResponse.json(uids, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching uids:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
