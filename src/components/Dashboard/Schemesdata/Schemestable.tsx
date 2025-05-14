// components/manage/Clusteradd.tsx
"use client";
import React, { useState } from "react";

import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
import { validateClusterName } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import { Bank, Categorys, grampanchayat, SubCategory, talukasdata, Tblbankmaster, TblBeneficiary, TblCaste, TblMembers, TblYojanaType, Villages, YojanaMaster, YojanaYear } from "@/components/type";

import SchemesTable from "@/components/table/SchemesTable";
import Schemesbeneficry from "./Schemesbeneficry";
import TitleCard from "@/app/[locale]/title/breadcums/Titilecard";

type Props = {
    initialClusterData: YojanaMaster[];
    initialcategoryData: SubCategory[];
    YojnaYear: YojanaYear[];
    Bankdata: Bank[];
    category: Categorys[];
    beneficiary: TblBeneficiary[];
    yojnatype: TblYojanaType[];
    yojnamaster: YojanaMaster[];
    talukas: talukasdata[];
    grampanchayat: grampanchayat[];
    Villages: Villages[];
    castdata: TblCaste[];
    membersadd: TblMembers[];
    Bankmasterdata: Tblbankmaster[];
};

const Schemestable = ({ initialClusterData, initialcategoryData, YojnaYear, Bankdata, category, beneficiary, yojnatype, yojnamaster, talukas, grampanchayat, Villages, castdata, membersadd, Bankmasterdata }: Props) => {
    const t = useTranslations("IndexPage");
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const [error, setError] = useState<string>("");
    const [categoryName, setCategoryName] = useState("");
    const [subcategoryName, setSubCategoryName] = useState("");
    const [yojnayear, setyojnayear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [clusterData, setClusterData] =
        useState<YojanaMaster[]>(initialClusterData);

    const isAllEmpty = !categoryName && !subcategoryName && !yojnayear;

    const data = clusterData
        .filter((datas) => {
            if (isAllEmpty) return true; // Show all data if all filters are empty

            // Otherwise, filter as per selected values (if provided)
            return (
                (!categoryName || datas.category_id == Number(categoryName)) &&
                (!subcategoryName || datas.sub_category_id == Number(subcategoryName)) &&
                (!yojnayear || datas.yojana_year_id == Number(yojnayear))
            );
        })
        .map((cluster) => ({
            yojana_id: cluster.yojana_id,
            category_id: cluster.category_id,
            sub_category_id: cluster.sub_category_id,
            yojana_name: cluster.yojana_name,
            date_ins: cluster.date_ins,
            uddesh_swarup: cluster.uddesh_swarup,
            patrata: cluster.patrata,
            sampark: cluster.sampark,
            is_delete: cluster.is_delete,
            gat: cluster.gat,
            yojana_year_id: cluster.yojana_year_id,
            yojana_type: cluster.yojana_type,
            amount: cluster.amount,
            status: cluster.status,
        }))
        .reverse();
    const columns = [
        {
            accessorKey: "serial_number", // Use a new accessor for the serial number
            header: `${t("Srno")}`, // Header for the serial number
            cell: ({ row }: any) => (
                <div>
                    {row.index + 1} {/* Display the index + 1 for serial number */}
                </div>
            ),
        },

        {
            accessorKey: "yojana_name",
            header: `Schemes Name`,
        },


        {
            accessorKey: "actions",
            header: `${t("Action")}`,
            cell: ({ row }: any) => (
                <div style={{ display: "flex", whiteSpace: "nowrap" }} className="btn btn-sm btn-primary">

                    <Schemesbeneficry initialcategoryData={initialcategoryData} YojnaYear={YojnaYear} Bankdata={Bankdata} category={category} beneficiary={beneficiary} yojnatype={yojnatype} yojnamaster={yojnamaster} talukas={talukas} grampanchayat={grampanchayat} Villages={Villages} castdata={castdata} membersadd={membersadd} Bankmasterdata={Bankmasterdata} yojnaiddata={row.original} />


                </div>
            ),
        },
    ];


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setIsLoading(true); // Start loading

        try {
            const method = updateClusterId ? "PUT" : "POST";
            const url = updateClusterId
                ? `/api/clustersapi/update/updateCluster`
                : `/api/clustersapi/insert/clusters`;

            // Prepare the request body
            const requestBody = {
                cluster_name: clusterName,
                ...(updateClusterId && { cluster_id: updateClusterId }),
            };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                if (updateClusterId) {
                    setClusterData((prevData) =>
                        prevData.map((cluster) =>
                            cluster.yojana_id === updateClusterId
                                ? { ...cluster, cluster_name: clusterName }
                                : cluster
                        )
                    );
                    toast.success("Cluster updated successfully!");
                } else {
                    const createdData = await response.json();
                    setClusterData((prevData) => [...prevData, createdData]);
                    toast.success("Cluster inserted successfully!");
                }

                handleClosePrint();
            } else {
                toast.error(
                    `Failed to ${updateClusterId ? "update" : "insert"} cluster.`
                );
            }
        } catch (error) {
            console.error("Error during operation:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false); // End loading
        }
    };



    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setClusterName("");
        setError("");
        setUpdateClusterId(null); // Reset update ID when closing
    };

    const supervisorName = sessionStorage.getItem("supervisorName");

    const breadcrumbs = [

        { label: 'Planname', href: '/dashboard' },

    ];
    const filteredSubcategories = initialcategoryData.filter(
        (subcat) => String(subcat.category_id) == categoryName
    );
    return (
        <>


            {supervisorName == "Desk Clerk" &&
                <div>

                    <div className="card mt-8 p-3 ">
                        <TitleCard breadcrumbs={breadcrumbs} />

                    </div>

                    <SchemesTable
                        data={data}
                        columns={columns}
                        filteroptions={
                            <>
                                <div className="d-flex gap-5">

                                    <span>

                                        <select
                                            value={categoryName}
                                            className="form-select"
                                            onChange={(e) => {
                                                setCategoryName(e.target.value);
                                                setSubCategoryName(""); // Reset subcategory when category changes
                                            }}
                                        >
                                            <option value="">{t("category")}</option>
                                            {category.map((cat) => (
                                                <option key={cat.category_id} value={cat.category_id}>
                                                    {cat.category_name}
                                                </option>
                                            ))}
                                        </select>
                                    </span>


                                    <span>

                                        <select
                                            value={subcategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                            disabled={!categoryName} // Disable until category is selected
                                            className="form-select"
                                        >
                                            <option value="">{t("subcategory")}</option>
                                            {filteredSubcategories.map((subcat) => (
                                                <option key={subcat.sub_category_id} value={subcat.sub_category_id}>
                                                    {subcat.sub_category_name}
                                                </option>
                                            ))}
                                        </select>
                                    </span>
                                    <span>

                                        <select
                                            value={yojnayear}
                                            onChange={(e) => setyojnayear(e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="">{t("yojna")}</option>
                                            {YojnaYear.map((subcat) => (
                                                <option key={subcat.yojana_year_id} value={subcat.yojana_year_id}>
                                                    {subcat.yojana_year}
                                                </option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                            </>}
                        Button={[]
                        }
                    />

                    <CustomModal
                        show={showPrintModal}
                        handleClose={handleClosePrint}
                        handleSubmit={handleSubmit}
                        title={updateClusterId ? `${t("updatepage")}` : `${t("insertpage")}`}
                        formData={{
                            fields: [
                                {
                                    label: `${t("enterclustername")}`,
                                    value: clusterName,
                                    type: "text",
                                    placeholder: `${t("enterclustername")}`,
                                    required: true,
                                    onChange: (e: any) => setClusterName(e.target.value),
                                },
                            ],
                            error,
                        }}
                        submitButtonLabel={
                            updateClusterId
                                ? isLoading
                                    ? "Submitting..."
                                    : t("editsubmit")
                                : isLoading
                                    ? "Submitting..."
                                    : t("submit")
                        }
                        disabledButton={isLoading}
                    />
                </div>
            }
        </>
    );
};

export default Schemestable;
