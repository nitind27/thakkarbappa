"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { talukasdata } from "../type";

type Props = {
    talukasdata: talukasdata[];
};

const TalukaData = ({ talukasdata }: Props) => {
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [townName, setTownName] = useState("");
    const [error, setError] = useState<string>("");
    const [updateTownId, setUpdateTownId] = useState<number | null>(null);

    const data = talukasdata.map((taluka) => ({
        Id: taluka.id,
        name: taluka.name,
        name_marathi: taluka.name_marathi,
        status: taluka.status,
    }));

    const columns = [
        { accessorKey: "Id", header: "ID" },
        { accessorKey: "name", header: "Taluka" },
        { accessorKey: "name_marathi", header: "Name (Marathi)" },
        { accessorKey: "status", header: "Status" },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }: any) => (
                <div>
                    <span onClick={() => handleEdit(row.original)}>
                        <KTIcon iconName="notepad-edit" className="fs-1" />
                    </span>
                    <span onClick={() => handleDelete(row.original.Id)}>
                        <KTIcon iconName="trash" />
                    </span>
                </div>
            ),
        },
    ];

    const handleDelete = async (talukaId: number) => {
        try {
            const response = await fetch(`/api/townapi/town/delete/${talukaId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                alert("Taluka deleted successfully!");
                // Optionally refresh state here
            } else {
                const data = await response.json();
                alert(`Failed to delete the Taluka: ${data.error}`);
            }
        } catch (error) {
            console.error("Error deleting the Taluka:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleShowPrint = () => setShowPrintModal(true);

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setTownName("");
        setError("");
        setUpdateTownId(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!townName) {
            setError("Taluka name is required.");
            return;
        }

        try {
            const method = updateTownId ? "PUT" : "POST";
            const url = updateTownId
                ? `/api/townapi/town/update`
                : `/api/townapi/town/insert`;

            // Prepare data for submission
            const bodyData = {
                name: townName,
                ...(updateTownId && { id: updateTownId.toString() }), // Convert BigInt to string
            };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                alert(`Taluka ${updateTownId ? "updated" : "inserted"} successfully!`);
                handleClosePrint();
                // Optionally refresh the table data here
            } else {
                const data = await response.json();
                alert(`Failed to ${updateTownId ? "update" : "insert"} Taluka: ${data.error}`);
            }
        } catch (error) {
            console.error("Error during operation:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleEdit = (taluka: any) => {
        setUpdateTownId(taluka.Id);
        setTownName(taluka.name);
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
                        onClick={handleShowPrint}
                        className="btn"
                        style={{ minWidth: "120px" }}
                    >
                        <KTIcon iconName={"printer"} className="fs-3" iconType="solid" />
                        Add Taluka
                    </Button>
                }
            />

            <CustomModal
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                title={updateTownId ? "Update Taluka Name" : "Insert Taluka Name"}


                formData={{
                    fields: [
                        {
                            label: "Enter Taluka Name:",
                            value: townName,
                            placeholder: "Enter taluka name",
                            error,
                            onChange: (e) => setTownName(e.target.value),
                        },

                    ],
                    error,
                }}
                submitButtonLabel="Submit"
            />
        </div>
    );
};

export default TalukaData;