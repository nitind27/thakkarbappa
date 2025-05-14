
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import pool from '@/lib/pool';

const UPLOAD_DIR = path.join(process.cwd(), '/tmp/uploads/evaluation');
const BASE_URL = '/tmp/uploads/evaluation';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const parivahan_id = formData.get('parivahan_id')?.toString() ?? '';
    const beneficiary_id = formData.get('beneficiary_id')?.toString() ?? '';
    const remarks = formData.get('remarks')?.toString() ?? '';
    const other_remraks = formData.get('other_remraks')?.toString() ?? '';
    const lat = formData.get('lat')?.toString() ?? '';
    const log = formData.get('log')?.toString() ?? '';
    const address = formData.get('address')?.toString() ?? '';
    const ins_date_time = formData.get('ins_date_time')?.toString() ?? '';

    const photo = formData.get('photo') as File | null;

    let uploadedFileUrl = '';

    if (photo && photo.name) {
      // Ensure upload directory exists
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      // Create a unique filename
      const ext = path.extname(photo.name);
      const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);

      // Save the file
      const buffer = Buffer.from(await photo.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      uploadedFileUrl = BASE_URL + filename;
    }

    // 1. Update work_status in tbl_parivahan_beneficiary
    await pool.execute(
      "UPDATE `tbl_parivahan_beneficiary` SET `work_status` = 'Submitted' WHERE `parivahan_id` = ?",
      [parivahan_id]
    );

    // 2. Insert into tbl_evaluation
    const [result]: any = await pool.execute(
      "INSERT INTO `tbl_evaluation`(`parivahan_id`,`beneficiary_id`,`photo`,`remarks`,`other_remraks`,`lat`,`log`,`address`,`ins_date_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        parivahan_id,
        beneficiary_id,
        uploadedFileUrl,
        remarks,
        other_remraks,
        lat,
        log,
        address,
        ins_date_time
      ]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({ status: "Success" }, { status: 200 });
    } else {
      return NextResponse.json({ status: "Failed" }, { status: 200 });
    }
  } catch (error) {
    console.error('Error in evaluation submission:', error);
    return NextResponse.json({ status: "Failed", error: error }, { status: 500 });
  }
}
