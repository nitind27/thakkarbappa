import { SubCategory, YojanaMaster } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const page = async ({ params }: any) => {
  let subCategory: SubCategory[] = [];
  let yojnamaster: YojanaMaster[] = [];
  const { yojnaid } = params;
  const { subcategoryid } = params;

  try {
    subCategory = await prisma.subCategory.findMany();
    yojnamaster = await prisma.yojanaMaster.findMany();
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
              <h2 className=" font-bold card p-5 mb-5">
                {category?.sub_category_name} ({categoryYojnas.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryYojnas.map((yojna, idx) => (
                  <div
                    key={yojna.category_id}
                    className="shadow-md rounded-lg p-4 card mb-4 "
                  >
                    <h5 className="text-[16px] font-semibold ">
                      {idx + 1 + ")"}. {yojna.yojana_name}{" "}
                      <span
                        className=""
                        style={{
                          backgroundColor: "red",
                          borderRadius: "50%",
                          padding: "2px",
                          marginTop: "10px",
                          color: "white",
                        }}
                      >
                        10
                      </span>
                      {/* Sequential numbering */}
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