
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
import Image from "next/image";
import Link from "next/link";

type Props = {
  initialdisbursementfunds: NidhiVitaran[];
  workmaster: WorkMaster[];
};

const Disbursementfunds = ({ initialdisbursementfunds, workmaster }: Props) => {
  const t = useTranslations("Disbursementfunds");
  const { latitude, longitude } = useLocation();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectwork, setSelectwork] = useState("");
  console.log('fadsf', selectwork)
  const [vitrandate, setVitrandate] = useState("");
  const [Installment, setInstallment] = useState("");
  const [Amount, setAmount] = useState("");
  const [Latitude, setLatitude] = useState(latitude);
  const [Longitude, setLongitude] = useState(longitude);
  const [Adress, setAdress] = useState("");
  const [error, setError] = useState<string>("");
  const [updateClusterId, setUpdateClusterId] = useState<bigint | null>(null);
  const [clusterData, setClusterData] =
    useState<NidhiVitaran[]>(initialdisbursementfunds); // State for cluster data
  const [insertImage, setInsertImage] = React.useState<File | null>(null); // File object for the selected image

  const [imagePreview, setImagePreview] = React.useState<string>(""); // URL for image preview
  const clusterMap = workmaster.reduce((acc, work: WorkMaster) => {
    acc[work.id.toString()] = work.name; // Convert bigint to string
    return acc;
  }, {} as Record<string, string>); // Change Record<number, string> to Record<string, string>
  const data = clusterData
    .map((NidhiVitaran) => ({
      id: NidhiVitaran.id,
      work_master_id: clusterMap[NidhiVitaran.work_master_id.toString()],
      work_id: NidhiVitaran.work_master_id,
      date:
        (NidhiVitaran.date && typeof NidhiVitaran.date === "string")
          ? formatDate(NidhiVitaran.date)
          : (NidhiVitaran.date instanceof Date)
            ? formatDate(NidhiVitaran.date.toISOString())
            : "Invalid date",
      installment: NidhiVitaran.installment,
      amount: NidhiVitaran.amount,
      photo: NidhiVitaran.photo,
      latitude: NidhiVitaran.latitude + " " + NidhiVitaran.longitude,
      address: NidhiVitaran.address,
      status: NidhiVitaran.status,

    })).reverse();
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
    // {
    //   accessorKey: "photo",
    //   header: `${t('attechments')}`,
    // },
    {
      accessorKey: "photo",
      header: `${t('attechments')}`,
      cell: ({ row }: any) => {
        const photoSrc = row.original.photo.startsWith('/') ? row.original.photo : `/${row.original.photo}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={photoSrc}
              alt={t('image')}
              style={{ objectFit: 'cover' }}
              height={100} // Adjust size as needed
              width={100}
            />
            <br />
            <Link href={photoSrc} target="_blank" rel="noopener noreferrer">
              view
            </Link>
          </div>
        );
      },
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
              handleDeactivate(row.original.id, row.original.status)
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

  const handleDeactivate = async (id: any, currentStatus: any) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this Disbursementfundes?"
        : "Are you sure you want to activate this Disbursementfundes?";

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(`/api/disbursementfunds/delete/${id}`, {
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
              cluster.id === id
                ? {
                  ...cluster,
                  status: currentStatus === "Active" ? "Deactive" : "Active",
                }
                : cluster
            )
          );
          toast.success(
            `Disbursementfundes ${currentStatus === "Active" ? "deactivated" : "activated"
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



  const resetForm = () => {
    setSelectwork("");
    setVitrandate("");
    setInstallment("");
    setAmount("");
    setAdress("");

    setImagePreview("");
    setAdress("");
    setAdress("");
    setUpdateClusterId(null);


  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create FormData to handle both file and form data
    const formData = new FormData();
    formData.append('work_master_id', selectwork);
    formData.append('date', vitrandate);
    formData.append('installment', Installment);
    formData.append('amount', Amount);
    formData.append('latitude', latitude !== null ? latitude.toString() : '');
    formData.append('longitude', longitude !== null ? longitude.toString() : '');
    formData.append('address', Adress);

    // Add the image file to the form data if there's an image to upload
    if (insertImage) {
      formData.append('photo', insertImage);
    }

    try {
      // Determine if this is an insert or update operation
      const method = updateClusterId ? "PATCH" : "POST";
      const url = updateClusterId
        ? `/api/disbursementfunds/update`  // If updating, call the update endpoint
        : `/api/disbursementfunds/insert`; // If inserting, call the insert endpoint

      // If updating, include the cluster ID
      if (updateClusterId) {
        formData.append('id', updateClusterId.toString());
      }

      // Send the form data to the backend
      const response = await fetch(url, {
        method,
        body: formData, // Use FormData instead of JSON string
      });

      if (response.ok) {
        const createdData = await response.json();

        if (!updateClusterId) {
          // If inserting a new entry, update the state with the new data
          setClusterData((prevData) => [...prevData, createdData]);
          toast.success("Disbursementfundes inserted successfully!");
        } else {
          // If updating an existing entry, update the specific item in the state
          setClusterData((prevData) =>
            prevData.map((cluster) =>
              cluster.id === updateClusterId ? { ...cluster, ...createdData } : cluster
            )
          );
          toast.success("Disbursementfundes updated successfully!");
        }

        // Reset form and close modal after successful submission
        resetForm();
        handleClosePrint();
      } else {
        // Handle errors from the server
        toast.error(`Failed to ${updateClusterId ? "update" : "insert"} cluster.`);
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    }
  };



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0]; // Type assertion to HTMLInputElement
    if (file) {
      setInsertImage(file); // Store the actual file object
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
  const handleEdit = (NidhiVitaran: any) => {

    setUpdateClusterId(NidhiVitaran.id);
    setSelectwork(NidhiVitaran.work_id.toString());
    setVitrandate(NidhiVitaran.date);
    setInstallment(NidhiVitaran.installment);
    setAdress(NidhiVitaran.address);
    setAmount(NidhiVitaran.amount);

    setImagePreview(NidhiVitaran.photo);

    handleShowPrint(); // Show the modal for editing
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
              type: "date",
              placeholder: `${t('vitrandate')}`,
              onChange: (e) => setVitrandate(e.target.value),
            },
            {
              label: `${t('selectInstallment')}`,
              value: Installment,
              type: "select",
              placeholder: `${t('selectInstallment')}`,
              onChange: (e) => setInstallment(e.target.value),
              options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                // Add other options here if needed
              ],
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
              value: latitude,
              type: "text",
              placeholder: `${t('Latitude')}`,
              onChange: (e) => setLatitude(latitude),
            },
            {
              label: `${t('Longitude')}`,
              value: longitude,
              type: "text",
              placeholder: `${t('Longitude')}`,
              onChange: (e) => setLongitude(longitude),
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
