import Disbursementfunds from '@/components/Disbursementfunds/Disbursementfunds'
import { NidhiVitaran, WorkMaster } from '@/components/type';
import prisma from '@/lib/db';
import React from 'react'

const page = async () => {

  let disbursementfunds: NidhiVitaran[] = [];
  let workmaster: WorkMaster[] = [];

  try {
    disbursementfunds = await prisma.nidhiVitaran.findMany(); // Fetch all clusters
    workmaster = await prisma.workMaster.findMany(); // Fetch all clusters
  } catch (error) {
    console.error("Error fetching disbursementfunds data:", error);
    return (
      <div>
        <h1>Error fetching Data</h1>
      </div>
    );
  }

  return (
    <div><Disbursementfunds initialdisbursementfunds={disbursementfunds} workmaster={workmaster}/></div>
  )
}

export default page