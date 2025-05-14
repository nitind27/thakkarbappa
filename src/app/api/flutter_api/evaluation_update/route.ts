
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import pool from '@/lib/pool';

const UPLOAD_DIR = path.join(process.cwd(), '/tmp/uploads/evaluation');
const BASE_URL = '/tmp/uploads/evaluation';


export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const evaluation_id = formData.get('evaluation_id')?.toString() ?? '';
        const parivahan_id = formData.get('parivahan_id')?.toString() ?? '';
        const beneficiary_id = formData.get('beneficiary_id')?.toString() ?? '';
        const remarks = formData.get('remarks')?.toString() ?? '';
        const other_remraks = formData.get('other_remraks')?.toString() ?? '';
        const lat = formData.get('lat')?.toString() ?? '';
        const log = formData.get('log')?.toString() ?? '';
        const address = formData.get('address')?.toString() ?? '';
        const update_date_time = formData.get('update_date_time')?.toString() ?? '';
        const photo = formData.get('photo') as File | null;

        // 1. Fetch current photo filename from DB
        const [rows]: any = await pool.execute(
            "SELECT photo FROM tbl_evaluation WHERE evaluation_id = ?",
            [evaluation_id]
        );
        const dataRow = rows && rows.length > 0 ? rows[0] : null;

        if (dataRow && dataRow.photo) {
            const s_filename = path.basename(dataRow.photo);
            const s_photoPath = path.join(UPLOAD_DIR, s_filename);

            // 2. Delete old photo if exists
            try {
                await fs.unlink(s_photoPath);
            } catch (err) {
                // Ignore if file does not exist
            }
        }

        // 3. Save new photo
        let uploadedFileUrl = '';
        if (photo && photo.name) {
            await fs.mkdir(UPLOAD_DIR, { recursive: true });
            const ext = path.extname(photo.name);
            const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
            const filePath = path.join(UPLOAD_DIR, filename);

            const buffer = Buffer.from(await photo.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            uploadedFileUrl = BASE_URL + filename;
        }

        // 4. Update work_status in tbl_parivahan_beneficiary
        await pool.execute(
            "UPDATE `tbl_parivahan_beneficiary` SET `work_status` = 'Submitted' WHERE `parivahan_id` = ?",
            [parivahan_id]
        );

        // 5. Update tbl_evaluation with new data
        const [result]: any = await pool.execute(
            `UPDATE tbl_evaluation
        SET parivahan_id = ?, beneficiary_id = ?, photo = ?, remarks = ?, other_remraks = ?, lat = ?, log = ?, address = ?, update_date_time = ?
        WHERE evaluation_id = ?`,
            [
                parivahan_id,
                beneficiary_id,
                uploadedFileUrl,
                remarks,
                other_remraks,
                lat,
                log,
                address,
                update_date_time,
                evaluation_id
            ]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ status: "Success" }, { status: 200 });
        } else {
            return NextResponse.json({ status: "Failed" }, { status: 200 });
        }
    } catch (error: any) {
        console.error('Error updating evaluation:', error);
        return NextResponse.json({ status: "Failed", error: error.message }, { status: 500 });
    }
}
