// app/page.tsx

import OpenBalancetitle from "@/app/[locale]/title/OpenBalancetitle";
import Openingbalanceadd from "@/components/manage/Openingbalanceadd";
import { clusterdata, OpeningBalance, YojanaYear } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let OpeningBalance: OpeningBalance[] = [];
  let YojnaYear: YojanaYear[] = [];

  try {
    OpeningBalance = await prisma.openingBalance.findMany(); // Fetch all clusters
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
      <h1 className="card card-body mt-5">
        <OpenBalancetitle />
      </h1>
      <Openingbalanceadd
        initialOpenBalanceData={OpeningBalance}
        YojnaYear={YojnaYear}
      />
    </div>
  );
};

export default Page;
