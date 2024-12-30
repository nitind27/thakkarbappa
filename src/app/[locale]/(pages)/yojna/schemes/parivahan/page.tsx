import SubCategorytitle from "@/app/[locale]/title/Subcategory";
import Loader from "@/common/Loader ";
import Parivahan from "@/components/Schemes/Parivahan";
import {
  Bank,
  Categorys,
  SubCategory,
  TblBeneficiary,
  tblparivahan,
  TblParivahanBeneficiary,
  TblYojanaType,
  YojanaMaster,
  YojanaYear,
} from "@/components/type";
import prisma from "@/lib/db";

import React from "react";

const Page = async () => {
  let subCategory: SubCategory[] = [];
  let YojnaYear: YojanaYear[] = [];
  let Bankdata: Bank[] = [];
  let yojnatype: TblYojanaType[] = [];
  let yojanaMaster: YojanaMaster[] = [];
  let category: Categorys[] = [];
  let Parivahanbeneficiarys: TblParivahanBeneficiary[] = [];
  let Parivahantbl: tblparivahan[] = [];
  let Beneficiary: TblBeneficiary[] = [];

  try {
    category = await prisma.category.findMany(); // Fetch all clusters
    subCategory = await prisma.subCategory.findMany(); // Fetch all clusters
    yojnatype = await prisma.yojnatype.findMany(); // Fetch all clusters
    YojnaYear = await prisma.yojanaYear.findMany(); // Fetch all clusters
    yojanaMaster = await prisma.yojanaMaster.findMany(); // Fetch all clusters
    Bankdata = await prisma.bank.findMany();
    Beneficiary = await prisma.beneficiary.findMany();
    Parivahanbeneficiarys = await prisma.parivahanbeneficiary.findMany();
    Parivahantbl = await prisma.tblparivahan.findMany();
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
    );
  }
  return (
    <div>
      <h1 className="card card-body mt-5">
        <SubCategorytitle />
      </h1>

      <Parivahan
        initialcategoryData={subCategory}
        YojnaYear={YojnaYear}
        Bankdata={Bankdata}
        yojnatype={yojnatype}
        yojanaMaster={yojanaMaster}
        category={category}
        Parivahanbeneficiarys={Parivahanbeneficiarys}
        Parivahantbl={Parivahantbl}
        Beneficiary={Beneficiary}
      />
    </div>
  );
};

export default Page;
