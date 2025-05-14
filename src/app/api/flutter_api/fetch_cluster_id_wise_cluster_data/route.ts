import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        let cluster_id;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const body = await req.json();
            cluster_id = body.cluster_id;
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            cluster_id = formData.get('cluster_id');
        }

        // Fetch records matching yojana_type_id
        const result = await prisma.clusterData.findFirst({
            where: { cluster_id: Number(cluster_id) },
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error during fetch:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
