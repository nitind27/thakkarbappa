// app/page.tsx

import Supervisortitle from "@/app/[locale]/title/supervisortitle";
import School from "@/components/manage/School";
import Supervisor from "@/components/manage/Supervisor";
import { Padnam, Supervisor as SupervisorType, UserCategory } from "@/components/type";

import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  let Supervisordata: SupervisorType[] = [];
  let UserCategory: UserCategory[] = [];
  let Padname: Padnam[] = [];

  try {
    Supervisordata = await prisma.supervisor.findMany(); // Fetch all clusters
    UserCategory = await prisma.userCategory.findMany();
    Padname = await prisma.padnam.findMany();
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
      <h1 className="card card-body mt-5"><Supervisortitle /></h1>
      <Supervisor initialSupervisorlData={Supervisordata} UserCategory={UserCategory} Padname={Padname} />
    </div>
  );
};

export default Page;