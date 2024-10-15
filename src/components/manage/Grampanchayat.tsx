"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { grampanchayat, talukasdata } from "../type";
import { toast } from "react-toastify";
import { validateFormgrampanchayat } from "@/utils/Validation";

type Props = {
  grampanchayat: grampanchayat[];
  talukas: talukasdata[]; // Accept talukas as a prop
};

const Grampanchayat = ({ grampanchayat, talukas }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [townName, setTownName] = useState("");
  const [nameMarathi, setNameMarathi] = useState("");
  const [talukaId, setTalukaId] = useState<number | string>("");
  const [population, setPopulation] = useState<number | string>("");
  const [error, setError] = useState<string>("");
  const [updateTownId, setUpdateTownId] = useState<number | null>(null);
  const [grampanchayatData, setGrampanchayatData] =
    useState<grampanchayat[]>(grampanchayat);

  // Create a map from taluka_id to taluka name
  const talukaMap = talukas.reduce((acc, taluka: any) => {
    acc[taluka.id] = taluka.name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);

  const data = grampanchayatData.map((gp) => ({
    id: gp.id,
    name: gp.name,
    name_marathi: gp.name_marathi,
    taluka_name: talukaMap[gp.taluka_id] || "Unknown", // Map taluka_id to taluka name
    t_id: gp.taluka_id,
    population: gp.population,
    status: gp.status,
  })).reverse();

  const columns = [
    {
      accessorKey: "serial_number", // Use a new accessor for the serial number
      header: "S.No", // Header for the serial number
      cell: ({ row }: any) => (
        <div>
          {row.index + 1} {/* Display the index + 1 for serial number */}
        </div>
      ),
    },
    { accessorKey: "name", header: "Grampanchayat" },
    { accessorKey: "name_marathi", header: "Name (Marathi)" },
    { accessorKey: "taluka_name", header: "Taluka Name" },
    { accessorKey: "population", header: "Population" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div style={{ display: "flex" }}>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row.original)}
          >

            <KTIcon iconName={"pencil"} className="fs-6" iconType="solid" />
            Edit
          </button>
          <button
            className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"
              } ms-5`}
            onClick={() =>
              handleDeactivate(row.original.id, row.original.status)
            }
          >
            <KTIcon iconName={"status"} className="fs-6" iconType="solid" />
            {row.original.status === "Active" ? "Deactive" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  const handleDeactivate = async (
    grampanchayatid: number | string,
    currentStatus: string
  ) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this cluster?"
        : "Are you sure you want to activate this cluster?";

    if (window.confirm(confirmMessage)) {
      try {
        const newStatus = currentStatus === "Active" ? "Deactive" : "Active";

        const response = await fetch(
          `/api/grampanchayat/delete/${grampanchayatid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (response.ok) {
          setGrampanchayatData((prevData) =>
            prevData.map((taluka) =>
              taluka.id === grampanchayatid
                ? { ...taluka, status: newStatus }
                : taluka
            )
          );
          toast.success(
            `Cluster ${newStatus === "Active" ? "activated" : "deactivated"
            } successfully!`
          );
        } else {
          const errorData = await response.json();
          toast.error(
            `Failed to change the cluster status: ${errorData.error || "Unknown error"
            }`
          );
        }
      } catch (error) {
        console.error("Error changing the cluster status:", error);
        toast.error("An unexpected error occurred.");
      }
    }
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

    const errorMsg = validateFormgrampanchayat(townName, nameMarathi, String(talukaId), String(population));
    if (errorMsg) {
      setError(errorMsg.join("<br />"));
      return;
    }



    try {
      const method = updateTownId ? "PUT" : "POST";
      const url = updateTownId
        ? `/api/grampanchayat/update`
        : `/api/grampanchayat/insert`;

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
        toast.success(
          `Grampanchayat ${updateTownId ? "updated" : "inserted"} successfully!`
        );

        // Update local state without page reload
        if (!updateTownId) {
          // If inserting a new entry
          const newGrampanchayat = await response.json();
          setGrampanchayatData((prevData) => [...prevData, newGrampanchayat]);
        } else {
          // If updating an existing entry
          setGrampanchayatData((prevData: any) =>
            prevData.map((gp: any) =>
              gp.id === updateTownId ? { ...gp, ...bodyData } : gp
            )
          );
        }

        handleClosePrint();
      } else {
        const data = await response.json();

        toast.error(
          `Failed to ${updateTownId ? "update" : "insert"} Grampanchayat: ${data.error
          }`
        );
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleEdit = (gp: any) => {
    setUpdateTownId(gp.id); // Set the ID of the Grampanchayat being edited
    setTownName(gp.name); // Set the name of the Grampanchayat
    setNameMarathi(gp.name_marathi); // Set the Marathi name
    setTalukaId(gp.t_id); // Set the Taluka ID
    setPopulation(gp.population); // Set the population
    handleShowPrint(); // Show the modal for editing
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
            <KTIcon iconName={"plus-circle"} className="fs-3" iconType="solid" />
            Add Grampanchayat
          </Button>
        }
      />

      <CustomModal
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={
          updateTownId
            ? "Update Grampanchayat Details"
            : "Insert Grampanchayat Details"
        }
        formData={{
          fields: [
            {
              label: "Enter Grampanchayat Name:",
              value: townName,
              onChange: (e) => setTownName(e.target.value),
              type: "text",
              placeholder: "Enter grampanchayat name",
            },
            {
              label: "Enter Name (Marathi):",
              value: nameMarathi,
              type: "text",
              placeholder: "Enter Marathi name",
              onChange: (e) => setNameMarathi(e.target.value),
            },
            {
              label: "Select Taluka:",
              value: talukaId,
              onChange: (e) => setTalukaId(e.target.value),
              type: "select",
              options: talukas.map((taluka: any) => ({
                value: taluka.id,
                label: taluka.name,
              })),
              placeholder: "Select Taluka", // Optional placeholder for select input
            },

            {
              label: "Enter Population:",
              value: population || "",
              type: "text",
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
