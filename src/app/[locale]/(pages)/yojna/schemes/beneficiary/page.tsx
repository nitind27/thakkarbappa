// app/page.tsx
import Cluster from "@/app/[locale]/title/cluster"; import Loader from "@/common/Loader ";
;
import Clusteradd from "@/components/manage/Clusteradd";
import Beneficiary from "@/components/Schemes/Beneficiary";
import Category from "@/components/Schemes/Category";
import SubCategorys from "@/components/Schemes/SubCategorys";
import { Bank, Categorys, grampanchayat, SubCategory, talukasdata, TblBeneficiary, TblYojanaType, Villages, YojanaYear } from "@/components/type";
import prisma from "@/lib/db";
import { YojanaMaster } from "@prisma/client";
import React from "react";

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
    let Villages: Villages[] = [];
    try {
        category = await prisma.category.findMany(); // Fetch all clusters
        subCategory = await prisma.subCategory.findMany(); // Fetch all clusters
        YojnaYear = await prisma.yojanaYear.findMany(); // Fetch all clusters
        beneficiary = await prisma.beneficiary.findMany(); // Fetch all clusters
        Bankdata = await prisma.bank.findMany();
        yojnatype = await prisma.yojnatype.findMany();
        yojnamaster = await prisma.yojanaMaster.findMany();
        talukas = await prisma.talukasData.findMany();

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
    return (
        <div>
            <h1 className="card card-body mt-5">
                <Cluster />
            </h1>

            <Beneficiary initialcategoryData={subCategory} YojnaYear={YojnaYear} Bankdata={Bankdata} category={category} beneficiary={beneficiary} yojnatype={yojnatype} yojnamaster={yojnamaster} talukas={talukas} grampanchayat={grampanchayat} Villages={Villages} />
        </div>
    );
};

export default Page;
