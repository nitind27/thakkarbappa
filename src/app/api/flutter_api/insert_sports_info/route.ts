import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse form data from the request
    const formData = await request.formData();
    const sports_record = formData.get('sports_record');

    // Optional: Validate input
    if (typeof sports_record !== 'string' || !sports_record.trim()) {
      return NextResponse.json({ error: 'Invalid sports_record' }, { status: 400 });
    }

    // Get current date and time
    const ins_date_time = new Date();

    // Insert into the database using Prisma
    await prisma.sportsInfo.create({
      data: {
        sports_record,
        ins_date_time, // This will insert the current datetime
      },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting sports record:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
