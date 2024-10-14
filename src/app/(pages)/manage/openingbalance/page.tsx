// app/page.tsx

import Openingbalanceadd from "@/components/manage/Openingbalanceadd";
import { clusterdata, OpeningBalance } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let OpeningBalance: OpeningBalance[] = [];

  try {
    OpeningBalance = await prisma.openingBalance.findMany(); // Fetch all clusters
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
      <h1 className="card card-body mt-5">Cluster Detail</h1>
      <Openingbalanceadd initialOpenBalanceData={OpeningBalance} />
    </div>
  );
};

export default Page;