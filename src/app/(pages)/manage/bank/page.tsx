
// import { Bank as BankType } from "@/components/type";

import BankData from "@/components/manage/Bank";
import { Bank, YojanaYear } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let Bankdata: Bank[] = [];
  let YojnaYear :YojanaYear[] =[];

  try {
    Bankdata = await prisma.bank.findMany(); // Fetch all clusters
    YojnaYear = await prisma.yojanaYear.findMany(); // Fetch all clusters
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
      <h1 className="card card-body mt-5">Bank Detail</h1>
      <BankData
        initialBankData={Bankdata}
        YojnaYear={YojnaYear}
        Villages={[]}
        talukas={[]}
        grampanchayat={[]}
      />
    </div>
  );
};

export default Page;
