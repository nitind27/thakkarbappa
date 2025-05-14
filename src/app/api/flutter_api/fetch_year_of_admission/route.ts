import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    // You can parse form data if needed:
    // const form = await req.formData();

    const result = [
        '2010-11',
        '2011-12',
        '2012-13',
        '2013-14',
        '2014-15',
        '2015-16',
        '2016-17',
        '2017-18',
        '2018-19',
        '2019-20',
        '2020-21',
        '2021-22',
        '2022-23',
        '2023-24',
        '2024-25',
    ];

    return NextResponse.json(result, { status: 200 });
}
