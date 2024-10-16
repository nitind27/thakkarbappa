import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Grampanchayat from "@/components/manage/Grampanchayat";
import { grampanchayat, talukasdata } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  let grampanchayat: grampanchayat[] = [];
  let talukas: talukasdata[] = []; // To store the fetched talukasData

  let loading = true; // Initialize loading state

  try {
    grampanchayat = await prisma.grampanchayat.findMany();
    talukas = await prisma.talukasData.findMany(); // Fetch talukas data here

    loading = false; // Set loading to false after data fetch
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error fetching Data</h1>
      </div>
    );
  }

  // Pass both grampanchayat and talukas to the Grampanchayat component
  return (
    <div>
      
      <h1 className="card card-body mt-5">Grampanchayat Management</h1>
      <Grampanchayat grampanchayat={grampanchayat} talukas={talukas} />
    </div>
  );
};

export default page;
