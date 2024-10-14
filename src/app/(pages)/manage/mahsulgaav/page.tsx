import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Grampanchayat from "@/components/manage/Grampanchayat";
import Mahsulgaav from "@/components/manage/Mahsulgaav";
import TalukaData from "@/components/manage/TalukaData";
import { grampanchayat, talukasdata, Villages } from "@/components/type";

import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  let Villages: Villages[] = [];
  let talukas: talukasdata[] = []; // To store the fetched talukasData
  let grampanchayat: grampanchayat[] = [];
  let loading = true; // Initialize loading state

  try {
    grampanchayat = await prisma.grampanchayat.findMany();
    Villages = await prisma.villages.findMany(); // Fetch all QR codes
    talukas = await prisma.talukasData.findMany(); // Fetch talukas data here

    loading = false; // Set loading to false after data fetch
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return (
      <div>
        <h1>Error fetching Data</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center">Cluster Management</h1>
      <Mahsulgaav
        Villages={Villages}
        talukas={talukas}
        grampanchayat={grampanchayat}
      />
    </div>
  );
};

export default page;
