
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const contact_no = formData.get('contact_no');
    const remark = formData.get('remark');
    let ins_date_time = formData.get('ins_date_time');

    // Validate required fields
    if (
      typeof name !== 'string' ||
      typeof contact_no !== 'string' ||
      typeof remark !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // If ins_date_time is not provided, use current datetime
    let insDate;
    if (typeof ins_date_time === 'string' && ins_date_time.trim() !== '') {
      insDate = ins_date_time;
    } else {
      insDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL DATETIME format
    }

    // Insert into the database
    const sql = 'INSERT INTO tbl_grievance (name, contact_no, remark, ins_date_time) VALUES (?, ?, ?, ?)';
    await pool.execute(sql, [name, contact_no, remark, insDate]);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting grievance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
