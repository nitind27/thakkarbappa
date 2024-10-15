"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import type {
  Bank,
  grampanchayat,

  talukasdata,
  Villages,
  YojanaYear,
} from "../type";
import { toast } from "react-toastify";
import { formatDate } from "@/lib/utils";

type Props = {
  Villages: Villages[];
  talukas: talukasdata[]; // To store the fetched talukasData
  grampanchayat: grampanchayat[];
  initialBankData: Bank[];
  YojnaYear: YojanaYear[];
};

const BankData = ({ initialBankData, YojnaYear }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNo, setaccountNo] = useState("");
  const [yojanayearid, setyojanayearid] = useState<number | string>("");
  const [amount, setamount] = useState<number | string>("");

  const [status, setStatus] = useState<string>("Active");
  const [error, setError] = useState<string>("");
  const [updateTownId, setUpdateTownId] = useState<number | null>(null);


  const [BankData, setBankData] = useState<Bank[]>(initialBankData);

  const yojna_year = YojnaYear.reduce((acc, year: YojanaYear) => {
    acc[year.yojana_year_id] = year.yojana_year; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);

  const data = BankData.map((BankData) => ({
    id: BankData.id,
    name: BankData.name,
    year_id: BankData.yojana_year_id,
    account_no: BankData.account_no,
    yojana_year_id: yojna_year[BankData.yojana_year_id],
    amount: BankData.amount,
    status: BankData.status,
    // ins_date_time:BankData.ins_date_time,
    ins_date_time:
      typeof BankData.ins_date_time === "string"
        ? formatDate(BankData.ins_date_time)
        : formatDate(BankData.ins_date_time.toISOString()),

  }));

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "account_no", header: "Account No" },
    { accessorKey: "yojana_year_id", header: "Yojana" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "ins_date_time", header: "Ins Date" },


    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div style={{ display: 'flex' }}>

          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.original)}>Edit</button>
          <button
            className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"
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



  const handleDeactivate = async (
    bankid: number | string,
    currentStatus: string
  ) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this cluster?"
        : "Are you sure you want to activate this cluster?";

    if (window.confirm(confirmMessage)) {
      try {
        const newStatus = currentStatus === "Active" ? "Deactive" : "Active";

        const response = await fetch(`/api/bank/delete/${bankid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          setBankData((prevData) =>
            prevData.map((mahasul) =>
              mahasul.id === bankid
                ? { ...mahasul, status: newStatus }
                : mahasul
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
    setBankName("");
    setaccountNo("");
    setyojanayearid("");
    setamount("");

    setStatus("Active");
    setError("");
    setUpdateTownId(null);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input fields
    if (!bankName || !accountNo || !yojanayearid || !amount) {
      setError("All fields are required.");
      return;
    }

    // Ensure the id is included for updates
    const bodyData = {
      id: updateTownId, // Include the ID for updates
      yojana_year_id: yojanayearid,
      name: bankName,
      account_no: accountNo,
      amount,
      status,
    };

    try {
      const method = updateTownId ? "PUT" : "POST";
      const url = updateTownId ? `/api/bank/update` : `/api/bank/insert`;

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
    setBankName(gp.name); // Use gp.gp_id to set the bankName
    setaccountNo(gp.account_no);
    setyojanayearid(gp.year_id);
    setamount(gp.amount);

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
            ? "Update Bank Details"
            : "Insert Bank Details"
        }
        formData={{
          fields: [
            {
              label: "Select Year",
              value: yojanayearid,
              onChange: (e) => setyojanayearid(e.target.value),
              type: "select",
              options: YojnaYear.map((year: YojanaYear) => ({
                value: year.yojana_year_id,
                label: year.yojana_year,
              })),
              placeholder: "Select Taluka", // Optional placeholder for select input
            },
            {
              label: "Bank Name:",
              value: bankName, // Ensure this uses bankName
              type: "text",
              placeholder: "Enter Bank name",
              onChange: (e) => setBankName(e.target.value), // Keep this to set bankName

            },

            {
              label: "Account No",
              value: accountNo || "",
              type: "text",
              placeholder: "Enter Account No",
              onChange: (e) => setaccountNo(e.target.value),
            },

            {
              label: "Amount",
              value: amount || "",
              type: "text",
              placeholder: "Enter Account No",
              onChange: (e) => setamount(e.target.value),
            },
          ],
          error,
        }}
        submitButtonLabel="Submit"
      />
    </div>
  );
};

export default BankData;
