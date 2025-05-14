import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const achivment_id = Number(form.get('achivment_id'));
        const sports_id = Number(form.get('sports_id'));
        const competition_date_raw = form.get('competition_date');
        const rank = form.get('rank') as string;
        const levels = form.get('levels') as string;
        const details = form.get('details') as string;
        const player_time = form.get('player_time') as string;
        const winning_time = form.get('winning_time') as string;
        const state_level = form.get('state_level') as string;

        let competition_date: Date | any = null;
        if (
            typeof competition_date_raw === 'string' &&
            competition_date_raw.trim() !== ''
        ) {
            const parsedDate = new Date(competition_date_raw);
            if (!isNaN(parsedDate.getTime())) {
                competition_date = parsedDate;
            } else {
                return NextResponse.json({ error: 'Invalid competition_date format' }, { status: 400 });
            }
        }

        const updatedStudent = await prisma.tbl_achivments.update({
            where: { achivment_id },
            data: {
                sports_id,
                competition_date, // will be null if not provided
                rank,
                levels,
                details,
                player_time,
                winning_time,
                state_level,
                update_date_time: new Date(),
            },
        });

        return NextResponse.json(updatedStudent, { status: 201 });
    } catch (error) {
        console.error("Error during insertion:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
