
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import pool from '@/lib/pool';

const UPLOAD_DIR = path.join(process.cwd(), '/tmp/uploads/students');
const BASE_URL = '/tmp/uploads/students';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const student_id = formData.get('student_id')?.toString();
        const update_date_time = formData.get('update_date_time')?.toString();
        const photo = formData.get('photo') as File | null;

        if (!student_id || !update_date_time || !photo) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Fetch current student record
        const [rows] = await pool.execute('SELECT profile_photo FROM tbl_students WHERE student_id = ?', [student_id]);
        const student = Array.isArray(rows) && rows.length > 0 ? rows[0] as any : null;

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // 2. Delete old photo if exists
        if (student.profile_photo) {
            const oldPhotoPath = path.join(UPLOAD_DIR, path.basename(student.profile_photo));
            try {
                await fs.unlink(oldPhotoPath);
            } catch (err) {
                // Ignore if file does not exist
            }
        }

        // 3. Save new photo
        const arrayBuffer = await photo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Ensure upload directory exists
        await fs.mkdir(UPLOAD_DIR, { recursive: true });

        // Create a unique filename
        const ext = path.extname(photo.name);
        const filename = `${student_id}_${Date.now()}${ext}`;
        const filePath = path.join(UPLOAD_DIR, filename);

        await fs.writeFile(filePath, buffer);

        const uploadedFileUrl = BASE_URL + filename;

        // 4. Update database
        const sql = 'UPDATE tbl_students SET profile_photo=?, photo_update_date_time=? WHERE student_id=?';
        const [result] = await pool.execute(sql, [filename, update_date_time, student_id]);

        if ((result as any).affectedRows > 0) {
            return NextResponse.json({ message: 'Success', photo_url: uploadedFileUrl }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Update failed' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error updating student photo:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
