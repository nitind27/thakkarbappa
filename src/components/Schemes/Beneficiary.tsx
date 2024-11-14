// components/manage/Clusteradd.tsx
"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Bank, Categorys, clusterdata, grampanchayat, SubCategory, talukasdata, TblBeneficiary, TblYojanaType, Villages, YojanaMaster, YojanaYear } from "../type";
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
    YojnaYear: YojanaYear[];
    Bankdata: Bank[];
    category: Categorys[];
    beneficiary: TblBeneficiary[];
    yojnatype: TblYojanaType[];
    yojnamaster: YojanaMaster[];
    talukas: talukasdata[];
    grampanchayat: grampanchayat[];
    Villages: Villages[];
};

const Beneficiary = ({ initialcategoryData, YojnaYear, Bankdata, category, beneficiary, yojnatype, yojnamaster, talukas, grampanchayat, Villages }: Props) => {
    const t = useTranslations("IndexPage");
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [subcategoryName, setSubCategoryName] = useState("");
    const [yojnayear, setYojnaYear] = useState("");
    const [yojnatyp, setYojnatype] = useState("");
    const [yojnaname, setYojnaName] = useState("");
    const [dist, setDist] = useState("");
    const [town, setTown] = useState("");
    const [mahasulgaav, setMahsulgaav] = useState("");
    const [bankname, setBankname] = useState("");
    const [ifccode, setIFCcode] = useState("");
    const [accountno, setAccountno] = useState("");
    const [amount, setAmount] = useState("");

    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [clusterData, setClusterData] =
        useState<TblBeneficiary[]>(beneficiary); // State for cluster data
    const confirm = createConfirmation(ConfirmationDialog);
    const yojna_year = YojnaYear.reduce((acc, year: YojanaYear) => {
        acc[year.yojana_year_id] = year.yojana_year; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const bankdata = Bankdata.reduce((acc, year: Bank) => {
        acc[year.id] = year.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const categorydata = category.reduce((acc, year: Categorys) => {
        acc[year.category_id] = year.category_name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const subcat = initialcategoryData.reduce((acc, subcat: SubCategory) => {
        acc[subcat.sub_category_id] = subcat.sub_category_name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);

    const yojnatypes = yojnatype.reduce((acc, year: TblYojanaType) => {
        acc[year.yojana_type_id] = year.yojana_type; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const yojnamastername = yojnamaster.reduce((acc, year: YojanaMaster) => {
        acc[year.yojana_id] = year.yojana_name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);

    const talukaMap = talukas.reduce((acc, taluka: any) => {
        acc[taluka.id] = taluka.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const gpmap = grampanchayat.reduce((acc, gp: any) => {
        acc[gp.id] = gp.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const village = Villages.reduce((acc, gp: Villages) => {
        acc[gp.id] = gp.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const data = clusterData
        .map((beneficiary) => ({
            beneficiary_id: beneficiary.beneficiary_id,
            category_id: categorydata[beneficiary.category_id],
            sub_category_id: subcat[beneficiary.sub_category_id],
            yojana_year_id: yojna_year[beneficiary.yojana_year_id],
            yojana_type: yojnatypes[beneficiary.yojana_type as any],
            yojana_id: yojnamastername[beneficiary.yojana_id],
            taluka_id: talukaMap[beneficiary.taluka_id],
            gp_id: gpmap[beneficiary.gp_id],
            village_id: village[beneficiary.village_id],
            surname: beneficiary.surname,
            firstname: beneficiary.firstname,
            middlename: beneficiary.middlename,
            fullname: beneficiary.fullname,
            gat_name: beneficiary.gat_name,
            gat_certificate: beneficiary.gat_certificate,
            member: beneficiary.member,
            caste_id: beneficiary.caste_id,
            beneficiary_type: beneficiary.beneficiary_type,
            rashion_no: beneficiary.rashion_no,
            aadhar: beneficiary.aadhar,
            mobile: beneficiary.mobile,
            bank_name: beneficiary.bank_name,
            ifsc: beneficiary.ifsc,
            ac_no: beneficiary.ac_no,
            tot_finance: beneficiary.tot_finance,
            amount_paid: beneficiary.amount_paid,
            fourty: beneficiary.fourty,
            sixty: beneficiary.sixty,
            hundred: beneficiary.hundred,
            status: beneficiary.status,
            date_ins: beneficiary.date_ins,
            date_update: beneficiary.date_update,
            organization: beneficiary.organization,
            work_order_date: beneficiary.work_order_date,
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
            header: "Categoryb ID",
        },
        {
            accessorKey: "sub_category_id",
            header: "Sub Category ID",
        },
        {
            accessorKey: "yojana_year_id",
            header: "Yojana Year ID",
        },
        {
            accessorKey: "yojana_type",
            header: "Yojana Type",
        },
        {
            accessorKey: "yojana_id",
            header: "Yojana ID",
        },
        {
            accessorKey: "taluka_id",
            header: "Taluka ID",
        },
        {
            accessorKey: "gp_id",
            header: "GP ID",
        },
        {
            accessorKey: "village_id",
            header: "Village ID",
        },
        {
            accessorKey: "surname",
            header: "Surname",
        },
        {
            accessorKey: "firstname",
            header: "First Name",
        },
        {
            accessorKey: "middlename",
            header: "Middle Name",
        },
        {
            accessorKey: "fullname",
            header: "Full Name",
        },
        {
            accessorKey: "gat_name",
            header: "Gat Name",
        },
        {
            accessorKey: "gat_certificate",
            header: "Gat Certificate",
        },
        {
            accessorKey: "member",
            header: "Member Status",
        },
        {
            accessorKey: "caste_id",
            header: "Caste ID",
        },
        {
            accessorKey: "beneficiary_type",
            header: "Beneficiary Type",
        },
        {
            accessorKey: "rashion_no",
            header: "Ration No.",
        },
        {
            accessorKey: "aadhar",
            header: "Aadhar No.",
        },
        {
            accessorKey: "mobile",
            header: "Mobile No.",
        },
        {
            accessorKey: "bank_name",
            header: "Bank Name",
        },
        {
            accessorKey: "ifsc",
            header: "IFSC Code",
        },
        {
            accessorKey: "ac_no",
            header: "Account No.",
        },
        {
            accessorKey: "tot_finance",
            header: "Total Finance Allocated",
        },
        {
            accessorKey: "amount_paid",
            header: "Amount Paid",
        },
        {
            accessorKey: "fourty", // Assuming this is a status indicator
            header: "% Eligible (40)",
        },
        {
            accessorKey: "sixty", // Assuming this is a status indicator
            header: "% Eligible (60)",
        },
        {
            accessorKey: "hundred", // Assuming this is a status indicator
            header: "% Eligible (100)",
        },
        {
            accessorKey: "status", // Current status of the beneficiary
            header: "Status",
        },
        {
            accessorKey: "date_ins", // Date of insertion
            header: "Date of Insertion"
        },
        {
            accessorKey: "date_update", // Date of last update
            header: "Date of Update"
        },
        {
            accessorKey: "organization", // Organization managing the scheme
            header: "Organization"
        },
        {
            accessorKey: "work_order_date", // Date related to work orders issued
            header: "Work Order Date"
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
                            handleDeactivate(row.original.sub_category_id, row.original.status)
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
                const response = await fetch(`/api/subcategory/delete/${category_id}`, {
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
                            cluster.sub_category_id === category_id
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
                ? `/api/subcategory/update`
                : `/api/subcategory/insert`;

            // Prepare the request body
            const requestBody = {
                category_id: categoryName,
                sub_category_name: subcategoryName,
                yojana_year_id: yojnayear,
                bank_id: bankname,
                amount: amount,


                ...(updateClusterId && { sub_category_id: updateClusterId }),
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
                                ? { ...cluster, sub_category_name: subcategoryName, category_id: parseInt(categoryName), bank_id: parseInt(bankname), amount: amount as any, yojana_year_id: parseInt(yojnayear) }
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
        setUpdateClusterId(cluster.sub_category_id); // Set ID for updating
        setCategoryName(cluster.categoryid); // Set current name for editing
        setSubCategoryName(cluster.sub_category_name)
        setAmount(cluster.amount)
        setYojnaYear(cluster.yojanayearid)
        setBankname(cluster.bankid)
        handleShowPrint(); // Open modal for editing
    };

    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setCategoryName("");
        setError("");
        setUpdateClusterId(null); // Reset update ID when closing
    };

    const formFields = [
        {
            label: `categoryName`,
            value: categoryName,
            onChange: (e: any) => setCategoryName(e.target.value),
            type: "select",
            options: category.map((category: Categorys) => ({
                value: category.category_id,
                label: category.category_name,
            })),
            placeholder: `categoryName`, // Optional placeholder for select input
        },
        {
            label: `subcat`, // Label for the select input
            value: subcategoryName, // Use state for the selected subcategory
            onChange: (e: any) => setSubCategoryName(e.target.value), // Function to update selected subcategory
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
            label: `year}`,
            value: yojnayear,
            onChange: (e: any) => setYojnaYear(e.target.value),
            type: "select",
            options: YojnaYear.map((year: YojanaYear) => ({
                value: year.yojana_year_id,
                label: year.yojana_year,
            })),
            placeholder: `${t("selectyear")}`, // Optional placeholder for select input
        },
        {
            label: `typeyojna`,
            value: yojnatyp,
            onChange: (e: any) => setYojnatype(e.target.value),
            type: "select",
            options: yojnatype
                .filter((type) =>
                    String(type.sub_category_id) === subcategoryName &&
                    String(type.category_id) === categoryName
                )
                .map((yojna) => ({
                    value: yojna.yojana_type_id,
                    label: yojna.yojana_type,
                })),
            placeholder: `${t("selectyear")}`, // Optional placeholder for select input
        },
        {
            label: `yojnanname`,
            value: yojnaname,
            onChange: (e: any) => setYojnaName(e.target.value),
            type: "select",
            options: yojnatype
                .filter((type) =>
                    String(type.sub_category_id) === subcategoryName &&
                    String(type.category_id) === categoryName
                )
                .map((yojna) => ({
                    value: yojna.yojana_type_id,
                    label: yojna.yojana_type,
                })),
            placeholder: `${t("selectyear")}`, // Optional placeholder for select input
        },
        {
            label: `dist`,
            value: dist,
            onChange: (e: any) => setDist(e.target.value),
            type: "select",
            options: talukas.map((taluka: any) => ({
                value: taluka.id,
                label: taluka.name,
            })),
            placeholder: `${t("selecttaluka")}`, // Optional placeholder for select input
        },
        {
            label: `gp`,
            value: town, // Ensure this uses townName
            type: "select",
            placeholder: `${t('selectmahasul')}`,
            onChange: (e: any) => setTown(e.target.value), // Keep this to set townName
            options: grampanchayat.map((gp: any) => ({
                value: gp.id,
                label: gp.name,
            })),
        },
        {
            label: `mahasulgaav`,
            value: mahasulgaav, // Ensure this uses townName
            type: "select",
            placeholder: `${t('selectmahasul')}`,
            onChange: (e: any) => setMahsulgaav(e.target.value), // Keep this to set townName
            options: Villages.map((gp: any) => ({
                value: gp.id,
                label: gp.name,
            })),
        },
        {
            label: `Bankname`,
            value: bankname || "",
            type: "text",
            placeholder: `${t("enterpopulation")}`,
            onChange: (e: any) => setBankname(e.target.value),
        },
        {
            label: `ifsc code`,
            value: ifccode || "",
            type: "text",
            placeholder: `${t("enterpopulation")}`,
            onChange: (e: any) => setIFCcode(e.target.value),
        },
        {
            label: `accno`,
            value: accountno || "",
            type: "text",
            placeholder: `${t("enterpopulation")}`,
            onChange: (e: any) => setAccountno(e.target.value),
        },
        {
            label: `amount`,
            value: amount || "",
            type: "text",
            placeholder: `${t("enterpopulation")}`,
            onChange: (e: any) => setAmount(e.target.value),
        },

    ];
    if (yojnatyp === "1") {
        formFields.push({
            label: `आडनाव `,
            value: amount || "",
            type: "text",
            placeholder: `आडनाव `,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `नाव`,
            value: amount || "",
            type: "text",
            placeholder: `नाव`,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `वडिलांचे नाव/पतीचे नाव  `,
            value: amount || "",
            type: "text",
            placeholder: `वडिलांचे नाव/पतीचे नाव `,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `जात  `,
            value: amount || "",
            type: "text",
            placeholder: `जात  `,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `लाभार्थ्यांचा प्रकार `,
            value: amount || "",
            type: "text",
            placeholder: `लाभार्थ्यांचा प्रकार `,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `रेशन कार्ड क्रमांक `,
            value: amount || "",
            type: "text",
            placeholder: `रेशन कार्ड क्रमांक `,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `आधार कार्ड क्रमांक`,
            value: amount || "",
            type: "text",
            placeholder: `आधार कार्ड क्रमांक`,
            onChange: (e: any) => setAmount(e.target.value),
        },);
        formFields.push({
            label: `मोबाईल क्रमांक`,
            value: amount || "",
            type: "text",
            placeholder: `मोबाईल क्रमांक `,
            onChange: (e: any) => setAmount(e.target.value),
        },);

    } else if (yojnatyp === "2") {
        formFields.push({
            label: `बचत गट नाव`,
            value: amount || "",
            type: "text",
            placeholder: `बचत गट नाव`,
            onChange: (e: any) => setAmount(e.target.value),
        },
            {
                label: `नोंदणी प्रमाणपत्र`,
                value: amount || "",
                type: "text",
                placeholder: `नोंदणी प्रमाणपत्र`,
                onChange: (e: any) => setAmount(e.target.value),
            },
            {
                label: `सदस्य संख्या`,
                value: amount || "",
                type: "text",
                placeholder: `सदस्य संख्या`,
                onChange: (e: any) => setAmount(e.target.value),
            },
            {
                label: `संस्थेचे नाव`,
                value: amount || "",
                type: "text",
                placeholder: `संस्थेचे नाव`,
                onChange: (e: any) => setAmount(e.target.value),
            },
            {
                label: `कार्यारंभ आदेश दिनांक`,
                value: amount || "",
                type: "date",
                placeholder: `कार्यारंभ आदेश दिनांक`,
                onChange: (e: any) => setAmount(e.target.value),
            },
        );
    }

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

            <CustomModal
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                size={"xl"}
                title={updateClusterId ? yojnatyp : yojnatyp}
                formData={{
                    fields: formFields as any,
                    error: "",
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

export default Beneficiary;
