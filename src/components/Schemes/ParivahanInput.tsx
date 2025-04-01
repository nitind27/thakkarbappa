import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { useAppContext } from './Contaxt/AppContext';
import { TblEvaluationAmount } from '../type';

interface BeneficiaryData {
    evaluation_id: string;
    yojana_type: string;
    gat_name?: string;
    fullname?: string;
    tot_finance: string;
    fourty?: string;
    sixty?: string;
    hundred?: string;
    fortyPercent?: string;
    sixtyPercent?: string;
    hundredPercent?: string;
    editconditioncheckfor?: string;
}

interface ParivahanInputProps {
    beneficiaryData: BeneficiaryData[];
    TblEvaluationAmount: TblEvaluationAmount[];
    row: any;
    handleDeactivate: (evaluation_id: string) => void;
    handleimageshow: (data: any) => void;
}

const ParivahanInput: React.FC<ParivahanInputProps> = ({ beneficiaryData, row, handleDeactivate, handleimageshow, TblEvaluationAmount }) => {
    const t = useTranslations("parivahan");
    const [inputValues, setInputValues] = useState<Record<string, { fortyPercent?: string; sixtyPercent?: string; hundredPercent?: string }>>({});
    const { inputData, setInputData } = useAppContext(); // Use Context
    // Default value format
    const defaultInputData = {
        evaluation_id: "",
        beneficiary_id: "",
        field: "",
    };

    // Initialize input values based on beneficiaryData
    useEffect(() => {
        const initialValues: Record<string, { fortyPercent?: string; sixtyPercent?: string; hundredPercent?: string }> = {};
        beneficiaryData.forEach(data => {
            initialValues[data.evaluation_id] = {
                fortyPercent: data.fortyPercent || '',
                sixtyPercent: data.sixtyPercent || '',
                hundredPercent: data.hundredPercent || ''
            };
        });
        setInputValues(initialValues);

    }, [beneficiaryData]);



    // Handle input changes
    const handleInputChange = (evaluation_id: string, field: keyof typeof inputValues[string], value: string, beneficiary_id: any) => {

        setInputValues(prevValues => ({

            ...prevValues,
            [evaluation_id]: {
                evaluation_id,
                beneficiary_id,
                ...prevValues[evaluation_id],
                ...prevValues[beneficiary_id],
                [field]: value
            }
        }));
    };

    // Log input values
    const logInputValues = () => {

        setInputData(inputValues as any);
    };

    // Wrap handleDeactivate to include logInputValues
    const handleDeactivateWithLogging = (evaluation_id: string) => {
      
        logInputValues();
        setInputValues(prevValues => ({

            ...prevValues,
            [evaluation_id]: {
                evaluation_id,
               
                ...prevValues[evaluation_id],
                
            }
        }));
        handleDeactivate(evaluation_id);
    };
    const tblinputparivahandata = TblEvaluationAmount.filter((data) => data.evaluation_id == row.original.evaluation_id).map((data) => data.verification)
    return (
        <div>
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
                        {beneficiaryData.map((data, index) => (
                            <React.Fragment key={data.evaluation_id}>
                                <tr className="border border-gray-300">
                                    <td className="border px-4 py-2" rowSpan={4}>{index + 1}</td>
                                    <td className="border px-4 py-2" rowSpan={4}>{data.yojana_type === "2" ? data.gat_name : data.fullname}</td>
                                    <td className="border px-4 py-2" rowSpan={4}>{data.tot_finance}</td>
                                </tr>
                                {data.fourty === "Yes" && (
                                    <tr className="border border-gray-300">
                                        <td className="border px-4 py-2">40%</td>
                                        <td className="border px-4 py-2">

                                            <input
                                                type="text"
                                                value={inputValues[row.original.evaluation_id]?.fortyPercent || inputValues[data.evaluation_id]?.fortyPercent}
                                                onChange={(e) => handleInputChange(row.original.evaluation_id, 'hundredPercent', e.target.value, row.original.beneficiary_id)}
                                                className="border px-2 py-1 w-full"
                                            />
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-green-600 cursor-pointer"
                                            onClick={() => handleDeactivateWithLogging(row.original.evaluation_id)}>  {tblinputparivahandata == "Yes" as any ? "Edit" : "अदा"}</td>
                                        <td
                                            className="border px-4 py-2 text-red-600 cursor-pointer"
                                            onClick={() => handleimageshow(data)}>photo</td>
                                    </tr>
                                )}
                                {data.sixty === "Yes" && (
                                    <tr className="border border-gray-300">
                                        <td className="border px-4 py-2">60%</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={inputValues[row.original.evaluation_id]?.sixtyPercent || inputValues[data.evaluation_id]?.sixtyPercent}
                                                onChange={(e) => handleInputChange(row.original.evaluation_id, 'hundredPercent', e.target.value, row.original.beneficiary_id)}
                                                className="border px-2 py-1 w-full"
                                            />
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-green-600 cursor-pointer"
                                            onClick={() => handleDeactivateWithLogging(row.original.evaluation_id)}>  {tblinputparivahandata == "Yes" as any ? "Edit" : "अदा"}</td>
                                        <td
                                            className="border px-4 py-2 text-red-600 cursor-pointer"
                                            onClick={() => handleimageshow(data)}>photo</td>
                                    </tr>
                                )}
                                {data.hundred === "Yes" && (
                                    <tr className="border border-gray-300">
                                        <td className="border px-4 py-2">100%</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                value={inputValues[row.original.evaluation_id]?.hundredPercent || inputValues[data.evaluation_id]?.hundredPercent}
                                                onChange={(e) => handleInputChange(row.original.evaluation_id, 'hundredPercent', e.target.value, row.original.beneficiary_id)}
                                                className="border px-2 py-1 w-full"
                                            />

                                        </td>
                                        <td
                                            className="border px-4 py-2 text-green-600 cursor-pointer"
                                            onClick={() => handleDeactivateWithLogging(row.original.evaluation_id)}>


                                            {tblinputparivahandata == "Yes" as any ? "Edit" : "अदा"}
                                        </td>
                                        <td
                                            className="border px-4 py-2 text-red-600 cursor-pointer"
                                            onClick={() => handleimageshow(data)}>photo</td>
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
