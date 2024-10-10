"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { grampanchayat } from "../type";

type Props = {
    grampanchayat: grampanchayat[];
};

const Grampanchayat = ({ grampanchayat }: Props) => {
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [townName, setTownName] = useState("");
    const [nameMarathi, setNameMarathi] = useState("");
    const [talukaId, setTalukaId] = useState<number | string>("");
    const [population, setPopulation] = useState<number | string>("");
    const [error, setError] = useState<string>("");
    const [updateTownId, setUpdateTownId] = useState<number | null>(null);

    const data = grampanchayat.map((gp) => ({
        id: gp.id,
        name: gp.name,
        name_marathi: gp.name_marathi,
        taluka_id: gp.taluka_id,
        population: gp.population,
        status: gp.status,
    }));

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Grampanchayat" },
        { accessorKey: "name_marathi", header: "Name (Marathi)" },
        { accessorKey: "taluka_id", header: "Taluka Id" },
        { accessorKey: "population", header: "Population" },
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
      setError("");
      setUpdateTownId(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!townName || !nameMarathi || !talukaId || !population) {
            setError("All fields are required.");
            return;
        }

        try {
            const method = updateTownId ? "PUT" : "POST";
            const url = updateTownId
                ? `/api/grampanchayat/update`
                : `/api/grampanchayat/insert`;

            // Prepare data for submission
            const bodyData = {
                id: updateTownId ? updateTownId.toString() : undefined,
                name: townName,
                name_marathi: nameMarathi,
                taluka_id: talukaId,
                population,
            };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                alert(`Grampanchayat ${updateTownId ? "updated" : "inserted"} successfully!`);
                handleClosePrint();
                // Optionally refresh the table data here
            } else {
                const data = await response.json();
                alert(`Failed to ${updateTownId ? "update" : "insert"} Grampanchayat: ${data.error}`);
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
      setPopulation(gp.population);
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
                            label: "Enter Population:",
                            value: population || "",
                            placeholder: "Enter Population",
                            onChange: (e) => setPopulation(e.target.value),
                        },
                    ],
                    error,
                }}
                submitButtonLabel="Submit"
            />
        </div>
    );
};

export default Grampanchayat;