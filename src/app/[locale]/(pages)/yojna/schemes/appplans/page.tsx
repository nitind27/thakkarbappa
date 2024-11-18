// app/page.tsx
import Cluster from "@/app/[locale]/title/cluster";import Planapptitle from "@/app/[locale]/title/Planapptitle";
 import Loader from "@/common/Loader ";
;
import Clusteradd from "@/components/manage/Clusteradd";
import Appplans from "@/components/Schemes/Appplans";
import Category from "@/components/Schemes/Category";
import Plans from "@/components/Schemes/Plans";
import SubCategorys from "@/components/Schemes/SubCategorys";
import { Bank, Categorys, SubCategory, TblYojanaType, YojanaMaster, YojanaMasterApp, YojanaYear } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
    let subCategory: SubCategory[] = [];
    let YojnaYear: YojanaYear[] = [];
    let yojnatype: TblYojanaType[] = [];
    let Bankdata: Bank[] = [];
    let category: Categorys[] = [];
    let yojnamasterapp: YojanaMasterApp[] = [];


    try {
        category = await prisma.category.findMany(); // Fetch all clusters
        subCategory = await prisma.subCategory.findMany(); // Fetch all clusters
        YojnaYear = await prisma.yojanaYear.findMany(); // Fetch all clusters
        yojnatype = await prisma.yojnatype.findMany(); // Fetch all clusters
        yojnamasterapp = await prisma.yojanaMasterApp.findMany(); // Fetch all clusters
        Bankdata = await prisma.bank.findMany();

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
                <Planapptitle />
            </h1>

            <Appplans initialcategoryData={subCategory} YojnaYear={YojnaYear} Bankdata={Bankdata} category={category} yojnatype={yojnatype} yojnamasterapp={yojnamasterapp} />
        </div>
    );
};

export default Page;
