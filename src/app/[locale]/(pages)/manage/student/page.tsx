// app/page.tsx

import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";
import Schooltitle from "@/app/[locale]/title/Studenttitle";
import Student from "@/components/manage/Student";
import { Schooldata, Standarddata, StudentData } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let studentdata: StudentData[] = [];
  let schooldata: Schooldata[] = [];
  let standarddata: Standarddata[] = [];
  try {
    schooldata = await prisma.school.findMany(); // Fetch all school
    studentdata = await prisma.student.findMany(); // Fetch all student
    standarddata = await prisma.standard.findMany(); // Fetch all standard
  } catch (error) {
    console.error("Error fetching cluster data:", error);
    return (
      <div>
        <h1>Error fetching Data</h1>
      </div>
    );
  }
  const breadcrumbs = [

    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Student', href: '/manage/student' },
  ];
  return (
    <div>
      <div className="mt-5">
        <TitleCard breadcrumbs={breadcrumbs} />
      </div>
      <h1 className="card card-body"><Schooltitle /></h1>
      <Student
        initialstudentData={studentdata}
        schooldata={schooldata}
        standarddata={standarddata}
      />
    </div>
  );
};

export default Page;
