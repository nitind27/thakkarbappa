import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const student_id = Number(form.get('student_id'));
    const gr_no = form.get('gr_no') as string;
    const current_std = Number(form.get('current_std'));
    const first_name = form.get('first_name') as string;
    const middle_name = form.get('middle_name') as string;
    const last_name = form.get('last_name') as string;
    const school_id = Number(form.get('school_id'));
    const cluster_id = Number(form.get('cluster_id'));
    const user_id = Number(form.get('user_id'));

    const full_name = `${first_name} ${middle_name} ${last_name}`;

    const updatedStudent = await prisma.student.update({
      where: { student_id },
      data: {
        gr_no,
        current_std,
        first_name,
        middle_name,
        last_name,
        full_name,
        update_date_time: new Date(),
        school_id,
        cluster_id,
        user_id,
      },
    });

    return NextResponse.json({
      error: false,
      message: 'Record updated successfully',

    }, { status: 200 });
  } catch (error) {
    console.error("Error during insertion:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
