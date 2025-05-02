import DashboradMain from '@/components/Dashboard/DashboradMain'
import Schemestable from '@/components/Dashboard/Schemesdata/Schemestable'
import { Bank, Categorys, grampanchayat, SubCategory, talukasdata, Tblbankmaster, TblBeneficiary, TblCaste, TblMembers, TblYojanaType, Villages, YojanaMaster, YojanaYear } from "@/components/type";
import prisma from '@/lib/db';
import React from 'react'
import TitleCard from '../../title/breadcums/Titilecard';

const Page = async () => {
  let subCategory: SubCategory[] = [];
    let YojnaYear: YojanaYear[] = [];
    let Bankdata: Bank[] = [];
    let category: Categorys[] = [];
    let beneficiary: TblBeneficiary[] = [];
    let yojnatype: TblYojanaType[] = [];
    let yojnamaster: YojanaMaster[] = [];
    let talukas: talukasdata[] = [];
    let grampanchayat: grampanchayat[] = [];
    let cast: TblCaste[] = [];
    let Villages: Villages[] = [];
    let membersadd: TblMembers[] = [];
      let Bankmasterdata: Tblbankmaster[] = [];
    try {
        category = await prisma.category.findMany(); // Fetch all clusters
        subCategory = await prisma.subCategory.findMany(); // Fetch all clusters
        YojnaYear = await prisma.yojanaYear.findMany(); // Fetch all clusters
        beneficiary = await prisma.beneficiary.findMany(); // Fetch all clusters
        Bankdata = await prisma.bank.findMany();
        yojnatype = await prisma.yojnatype.findMany();
        yojnamaster = await prisma.yojanaMaster.findMany();
        talukas = await prisma.talukasData.findMany();
        cast = await prisma.tblcaste.findMany();
        Villages = await prisma.villages.findMany(); // Fetch all QR codes
        grampanchayat = await prisma.grampanchayat.findMany();
        membersadd = await prisma.tbl_members.findMany();
        Bankmasterdata = await prisma.tbl_bankmaster.findMany(); // Fetch all clusters
    } catch (error) {
        console.error("Error fetching cluster data:", error);
        return (
            <div>
                <h1>Error fetching Data</h1>
            </div>
        );
    }
  const breadcrumbs = [

    { label: 'Planname', href: '/dashboard' },

  ];
  const yojnayearfilter = YojnaYear.filter((data)=>data.year_status == "Y")
  return (
    <div><div>
      <DashboradMain />
    </div><div>
        <div className="card mt-8 p-3 ">
          <TitleCard breadcrumbs={breadcrumbs} />

        </div>
        <Schemestable initialClusterData={yojnamaster} initialcategoryData={subCategory} YojnaYear={yojnayearfilter} Bankdata={Bankdata} category={category} beneficiary={beneficiary} yojnatype={yojnatype} yojnamaster={yojnamaster} talukas={talukas} grampanchayat={grampanchayat} Villages={Villages} castdata={cast} membersadd={membersadd} Bankmasterdata={Bankmasterdata}/>
      </div>
    </div>
  )
}

export default Page