
import pool from "@/lib/pool";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const school_id = form.get("school_id")?.toString() ?? "";
    const current_std = form.get("current_std")?.toString() ?? "";

    // 1. Build the student query
    let query = "";
    let params: any[] = [];
    if (current_std === "user") {
      query = `SELECT student_id,current_std,gender,type_of_students,full_name,gr_no,cluster_id,school_id 
        FROM tbl_students 
        WHERE user_id=? and status='Active' and school_id<>0 and current_std<>0 and (dropout = 'Not' || dropout = 'Transfer')`;
      params = [school_id];
    } else if (school_id === "all" && current_std === "all") {
      query = `SELECT student_id,current_std,gender,type_of_students,full_name,gr_no,cluster_id 
        FROM tbl_students 
        WHERE status='Active' and school_id<>0 and admited_in_std<>0 and current_std<>0 and type_of_students<>'' and (dropout = 'Not' || dropout = 'Transfer')`;
    } else if (current_std === "not") {
      query = `SELECT student_id,current_std,gender,type_of_students,full_name,gr_no,cluster_id,school_id 
        FROM tbl_students 
        WHERE school_id=? and status='Active' and school_id<>0 and admited_in_std<>0 and current_std<>0 and type_of_students<>'' and (dropout = 'Not' || dropout = 'Transfer')`;
      params = [school_id];
    } else {
      query = `SELECT * FROM tbl_students 
        WHERE current_std=? and school_id=? and status='Active' and school_id<>0 and admited_in_std<>0 and current_std<>0 and type_of_students<>'' and (dropout = 'Not' || dropout = 'Transfer')`;
      params = [current_std, school_id];
    }

    // 2. Get students
    const [students] = await pool.execute(query, params);

    // 3. Get sports
    const [sports] = await pool.execute(
      "SELECT sports_id,sports_name,icon FROM tbl_sports WHERE status='Active' ORDER BY serial_number ASC"
    );

    // 4. Get sports info
    const [sportsInfo] = await pool.execute(
      "SELECT * FROM tbl_sports_info_new WHERE status='Active'"
    );

    // 5. Filter sportsInfo for students in result
    const studentIds = new Set((students as any[]).map((s) => s.student_id));
    const sportInfoResponse: any[] = [];
    for (const sportInfo of sportsInfo as any[]) {
      const parts = (sportInfo.sports_record || "").split("|");
      if (parts.length >= 2 && studentIds.has(parts[1])) {
        sportInfoResponse.push(sportInfo);
      }
    }

    // 6. Count students for each sport
    const response: any[] = [];
    for (const sport of sports as any[]) {
      let count = 0;
      const sportsId = sport.sports_id;
      for (const sportInfoRes of sportInfoResponse) {
        const parts = (sportInfoRes.sports_record || "").split("|");
        if (parts.length >= 1) {
          const comaParts = parts[0].split(",");
          if (comaParts.includes(sportsId?.toString())) {
            count++;
          }
        }
      }
      response.push({ ...sport, totalStudents: count });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error in sports/students route:", error);
    return NextResponse.json(
      { error: true, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
