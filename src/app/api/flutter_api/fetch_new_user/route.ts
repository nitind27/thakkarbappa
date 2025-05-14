
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const categoryId = form.get('category_id')?.toString() ?? '';

    let sql1 = '';
    let sql2 = '';
    let params1: any[] = [];
    let params2: any[] = [];

    if (categoryId === '4') {
      sql1 = `
        SELECT us.user_id,us.category_id,us.name,us.contact_no,us.address,us.username,us.password,us.status,us.school_id,us.hostel_id,us.standard_id,us.cluster_id,sc.school_name,sc.stds AS standard,ct.category_name
        FROM tbl_users us
        JOIN tbl_school sc ON us.school_id = sc.school_id
        JOIN tbl_category_new ct ON us.category_id = ct.category_id
        WHERE us.category_id = ? AND us.status='Active'
      `;
      params1 = [categoryId];
    } else {
      sql1 = `
        SELECT us.user_id,us.category_id,us.name,us.contact_no,us.address,us.username,us.password,us.status,us.school_id,us.hostel_id,us.standard_id,us.cluster_id,sc.school_name,sc.stds AS standard,st.standard_name,ct.category_name
        FROM tbl_users us
        JOIN tbl_school sc ON us.school_id = sc.school_id
        JOIN tbl_standard st ON us.standard_id = st.standard_id
        JOIN tbl_category_new ct ON us.category_id = ct.category_id
        WHERE us.category_id = ? AND us.status='Active'
      `;
      params1 = [categoryId];
    }

    // Second query depends on categoryId
    if (categoryId === '6') {
      sql2 = `
        SELECT us.user_id,us.category_id,us.name,us.contact_no,us.address,us.username,us.password,us.status,us.school_id,us.hostel_id,us.standard_id,us.cluster_id,ct.category_name
        FROM tbl_users us
        JOIN tbl_category_new ct ON us.category_id = ct.category_id
        WHERE (us.category_id = '2' OR us.category_id = '7' OR us.category_id = '35' OR us.category_id = '36') AND us.status='Active'
      `;

    } else {
      sql2 = `
        SELECT us.user_id,us.category_id,us.name,us.contact_no,us.address,us.username,us.password,us.status,us.school_id,us.hostel_id,us.standard_id,us.cluster_id,ct.category_name
        FROM tbl_users us
        JOIN tbl_category_new ct ON us.category_id = ct.category_id
        WHERE us.category_id = '30' AND us.status='Active'
      `;
 
    }

    const [result1] = await pool.execute(sql1, params1);
    const [result2] = await pool.execute(sql2);

    // Merge and return
    const response = [...(result1 as any[]), ...(result2 as any[])];

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user list:', error);
    return NextResponse.json({
      error: true,
      message: error.message || 'Internal Server Error'
    }, { status: 500 });
  }
}
