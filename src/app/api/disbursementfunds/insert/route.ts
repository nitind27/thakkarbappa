import multer from 'multer';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads'); // Adjust path as necessary
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create uploads directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
  },
});

const upload = multer({ storage });

export async function POST(req: Request) {
  const nextRequest = req as any;

  await new Promise((resolve, reject) => {
    upload.single('photo')(nextRequest, {} as any, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(''); // or any meaningful message
      }
    });
  });

  try {
    const body = nextRequest.body;
    
    // Check if required fields are present
    const { work_master_id, date, installment, amount, latitude, longitude, address } = body;

    if (!work_master_id || !date || !installment || !amount || !latitude || !longitude || !address) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const workmasterid = BigInt(work_master_id);

    // Continue with the database operation...
    const newRecord = await prisma.nidhiVitaran.create({
      data: {
        work_master_id: workmasterid,
        date: new Date(date), // Ensure date is a Date object
        installment,
        amount: parseFloat(amount), // Ensure amount is a number
        photo: nextRequest.file.path,
        latitude,
        longitude,
        address,
        status: 'Active',
      },
    });

    const responseData = {
      ...newRecord,
      id: newRecord.id.toString(),
      work_master_id: newRecord.work_master_id.toString(),
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error during creation:", error);
    
    // Check for specific error types and handle accordingly
    if (error instanceof TypeError) {
      return NextResponse.json({ error: 'Type Error occurred' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
