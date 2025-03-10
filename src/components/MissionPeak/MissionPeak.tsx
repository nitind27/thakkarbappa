// components/manage/Clusteradd.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { clusterdata, Schooldata, TblHostel } from "../type";
import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
import { validateClusterName } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import Loader from "@/common/Loader ";

type Props = {
    initialClusterData: clusterdata[];
    Schooldata: Schooldata[];
    TblHostel: TblHostel[];
};

const MissionPeak = ({ initialClusterData, Schooldata, TblHostel }: Props) => {
    const t = useTranslations("IndexPage");
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [clusterData, setClusterData] =
        useState<clusterdata[]>(initialClusterData); // State for cluster data
    const confirm = createConfirmation(ConfirmationDialog);
    const [designation, setDesignation] = useState();
    const [studentname, setStudentName] = useState();
    const [SchoolHostelType, setSchoolostelType] = useState();
    const [SchoolHostelName, setSchoolHostelName] = useState();
    const [Subject, setSubject] = useState("");
    const [TestDate, setTestDate] = useState("");
    const [Totalmarks, setTotalmarks] = useState("");
    const [obtainmarks, setObtainMarks] = useState("");
    const [Percentage, setPercentage] = useState("");
    const data = clusterData
        .map((cluster) => ({
            cluster_id: cluster.cluster_id,
            cluster_name: cluster.cluster_name,
            status: cluster.status,
            ins_date_time:
                typeof cluster.ins_date_time === "string"
                    ? formatDate(cluster.ins_date_time)
                    : formatDate(cluster.ins_date_time.toISOString()),
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
            accessorKey: "cluster_name",
            header: `${t("clustername")}`,
        },
        {
            accessorKey: "status",
            header: `${t("Status")}`,
        },
        {
            accessorKey: "ins_date_time",
            header: `${t("AddTime")}`,
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
                            handleDeactivate(row.original.cluster_id, row.original.status)
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
    useEffect(() => {
        if (Totalmarks !== "" && obtainmarks !== "") {
            const total = parseFloat(Totalmarks);
            const obtained = parseFloat(obtainmarks);

            if (total > 0 && obtained >= 0) {
                const percent = (obtained / total) * 100;
                setPercentage(percent as any);
                // setPercentage(percent.toFixed(2) + "%");
            } else {
                setPercentage("");
            }
        } else {
            setPercentage("");
        }
    }, [Totalmarks, obtainmarks]);
    const handleDeactivate = async (clusterId: any, currentStatus: any) => {
        const confirmMessage =
            currentStatus === "Active"
                ? "Are you sure you want to deactivate this cluster?"
                : "Are you sure you want to activate this cluster?";
        const confirmed = await confirm({ confirmation: confirmMessage });
        if (confirmed) {
            try {
                const response = await fetch(`/api/clustersapi/clusters/${clusterId}`, {
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
                            cluster.cluster_id === clusterId
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

        setIsLoading(true); // Start loading

        try {
            const method = updateClusterId ? "PUT" : "POST";
            const url = updateClusterId
                ? `/api/missionsikhari/update/updateCluster`
                : `/api/missionsikhari/insert`;

            // Prepare the request body
            const requestBody = {
                designation: designation,
                studentname: studentname,
                schoolhosteltype: SchoolHostelType,
                schoolhostelname: SchoolHostelName,
                subject: Subject,
                testdate: TestDate,
                totalmarks: Totalmarks,
                obtainmarks: obtainmarks,
                percentage: String(Percentage),
                ...(updateClusterId && { id: updateClusterId }),
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
                            cluster.cluster_id === updateClusterId
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

    const handleEdit = (cluster: any) => {
        setUpdateClusterId(cluster.cluster_id); // Set ID for updating
        setClusterName(cluster.cluster_name); // Set current name for editing
        handleShowPrint(); // Open modal for editing
    };

    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setClusterName("");
        setError("");
        setUpdateClusterId(null); // Reset update ID when closing
    };


    return (
        <div>
            <Table
                data={[]}
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
                size="xl"
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                title={updateClusterId ? `Mission Shikhar` : `Mission Shikhar`}
                formData={{
                    fields: [
                        {
                            label: `Designation`,
                            value: designation, // Default value when updating
                            onChange: (e: any) => setDesignation(e.target.value),
                            type: "select",
                            className: "col-2",
                            options: [
                                {
                                    label: "Mr",
                                    value: "Mr",
                                },
                                { label: "Miss", value: "Miss" },

                            ],
                            placeholder: 'Designation', // Optional placeholder for select input
                        },

                        {
                            label: `Student Name`,
                            value: studentname,
                            type: "text",
                            className: "col-4",
                            placeholder: `Student Name`,
                            required: true,
                            onChange: (e: any) => setStudentName(e.target.value),
                        },

                        {
                            label: `School/Hostel Type`,
                            value: SchoolHostelType, // Default value when updating
                            onChange: (e: any) => setSchoolostelType(e.target.value),
                            type: "select",
                            className: "col-2",
                            options: [
                                {
                                    label: "शासकीय",
                                    value: "Govt",
                                },
                                { label: "अनुदानित", value: "Aided" },
                                { label: "एकलव्य", value: "एकलव्य" },
                                { label: "वसती गृह", value: "वसती गृह" },
                                { label: "इतर", value: "इतर" },

                            ],
                            placeholder: `School/Hostel Type`, // Optional placeholder for select input
                        },


                        {
                            label: `School/Hostel Name`,
                            value: SchoolHostelName,
                            type: "select",
                            options: SchoolHostelType !== "वसती गृह" ? Schooldata
                                .filter((type) =>
                                    type.school_type == SchoolHostelType

                                )
                                .map((yojna) => ({
                                    value: yojna.school_name,
                                    label: yojna.school_name,
                                })) : TblHostel
                                    .filter((type) =>
                                        type.hostel_type == SchoolHostelType

                                    )
                                    .map((yojna) => ({
                                        value: yojna.hostel_type,
                                        label: yojna.hostel_type,
                                    })),
                            className: "col-4",
                            placeholder: `School/Hostel Name`,
                            required: true,
                            onChange: (e: any) => setSchoolHostelName(e.target.value),
                        },

                        {
                            label: `Subject`,
                            value: Subject, // Default value when updating
                            onChange: (e: any) => setSubject(e.target.value),
                            type: "select",
                            className: "col-4",
                            options: [
                                {
                                    label: "Chemistry",
                                    value: "Chemistry",
                                },
                                { label: "Physics", value: "Physics" },
                                { label: "Biology", value: "Biology" },
                                { label: "Mathematics", value: "Mathematics" },

                            ],
                            placeholder: `Subject`, // Optional placeholder for select input
                        },

                        // chemistry
                        {
                            label: `Test Date`,
                            value: TestDate,
                            type: "date",

                            className: "col-2",
                            placeholder: `Test Date`,
                            required: true,
                            onChange: (e: any) => setTestDate(e.target.value),
                        },
                        {
                            label: `Total marks`,
                            value: Totalmarks,
                            type: "text",
                            className: "col-2",
                            placeholder: `Total marks`,
                            required: true,
                            onChange: (e: any) => setTotalmarks(e.target.value),
                        },
                        {
                            label: `Obtain Marks`,
                            value: obtainmarks,
                            type: "text",
                            className: "col-2",
                            placeholder: `Obtain Marks`,
                            required: true,
                            onChange: (e: any) => setObtainMarks(e.target.value),
                        },
                        {
                            label: `Percentage`,
                            value: Percentage,
                            type: "text",
                            disabled: "true",
                            className: "col-2",
                            placeholder: `Percentage`,
                            // required: true,
                            onChange: (e: any) => setPercentage(e.target.value),
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

export default MissionPeak;
