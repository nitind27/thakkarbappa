// components/manage/Clusteradd.tsx
"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Bank, Categorys, grampanchayat, SubCategory, talukasdata, TblBeneficiary, TblYojanaType, Villages, YojanaMaster, YojanaYear } from "../type";

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
    const t = useTranslations("beneficiary");
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
    const [surname, setSurname] = useState("");
    const [firstname, setFistname] = useState("");
    const [parentsname, setParentsname] = useState("");
    const [organizationname, setorganizationname] = useState("");
    const [Commencementdate, setCommencementdate] = useState("");
    const [cast, setcast] = useState("");
    const [beneficiariestype, setbeneficiariestype] = useState("");
    const [rationcardnumber, setrationcardnumber] = useState("");
    const [aadharcardnumber, setaddharcardnumber] = useState("");
    const [mobilenumber, setmobilenumber] = useState("");
    const [savinggroupname, setsavinggroupname] = useState("");
    const [Registrationerti, setRegistrationerti] = useState("");
    const [numberofmember, setnumberofmember] = useState("");
    const [fourty, setfourty] = useState("");
    const [sixty, setsixty] = useState("");
    const [hundred, sethundred] = useState("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [clusterData, setClusterData] =
        useState<TblBeneficiary[]>(beneficiary); // State for Beneficiary data
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
            categoryid: beneficiary.category_id,
            sub_category_id: subcat[beneficiary.sub_category_id],
            subcategoryid: beneficiary.sub_category_id,
            yojana_year_id: yojna_year[beneficiary.yojana_year_id],
            yojanayearid: beneficiary.yojana_year_id,
            yojana_type: yojnatypes[beneficiary.yojana_type as any],
            yojanatype: beneficiary.yojana_type,
            yojana_id: yojnamastername[beneficiary.yojana_id],
            yojanaid: beneficiary.yojana_id,
            taluka_id: talukaMap[beneficiary.taluka_id],
            talukaid: beneficiary.taluka_id,
            gp_id: gpmap[beneficiary.gp_id],
            gpid: beneficiary.gp_id,
            village_id: village[beneficiary.village_id],
            villageid: beneficiary.village_id,
            surname: beneficiary.surname,
            firstname: beneficiary.firstname,
            middlename: beneficiary.middlename,
            fullname: beneficiary.surname + beneficiary.firstname + beneficiary.middlename,
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
            fourty: beneficiary.fourty == '1' ? "Yes" : "No",
            sixty: beneficiary.sixty == '1' ? "Yes" : "No",
            hundred: beneficiary.hundred == '1' ? "Yes" : "No",
            status: beneficiary.status,
            date_ins: beneficiary.date_ins,
            date_update: beneficiary.date_update,
            organization: beneficiary.organization,
            work_order_date: beneficiary.work_order_date,
        }))
        .reverse(); // Reverse the order to show the last added items first

    const columns = [
       {
            accessorKey: "serial_number",
            header: () => (
                <div style={{ fontWeight: 'bold',padding: '5px' }}>
                    {t("SrNo")}
                </div>
            ),
            cell: ({ row }: any) => (
                <div>
                    {row.index + 1}
                </div>
            ),
        },
        {
            accessorKey: "category_id",
            header: `${t("categoryname")}`,
        },
        {
            accessorKey: "sub_category_id",
            header: `${t("subcategoryname")}`,
        },
        {
            accessorKey: "yojana_year_id",
            header: `${t("year")}`,
        },
        {
            accessorKey: "yojana_type",
            header: `${t("yojnatype")}`,
        },
        {
            accessorKey: "yojana_id",
            header: `${t("yojnaname")}`,
        },
        {
            accessorKey: "taluka_id",
            header: `${t("dist")}`,
        },
        {
            accessorKey: "gp_id",
            header: `${t("GramPanchayat")}`,
        },
        {
            accessorKey: "village_id",
            header: `${t("Village")}`,
        },


        {
            accessorKey: "fullname",
            header: `${t("FullName")}`,
        },
        {
            accessorKey: "gat_name",
            header: `${t("bachtgat")}`,
        },
        {
            accessorKey: "gat_certificate",
            header: `${t("registerdcert")}`,
        },
        {
            accessorKey: "member",
            header: `${t("members")}`,
        },
        {
            accessorKey: "caste_id",
            header: `${t("Cast")}`,
        },
        {
            accessorKey: "beneficiary_type",
            header: `${t("beneficiarytype")}`,
        },
        {
            accessorKey: "rashion_no",
            header: `${t("Registrationcard")}`,
        },
        {
            accessorKey: "aadhar",
            header: `${t("aadharcard")}`,
        },
        {
            accessorKey: "mobile",
            header: `${t("Contact")}`,
        },
        {
            accessorKey: "bank_name",
            header: `${t("BankName")}`,
        },
        {
            accessorKey: "ifsc",
            header: `${t("IFSCCode")}`,
        },
        {
            accessorKey: "ac_no",
            header: `${t("AccountNo")}`,
        },
        {
            accessorKey: "tot_finance",
            header: `${t("TotalFinanceAllocated")}`,
        },
        {
            accessorKey: "amount_paid",
            header: `${t("AmountPaid")}`,
        },
        {
            accessorKey: "fourty", // Assuming this is a status indicator
            header: `${t("Eligible40")}`,
        },
        {
            accessorKey: "sixty", // Assuming this is a status indicator
            header: `${t("Eligible60")}`,
        },
        {
            accessorKey: "hundred", // Assuming this is a status indicator
            header: `${t("Eligible100")}`,
        },
        {
            accessorKey: "status", // Current status of the beneficiary
            header: `${t("Status")}`,
        },

        {
            accessorKey: "organization", // Organization managing the scheme
            header: `${t("Organization")}`
        },
        {
            accessorKey: "work_order_date", // Date related to work orders issued
            header: `${t("Commencementorderdate")}`
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
                        className={`btn btn-sm ${row.original.status == "Active" ? "btn-danger" : "btn-warning"
                            } ms-5`}
                        onClick={() =>
                            handleDeactivate(row.original.beneficiary_id, row.original.status)
                        }
                    >
                        <KTIcon iconName={"status"} className="fs-6" iconType="solid" />
                        {row.original.status == "Active"
                            ? `${t("Deactive")}`
                            : `${t("Active")}`}
                    </button>
                </div>
            ),
        },
    ];

    const handleDeactivate = async (category_id: any, currentStatus: any) => {
        const confirmMessage =
            currentStatus == "Active"
                ? "Are you sure you want to deactivate this Beneficiary?"
                : "Are you sure you want to activate this Beneficiary?";
        const confirmed = await confirm({ confirmation: confirmMessage });
        if (confirmed) {
            try {
                const response = await fetch(`/api/benefucuary/delete/${category_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: currentStatus == "Active" ? "Deactive" : "Active",
                    }),
                });

                if (response.ok) {
                    // Update local state without page reload
                    setClusterData((prevData) =>
                        prevData.map((cluster) =>
                            cluster.beneficiary_id == category_id
                                ? {
                                    ...cluster,
                                    status: currentStatus == "Active" ? "Deactive" : "Active",
                                }
                                : cluster
                        )
                    );
                    toast.success(
                        `Beneficiary ${currentStatus == "Active" ? "deactivated" : "activated"
                        } successfully!`
                    );
                } else {
                    toast.error("Failed to change the Beneficiary status.");
                }
            } catch (error) {
                console.error("Error changing the Beneficiary status:", error);
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
                ? `/api/benefucuary/update`
                : `/api/benefucuary/insert`;

            // Prepare the request body
            const requestBody = {
                category_id: categoryName,
                sub_category_id: subcategoryName,
                yojana_year_id: yojnayear,
                yojana_type: yojnatyp,
                yojana_id: yojnaname,
                taluka_id: dist,
                gp_id: town,
                village_id: mahasulgaav,
                surname: surname,
                firstname: firstname,
                middlename: parentsname,
                fullname: surname + firstname + parentsname,
                gat_name: organizationname,
                gat_certificate: Registrationerti,
                member: numberofmember,
                caste_id: cast,
                beneficiary_type: beneficiariestype,
                rashion_no: rationcardnumber,
                aadhar: aadharcardnumber,
                mobile: mobilenumber,
                bank_name: bankname,
                ifsc: ifccode,
                ac_no: accountno,
                tot_finance: amount,
                amount_paid: amount,
                fourty: fourty,
                sixty: sixty,
                hundred: hundred,
                organization: amount,
                work_order_date: Commencementdate,
                ...(updateClusterId && { beneficiary_id: updateClusterId }),
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
                            cluster.beneficiary_id == updateClusterId
                                ? { ...cluster, ...requestBody as any }
                                : cluster
                        )
                    );
                    toast.success("Beneficiary updated successfully!");
                } else {
                    const createdData = await response.json();
                    setClusterData((prevData) => [...prevData, createdData]);
                    toast.success("Beneficiary inserted successfully!");
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
    const handleEdit = (benefit: any) => {
        setUpdateClusterId(benefit.beneficiary_id); // Set ID for updating
        setCategoryName(benefit.categoryid);
        setSubCategoryName(benefit.subcategoryid);
        setYojnaYear(benefit.yojanayearid);
        setYojnatype(benefit.yojanatype);
        setYojnaName(benefit.yojanaid);
        setDist(benefit.talukaid);
        setTown(benefit.gpid);
        setMahsulgaav(benefit.villageid);
        setBankname(benefit.bank_name);
        setIFCcode(benefit.ifsc);
        setAccountno(benefit.ac_no);
        setAmount(benefit.amount_paid);
        setSurname(benefit.surname);
        setFistname(benefit.firstname);
        setParentsname(benefit.middlename);
        setorganizationname(benefit.organization);
        setCommencementdate(benefit.work_order_date);
        setcast(benefit.caste_id);
        setbeneficiariestype(benefit.beneficiary_type);
        setrationcardnumber(benefit.rashion_no);
        setaddharcardnumber(benefit.aadhar);
        setmobilenumber(benefit.mobile);
        setsavinggroupname(benefit.gat_name);
        setRegistrationerti(benefit.gat_certificate);
        setnumberofmember(benefit.member);
        setfourty(benefit.fourty);
        setsixty(benefit.sixty);
        sethundred(benefit.hundred);
        handleShowPrint(); // Open modal for editing

    };


    const reset = () => {
        setUpdateClusterId(null); // Set ID for updating
        setCategoryName("");
        setSubCategoryName("");
        setYojnaYear("");
        setYojnatype("");
        setYojnaName("");
        setDist("");
        setTown("");
        setMahsulgaav("");
        setBankname("");
        setIFCcode("");
        setAccountno("");
        setAmount("");
        setSurname("");
        setFistname("");
        setParentsname("");
        setorganizationname("");
        setCommencementdate("");
        setcast("");
        setbeneficiariestype("");
        setrationcardnumber("");
        setaddharcardnumber("");
        setmobilenumber("");
        setsavinggroupname("");
        setRegistrationerti("");
        setnumberofmember("");
        setfourty("");
        setsixty("");
        sethundred("");
    }
    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setCategoryName("");
        setError("");
        reset();
        setUpdateClusterId(null); // Reset update ID when closing
    };

    const formFields = [
        {
            label: `${t('categoryname')}`,
            value: categoryName,
            required: true,
            onChange: (e: any) => setCategoryName(e.target.value),
            type: "select",
            options: category.map((category: Categorys) => ({
                value: category.category_id,
                label: category.category_name,
            })),
            placeholder: `${t('categoryname')}`, // Optional placeholder for select input
        },
        {
            label: `${t('subcategoryname')}`, // Label for the select input
            value: subcategoryName, // Use state for the selected subcategory
            onChange: (e: any) => setSubCategoryName(e.target.value), // Function to update selected subcategory
            type: "select", // Type of input
            options: initialcategoryData

                .filter((category: SubCategory) => String(category.category_id) == categoryName) // Filter based on categoryName
                .map((category: SubCategory) => ({
                    value: category.sub_category_id, // Assuming sub_category_id is the unique identifier for subcategories
                    label: category.sub_category_name, // Display name for the select option
                })),
            placeholder: `${t('subcategoryname')}`, // Optional placeholder for select input
        },


        {
            label: `${t('year')}`,
            value: yojnayear,
            onChange: (e: any) => setYojnaYear(e.target.value),
            type: "select",
            options: YojnaYear.map((year: YojanaYear) => ({
                value: year.yojana_year_id,
                label: year.yojana_year,
            })),
            placeholder: `${t("year")}`, // Optional placeholder for select input
        },
        {
            label: `${t('yojnatype')}`,
            value: yojnatyp,
            onChange: (e: any) => setYojnatype(e.target.value),
            type: "select",

            options: yojnatype
                .filter((type) =>
                    String(type.sub_category_id) == subcategoryName &&
                    String(type.category_id) == categoryName
                )
                .map((yojna) => ({
                    value: yojna.yojana_type_id,
                    label: yojna.yojana_type,
                })),
            placeholder: `${t("yojnatype")}`, // Optional placeholder for select input
        },
        {
            label: `${t('yojnaname')}`,
            value: yojnaname,
            onChange: (e: any) => setYojnaName(e.target.value),
            type: "select",
            className: 'col-12',
            options: yojnamaster
                .filter((type) =>
                    String(type.yojana_year_id) == yojnayear &&
                    String(type.yojana_type) == yojnatyp &&
                    String(type.category_id) == categoryName &&
                    String(type.sub_category_id) == subcategoryName
                )
                .map((yojna) => ({
                    value: yojna.yojana_year_id,
                    label: yojna.yojana_name,
                })),
            placeholder: `${t("yojnaname")}`, // Optional placeholder for select input
        },
        {
            label: `${t('dist')}`,
            value: dist,
            onChange: (e: any) => setDist(e.target.value),
            type: "select",
            options: talukas.map((taluka: any) => ({
                value: taluka.id,
                label: taluka.name,
            })),
            placeholder: `${t("dist")}`, // Optional placeholder for select input
        },
        {
            label: `${t('GramPanchayat')}`,
            value: town, // Ensure this uses townName
            type: "select",
            placeholder: `${t('GramPanchayat')}`,
            onChange: (e: any) => setTown(e.target.value), // Keep this to set townName

            options: grampanchayat
                .filter((type) =>
                    String(type.taluka_id) == dist

                )
                .map((yojna) => ({
                    value: yojna.id,
                    label: yojna.name,
                })),
        },


        ...(yojnatyp !== "3" ? [
            {
                label: `${t('Village')}`,
                value: mahasulgaav,
                type: "select",
                placeholder: `${t('Village')}`,
                onChange: (e: any) => setMahsulgaav(e.target.value),
                options: Villages
                    .filter((type) =>
                        String(type.taluka_id) == dist &&
                        String(type.gp_id) == town

                    )
                    .map((yojna) => ({
                        value: yojna.id,
                        label: yojna.name,
                    })),
            },
        ] : []),



        {
            label: `${t('BankName')}`,
            value: bankname || "",
            type: "text",

            required: true,
            placeholder: `${t("BankName")}`,
            onChange: (e: any) => setBankname(e.target.value),
        },
        {
            label: `${t('IFSCCode')}`,
            value: ifccode || "",
            type: "text",
            required: true,
            placeholder: `${t("IFSCCode")}`,
            onChange: (e: any) => setIFCcode(e.target.value),
        },
        {
            label: `${t('AccountNo')}`,
            value: accountno || "",
            type: "text",
            required: true,
            placeholder: `${t("AccountNo")}`,
            onChange: (e: any) => setAccountno(e.target.value),
        },
        {
            label: `${t('AmountPaid')}`,
            value: amount || "",
            required: true,
            type: "text",

            placeholder: `${t("AmountPaid")}`,
            onChange: (e: any) => setAmount(e.target.value),
        },

    ];
    if (yojnatyp == "1") {
        formFields.push({
            label: `${t('surname')}`,
            value: surname || "",
            required: true,
            type: "text",
            placeholder: `${t('surname')}`,
            onChange: (e: any) => setSurname(e.target.value),
        },);
        formFields.push({
            label: `${t('firstname')}`,
            value: firstname || "",
            type: "text",
            required: true,
            placeholder: `${t('firstname')}`,
            onChange: (e: any) => setFistname(e.target.value),
        },);
        formFields.push({
            label: `${t('parentsname')}`,
            value: parentsname || "",
            type: "text",
            required: true,
            placeholder: `${t('parentsname')}`,
            onChange: (e: any) => setParentsname(e.target.value),
        },);
        formFields.push({
            label: `${t('Organization')}`,
            value: organizationname || "",
            type: "text",
            required: true,
            placeholder: `${t('Organization')}`,
            onChange: (e: any) => setorganizationname(e.target.value),
        },);
        formFields.push({
            label: `${t('Commencementorderdate')}`,
            value: Commencementdate || "",
            type: "date",
            required: true,
            placeholder: `${t('Commencementorderdate')}`,
            onChange: (e: any) => setCommencementdate(e.target.value),
        },);
        formFields.push({
            label: `${t('Cast')}`,
            value: cast || "",
            type: "text",
            required: true,
            placeholder: `${t('Cast')}`,
            onChange: (e: any) => setcast(e.target.value),
        },);
        formFields.push({
            label: `${t('beneficiarytype')}`,
            value: beneficiariestype || "",
            type: "text",
            required: true,
            placeholder: `${t('beneficiarytype')}`,
            onChange: (e: any) => setbeneficiariestype(e.target.value),
        },);
        formFields.push({
            label: `${t('Registrationcard')}`,
            value: rationcardnumber || "",
            type: "text",
            required: true,
            placeholder: `${t('Registrationcard')}`,
            onChange: (e: any) => setrationcardnumber(e.target.value),
        },);
        formFields.push({
            label: `${t('aadharcard')}`,
            value: aadharcardnumber || "",
            type: "text",
            required: true,
            placeholder: `${t('aadharcard')}`,
            onChange: (e: any) => setaddharcardnumber(e.target.value),
        },);
        formFields.push({
            label: `${t('Contact')}`,
            value: mobilenumber || "",
            required: true,
            type: "text",
            placeholder: `${t('Contact')}`,
            onChange: (e: any) => setmobilenumber(e.target.value),
        }, {
            label: `${t('Eligible40')}`,
            value: fourty || "",
            required: false,
            type: "checkbox",
            placeholder: `${t('Eligible40')}`,
            onChange: (e: any) => setfourty(e.target.value),
        },
            {
                label: `${t('Eligible60')}`,
                value: sixty || "",
                type: "checkbox",
                required: false,
                placeholder: `${t('Eligible60')}`,
                onChange: (e: any) => setsixty(e.target.value),
            },
            {
                label: `${t('Eligible100')}`,
                value: hundred || "",
                type: "checkbox",
                required: false,
                placeholder: `${t('Eligible100')}`,
                onChange: (e: any) => sethundred(e.target.value),
            },);

    } else if (yojnatyp == "2") {
        formFields.push({
            label: `${t('bachtgat')}`,
            value: savinggroupname || "",
            type: "text",
            required: true,
            placeholder: `${t('bachtgat')}`,
            onChange: (e: any) => setsavinggroupname(e.target.value),
        },
            {
                label: `${t('registerdcert')}`,
                value: Registrationerti || "",
                type: "text",
                required: true,
                placeholder: `${t('registerdcert')}`,
                onChange: (e: any) => setRegistrationerti(e.target.value),
            },
            {
                label: `${t('members')}`,
                value: numberofmember || "",
                type: "text",
                required: true,
                placeholder: `${t('members')}`,
                onChange: (e: any) => setnumberofmember(e.target.value),
            },
            {
                label: `${t('sansthaname')}`,
                value: organizationname || "",
                type: "text",
                required: true,
                placeholder: `${t('sansthaname')}`,
                onChange: (e: any) => setorganizationname(e.target.value),
            },
            {
                label: `${t('Commencementorderdate')}`,
                value: Commencementdate || "",
                type: "date",
                required: true,
                placeholder: `${t('Commencementorderdate')}`,
                onChange: (e: any) => setCommencementdate(e.target.value),
            },
            {
                label: `${t('Eligible40')}`,
                value: fourty || "",
                type: "checkbox",
                required: false,
                placeholder: `${t('Eligible40')}`,
                onChange: (e: any) => setfourty(e.target.value),
            },
            {
                label: `${t('Eligible60')}`,
                value: sixty || "",
                type: "checkbox",
                required: false,
                placeholder: `${t('Eligible60')}`,
                onChange: (e: any) => setsixty(e.target.value),
            },
            {
                label: `${t('Eligible100')}`,
                value: hundred || "",
                type: "checkbox", required: false,
                placeholder: `${t('Eligible100')}`,
                onChange: (e: any) => sethundred(e.target.value),
            },

        );
    }
    else if (yojnatyp == "3") {
        formFields.push({
            label: `${t('sansthaname')}`,
            value: organizationname || "",
            type: "text",
            required: true,
            placeholder: `${t('sansthaname')}`,
            onChange: (e: any) => setorganizationname(e.target.value),
        },);
        formFields.push({
            label: `${t('Commencementorderdate')}`,
            value: Commencementdate || "",
            type: "date",
            required: true,
            placeholder: `${t('Commencementorderdate')}`,
            onChange: (e: any) => setCommencementdate(e.target.value),
        },);
        formFields.push(
            {
                label: `${t('Eligible40')}`,
                value: (fourty == "true" ? 1 : fourty || "").toString(),
                type: "text",
                placeholder: `%`,
                required: false,
                onChange: (e: any) => setfourty(e.target.value),
            },
            {
                label: `${t('Eligible60')}`,
                value: (sixty == "true" ? 1 : sixty || "").toString(),
                type: "text",
                placeholder: `%`,
                required: false,
                onChange: (e: any) => setsixty(e.target.value),
            },
            {
                label: `${t('Eligible100')}`,
                value: (hundred == "true" ? 1 : hundred || "").toString(),
                type: "text",
                required: false,
                placeholder: `%`,
                onChange: (e: any) => sethundred(e.target.value),
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
                        {t("addbenef")}
                    </Button>
                }
            />

            <CustomModal
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                size={"xl"}
                title={updateClusterId ? `${t("updatepage")}` : `${t("insertpage")}`}
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
