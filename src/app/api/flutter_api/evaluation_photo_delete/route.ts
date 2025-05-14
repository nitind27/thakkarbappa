
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import pool from '@/lib/pool';

const UPLOAD_DIR = path.join(process.cwd(), '/tmp/uploads/evaluation');

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const evaluation_id = form.get('evaluation_id')?.toString() ?? '';
        const parivan_id = form.get('parivan_id')?.toString() ?? '';

        // 1. Fetch the photo filename from the database
        const [rows]: any = await pool.execute(
            "SELECT photo FROM tbl_evaluation WHERE evaluation_id = ?",
            [evaluation_id]
        );
        const dataRow = rows && rows.length > 0 ? rows[0] : null;

        if (dataRow && dataRow.photo) {
            const s_filename = path.basename(dataRow.photo);
            const s_photoPath = path.join(UPLOAD_DIR, s_filename);

            // 2. Delete the file if it exists
            try {
                await fs.unlink(s_photoPath);
            } catch (err) {
                // Ignore if file does not exist
            }
        }

        // 3. Update work_status in tbl_parivahan_beneficiary
        await pool.execute(
            "UPDATE `tbl_parivahan_beneficiary` SET `work_status` = 'Pending' WHERE `parivahan_id` = ?",
            [parivan_id]
        );

        // 4. Update photo field in tbl_evaluation
        const [result]: any = await pool.execute(
            "UPDATE `tbl_evaluation` SET photo = '' WHERE evaluation_id = ?",
            [evaluation_id]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ status: "Success" }, { status: 200 });
        } else {
            return NextResponse.json({ status: "Failed" }, { status: 200 });
        }
    } catch (error: any) {
        console.error('Error deleting evaluation photo:', error);
        return NextResponse.json({ status: "Failed", error: error.message }, { status: 500 });
    }
}
