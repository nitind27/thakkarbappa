import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";
import Baneficiaryidwise from "@/components/Schemes/Baneficiaryidwise";
import { SubCategory, TblBeneficiary, YojanaMaster } from "@/components/type";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const page = async ({ params }: any) => {
  let subCategory: SubCategory[] = [];
  let yojnamaster: YojanaMaster[] = [];
  let beneficiary: TblBeneficiary[] = [];
  const { yojnaid } = params;
  const { subcategoryid } = params;

  try {
    subCategory = await prisma.subCategory.findMany();
    yojnamaster = await prisma.yojanaMaster.findMany();
    beneficiary = await prisma.beneficiary.findMany(); // Fetch all clusters
  } catch (error) {
    console.error("Error fetching cluster data:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-xl">Error fetching Data</h1>
      </div>
    );
  }

  // Filter the YojanaMaster based on the given conditions
  const filteredYojnamaster = yojnamaster.filter(
    (d) =>
      d.yojana_year_id == yojnaid && // Match the yojana year ID
      d.category_id === 2 && // Ensure category_id is 2
      d.status !== "Deactive" && // Exclude inactive statuses
      d.sub_category_id == subcategoryid // Match the sub_category_id
  );

  // Get unique subcategories from the filtered YojanaMaster
  const uniqueSubCategories = Array.from(
    new Set(filteredYojnamaster.map((yojna) => yojna.sub_category_id))
  ).map((id) => {
    return subCategory.find((cat) => cat.sub_category_id === id); // Use 'id' to find the correct subcategory
  });

  const breadcrumbs = [

    { label: 'dashboard', href: '/dashboard' },
    { label: 'nbschemes', href: '/dashboard/nbschemes' },
    { label: 'NbSchmescategory', href: `/dashboard/nbschemes/nbschemescategory/${yojnaid}` },
    { label: 'Yojna', href: `/dashboard/nbschemes/nbschemesdata/${yojnaid}/${subcategoryid}` },

  ];

  return (
    <div className="container mx-auto p-4">

      {uniqueSubCategories.length > 0 ? (
        uniqueSubCategories.map((category, index) => {
          // Filter YojnaMaster by current category
          const categoryYojnas = filteredYojnamaster.filter(
            (yojna) => yojna.sub_category_id === category?.sub_category_id
          );

          return (
            <div key={index} className="mb-6">


              <div className="container mt-5 card card-body col-lg-12 mb-5">
                <div className=" d-flex justify-content-between ">

                  <div>

                    <TitleCard breadcrumbs={breadcrumbs} />
                  </div>

                  <h3>


                    {category?.sub_category_name} ({categoryYojnas.length})
                  </h3>

                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryYojnas.map((yojna, idx) => (
                  <div
                    key={yojna.category_id}
                    className="shadow-md rounded-lg p-4 card mb-4 "
                  >
                    <h5 className="d-flex text-[16px] font-semibold cursor-pointer ">

                      <span>

                        <Baneficiaryidwise idx={idx + 1 + ")"} yojnaname={yojna.yojana_name} yojnaid={yojna.yojana_id} />
                      </span>
                      <span
                        className=""
                        style={{
                          backgroundColor: "red",
                          borderRadius: "50%",
                          minWidth: "24px", // Ensures a minimum size
                          height: "auto", // Allows height to adjust based on content
                          padding: "5px 8px", // Adjusts inner spacing
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap", // Prevents text from wrapping
                        }}
                      >
                        {/* {yojna.yojana_id} */}
                        {beneficiary.filter((data) => data.yojana_id == yojna.yojana_id).length}
                      </span>

                    </h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No categories found.</p>
      )}
    </div>
  );
};

export default page;
