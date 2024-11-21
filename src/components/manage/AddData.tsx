import { KTIcon } from '@/_metronic/helpers';
import ComponentFile from '@/common/ComponentFile';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Schooldata, Standarddata } from '../type';


const AddData = ({ values, standarddata, schooldata }: { values: any, schooldata: any, standarddata: any }) => {
    const [showmodel, setShowModel] = useState(false)
    const t = useTranslations("student");


    const formFields = [
        {
            label: `${t("serialnumber")}`,
            value: values.serialnumber, name: "serialnumber",
            type: "text",
            required: true,
            placeholder: `${t("serialnumber")}`,
        },
        {
            label: `${t("studentName")}`,
            value: values.studentName,
            type: "text",
            name: "studentName",
            required: true,
            placeholder: `${t("studentName")}`,
        },
        {
            label: `${t("grno")}`,
            value: values.grno,
            type: "text",
            name: "grno",
            required: true,
            placeholder: `${t("grno")}`,
        },
        {
            label: `${t("saralid")}`,
            value: values.saralid,
            required: true,
            name: "saralid",
            type: "text",
            placeholder: `${t("saralid")}`,
        },
        {
            label: `${t("Schoolname")}`,
            required: true,
            name: "schoolname",
            value: values.schoolname || "", // Default value when updating
            type: "select",
            options: schooldata.map((student: Schooldata) => ({
                value: student.school_id,
                label: student.school_name,
            })),
            placeholder: `${t("Schoolname")}`, // Optional placeholder for select input
        },
        {
            label: `${t("std")}`,
            required: true,
            name: "standard",
            value: values.standard || "",
            type: "select",
            options: standarddata.map((std: Standarddata) => ({
                value: std.standard_id,
                label: std.standard_name,
            })),
            placeholder: `${t("std")}`,
        },
        {
            label: `${t("Monthername")}`,
            value: values.mothername,
            name: "mothername",
            required: true,
            type: "text",
            placeholder: `${t("Monthername")}`,
        },
        {
            label: `${t("dob")}`,
            value: values.dob,
            name: "dob",
            required: true,
            type: "date",
            placeholder: `${t("dob")}`,
        },

        {
            label: `${t("gender")}`,
            value: values.gender,
            name: "gender",
            type: "select",
            placeholder: `${t("gender")}`,
            options: [
                { label: "Male", value: "M" },
                { label: "Female", value: "F" },
                { label: "Other", value: "Oth" },
                // Add other options here if needed
            ],
        },

        {
            label: `${t("cast")}`,
            value: values.cast,
            name: "cast",
            type: "select",
            placeholder: `${t("cast")}`,
            options: [
                { label: "SC", value: "SC" },
                { label: "ST", value: "ST" },
                { label: "OBC", value: "OBC" },
                { label: "SBC", value: "SBC" },
                { label: "NT B", value: "NT B" },
                { label: "General", value: "General" },
                // Add other options here if needed
            ],
        },

        {
            label: `${t("aadharcard")}`,
            value: values.aadhaar,
            name: "aadhaar",
            required: true,
            type: "text",
            placeholder: `eg. 121212121212`,
        },

        {
            label: `${t("Contact")}`,
            value: values.contactNo,
            name: "Contact",
            required: true,
            type: "text",
            placeholder: `eg.7359595959`,
        },
        {
            label: `${t("address")}`,
            value: values.address,
            name: "address",
            required: true,
            type: "text",
            placeholder: `${t("address")}`,
        },

        {
            label: `${t("sicklecell")}`,
            value: values.sicklecell,
            name: "sicklecell",
            type: "select",
            placeholder: `${t("sicklecell")}`,
            options: [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },

                // Add other options here if needed
            ],
        },
    ];
    if (values.sicklecell === "Yes") {
        formFields.push({
            label: `Sickle Cell Report`,
            value: values.sicklereport,
            name: "sicklereport",
            type: "select",
            placeholder: `Select Report Type`,
            options: [
                { label: "AS", value: "AS" },
                { label: "SS", value: "SS" },
            ],
        });
    }

    return (
        <>

            <Button
                variant="primary"
                onClick={() => {

                    setShowModel(true)
                }}
                className="btn btn-sm"
            >
                <KTIcon
                    iconName={"plus-circle"}
                    className="fs-3"
                    iconType="solid"
                />
                add
            </Button>
            <ComponentFile
                show={showmodel}
                handleClose={() => setShowModel(false)}
                handleSubmit={(e: any) => console.log(e)}
                title={"File"}
                formData={{
                    fields: formFields as any,
                    error: "",
                }}
                submitButtonLabel={

                    "add"
                }
            // disabledButton={isLoading}
            />
        </>



    )
}

export default AddData