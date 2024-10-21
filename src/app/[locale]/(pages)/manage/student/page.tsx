// app/page.tsx


import { clusterdata, Schooldata } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let schooldata: Schooldata[] = [];

  try {
    schooldata = await prisma.school.findMany(); // Fetch all clusters
  } catch (error) {
    console.error("Error fetching cluster data:", error);
    return (
      <div>
        <h1>Error fetching Data</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="card card-body mt-5">student Detail</h1>
      {/* <School initialschoolData={schooldata} /> */}
    </div>
  );
};

export default Page;