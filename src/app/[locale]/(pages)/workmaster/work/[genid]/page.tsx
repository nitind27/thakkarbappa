

import Loader from "@/common/Loader ";

import { Bank, Categorys, Facility, grampanchayat, Representative, SubCategory, talukasdata, TblBeneficiary, Villages, WorkMaster, WorkMasterDemo, YojanaYear } from "@/components/type";
import Workmaster from "@/components/Workmaster/Workmaster";

import prisma from "@/lib/db";
import React from "react";

import Generateform from "@/components/Workmaster/Generateform";
import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";

const Page = async ({ params }: any) => {
    let subCategory: SubCategory[] = [];
    let YojnaYear: YojanaYear[] = [];
    let Bankdata: Bank[] = [];
    let category: Categorys[] = [];
    let Workmasters: WorkMasterDemo[] = [];
    let reprenstive: Representative[] = [];
    let talukas: talukasdata[] = [];
    let grampanchayat: grampanchayat[] = [];
    let Villages: Villages[] = [];
    let facilities: Facility[] = [];

    const { genid } = params;

    try {
        category = await prisma.category.findMany(); // Fetch all clusters
        subCategory = await prisma.subCategory.findMany(); // Fetch all clusters
        YojnaYear = await prisma.yojanaYear.findMany(); // Fetch all clusters
        Bankdata = await prisma.bank.findMany();
        Workmasters = await prisma.workMasterDemo.findMany();
        reprenstive = await prisma.representative.findMany();
        talukas = await prisma.talukasData.findMany();
        facilities = await prisma.facility.findMany();
        Villages = await prisma.villages.findMany(); // Fetch all QR codes
        grampanchayat = await prisma.grampanchayat.findMany();

    } catch (error) {
        console.error("Error fetching cluster data:", error);
        return (
            <div>
                <h1>Error fetching Data</h1>
            </div>
        );
    }
    if (!subCategory) {
        return (
            <>
                <Loader />
            </>
        )
    }
    const breadcrumbs = [

        { label: 'dashboard', href: '/dashboard' },
        { label: 'workmaster', href: `/workmaster` },
        { label: 'workmaster', href: `/workmaster/work/${genid}` },
    ];
    const workgen = Workmasters.filter((gen) => gen.type !== "workgen" && gen.generatednumber == genid)
    const workdata = Workmasters.filter((gen) => gen.generatednumber == genid)
    return (
        <div>

            <h1 className="card card-body mt-5">
                <TitleCard breadcrumbs={breadcrumbs} />
            </h1>


            <Workmaster initialcategoryData={subCategory} YojnaYear={YojnaYear} Bankdata={Bankdata} category={category} Workmasters={workgen} reprenstive={reprenstive} talukas={talukas} Villages={Villages} grampanchayat={grampanchayat} facilities={facilities} Workmastersdata={workdata} genid={genid} />
        </div>
    );
};

export default Page;
