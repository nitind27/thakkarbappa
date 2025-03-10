import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Get the cluster_name from the request body
    const body = await req.json();
    const { designation, studentname, schoolhosteltype, schoolhostelname, subject, testdate, totalmarks, obtainmarks, percentage } = body;



    // Insert the new cluster into the database
    const newCluster = await prisma.missionshikari.create({
      data: {
        designation: designation,
        studentname: studentname,
        schoolhosteltype: schoolhosteltype,
        schoolhostelname: schoolhostelname,
        subject: subject,
        testdate: testdate,
        totalmarks: totalmarks,
        obtainmarks: obtainmarks,
        percentage: percentage,

      },
    });

    // Return the newly created cluster with a 201 Created status
    return NextResponse.json(newCluster, { status: 201 });
  } catch (error: any) {
    console.error("Error during insertion:", error); // Log the error for debugging

    // Return a 500 error if something goes wrong
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}