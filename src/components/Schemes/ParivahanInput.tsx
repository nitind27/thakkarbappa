
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useAppContext } from "./Contaxt/AppContext";

const ParivahanInput = ({ beneficiaryData, row, handleDeactivate, handleimageshow }: any) => {
    const t = useTranslations("parivahan");
    const { inputData, setInputData } = useAppContext(); // Use Context

    const [inputValues, setInputValues] = useState<Record<string, string>>({});

    useEffect(() => {
        const initialValues: Record<string, string> = {};
        beneficiaryData.forEach((data: any) => {
            initialValues[`fortyPercent_${data.evaluation_id}`] = data.fortyPercent || "";
            initialValues[`sixtyPercent_${data.evaluation_id}`] = data.sixtyPercent || "";
            initialValues[`hundredPercent_${data.evaluation_id}`] = data.hundredPercent || "";
        });
        setInputValues(initialValues);
    }, [beneficiaryData]);

    const handleInputChange = (id: string, value: string) => {
        setInputValues((prev) => {
            const updatedValues = { ...prev, [id]: value };
            setInputData(value); // Store in Context
            return updatedValues;
        });
    };

    return (
        <div>{inputData}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 py-2">{t("SrNo")}</th>
                            <th className="border px-4 py-2">{t("name")}</th>
                            <th className="border px-4 py-2">{t("total")}</th>
                            <th className="border px-4 py-2">{t("AmountPaid")}</th>
                            <th className="border px-4 py-2">{t("Interest")}</th>
                            <th className="border px-4 py-2">Action</th>
                            <th className="border px-4 py-2">Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beneficiaryData.map((data: any, index: number) => (
                            <React.Fragment key={data.evaluation_id}>
                                <tr className="border border-gray-300">
                                    <td className="border px-4 py-2" rowSpan={4}>{index + 1}</td>
                                    <td className="border px-4 py-2" rowSpan={4}>
                                        {data.yojana_type === "2" ? data.gat_name : data.fullname}
                                    </td>
                                    <td className="border px-4 py-2" rowSpan={4}>{data.tot_finance}</td>
                                </tr>
                                {data.fourty === "Yes" && (
                                    <tr className="border border-gray-300">
                                        <td className="border px-4 py-2">40%</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={inputValues[`fortyPercent_${data.evaluation_id}`] || ""}
                                                onChange={(e) =>
                                                    handleInputChange(`fortyPercent_${data.evaluation_id}`, e.target.value)
                                                }
                                                className="border px-2 py-1 w-full"
                                            />
                                        </td>
                                        <td className="border px-4 py-2 text-green-600 cursor-pointer" onClick={() => handleDeactivate(row.original.evaluation_id)}>
                                            अदा
                                        </td>
                                        <td className="border px-4 py-2 text-red-600 cursor-pointer" onClick={() => handleimageshow(row.original)}>
                                            photo
                                        </td>
                                    </tr>
                                )}
                                {data.sixty === "Yes" && (
                                    <tr className="border border-gray-300">
                                        <td className="border px-4 py-2">60%</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={inputValues[`sixtyPercent_${data.evaluation_id}`] || ""}
                                                onChange={(e) =>
                                                    handleInputChange(`sixtyPercent_${data.evaluation_id}`, e.target.value)
                                                }
                                                className="border px-2 py-1 w-full"
                                            />
                                        </td>
                                        <td className="border px-4 py-2 text-green-600 cursor-pointer" onClick={() => handleDeactivate(row.original.evaluation_id)}>
                                            अदा
                                        </td>
                                        <td className="border px-4 py-2 text-red-600 cursor-pointer" onClick={() => handleimageshow(row.original)}>
                                            photo
                                        </td>
                                    </tr>
                                )}
                                {data.hundred === "Yes" && (
                                    <tr className="border border-gray-300">
                                        <td className="border px-4 py-2">100%</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={inputValues[`hundredPercent_${data.evaluation_id}`] || ""}
                                                onChange={(e) =>
                                                    handleInputChange(`hundredPercent_${data.evaluation_id}`, e.target.value)
                                                }
                                                className="border px-2 py-1 w-full"
                                            />
                                        </td>
                                        <td className="border px-4 py-2 text-green-600 cursor-pointer" onClick={() => handleDeactivate(row.original.evaluation_id)}>
                                            {row.original.editconditioncheckfor === "Yes" ? "अदा" : "Edit"}
                                        </td>
                                        <td className="border px-4 py-2 text-red-600 cursor-pointer" onClick={() => handleimageshow(row.original)}>
                                            photo
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParivahanInput;
