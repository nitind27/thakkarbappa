
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const school_id = form.get('school_id')?.toString() ?? '';
    const user_id = form.get('user_id')?.toString() ?? '';

    // Fetch all active medical checkup records
    const [rows] = await pool.execute(
      "SELECT * FROM tbl_medical_checkup_new WHERE status='Active'"
    );

    // Filter results in JS as per PHP logic
    const response = [];
    for (const medical of rows as any[]) {
      const parts = (medical.medical_checkup_record || '').split('|');
      if (parts.length >= 6) {
        if (parts[4] === user_id && parts[5] === school_id) {
          response.push(medical);
        }
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching medical checkup records:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
