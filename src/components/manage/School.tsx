"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { clusterdata, Schooldata, talukasdata } from "../type";
import { toast } from "react-toastify";

type Props = {
  initialschoolData: Schooldata[];
  clusterdata:clusterdata[];
  talukas:talukasdata[];
};

const School = ({ initialschoolData ,clusterdata ,talukas }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [schoolId, setSchoolId] = useState<number | string>("");
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [clusterId, setClusterId] = useState<number | string>("");
  const [talukaId, setTalukaId] = useState<number | string>("");
  const [udias, setUdias] = useState("");
  const [stds, setStds] = useState("");
  const [medium, setMedium] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mukhyaName, setMukhyaName] = useState("");
  const [mukhyaContact, setMukhyaContact] = useState("");
  const [mukhyaEmail, setMukhyaEmail] = useState("");
  const [purushName, setPurushName] = useState("");
  const [purushContact, setPurushContact] = useState("");
  const [purushEmail, setPurushEmail] = useState("");
  const [striName, setStriName] = useState("");
  const [striContact, setStriContact] = useState("");
  const [striEmail, setStriEmail] = useState("");
  const [schoolNameMr, setSchoolNameMr] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [error, setError] = useState<string>("");
  const [updateTownId, setUpdateTownId] = useState<number | null>(null);
  const [schooldata, setSchooldata] = useState<Schooldata[]>(initialschoolData);


  const clusterMap = clusterdata.reduce((acc, cluster: clusterdata) => {
    acc[cluster.cluster_id ] = cluster.cluster_name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);

  const talukaMap = talukas.reduce((acc, taluka: any) => {
    acc[taluka.id] = taluka.name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);

  const data = schooldata.map((school) => ({
    school_id: school.school_id,
    school_name: school.school_name,
    address: school.address,
    c_id:school.cluster_id,
    t_id:school.taluka_id,
    cluster_id: clusterMap[school.cluster_id],
    taluka_id: talukaMap[school.taluka_id],
    udias: school.udias,
    stds: school.stds,
    medium: school.school_name,
    email_id: school.email_id,
    mukhya_name: school.mukhya_name,
    mukhya_contact: school.mukhya_contact,
    mukhya_email: school.mukhya_email,
    purush_name: school.purush_name,
    purush_contact: school.purush_contact,
    purush_email: school.purush_email,
    stri_name: school.stri_name,
    stri_email: school.stri_email,
    stri_contact: school.stri_contact,
    school_name_mr: school.school_name_mr,
    status:school.status,
    image_urls: school.image_urls,
  }));

  const columns = [
    {
      accessorKey: "school_id",
      header: "ID",
    },
    {
      accessorKey: "school_name",
      header: "School Name",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "cluster_id",
      header: "Cluster Id",
    },
    {
      accessorKey: "taluka_id",
      header: "Taluka",
    },
    {
      accessorKey: "udias",
      header: "UDIAS",
    },
    {
      accessorKey: "stds",
      header: "STDS",
    },
    {
      accessorKey: "medium",
      header: "Medium",
    },
    {
      accessorKey: "email_id",
      header: "Email Id",
    },
    {
      accessorKey: "mukhya_name",
      header: "Mukhya Name",
    },
    {
      accessorKey: "mukhya_contact",
      header: "Mukhya Contact",
    },
    {
      accessorKey: "mukhya_email",
      header: "Mukhya Email",
    },
    {
      accessorKey: "purush_name",
      header: "Purush Name",
    },
    {
      accessorKey: "purush_contact",
      header: "Purush Contact",
    },
    {
      accessorKey: "purush_email",
      header: "Purush Email",
    },
    {
      accessorKey: "stri_name",
      header: "Stri Name",
    },
    {
      accessorKey: "stri_contact",
      header: "Stri Contact",
    },
    {
      accessorKey: "stri_email",
      header: "Stri Email",
    },

    {
      accessorKey: "school_name_mr",
      header: "School Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "image_urls",
      header: "Image Url",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div style={{ display: "flex" }}>
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
              handleDeactivate(row.original.school_id, row.original.status)
            }
          >
            {row.original.status === "Active" ? "Deactivate" : "Activate"}
          </button>
          <button  onClick={() => handleimage(row.original)}>Image</button>
        </div>
      ),
    },
  ];


  const handleDeactivate = async (
    school_id: number | string,
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
          `/api/school/delete/${school_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (response.ok) {
          setSchooldata((prevData) =>
            prevData.map((school) =>
              school.school_id === school_id
                ? { ...school, status: newStatus }
                : school
            )
          );
          toast.success(
            `School ${newStatus === "Active" ? "activated" : "deactivated"} successfully!`
          )
      
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
    setSchoolId("");
    setSchoolName("");
    setAddress("");
    setClusterId("");
    setTalukaId("");
    setUdias("");
    setStds("");
    setMedium("");
    setEmailId("");
    setMukhyaName("");
    setMukhyaContact("");
    setMukhyaEmail("");
    setPurushName("");
    setPurushContact("");
    setPurushEmail("");
    setStriName("");
    setStriContact("");
    setStriEmail("");
    setSchoolNameMr("");
    setImageUrls("");
    setError("");
    setUpdateTownId(null);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required fields
    if (
      !schoolName ||
      !address ||
      !clusterId ||
      !talukaId ||
      !udias ||
      !emailId
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const method = updateTownId ? "PUT" : "POST";
      const url = updateTownId ? `/api/school/update` : `/api/school/insert`;

      const bodyData = {
        school_id: updateTownId ? updateTownId.toString() : undefined, // School ID if updating
        school_name: schoolName,
        address: address,
        cluster_id: clusterId,
        taluka_id: talukaId,
        udias: udias,
        stds: stds,
        medium: medium,
        email_id: emailId,
        mukhya_name: mukhyaName,
        mukhya_contact: mukhyaContact,
        mukhya_email: mukhyaEmail,
        purush_name: purushName,
        purush_contact: purushContact,
        purush_email: purushEmail,
        stri_name: striName,
        stri_email: striEmail,
        stri_contact: striContact,
        school_name_mr: schoolNameMr, // Marathi name of the school
        image_urls: imageUrls, // Image URLs if any
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        toast.success(
          `School ${updateTownId ? "updated" : "inserted"} successfully!`
        );

        // Update local state without page reload
        if (!updateTownId) {
          // If inserting a new entry
          const newSchool = await response.json();
          setSchooldata((prevData) => [...prevData, newSchool]);
        } else {
          // If updating an existing entry
          setSchooldata((prevData: any) =>
            prevData.map((school: any) =>
              school.school_id === updateTownId
                ? { ...school, ...bodyData }
                : school
            )
          );
        }

        handleClosePrint(); // Close the modal or reset form after submission
      } else {
        const data = await response.json();

        toast.error(
          `Failed to ${updateTownId ? "update" : "insert"} School: ${
            data.error
          }`
        );
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleEdit = (school: any) => {
    setUpdateTownId(school.school_id); // Set the ID of the school being edited
    setSchoolName(school.school_name); // Set the name of the school
    setAddress(school.address); // Set the address
    setClusterId(school.c_id); // Set the Cluster ID
    setTalukaId(school.t_id); // Set the Taluka ID
    setUdias(school.udias); // Set the UDIAS value
    setStds(school.stds); // Set the STDS value
    setMedium(school.medium); // Set the Medium
    setEmailId(school.email_id); // Set the email ID
    setMukhyaName(school.mukhya_name); // Set the Mukhya Name
    setMukhyaContact(school.mukhya_contact); // Set the Mukhya Contact
    setMukhyaEmail(school.mukhya_email); // Set the Mukhya Email
    setPurushName(school.purush_name); // Set the Purush Name
    setPurushContact(school.purush_contact); // Set the Purush Contact
    setPurushEmail(school.purush_email); // Set the Purush Email~
    setStriName(school.stri_name); // Set the Stri Name
    setStriContact(school.stri_contact); // Set the Stri Contact
    setStriEmail(school.stri_email);
    setSchoolNameMr(school.school_name_mr); // Set the school name in Marathi

    handleShowPrint(); // Show the modal for editing
  };
  const handleimage = (school: any) => {
    alert(school.school_id);
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
        title={updateTownId ? "Update School Details" : "Insert School Details"}
        formData={{
          fields: [
           
            {
              label: "School Name",
              value: schoolName,
              type: "text",
              placeholder: "Enter School Name",
              onChange: (e) => setSchoolName(e.target.value),
            },
            {
              label: "Address",
              value: address,
              type: "text",
              placeholder: "Enter Address",
              onChange: (e) => setAddress(e.target.value),
            },


            {
              label: "Select Taluka:",
              value: clusterId || "", // Default value when updating
              onChange: (e) => setClusterId(e.target.value),
              type: "select",
              options: clusterdata.map((cluster: clusterdata) => ({
                value: cluster.cluster_id,
                label: cluster.cluster_name,
              })),
              placeholder: "Select Taluka", // Optional placeholder for select input
            },
          
            // {
            //   label: "Taluka ID",
            //   value: talukaId,
            //   type: "text",
            //   placeholder: "Enter Taluka ID",
            //   onChange: (e) => setTalukaId(e.target.value),
            // },

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
              label: "UDIAS",
              value: udias,
              type: "text",
              placeholder: "Enter UDIAS",
              onChange: (e) => setUdias(e.target.value),
            },
            {
              label: "STDS",
              value: stds,
              type: "text",
              placeholder: "Enter STDS",
              onChange: (e) => setStds(e.target.value),
            },
      

            {
              label: "Medium",
              value: medium || "", // Default value when updating
              onChange: (e) => setMedium(e.target.value),
              type: "select",
        
              options: [
                { label: "Semi English /Marathi", value: "Semi English /Marathi" },
                { label: "Semi English", value: "Semi English" },
                { label: "Marathi", value: "Marathi" },
              ],
              placeholder: "Enter Medium", // Optional placeholder for select input
            },
          
            {
              label: "Email ID",
              value: emailId,
              type: "text",
              placeholder: "Enter Email ID",
              onChange: (e) => setEmailId(e.target.value),
            },
            {
              label: "Mukhya Name",
              value: mukhyaName,
              type: "text",
              placeholder: "Enter Mukhya Name",
              onChange: (e) => setMukhyaName(e.target.value),
            },
            {
              label: "Mukhya Contact",
              value: mukhyaContact,
              type: "text",
              placeholder: "Enter Mukhya Contact",
              onChange: (e) => setMukhyaContact(e.target.value),
            },
            {
              label: "Mukhya Email",
              value: mukhyaEmail,
              type: "text",
              placeholder: "Enter Mukhya Email",
              onChange: (e) => setMukhyaEmail(e.target.value),
            },
            {
              label: "Purush Name",
              value: purushName,
              type: "text",
              placeholder: "Enter Purush Name",
              onChange: (e) => setPurushName(e.target.value),
            },
            {
              label: "Purush Contact",
              value: purushContact,
              type: "text",
              placeholder: "Enter Purush Contact",
              onChange: (e) => setPurushContact(e.target.value),
            },
            {
              label: "Purush Email",
              value: purushEmail,
              type: "text",
              placeholder: "Enter Purush Email",
              onChange: (e) => setPurushEmail(e.target.value),
            },
            {
              label: "Stri Name",
              value: striName,
              type: "text",
              placeholder: "Enter Stri Name",
              onChange: (e) => setStriName(e.target.value),
            },
            {
              label: "Stri Email",
              value: striContact,
              type: "text",
              placeholder: "Enter Stri Contact",
              onChange: (e) => setStriContact(e.target.value),
            },
            {
              label: "Stri Contact",
              value: striEmail,
              type: "text",
              placeholder: "Enter Stri Contact",
              onChange: (e) => setStriEmail(e.target.value),
            },
            {
              label: "School Name (MR)",
              value: schoolNameMr,
              type: "text",
              placeholder: "Enter School Name (MR)",
              onChange: (e) => setSchoolNameMr(e.target.value),
            },
     
          ],
        }}
        submitButtonLabel="Submit"
      />
    </div>
  );
};

export default School;
