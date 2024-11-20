import Disbursementfunds from '@/components/Disbursementfunds/Disbursementfunds'
import { NidhiVitaran, WorkMaster } from '@/components/type';
import prisma from '@/lib/db';
import React from 'react'
import TitleCard from '../../title/breadcums/Titilecard';
import Disbursementfundstitle from '../../title/disbursementfundstitle';

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
  const breadcrumbs = [

    { label: 'dashboard', href: '/dashboard' },
    { label: 'disbursementfunds', href: '/disbursementfunds' },
  ];
  return (
    <div>
 
      <h1 className="card card-body mt-5">
      <TitleCard breadcrumbs={breadcrumbs} />
      </h1>
      <div><Disbursementfunds initialdisbursementfunds={disbursementfunds} workmaster={workmaster} /></div>
    </div>
  )
}

export default page