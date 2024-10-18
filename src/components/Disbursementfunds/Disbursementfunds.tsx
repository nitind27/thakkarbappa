
"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { clusterdata, NidhiVitaran, WorkMaster } from "../type";
import { formatDate } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";

import { useTranslations } from "next-intl";
import { useLocation } from "@/common/LocationComponent";

type Props = {
  initialdisbursementfunds: NidhiVitaran[];
  workmaster: WorkMaster[];
};

const Disbursementfunds = ({ initialdisbursementfunds, workmaster }: Props) => {
  const t = useTranslations("Disbursementfunds");
  const { latitude, longitude } = useLocation();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectwork, setSelectwork] = useState("");
  const [vitrandate, setVitrandate] = useState("");
  const [Installment, setInstallment] = useState("");
  const [Amount, setAmount] = useState("");
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [Adress, setAdress] = useState("");
  const [error, setError] = useState<string>("");
  const [updateClusterId, setUpdateClusterId] = useState<bigint | null>(null);
  const [clusterData, setClusterData] =
    useState<NidhiVitaran[]>(initialdisbursementfunds); // State for cluster data
  const [insertImage, setInsertImage] = React.useState<File | null>(null); // File object for the selected image

  const [imagePreview, setImagePreview] = React.useState<string>(""); // URL for image preview
  // const clusterMap = workmaster.reduce((acc, cluster: WorkMaster) => {
  //   acc[cluster.id] = cluster.name; // Assuming taluka has id and name properties
  //   return acc;
  // }, {} as Record<number, string>);
  const data = clusterData
    .map((NidhiVitaran) => ({
      work_master_id: NidhiVitaran.work_master_id,
      date: NidhiVitaran.date,
      installment: NidhiVitaran.installment,
      amount: NidhiVitaran.amount,
      photo: NidhiVitaran.photo,
      latitude: NidhiVitaran.latitude + " " + NidhiVitaran.longitude,
      address: NidhiVitaran.address,
      status: NidhiVitaran.status,

    }))
    .reverse(); // Reverse the order to show the last added items first
  const columns = [
    {
      accessorKey: "serial_number", // Use a new accessor for the serial number
      header: `${t('SrNo')}`, // Header for the serial number
      cell: ({ row }: any) => (
        <div>
          {row.index + 1} {/* Display the index + 1 for serial number */}
        </div>
      ),
    },
    {
      accessorKey: "work_master_id",
      header: `${t('work')}`,
    },
    {
      accessorKey: "date",
      header: `${t('VitranDate')}`,
    },
    {
      accessorKey: "installment",
      header: `${t('Installment')}`,
    },
    {
      accessorKey: "amount",
      header: `${t('amount')}`,
    },
    {
      accessorKey: "photo",
      header: `${t('attechments')}`,
    },
    {
      accessorKey: "latitude",
      header: `${t('latlong')}`,
    },

    {
      accessorKey: "address",
      header: `${t('address')}`,
    },
    {
      accessorKey: "status",
      header: `${t('status')}`,
    },
    {
      accessorKey: "actions",
      header: `${t('Action')}`,
      cell: ({ row }: any) => (
        <div style={{ display: "flex" }}>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row.original)}
          >
            {" "}
            <KTIcon iconName={"pencil"} className="fs-6" iconType="solid" />
            {t("edit")}
          </button>
          <button
            className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"
              } ms-5`}
            onClick={() =>
              handleDeactivate(row.original.cluster_id, row.original.status)
            }
          >
            <KTIcon iconName={"status"} className="fs-6" iconType="solid" />
            {row.original.status === "Active"
              ? `${t("Deactive")}`
              : `${t("Active")}`}
          </button>
        </div>
      ),
    },
  ];
  const handleDeactivate = async (clusterId: any, currentStatus: any) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this cluster?"
        : "Are you sure you want to activate this cluster?";

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(`/api/clustersapi/clusters/${clusterId}`, {
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
          setClusterData((prevData) =>
            prevData.map((cluster) =>
              cluster.id === clusterId
                ? {
                  ...cluster,
                  status: currentStatus === "Active" ? "Deactive" : "Active",
                }
                : cluster
            )
          );
          toast.success(
            `Cluster ${currentStatus === "Active" ? "deactivated" : "activated"
            } successfully!`
          );
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
    try {
      const method = updateClusterId ? "PUT" : "POST";
      const url = updateClusterId
        ? `/api/disbursementfunds/insert`
        : `/api/disbursementfunds/insert`;

      // Prepare the request body based on whether we're updating or inserting
      const requestBody = {
        work_master_id: selectwork,
        date: new Date(vitrandate).toISOString(),
        installment: Installment,
        amount: parseFloat(Amount),
        photo: insertImage?.name,
        latitude: Latitude.toString(),
        longitude: Longitude.toString(),
        address: Adress,

        ...(updateClusterId && { cluster_id: updateClusterId }),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Handle successful response
        if (updateClusterId) {
          // Update local state for the updated cluster
          setClusterData((prevData) =>
            prevData.map((cluster: any) =>
              cluster.id == updateClusterId
                ? { ...cluster, ...requestBody }
                : cluster
            )
          );
          toast.success("Cluster updated successfully!");
        } else {
          // New Cluster object without ID since it's auto-incremented
          const createdData = await response.json(); // Assuming API returns created data
          setClusterData((prevData) => [...prevData, createdData]); // Add created data to state
          toast.success("Cluster inserted successfully!");
        }



        handleClosePrint();
      } else {
        toast.error(
          `Failed to ${updateClusterId ? "update" : "insert"} cluster.`
        );
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setInsertImage(file); // Store the actual file object
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
  const handleEdit = (cluster: any) => {
    setUpdateClusterId(cluster.cluster_id); // Set ID for updating
    // setClusterName(cluster.cluster_name); // Set current name for editing
    handleShowPrint(); // Open modal for editing
  };

  const handleShowPrint = () => setShowPrintModal(true);

  const handleClosePrint = () => {
    setShowPrintModal(false);
    // setClusterName("");
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
            <KTIcon
              iconName={"plus-circle"}
              className="fs-3"
              iconType="solid"
            />
            {t("addDisbursement")}
          </Button>
        }
      />

      <CustomModal
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={updateClusterId ? `${t('updatepage')}` : `${t('insertpage')}`}
        imagepriview={imagePreview && <img
          src={imagePreview}
          alt="Preview"
          style={{
            width: "150px", // Set a fixed width for the circular effect
            height: "150px", // Set a fixed height equal to width
            borderRadius: "50%", // Make the image circular
            objectFit: "cover", // Ensure the image covers the circular area
            overflow: "hidden", // Hide overflow to keep the circle shape
          }}
        />
        }
        formData={{
          fields: [
            {
              label: `${t('enterwork')}`,
              value: selectwork,
              type: "select",
              placeholder: `${t('enterwork')}`,
              options: workmaster.map((work: any) => ({
                value: work.id,
                label: work.name,
              })),
              onChange: (e) => setSelectwork(e.target.value),
            },
            {
              label: `${t('vitrandate')}`,
              value: vitrandate,
              type: "text",
              placeholder: `${t('vitrandate')}`,
              onChange: (e) => setVitrandate(e.target.value),
            },
            {
              label: `${t('selectInstallment')}`,
              value: Installment,
              type: "text",
              placeholder: `${t('selectInstallment')}`,
              onChange: (e) => setInstallment(e.target.value),
            },
            {
              label: `${t('enteramount')}`,
              value: Amount,
              type: "text",
              placeholder: `${t('enteramount')}`,
              onChange: (e) => setAmount(e.target.value),
            },
            {
              label: `${t('enterimage')}`,
              value: "", // The value for file input is always empty (HTML behavior)
              type: "file",
              placeholder: `${t('enterimage')}`,
              onChange: handleImageChange, // Handle image change here
            },
            {
              label: `${t('Latitude')}`,
              value: Latitude,
              type: "text",
              placeholder: `${t('Latitude')}`,
              onChange: (e) => setLatitude(e.target.value),
            },
            {
              label: `${t('Longitude')}`,
              value: Longitude,
              type: "text",
              placeholder: `${t('Longitude')}`,
              onChange: (e) => setLongitude(e.target.value),
            },
            {
              label: `${t('enteraddress')}`,
              value: Adress,
              type: "text",
              placeholder: `${t('enteraddress')}`,
              onChange: (e) => setAdress(e.target.value),
            },
          ],
          error,
        }}
        submitButtonLabel={t('submit')}
      />
    </div>
  );
};

export default Disbursementfunds;
