
import pool from '@/lib/pool';
import { NextResponse } from 'next/server';

// Helper: Call external API for achievements
async function callFirstApi(student_id: string, sport_id: string) {
  const url = 'https://itdpdeori.org.in/thakkar_bappa/flutter_api/fetch_sports_achievement_student_and_sport_id_wise.php';
  const form = new URLSearchParams();
  form.append('student_id', student_id);
  form.append('sport_id', sport_id);

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error calling first API:', err);
    return null;
  }
}

// Level hierarchy for sorting
const hierarchy: Record<string, number> = {
  'School': 1,
  'Taluka': 2,
  'District': 4,
  'Kendra': 5,
  'Prakalp': 5,
  'Division': 6,
  'State': 7,
  'National': 8,
  'Intrnational': 9,
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const school_id = form.get('school_id')?.toString() ?? '';
    const current_std = form.get('current_std')?.toString() ?? '';
    const sportsId = form.get('sports_id')?.toString() ?? '';

    // 1. Build student query
    let query = '';
    let params: any[] = [];
    if (current_std === 'user') {
      query = `SELECT student_id,current_std,gender,type_of_students,full_name,gr_no,cluster_id,school_id 
        FROM tbl_students 
        WHERE user_id=? and status='Active' and school_id<>0 and current_std<>0 and (dropout = 'Not' OR dropout = 'Transfer')`;
      params = [school_id];
    } else if (school_id === 'all' && current_std === 'all') {
      query = `SELECT student_id,current_std,gender,type_of_students,full_name,gr_no,cluster_id,school_id 
        FROM tbl_students 
        WHERE status='Active' and school_id<>0 and admited_in_std<>0 and current_std<>0 and type_of_students<>'' and (dropout = 'Not' OR dropout = 'Transfer')`;
    } else if (current_std === 'not') {
      query = `SELECT student_id,current_std,gender,type_of_students,full_name,gr_no,cluster_id 
        FROM tbl_students 
        WHERE school_id=? and status='Active' and school_id<>0 and admited_in_std<>0 and current_std<>0 and type_of_students<>'' and (dropout = 'Not' OR dropout = 'Transfer')`;
      params = [school_id];
    } else {
      query = `SELECT * FROM tbl_students 
        WHERE current_std=? and school_id=? and status='Active' and school_id<>0 and admited_in_std<>0 and current_std<>0 and type_of_students<>'' and (dropout = 'Not' OR dropout = 'Transfer')`;
      params = [current_std, school_id];
    }

    // 2. Get students
    const [students] = await pool.execute(query, params);

    // 3. Get sports info
    const [sportsInfo] = await pool.execute(
      "SELECT * FROM tbl_sports_info_new WHERE status='Active'"
    );

    // 4. Build matching sports info response
    const sportInfoResponse: any[] = [];
    for (const sportInfo of sportsInfo as any[]) {
      const parts = (sportInfo.sports_record || '').split('|');
      if (parts.length >= 2) {
        for (const res of students as any[]) {
          if (res.student_id == parts[1]) {
            sportInfo.gr_no = res.gr_no;
            sportInfo.name = res.full_name;
            sportInfo.cluster_id = res.cluster_id;
            sportInfo.school_id = res.school_id;
            sportInfo.current_std = res.current_std;
            sportInfoResponse.push({ ...sportInfo });
            break;
          }
        }
      }
    }

    // 5. Filter by sportsId
    const filtered: any[] = [];
    for (const sportInfoRes of sportInfoResponse) {
      const parts = (sportInfoRes.sports_record || '').split('|');
      if (parts.length >= 1) {
        const comaParts = parts[0].split(',');
        if (comaParts.includes(sportsId)) {
          filtered.push(sportInfoRes);
        }
      }
    }

    // 6. For each, call external API and determine achievement
    const finalResponse: any[] = [];
    for (const record of filtered) {
      const parts = (record.sports_record || '').split('|');
      if (parts.length >= 2) {
        const dataFromFirstApi = await callFirstApi(parts[1], sportsId);
        if (dataFromFirstApi && Array.isArray(dataFromFirstApi) && dataFromFirstApi.length > 0) {
          if (dataFromFirstApi.length === 1) {
            record.achievement = dataFromFirstApi[0]['levels'] ?? '';
          } else {
            // Build achievement list and hierarchy
            const achievementList: string[] = [];
            const levelOrder: Record<string, number> = {};
            for (const achievement of dataFromFirstApi) {
              achievementList.push(achievement['levels']);
              // Build hierarchy (use fallback if not present)
              if (hierarchy[achievement['levels']] !== undefined) {
                levelOrder[achievement['levels']] = hierarchy[achievement['levels']];
              }
            }
            // Sort by hierarchy
            achievementList.sort((a, b) => (levelOrder[a] || 0) - (levelOrder[b] || 0));
            // The last element is the highest level
            record.achievement = achievementList.length > 0 ? achievementList[achievementList.length - 1] : '';
          }
        } else {
          record.achievement = '';
        }
      } else {
        record.achievement = '';
      }
      finalResponse.push(record);
    }

    return NextResponse.json(finalResponse, { status: 200 });
  } catch (error: any) {
    console.error('Error in sports/student-achievements:', error);
    return NextResponse.json(
      { error: true, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
