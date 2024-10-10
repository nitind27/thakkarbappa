import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Clusteradd from "@/components/manage/Clusteradd";
import { clusterdata } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  let clusterdata: clusterdata[] = [];

  let loading = true; // Initialize loading state

  try {
    clusterdata = await prisma.clusterData.findMany(); // Fetch all QR codes

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
      <h1 className="card card-body mt-5">Cluster Detail</h1>
      <Clusteradd clusterdata={clusterdata} />

    </div>
  );
};

export default page;
