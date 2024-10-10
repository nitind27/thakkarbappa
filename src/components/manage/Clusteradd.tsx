"use client";
import React, { useState } from "react";

import Table from "../table/Table"; // Adjust path as necessary
import { clusterdata } from "../type";
import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";

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
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.original)}>Edit</button>
          <button
            className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"} ms-5`}
            onClick={() => handleDeactivate(row.original.cluster_id, row.original.status)}
          >
            {row.original.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  const handleDeactivate = async (clusterId: any, currentStatus: any) => {
    const confirmMessage = currentStatus === "Active"
      ? "Are you sure you want to deactivate this cluster?"
      : "Are you sure you want to activate this cluster?";

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(`/api/clustersapi/clusters/${clusterId}`, {
          method: "PATCH", // Use PATCH for updating status
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: currentStatus === "Active" ? "Deactive" : "Active", // Toggle status
          }),
        });

        if (response.ok) {
          toast.success(`Cluster ${currentStatus === "Active" ? "deactivated" : "activated"} successfully!`);
          // Optionally refresh or update state here
        } else {
          toast.error("Failed to change the cluster status.");
        }
      } catch (error) {
        console.error("Error changing the cluster status:", error);
        toast.error("An unexpected error occurred.");
      }
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
        toast.success(`Cluster ${updateClusterId ? "updated" : "inserted"} successfully!`);
        handleClosePrint();
        // Optionally refresh the table data here
      } else {
        toast.error(`Failed to ${updateClusterId ? "update" : "insert"} cluster.`);
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
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
          fields: [
            {
              label: "Enter Cluster Name:",
              value: clusterName,
              placeholder: "Enter Cluster name",
              error,
              onChange: (e) => setClusterName(e.target.value),
            },
          ],
          error,
        }}
        submitButtonLabel="Submit"
      />


    </div>
  );
};

export default Clusteradd;