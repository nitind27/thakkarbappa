"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
import type { Representative } from "../type";

const STATUS_MESSAGES = {
  ACTIVE: "Active",
  DEACTIVE: "Deactive",
  SUCCESS_INSERT: "Representative inserted successfully!",
  SUCCESS_UPDATE: "Representative updated successfully!",
  SUCCESS_ACTIVATE: "Representative activated successfully!",
  SUCCESS_DEACTIVATE: "Representative deactivated successfully!",
  ERROR_UPDATE: "Failed to update Representative.",
  ERROR_INSERT: "Failed to insert Representative.",
  ERROR_STATUS_CHANGE: "Failed to change the Representative status:",
};

type Props = {
  initialRepresentative: Representative[];
};

const Representative = ({ initialRepresentative }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [suvidhaName, setSuvidhaName] = useState("");
  const [error, setError] = useState<string>("");
  const [representativeId, setUpdateRepresentative] = useState<bigint | null>(null);
  const [representative, setRepresentative] = useState<Representative[]>(initialRepresentative);

  const data = representative.map(({ id, name, status }) => ({
    id,
    name,
    status,
  }));

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Pratinidhi",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div style={{ display: "flex" }}>
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.original)}>
            Edit
          </button>
          <button
            className={`btn btn-sm ${row.original.status === STATUS_MESSAGES.ACTIVE ? 'btn-danger' : 'btn-warning'} ms-5`}
            onClick={() => handleDeactivate(row.original.id, row.original.status)}
          >
            {row.original.status === STATUS_MESSAGES.ACTIVE ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ),
    },
  ];

  const handleDeactivate = async (id: number | string, currentStatus: string) => {
    const newStatus = currentStatus === STATUS_MESSAGES.ACTIVE ? STATUS_MESSAGES.DEACTIVE : STATUS_MESSAGES.ACTIVE;
    const confirmMessage = `Are you sure you want to ${newStatus.toLowerCase()} this Representative?`;

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(`/api/Representative/delete/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          setRepresentative((prevData) =>
            prevData.map((rep :any) =>
              rep.id === id ? { ...rep, status: newStatus } : rep
            )
          );
          toast.success(newStatus === STATUS_MESSAGES.ACTIVE ? STATUS_MESSAGES.SUCCESS_ACTIVATE : STATUS_MESSAGES.SUCCESS_DEACTIVATE);
        } else {
          const errorData = await response.json();
          toast.error(`${STATUS_MESSAGES.ERROR_STATUS_CHANGE} ${errorData.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error("Error changing the Representative status:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleShowPrint = () => setShowPrintModal(true);

  const handleClosePrint = () => {
    setShowPrintModal(false);
    setSuvidhaName(""); // Clear input field on close
    setUpdateRepresentative(null); // Reset ID on close
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!suvidhaName) {
      setError("Representative name is required.");
      return;
    }

    try {
      const method = representativeId ? "PUT" : "POST";
      const url = representativeId ? `/api/Representative/update` : `/api/Representative/insert`;

      const bodyData = {
        name: suvidhaName,
        ...(representativeId && { id: representativeId }), // Include ID only if updating
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        if (representativeId) {
          // Update local state for updated Representative
          setRepresentative((prevData) =>
            prevData.map((rep) =>
              rep.id === representativeId ? { ...rep, name: suvidhaName } : rep
            )
          );
          toast.success(STATUS_MESSAGES.SUCCESS_UPDATE);
        } else {
          // Handle the newly created Representative response
          const createdData = await response.json(); // Assuming the response contains the created data
          setRepresentative((prevData) => [...prevData, createdData]); // Add created data to state
          toast.success(STATUS_MESSAGES.SUCCESS_INSERT);
        }

        handleClosePrint();
      } else {
        toast.error(representativeId ? STATUS_MESSAGES.ERROR_UPDATE : STATUS_MESSAGES.ERROR_INSERT);
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleEdit = (suvidha: any) => {
    setUpdateRepresentative(suvidha.id); // Set the ID of the facility being edited
    setSuvidhaName(suvidha.name); // Set the name for editing
    handleShowPrint(); // Show the modal for editing
  };

  return (
    <div>
      <Table
        data={data}
        columns={columns}
        Button={
          <Button variant="primary" onClick={handleShowPrint} className="btn" style={{ minWidth: "120px" }}>
            <KTIcon iconName={"printer"} className="fs-3" iconType="solid" />
            Add Grampanchayat
          </Button>
        }
      />

      <CustomModal
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={representativeId ? "Update Suvidha Details" : "Insert Suvidha Details"}
        formData={{
          fields: [
            {
              label: "Suvidha Name", 
              value: suvidhaName,
              type: "text",
              placeholder: "Enter Suvidha Name", 
              onChange: (e) => setSuvidhaName(e.target.value),
              // errorMessage: error,
            },
          ],
        }}
        submitButtonLabel="Submit"
      />
    </div>
  );
};

export default Representative;