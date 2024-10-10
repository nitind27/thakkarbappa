"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { Villages } from "../type";

type Props = {
    Villages: Villages[];
};

const Mahsulgaav = ({ Villages }: Props) => {
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [townName, setTownName] = useState("");
    const [nameMarathi, setNameMarathi] = useState("");
    const [talukaId, setTalukaId] = useState<number | string>("");
    const [population, setPopulation] = useState<number | string>("");
    const [triblePopulation, setTriblePopulation] = useState<number | string>("");
    const [arthikMaryada, setArthikMaryada] = useState<number | string>("");
    const [villageType, setVillageType] = useState<string>("");
    const [status, setStatus] = useState<string>("Active");
    const [error, setError] = useState<string>("");
    const [updateTownId, setUpdateTownId] = useState<number | null>(null);

    const data = Villages.map((villages) => ({
        id: villages.id,
        taluka_id: villages.taluka_id,
        gp_id: villages.gp_id,
        name: villages.name,
        name_marathi: villages.name_marathi,
        total_population: villages.total_population,
        trible_population: villages.trible_population,
        arthik_maryada: villages.arthik_maryada,
        village_type: villages.village_type,
        status: villages.status,
    }));

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "taluka_id", header: "Taluka ID" },
        { accessorKey: "gp_id", header: "Gp ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "name_marathi", header: "Name (Marathi)" },
        { accessorKey: "total_population", header: "Total Population" },
        { accessorKey: "trible_population", header: "Trible Population" },
        { accessorKey: "arthik_maryada", header: "Arthik Maryada" },
        { accessorKey: "village_type", header: "Village Type" },
        { accessorKey: "status", header: "Status" },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }: any) => (
                <div>
                    <span onClick={() => handleEdit(row.original)}>
                        <KTIcon iconName="notepad-edit" className="fs-1" />
                    </span>
                    <span onClick={() => handleDelete(row.original.id)}>
                        <KTIcon iconName="trash" />
                    </span>
                </div>
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        // Implement deletion logic here
    };

    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        resetForm();
    };

    const resetForm = () => {
        setTownName("");
        setNameMarathi("");
        setTalukaId("");
        setPopulation("");
        setTriblePopulation("");
        setArthikMaryada("");
        setVillageType("");
        setStatus("Active");
        setError("");
        setUpdateTownId(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!townName || !nameMarathi || !talukaId || !population || !triblePopulation || !arthikMaryada || !villageType) {
            setError("All fields are required.");
            return;
        }

        try {
            const method = updateTownId ? "PUT" : "POST";
            const url = updateTownId ? `/api/mahasulgaav/update` : `/api/mahasulgaav/insert`; // Update URL for villages

            // Prepare data for submission
            const bodyData = {
                taluka_id: talukaId,
                gp_id: 2, // Assuming this is the GP ID
                name: townName,
                name_marathi: nameMarathi,
                total_population: population,
                trible_population: triblePopulation,
                arthik_maryada: arthikMaryada,
                village_type: villageType,
                status,
            };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                alert(`Village ${updateTownId ? "updated" : "inserted"} successfully!`);
                handleClosePrint();
                // Optionally refresh the table data here
            } else {
                const data = await response.json();
                alert(`Failed to ${updateTownId ? "update" : "insert"} Village: ${data.error}`);
            }
        } catch (error) {
            console.error("Error during operation:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleEdit = (gp: any) => {
        setUpdateTownId(gp.id);
        setTownName(gp.name);
        setNameMarathi(gp.name_marathi);
        setTalukaId(gp.taluka_id);
        setPopulation(gp.total_population);
        setTriblePopulation(gp.trible_population);
        setArthikMaryada(gp.arthik_maryada);
        setVillageType(gp.village_type);
        setStatus(gp.status);

        handleShowPrint();
    };

    return (
        <div>
            <Table
                data={data}
                columns={columns}
                Button={
                    <Button
                        variant="primary"
                        onClick={() => {
                            resetForm(); // Reset for new entry
                            handleShowPrint();
                        }}
                        className="btn"
                        style={{ minWidth: "120px" }}
                    >
                        <KTIcon iconName={"printer"} className="fs-3" iconType="solid" />
                        Add Grampanchayat
                    </Button>
                }
            />

            <CustomModal
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                title={updateTownId ? "Update Grampanchayat Details" : "Insert Grampanchayat Details"}
                formData={{
                    fields: [
                        {
                            label: "Enter Grampanchayat Name:",
                            value: townName,
                            placeholder: "Enter grampanchayat name",
                            onChange: (e) => setTownName(e.target.value),
                        },
                        {
                            label: "Enter Name (Marathi):",
                            value: nameMarathi,
                            placeholder: "Enter Marathi name",
                            onChange: (e) => setNameMarathi(e.target.value),
                        },
                        {
                            label: "Enter Taluka ID:",
                            value: talukaId || "",
                            placeholder: "Enter Taluka ID",
                            onChange: (e) => setTalukaId(e.target.value),
                        },
                        {
                            label: "Enter Total Population:",
                            value: population || "",
                            placeholder: "Enter Total Population",
                            onChange: (e) => setPopulation(e.target.value),
                        },
                        {
                            label: "Enter Trible Population:",
                            value: triblePopulation || "",
                            placeholder: "Enter Trible Population",
                            onChange: (e) => setTriblePopulation(e.target.value),
                        },
                        {
                            label: "Enter Arthik Maryada:",
                            value: arthikMaryada || "",
                            placeholder: "Enter Arthik Maryada",
                            onChange: (e) => setArthikMaryada(e.target.value),
                        },
                        {
                            label: "Enter Village Type:",
                            value: villageType || "",
                            placeholder: "Enter Village Type",
                            onChange: (e) => setVillageType(e.target.value),
                        }
                    ],
                    error,
                }}
                submitButtonLabel="Submit"
            />
        </div>
    );
};

export default Mahsulgaav;