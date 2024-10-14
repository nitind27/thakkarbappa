"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { grampanchayat, talukasdata, Villages } from "../type";
import { toast } from "react-toastify";

type Props = {
  Villages: Villages[];
  talukas: talukasdata[]; // To store the fetched talukasData
  grampanchayat: grampanchayat[];
};

const Mahsulgaav = ({ Villages, talukas, grampanchayat }: Props) => {
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
  const [filteredGrampanchayat, setFilteredGrampanchayat] = useState<
    grampanchayat[]
  >([]);

  const [mahsulgaav, setMahsulgaav] = useState<Villages[]>(Villages);

  const talukaMap = talukas.reduce((acc, taluka: any) => {
    acc[taluka.id] = taluka.name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const gpMap = grampanchayat.reduce((acc, gp: any) => {
    acc[gp.id] = gp.name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);

  const data = mahsulgaav.map((villages) => ({
    id: villages.id,
    t_id: villages.taluka_id,
    g_id: villages.gp_id,
    taluka_id: talukaMap[villages.taluka_id],
    gp_id: gpMap[villages.gp_id],
    name: villages.name,
    name_marathi: villages.name_marathi,
    total_population: villages.total_population,
    trible_population: villages.trible_population,
    arthik_maryada: villages.arthik_maryada,
    village_type: villages.village_type,
    status: villages.status,
  }));

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
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </button>
          <button
            className={`btn btn-sm ${
              row.original.status === "Active" ? "btn-danger" : "btn-warning"
            } ms-5`}
            onClick={() =>
              handleDeactivate(row.original.id, row.original.status)
            }
          >
            {row.original.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (talukaId) {
      const filtered = grampanchayat.filter((gp) => gp.taluka_id == talukaId);

      setFilteredGrampanchayat(filtered);
    } else {
      setFilteredGrampanchayat(grampanchayat); // Reset if no Taluka is selected
    }
  }, [talukaId, grampanchayat]);

  const handleDeactivate = async (
    mahasulid: number | string,
    currentStatus: string
  ) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this cluster?"
        : "Are you sure you want to activate this cluster?";

    if (window.confirm(confirmMessage)) {
      try {
        const newStatus = currentStatus === "Active" ? "Deactive" : "Active";

        const response = await fetch(`/api/mahasulgaav/delete/${mahasulid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          setMahsulgaav((prevData) =>
            prevData.map((mahasul) =>
              mahasul.id === mahasulid
                ? { ...mahasul, status: newStatus }
                : mahasul
            )
          );
          toast.success(
            `Cluster ${
              newStatus === "Active" ? "activated" : "deactivated"
            } successfully!`
          );
        } else {
          const errorData = await response.json();
          toast.error(
            `Failed to change the cluster status: ${
              errorData.error || "Unknown error"
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
    setTriblePopulation("");
    setArthikMaryada("");
    setVillageType("");
    setStatus("Active");
    setError("");
    setUpdateTownId(null);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !townName ||
      !nameMarathi ||
      !talukaId ||
      !population ||
      !triblePopulation ||
      !arthikMaryada ||
      !villageType
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const method = updateTownId ? "PUT" : "POST";
      const url = updateTownId
        ? `/api/mahasulgaav/update`
        : `/api/mahasulgaav/insert`;

      // Prepare data for submission
      const bodyData = {
        id: updateTownId !== null ? updateTownId : undefined, // Ensure id is only included if it's not null
        taluka_id: talukaId,
        gp_id: townName,
        name: townName,
        name_marathi: nameMarathi,
        total_population: population,
        trible_population: triblePopulation,
        arthik_maryada: arthikMaryada,
        village_type: villageType,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        const newVillage = await response.json(); // Assuming API returns the new village object
        setMahsulgaav((prevData) =>
          prevData.map((mahasul) =>
            mahasul.id === updateTownId ? { ...newVillage } : mahasul
          )
        );
        toast.success(
          `Village ${updateTownId ? "updated" : "inserted"} successfully!`
        );
        handleClosePrint();
      } else {
        const data = await response.json();
        toast.error(
          `Failed to ${updateTownId ? "update" : "insert"} Village: ${
            data.error
          }`
        );
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleEdit = (gp: any) => {
    setUpdateTownId(gp.id);
    setTownName(gp.g_id); // Use gp.gp_id to set the townName
    setNameMarathi(gp.name_marathi);
    setTalukaId(gp.t_id);
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
        title={
          updateTownId
            ? "Update Mahsulgaav Details"
            : "Insert Mahsulgaav Details"
        }
        formData={{
          fields: [
            {
              label: "Select Taluka:",
              value: talukaId || "", // Default value when updating
              onChange: (e) => setTalukaId(e.target.value),
              type: "select",
              options: talukas.map((taluka: any) => ({
                value: taluka.id,
                label: taluka.name,
              })),
              placeholder: "Select Taluka", // Optional placeholder for select input
            },
            {
              label: "Enter Grampanchayat Name:",
              value: townName, // Ensure this uses townName
              type: "select",
              placeholder: "Enter grampanchayat name",
              onChange: (e) => setTownName(e.target.value), // Keep this to set townName
              options: filteredGrampanchayat.map((gp: any) => ({
                value: gp.id,
                label: gp.name,
              })),
            },

            {
              label: "Mahsul Gaav",
              value: nameMarathi || "",
              type: "text",
              placeholder: "Enter Arthik Maryada",
              onChange: (e) => setNameMarathi(e.target.value),
            },
            {
              label: "Enter Village Type",
              value: villageType,
              type: "select",
              placeholder: "Enter grampanchayat name",
              onChange: (e) => setVillageType(e.target.value), // Keep this to set townName
              options: [
                { label: "TCP", value: "TCP" },
                { label: "OTSP", value: "OTSP" },
                // Add other options here if needed
              ],
            },

            {
              label: "population",
              value: population || "",
              type: "text",
              placeholder: "Enter Total Population",
              onChange: (e) => setPopulation(e.target.value),
            },
            {
              label: "Enter Trible Population:",
              value: triblePopulation || "",
              type: "text",
              placeholder: "Enter Trible Population",
              onChange: (e) => setTriblePopulation(e.target.value),
            },
            {
              label: "Enter Arthik Maryada:",
              value: arthikMaryada || "",
              type: "text",
              placeholder: "Enter Arthik Maryada",
              onChange: (e) => setArthikMaryada(e.target.value),
            },
          ],
          error,
        }}
        submitButtonLabel="Submit"
      />
    </div>
  );
};

export default Mahsulgaav;
