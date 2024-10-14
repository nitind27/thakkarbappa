
// import { Bank as BankType } from "@/components/type";

import BankData from "@/components/manage/Bank";
import { Bank } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let Bankdata: Bank[] = [];

  try {
    Bankdata = await prisma.bank.findMany(); // Fetch all clusters
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
      <BankData
        initialBankData={Bankdata}
        Villages={[]}
        talukas={[]}
        grampanchayat={[]}
      />
    </div>
  );
};

export default Page;
