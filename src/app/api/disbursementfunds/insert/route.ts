import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid'; // For generating unique file names

export async function POST(req: Request) {
  try {
    // First, check if the content type is multipart/form-data (file upload)
    const contentType = req.headers.get('content-type') || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    // Get the form data
    const formData = await req.formData();

    // Extract all fields
    const work_master_id = formData.get('work_master_id');
    const date = formData.get('date');
    const installment = formData.get('installment');
    const amount = formData.get('amount');
    const latitude = formData.get('latitude');
    const longitude = formData.get('longitude');
    const address = formData.get('address');
    const photoFile = formData.get('photo') as File;

    // Validate the fields (ensure all required fields are present)
    if (!work_master_id || !date || !installment || !amount || !latitude || !longitude || !address || !photoFile) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    // Convert work_master_id to BigInt
    const workmasterid = BigInt(work_master_id as any);

    // Ensure 'public/uploads' directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate a unique filename using nanoid
    const fileExt = photoFile.name.split('.').pop(); // Extract the file extension
    const uniqueFileName = `${nanoid()}.${fileExt}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Save the file to the local filesystem
    const buffer = await photoFile.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Insert into the database using Prisma
    const newDisbursement = await prisma.nidhiVitaran.create({
      data: {
        work_master_id: workmasterid,
        date: new Date(date as any).toISOString(),
        installment: installment.toString(),
        amount: parseFloat(amount.toString()),
        photo: `/uploads/${uniqueFileName}`, // Store the relative path of the uploaded image
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        address: address.toString(),
        status: 'Active',
      },
    });

    // Convert BigInt fields to string for the response
    const responseData = {
      ...newDisbursement,
      id: newDisbursement.id.toString(),
      work_master_id: newDisbursement.work_master_id.toString(),
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error during disbursement creation:", error);
    return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
  }
}