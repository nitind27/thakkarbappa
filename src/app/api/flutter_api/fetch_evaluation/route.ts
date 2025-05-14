
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const sup_id = form.get('sup_id')?.toString() ?? '';
        let response: any[] = [];
        if (sup_id) {
            const [parivahanResults] = await pool.execute(
                "SELECT parivahan_id, beneficiary_id FROM tbl_parivahan_beneficiary WHERE sup_id = ?",
                [sup_id]
            );
            for (const item of parivahanResults as any[]) {
                const [evaluationResults] = await pool.execute(
                    "SELECT * FROM tbl_evaluation WHERE status = 'Active' AND parivahan_id = ? AND beneficiary_id = ?",
                    [item.parivahan_id, item.beneficiary_id]
                );
                if (Array.isArray(evaluationResults) && evaluationResults.length > 0) {
                    response = [...response, ...evaluationResults];
                }
            }
        } else {
            const [allEvaluations] = await pool.execute(
                "SELECT * FROM tbl_evaluation WHERE status = 'Active'"
            );
            response = allEvaluations as any[];
        }
        return NextResponse.json(response, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching evaluations:', error);
        return NextResponse.json(
            { error: true, message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
