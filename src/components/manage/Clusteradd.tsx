"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { clusterdata } from "../type";
import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";

type Props = {
  clusterdata: clusterdata[];
};

const Clusteradd = ({ clusterdata }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [clusterName, setClusterName] = useState("");
  const [error, setError] = useState<string>("");
  const [updateClusterId, setUpdateClusterId] = useState<number | null>(null); // State for editing

  const data = clusterdata.map((cluster) => ({
    cluster_id: cluster.cluster_id,
    cluster_name: cluster.cluster_name,
    status: cluster.status,
    ins_date_time:
      typeof cluster.ins_date_time === "string"
        ? formatDate(cluster.ins_date_time)
        : formatDate(cluster.ins_date_time.toISOString()),
  }));

  const columns = [
    {
      accessorKey: "cluster_id",
      header: "ID",
    },
    {
      accessorKey: "cluster_name",
      header: "Cluster Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "ins_date_time",
      header: "Add Time",
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div>
          <span onClick={() => handleEdit(row.original)}>
            <KTIcon iconName="notepad-edit" className="fs-1" />
          </span>
          <span onClick={() => handleDelete(row.original.cluster_id)}>
            <KTIcon iconName="trash" />
          </span>
        </div>
      ),
    },
  ];

  const handleDelete = async (clusterId: number) => {
    try {
      const response = await fetch(`/api/clustersapi/clusters/${clusterId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        alert("Cluster deleted successfully!");
        // Optionally refresh or update state here
      } else {
        alert("Failed to delete the cluster.");
      }
    } catch (error) {
      console.error("Error deleting the cluster:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Handle opening and closing modal
  const handleShowPrint = () => setShowPrintModal(true);

  const handleClosePrint = () => {
    setShowPrintModal(false);
    setClusterName("");
    setError("");
    setUpdateClusterId(null); // Reset update ID when closing
  };

  // Handle submitting new or updated cluster name
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!clusterName) {
      setError("Cluster name is required.");
      return;
    }

    try {
      const method = updateClusterId ? "PUT" : "POST"; // Determine method based on update or insert
      const url = updateClusterId
        ? `/api/clustersapi/update/updateCluster`
        : `/api/clustersapi/insert/clusters`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cluster_name: clusterName,
          ...(updateClusterId && { cluster_id: updateClusterId }), // Include ID if updating
        }),
      });

      if (response.ok) {
        alert(
          `Cluster ${updateClusterId ? "updated" : "inserted"} successfully!`
        );
        handleClosePrint();
        // Optionally refresh the table data here
      } else {
        alert(`Failed to ${updateClusterId ? "update" : "insert"} cluster.`);
      }
    } catch (error) {
      console.error("Error during operation:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Handle editing a cluster
  const handleEdit = (cluster: any) => {
    setUpdateClusterId(cluster.cluster_id); // Set ID for updating
    setClusterName(cluster.cluster_name); // Set current name for editing
    handleShowPrint(); // Open modal for editing
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
            Add Cluster
          </Button>
        }
      />

      {/* Use CustomModal for adding/updating a cluster */}
      <CustomModal
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={updateClusterId ? "Update Cluster Name" : "Insert Cluster Name"}
        formData={{
          label: "Enter Cluster Name:",
          value: clusterName,
          placeholder: "Enter cluster name",
          error: error,
          onChange: (e) => setClusterName(e.target.value),
        }}
        submitButtonLabel="Submit"
      />
    </div>
  );
};

export default Clusteradd;
