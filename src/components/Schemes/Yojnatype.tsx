// components/manage/Clusteradd.tsx
"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Bank, Categorys, clusterdata, SubCategory, TblYojanaType, YojanaYear } from "../type";
import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
// import { validatecategoryName } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";

type Props = {
    initialcategoryData: SubCategory[];
    yojnatype: TblYojanaType[];
    Bankdata: Bank[];
    category: Categorys[];
};

const Yojnatype = ({ initialcategoryData, yojnatype, Bankdata, category }: Props) => {
    const t = useTranslations("IndexPage");
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [subcategoryName, setSubCategoryName] = useState("");
    const [yojnatypes, setYojnaType] = useState("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [clusterData, setClusterData] =
        useState<TblYojanaType[]>(yojnatype); // State for cluster data
    const confirm = createConfirmation(ConfirmationDialog);

    const categorydata = category.reduce((acc, year: Categorys) => {
        acc[year.category_id] = year.category_name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);

    const subcategorydata = initialcategoryData.reduce((acc, year: SubCategory) => {
        acc[year.sub_category_id] = year.sub_category_name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);

    const data = clusterData
        .map((subcategory) => ({
            yojana_type_id:subcategory.yojana_type_id,
            category_id: categorydata[subcategory.category_id],
            sub_category_id: subcategorydata[subcategory.sub_category_id],
            yojana_type: subcategory.yojana_type,
            status: subcategory.status,
        }))
        .reverse(); // Reverse the order to show the last added items first

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
            accessorKey: "category_id",
            header: `cat`,
        },
        {
            accessorKey: "sub_category_id",
            header: `subcat`,
        },
        {
            accessorKey: "yojana_type",
            header: `yt`,
        },

        {
            accessorKey: "status",
            header: `${t("Status")}`,
        },


        {
            accessorKey: "actions",
            header: `${t("Action")}`,
            cell: ({ row }: any) => (
                <div style={{ display: "flex", whiteSpace: "nowrap" }}>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(row.original)}
                    >
                        {" "}
                        <KTIcon iconName={"pencil"} className="fs-6" iconType="solid" />
                        {t("edit")}
                    </button>
                    <button
                        className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"
                            } ms-5`}
                        onClick={() =>
                            handleDeactivate(row.original.yojana_type_id, row.original.status)
                        }
                    >
                        <KTIcon iconName={"status"} className="fs-6" iconType="solid" />
                        {row.original.status === "Active"
                            ? `${t("Deactive")}`
                            : `${t("Active")}`}
                    </button>
                </div>
            ),
        },
    ];

    const handleDeactivate = async (category_id: any, currentStatus: any) => {
        const confirmMessage =
            currentStatus === "Active"
                ? "Are you sure you want to deactivate this cluster?"
                : "Are you sure you want to activate this cluster?";
        const confirmed = await confirm({ confirmation: confirmMessage });
        if (confirmed) {
            try {
                const response = await fetch(`/api/yojnatype/delete/${category_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: currentStatus === "Active" ? "Deactive" : "Active",
                    }),
                });

                if (response.ok) {
                    // Update local state without page reload
                    setClusterData((prevData) =>
                        prevData.map((cluster) =>
                            cluster.yojana_type_id === category_id
                                ? {
                                    ...cluster,
                                    status: currentStatus === "Active" ? "Deactive" : "Active",
                                }
                                : cluster
                        )
                    );
                    toast.success(
                        `Cluster ${currentStatus === "Active" ? "deactivated" : "activated"
                        } successfully!`
                    );
                } else {
                    toast.error("Failed to change the cluster status.");
                }
            } catch (error) {
                console.error("Error changing the cluster status:", error);
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // const errorMsg = validatecategoryName(categoryName);
        // if (errorMsg) {
        //   setError(errorMsg);
        //   return;
        // }

        setIsLoading(true); // Start loading

        try {
            const method = updateClusterId ? "PUT" : "POST";
            const url = updateClusterId
                ? `/api/yojnatype/update`
                : `/api/yojnatype/insert`;

            // Prepare the request body
            const requestBody = {
                category_id: categoryName,
                sub_category_id: subcategoryName,
                yojana_type: yojnatypes,



                ...(updateClusterId && { yojana_type_id: updateClusterId }),
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
                            cluster.sub_category_id === updateClusterId
                                ? { ...cluster, sub_category_name: subcategoryName, category_id: parseInt(categoryName) }
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

    const handleEdit = (cluster: any) => {
        setUpdateClusterId(cluster.yojana_type_id); // Set ID for updating
        setCategoryName(cluster.categoryid); // Set current name for editing
        setSubCategoryName(cluster.sub_category_name)

        setYojnaType(cluster.yojanayearid)

        handleShowPrint(); // Open modal for editing
    };

    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setCategoryName("");
        setError("");
        setUpdateClusterId(null); // Reset update ID when closing
    };

    const ad = initialcategoryData
        .filter((category: SubCategory) => String(category.category_id) === categoryName) // Filter to match category_id with categoryName
        .map((category: SubCategory) => ({
            value: category.category_id, // Value for the select option
            label: category.sub_category_name, // Display name for the select option
        }))
    return (
        <div>
            <Table
                data={data}
                columns={columns}
                Button={
                    <Button
                        variant="primary"
                        onClick={handleShowPrint}
                        className="btn btn-sm"
                    >
                        <KTIcon
                            iconName={"plus-circle"}
                            className="fs-3"
                            iconType="solid"
                        />
                        {t("AddCluster")}
                    </Button>
                }
            />
            {ad.length}
            <CustomModal
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                title={updateClusterId ? `${t("updatepage")}` : `${t("insertpage")}`}
                formData={{
                    fields: [
                        {
                            label: `${t("selectyear")}`,
                            value: categoryName,
                            onChange: (e) => setCategoryName(e.target.value),
                            type: "select",
                            options: category.map((category: Categorys) => ({
                                value: category.category_id,
                                label: category.category_name,
                            })),
                            placeholder: `${t("selectyear")}`, // Optional placeholder for select input
                        },
                        {
                            label: `${t("selectyear")}`, // Label for the select input
                            value: subcategoryName, // Use state for the selected subcategory
                            onChange: (e) => setSubCategoryName(e.target.value), // Function to update selected subcategory
                            type: "select", // Type of input
                            options: initialcategoryData
                                .filter((category: SubCategory) => String(category.category_id) === categoryName) // Filter based on categoryName
                                .map((category: SubCategory) => ({
                                    value: category.sub_category_id, // Assuming sub_category_id is the unique identifier for subcategories
                                    label: category.sub_category_name, // Display name for the select option
                                })),
                            placeholder: `${t("selectyear")}`, // Optional placeholder for select input
                        },
                        {
                            label: `${t("entercategoryName")}`,
                            value: yojnatypes,
                            type: "text",
                            placeholder: `${t("entercategoryName")}`,

                            onChange: (e) => setYojnaType(e.target.value),
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
    );
};

export default Yojnatype;
