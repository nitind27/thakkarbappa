// components/manage/Clusteradd.tsx
"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { OpeningBalance, YojanaYear } from "../type";
import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";

type Props = {
  initialOpenBalanceData: OpeningBalance[];
  YojnaYear: YojanaYear[];
};

const Openingbalanceadd = ({ initialOpenBalanceData, YojnaYear }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [openbalance, setOpenBalanceAdd] = useState("");
  const [bankyear, setbankYear] = useState("");
  const [error, setError] = useState<string>("");
  const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
  const [openbalanceData, setopenbalanceData] = useState<OpeningBalance[]>(initialOpenBalanceData); // State for cluster data

  const yojna_year = YojnaYear.reduce((acc, year: YojanaYear) => {
    acc[year.yojana_year_id] = year.yojana_year; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);


  const data = openbalanceData.map((balance) => ({
    open_bal_id: balance.open_bal_id,
    open_bal: balance.open_bal,
    year_id: yojna_year[balance.year_id],
    y_id: balance.year_id,
    status: balance.status,
    ins_date_time:
      typeof balance.ins_date_time === "string"
        ? formatDate(balance.ins_date_time)
        : formatDate(balance.ins_date_time.toISOString()),
  }));

  const columns = [
    {
      accessorKey: "open_bal_id ",
      header: "ID",
    },
    {
      accessorKey: "open_bal",
      header: "Cluster Name",
    },
    {
      accessorKey: "year_id",
      header: "Year",
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
            onClick={() => handleDeactivate(row.original.open_bal_id, row.original.status)}
          >
            {row.original.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  const handleDeactivate = async (balanceid: any, currentStatus: any) => {
    const confirmMessage = currentStatus === "Active"
      ? "Are you sure you want to deactivate this cluster?"
      : "Are you sure you want to activate this cluster?";

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(`/api/openbalanceadd/delete/${balanceid}`, {
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
          setopenbalanceData(prevData =>
            prevData.map(cluster =>
              cluster.open_bal_id === balanceid
                ? { ...cluster, status: currentStatus === "Active" ? "Deactive" : "Active" }
                : cluster
            )
          );
          toast.success(`Cluster ${currentStatus === "Active" ? "deactivated" : "activated"} successfully!`);
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

    // Validate input fields
    if (!bankyear || !openbalance) {
      setError("All fields are required.");
      return;
    }

    // Ensure the id is included for updates
    const bodyData = {

      open_bal: openbalance,
      year_id: bankyear,
      open_bal_id: updateClusterId,
    };

    try {
      const method = updateClusterId ? "PUT" : "POST";
      const url = updateClusterId ? `/api/openbalanceadd/update` : `/api/openbalanceadd/insert`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        alert(`Village ${updateClusterId ? "updated" : "inserted"} successfully!`);
        handleClosePrint();

        // Optionally refresh the table data here
      } else {
        const data = await response.json();
        alert(`Failed to ${updateClusterId ? "update" : "insert"} Village: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during operation:", error);
      alert("An unexpected error occurred.");
    }
  };




  const handleEdit = (ed: any) => {
    setUpdateClusterId(ed.open_bal_id); // Set ID for updating
    setOpenBalanceAdd(ed.open_bal); // Set current name for editing
    setbankYear(ed.y_id)
    handleShowPrint(); // Open modal for editing
  };

  const handleShowPrint = () => setShowPrintModal(true);

  const handleClosePrint = () => {
    setShowPrintModal(false);
    setOpenBalanceAdd("");
    setbankYear("")
    setError("");
    setUpdateClusterId(null); // Reset update ID when closing
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

      <CustomModal
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={updateClusterId ? "Update Cluster Name" : "Insert Cluster Name"}
        formData={{
          fields: [

            {
              label: "Select Year",
              value: bankyear,
              onChange: (e) => setbankYear(e.target.value),
              type: "select",
              options: YojnaYear.map((year: YojanaYear) => ({
                value: year.yojana_year_id,
                label: year.yojana_year,
              })),
              placeholder: "Select Year", // Optional placeholder for select input
            },
            {
              label: "Amount",
              value: openbalance,
              type: "text",
              placeholder: "Enter Amount",
              error,
              onChange: (e) => setOpenBalanceAdd(e.target.value),
            },
          ],
          error,
        }}
        submitButtonLabel="Submit"
      />

    </div>
  );
};

export default Openingbalanceadd;