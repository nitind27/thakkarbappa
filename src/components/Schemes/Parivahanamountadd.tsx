// components/manage/Clusteradd.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import '../../assets/parivahan.css'
import {
    Bank,
    Categorys,
    SubCategory,
    TblBeneficiary,
    TblEvaluation,
    TblEvaluationAmount,
    tblparivahan,
    TblParivahanBeneficiary,
    TblUsers,
    TblYojanaType,
    YojanaMaster,
    YojanaYear,
} from "../type";

import { Button, Form } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
// import { validateadhikanchaname } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import { formatDate } from "@/lib/utils";
import Tablefilter from "../table/Tablefilter";
import { clippingParents } from "@popperjs/core";
import Custommodellable from "@/common/Custommodellable";
import ParivahanInput from "./ParivahanInput";
import { useAppContext } from "./Contaxt/AppContext";

type Props = {
    subCategory: SubCategory[];
    YojnaYear: YojanaYear[];
    Bankdata: Bank[];
    yojanaMaster: YojanaMaster[];
    category: Categorys[];
    yojnatype: TblYojanaType[];
    Parivahanbeneficiarys: TblParivahanBeneficiary[];
    Parivahantbl: tblparivahan[];
    Beneficiary: TblBeneficiary[];
    Userdata: TblUsers[];
    TblEvaluation: TblEvaluation[];
    TblEvaluationAmount: TblEvaluationAmount[];
};

const Parivahanamountadd = ({
    subCategory,
    YojnaYear,
    Bankdata,
    yojanaMaster,
    category,
    Parivahantbl,
    yojnatype,
    Parivahanbeneficiarys,
    Beneficiary,
    Userdata,
    TblEvaluation,
    TblEvaluationAmount
}: Props) => {
    const t = useTranslations("parivahan");
    const confirm = createConfirmation(ConfirmationDialog);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [showimage, setShowimage] = useState("");
    const [OutwardNo, setOutwardNo] = useState("");
    const [Date, setDate] = useState("");
    const [Latitude, setLatitude] = useState("");
    const [Longitude, setLongitude] = useState("");
    const [Address, setAddress] = useState("");
    const [OtherRemarks, setOtherRemarks] = useState("");
    const [parivahandata, setparivahandata] =
        useState<TblEvaluation[]>(TblEvaluation); // State for Sub Category data
    const [TblEvaluationAmountdata, setTblEvaluationAmountdata] =
        useState<TblEvaluationAmount[]>(TblEvaluationAmount); // State for Sub Category data
    const { inputData, setInputData } = useAppContext(); // Use Context
console.log("inputData",inputData)

    const yojna_year = YojnaYear.reduce((acc, year: YojanaYear) => {
        acc[year.yojana_year_id] = year.yojana_year; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const yojna_type = yojnatype.reduce((acc, year: TblYojanaType) => {
        acc[year.yojana_type_id] = year.yojana_type; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const yojnamster = yojanaMaster.reduce((acc, year: YojanaMaster) => {
        acc[year.yojana_id] = year.yojana_name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const yojnamsteramount = yojanaMaster.reduce((acc, year: YojanaMaster) => {
        acc[year.yojana_id] = year.amount; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const usersdata = Userdata.reduce((acc, year: TblUsers) => {
        acc[year.user_id] = year.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const beneficiaryname = Beneficiary.reduce((acc, year: TblBeneficiary) => {
        acc[year.beneficiary_id] = year.fullname; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);

    const usersdataaddress = Userdata.reduce((acc, year: TblUsers) => {
        acc[year.user_id] = year.address; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);


    const [financeData, setFinanceData] = useState(
        Beneficiary.map((data: any) => ({
            beneficiary_id: data.beneficiary_id,
            tot_finance: data.tot_finance,
            fortyPercent: (data.tot_finance * 40) / 100,
            sixtyPercent: (data.tot_finance * 60) / 100,
            hundredPercent: (data.tot_finance * 100) / 100,
        }))
    );

    // Handler to update specific percentage values
    // const handleInputChange = (beneficiaryId: number, key: string, value: number) => {
    //     setFinanceData((prevData) =>
    //         prevData.map((item) =>
    //             item.beneficiary_id === beneficiaryId ? { ...item, [key]: value } : item
    //         )
    //     );
    // };

    const handleShowPrint = () => setShowPrintModal(true);
    const handleimageshow = (row: any) => {

        setShowimage(row.photo)
        setOutwardNo(row.outwardno)
        setDate(row.dateparivahan)
        setLatitude(row.lat)
        setLongitude(row.log)
        setAddress(row.parivahanadrees)
        setOtherRemarks(row.remarks)
        setShowPrintModal(true)
    }
    const handleClosePrint = () => {

        setShowPrintModal(false);

    };


    const handleDeactivate = async (category_id: any) => {
        const confirmMessage = "Are you sure want to Add ?";
        const confirmed = await confirm({ confirmation: confirmMessage } as any);
        if (confirmed) {
            try {
                const response = await fetch(`/api/evaluationamount/updateevalutionamount/${category_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        evaluation_status: "Received",
                    }),
                });

                if (response.ok) {
                    // Update local state without page reload
                    setparivahandata((prevData) =>
                        prevData.map((cluster) =>
                            cluster.evaluation_id == category_id
                                ? {
                                    ...cluster,
                                    evaluation_status: "Received",
                                }
                                : cluster
                        )
                    );
                    toast.success(
                        ` ${"Amount Added"
                        } successfully!`
                    );
                } else {
                    toast.error("Failed to change the Category status.");
                }
            } catch (error) {
                console.error("Error changing the Category status:", error);
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const data = parivahandata
        .map((parivhan) => ({
            evaluation_id: parivhan.evaluation_id,
            parivahan_id: parivhan.parivahan_id,
            outwardno: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => data.outward_no),
            dateparivahan: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => formatDate(data.parivahan_date as any)),
            parivahanadrees: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => usersdataaddress[data.sup_id]),
            parivahanoutward_no: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => data.outward_no + formatDate(data.parivahan_date as any)),
            username: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => usersdata[data.sup_id] + usersdataaddress[data.sup_id]),

            beneficiary_id: parivhan.beneficiary_id,
            photo: parivhan.photo,
            remarks: parivhan.remarks,
            other_remraks: parivhan.other_remraks,
            lat: parivhan.lat,
            log: parivhan.log,
            address: parivhan.address,
            editconditioncheckfor: TblEvaluationAmountdata.filter((data) => data.evaluation_id == parivhan.evaluation_id).map((data) => data.verification),
            // yojana_id: parivhan.yojana_id,

            yojana_year_id: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => yojna_year[data.yojana_year_id]),

            yojana_type: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => yojna_type[data.yojana_type as any]),


            yojana_id: Parivahanbeneficiarys.filter((data) => data.parivahan_id == parivhan.parivahan_id).map((data) => yojnamster[data.yojana_id as any]),
            category_id: parivhan.category_id,
            // yojana_type: parivhan.yojana_type,
            ins_date_time: parivhan.ins_date_time,
            update_date_time: parivhan.update_date_time,
            evaluation_status: parivhan.evaluation_status,
            status: parivhan.status,
        }))
        .reverse(); // Reverse the order to show the last added items first

    // Displaying the result
    const columns = [
        {
            accessorKey: "serial_number",
            header: () => (
                <div style={{ fontWeight: "bold", padding: "5px" }}>{t("SrNo")}</div>
            ),
            cell: ({ row }: any) => <div>{row.index + 1}</div>,
        },

        {
            accessorKey: "parivahanoutward_no",
            header: `${t("parivahandate")}`,
        },
        {
            accessorKey: "username",
            header: `${t("outwardno")}`,
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
            accessorKey: "actions",
            header: `${t("beneficiary")}`,
            cell: ({ row }: any) => {
                // Move the beneficiary data filtering outside the cell function
                const beneficiaryData = Beneficiary.filter((b) => b.beneficiary_id === row.original.beneficiary_id).map((data: any) => ({
                    ...data,
                    fortyPercent: (data.tot_finance * 40) / 100,
                    sixtyPercent: (data.tot_finance * 60) / 100,
                    hundredPercent: (data.tot_finance * 100) / 100,
                }));

                return (
                    // <div className="overflow-x-auto">
                    //     <table className="min-w-full border border-gray-300">
                    //         <thead className="bg-gray-200">
                    //             <tr>
                    //                 <th className="border px-4 py-2">{t("SrNo")}</th>
                    //                 <th className="border px-4 py-2">{t("name")}</th>
                    //                 <th className="border px-4 py-2">{t("total")}</th>
                    //                 <th className="border px-4 py-2">{t("AmountPaid")}</th>
                    //                 <th className="border px-4 py-2">{t("Interest")}</th>
                    //                 <th className="border px-4 py-2">{"Action"}</th>
                    //                 <th className="border px-4 py-2">{"Photo"}</th>
                    //             </tr>
                    //         </thead>
                    //         <tbody>
                    //             {beneficiaryData.map((data: any, index: number) => (
                    //                 <React.Fragment key={index}>
                    //                     <tr className="border border-gray-300">
                    //                         <td className="border px-4 py-2" rowSpan={4}>
                    //                             {index + 1}
                    //                         </td>
                    //                         <td className="border px-4 py-2" rowSpan={4}>
                    //                             {data.yojana_type === "2" ? data.gat_name : data.fullname}
                    //                         </td>
                    //                         <td className="border px-4 py-2" rowSpan={4}>
                    //                             {data.tot_finance}
                    //                         </td>

                    //                     </tr>
                    //                     {data.fourty === "Yes" && (
                    //                         <tr className="border border-gray-300">
                    //                             <td className="border px-4 py-2">40%</td>
                    //                             <td className="border px-4 py-2">
                    //                                 <input
                    //                                     type="text"
                    //                                     defaultValue={data.fortyPercent}
                    //                                     className="border px-2 py-1 w-full"
                    //                                 />
                    //                             </td>
                    //                             <td className="border px-4 py-2" style={{ color: "green", cursor: "pointer" }} onClick={() =>
                    //                                 handleDeactivate(row.original.evaluation_id)
                    //                             }>
                    //                                 अदा
                    //                             </td>
                    //                             <td className="border px-4 py-2" style={{ color: "red", cursor: "pointer" }} onClick={() =>
                    //                                 handleimageshow(row.original)
                    //                             }>
                    //                                 photo
                    //                             </td>

                    //                         </tr>
                    //                     )}
                    //                     {data.sixty === "Yes" && (
                    //                         <tr className="border border-gray-300">
                    //                             <td className="border px-4 py-2">60%</td>
                    //                             <td className="border px-4 py-2">
                    //                                 <input
                    //                                     type="text"
                    //                                     defaultValue={data.sixtyPercent}
                    //                                     className="border px-2 py-1 w-full"
                    //                                 />
                    //                             </td>
                    //                             <td className="border px-4 py-2" style={{ color: "green", cursor: "pointer" }} onClick={() =>
                    //                                 handleDeactivate(row.original.evaluation_id)
                    //                             }>
                    //                                 अदा
                    //                             </td>
                    //                             <td className="border px-4 py-2" style={{ color: "red", cursor: "pointer" }} onClick={() =>
                    //                                 handleimageshow(row.original)
                    //                             }>
                    //                                 photo
                    //                             </td>
                    //                         </tr>
                    //                     )}
                    //                     {data.hundred === "Yes" && (
                    //                         <tr className="border border-gray-300">
                    //                             <td className="border px-4 py-2">100%</td>
                    //                             <td className="border px-4 py-2">
                    //                                 <input
                    //                                     type="text"
                    //                                     defaultValue={data.hundredPercent}
                    //                                     className="border px-2 py-1 w-full"
                    //                                 />
                    //                             </td>
                    //                             <td className="border px-4 py-2" style={{ color: "green", cursor: "pointer" }} onClick={() =>
                    //                                 handleDeactivate(row.original.evaluation_id)
                    //                             }>
                    //                                 {/* अदा */}
                    //                                 {/* {row.original.evaluation_id} */}
                    //                                 {row.original.editconditioncheckfor == "Yes" ? "अदा" : "Edit"}

                    //                             </td>
                    //                             <td className="border px-4 py-2" style={{ color: "red", cursor: "pointer" }} onClick={() =>
                    //                                 handleimageshow(row.original)
                    //                             }>
                    //                                 photo
                    //                             </td>

                    //                         </tr>
                    //                     )}



                    //                 </React.Fragment>

                    //             ))}
                    //         </tbody>
                    //     </table>
                    // </div>
                    <>
                        <ParivahanInput
                            beneficiaryData={beneficiaryData}
                            row={row}
                            handleDeactivate={handleDeactivate}
                            handleimageshow={handleimageshow}
                        />
                    </>
                );
            },
        }


    ];

    const dataItems = [
        { label: "Outward No", content: OutwardNo },
        { label: "Date", content: Date },
        { label: "Latitude", content: Latitude },
        { label: "Longitude", content: Longitude },
        { label: "Address", content: Address },
        { label: "Other Remarks", content: OtherRemarks },

    ];

    return (
        <div>
            <Table
                data={data}
                columns={columns}
                Button={
                    []
                }
            />
            <Custommodellable
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={[]}
                dataItems={dataItems}
                imagepriview={<img
                    src={showimage}
                    alt="Preview"
                    style={{
                        width: "150px", // Set a fixed width for the circular effect
                        height: "150px", // Set a fixed height equal to width
                        borderRadius: "5%", // Make the image circular
                        objectFit: "cover", // Ensure the image covers the circular area
                        overflow: "hidden", // Hide overflow to keep the circle shape
                    }}
                />}
                title={`स्थळ तपासणी अहवाल`}
                formData={{
                    fields: [

                    ],
                }}

                submitButtonLabel={[]}
            // disabledButton={isLoading}
            />

        </div>
    );
};

export default Parivahanamountadd;
