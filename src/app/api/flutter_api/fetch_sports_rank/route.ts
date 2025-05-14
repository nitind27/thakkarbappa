import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    // You can parse form data if needed:
    // const form = await req.formData();

    const result = [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        'Finisher',
    ];

    return NextResponse.json(result, { status: 200 });
}
