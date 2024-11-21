"use client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { Schooldata, Standarddata, StudentData } from "../type";
import { toast } from "react-toastify";

import { useTranslations } from "next-intl";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import { createConfirmation } from "react-confirm";
import TableOption from "../table/TableOption";
import { formatDate } from "@/lib/utils";
import ComponentFile from "@/common/ComponentFile";
import AddData from "./AddData";
type Props = {
  initialstudentData: StudentData[];
  schooldata: Schooldata[];
  standarddata: Standarddata[];
};

const Student = ({ initialstudentData, schooldata, standarddata }: Props) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [serialnumber, setSerialnumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grno, setGrno] = useState("");
  const [saralid, setSaralId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [schoolname, setSchoolname] = useState("");
  const [standard, setStandard] = useState("");
  const [mothername, setMontherName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [cast, setCast] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [sicklecell, setSicklecell] = useState("");
  const [sicklereport, setsickleReport] = useState("");
  const [error, setError] = useState<string>("");
  const [updateTownId, setUpdateTownId] = useState<number | null>(null);
  const [studentdata, setstudentdata] =
    useState<StudentData[]>(initialstudentData);
  const t = useTranslations("student");
  const confirm = createConfirmation(ConfirmationDialog);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const schoolmap = schooldata.reduce((acc, school: Schooldata) => {
    acc[school.school_id] = school.school_name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const standardmap = standarddata.reduce((acc, standard: Standarddata) => {
    acc[standard.standard_id] = standard.standard_name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const data = studentdata
    .map((student) => ({
      student_id: student.student_id,
      serial_number: student.serial_number,
      uid: student.uid,
      gr_no: student.gr_no,
      date_of_admision: student.date_of_admision,
      year_add: student.year_add,
      school_id: schoolmap[student.school_id],
      schoolid: student.school_id,
      admited_in_std: student.admited_in_std,
      current_std: standardmap[student.current_std],
      currentstd: student.current_std,
      division: student.division,
      first_name: student.first_name + " " + student.last_name,
      middle_name: student.middle_name,
      last_name: student.last_name,
      date_of_birth: typeof student.date_of_birth === "string"
        ? formatDate(student.date_of_birth)
        : formatDate(student.date_of_birth as any),

      place_of_birth: student.place_of_birth,
      gender: student.gender,
      mother_name: student.mother_name,
      religion: student.religion,
      lang_id: student.lang_id,
      cast: student.cast,
      address: student.address,
      contact_no: student.contact_no,
      full_name: student.full_name,
      user_id: student.user_id,
      cluster_id: student.cluster_id,
      dropout: student.dropout,
      dropout_date_time: student.dropout_date_time,
      status: student.status,
      type_of_students: student.type_of_students,
      saral_id: student.saral_id,
      date_leave: student.date_leave,
      remarks: student.remarks,
      stream: student.stream,
      profile_photo: student.profile_photo,
      sickle_cell: student.sickle_cell,
      aadhaar: student.aadhaar,
      sickle_report: student.sickle_report,
    }))
    .reverse();

  const columns = [
    {
      accessorKey: "serial_number", // Use a new accessor for the serial number
      header: `${t("SrNo")}`, // Header for the serial number
      cell: ({ row }: any) => (
        <div>
          {row.index + 1} {/* Display the index + 1 for serial number */}
        </div>
      ),
    },
    {
      accessorKey: "gr_no",
      header: `${t("grno")}`,
    },
    {
      accessorKey: "full_name",
      header: `${t("studentName")}`,
    },
    {
      accessorKey: "school_id",
      header: `${t("Schoolname")}`,
    },
    {
      accessorKey: "current_std",
      header: `${t("std")}`,
    },

    {
      accessorKey: "uid",
      header: `${t("saralid")}`,
    },
    {
      accessorKey: "mother_name",
      header: `${t("Monthername")}`,
    },
    {
      accessorKey: "date_of_birth",
      header: `${t("dob")}`,
    },

    {
      accessorKey: "gender",
      header: `${t("gender")}`,
    },
    {
      accessorKey: "cast",
      header: `${t("cast")}`,
    },
    {
      accessorKey: "aadhaar",
      header: `${t("aadharcard")}`,
    },
    {
      accessorKey: "contact_no",
      header: `${t("Contact")}`,
    },
    {
      accessorKey: "address",
      header: `${t("address")}`,
    },
    {
      accessorKey: "sickle_cell",
      header: `${t("sicklecell")}`,
    },
    {
      accessorKey: "sickle_report",
      header: `${t("status")}`,
    },

    {
      accessorKey: "actions",
      header: `${t("Action")}`,
      cell: ({ row }: any) => (
        <div style={{ display: "flex", whiteSpace: "nowrap" }}>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row.original)}
          >
            <KTIcon iconName={"pencil"} className="fs-6" iconType="solid" />
            {t("edit")}
          </button>
          <button
            className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"
              } ms-5`}
            onClick={() =>
              handleDeactivate(row.original.student_id, row.original.status)
            }
          >
            <KTIcon iconName={"status"} className="fs-6" iconType="solid" />
            {row.original.status === "Active"
              ? `${t("Deactive")}`
              : `${t("Active")}`}
          </button>
          <button
            className="btn btn-sm btn-primary ms-5"
            onClick={() => handleImageClick(row.original.student_id)}
          >
            Upload Image
          </button>
        </div>
      ),
    },
  ];
  const handleImageClick = (studentId: any) => {
    // Open file input to select image
    setStudentId(studentId);
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && studentId) {
      setSelectedFile(file);
      await uploadImage(studentId as any, file);
    }
  };

  const uploadImage = async (schoolId: number, file: File) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch(`/api/student/upload/${schoolId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Image uploaded successfully!");

        // Update the school data with the new image URL
        const updatedData = studentdata.map((school) =>
          school.school_id === schoolId
            ? { ...school, image_urls: data.image_urls }
            : school
        );
        setstudentdata(updatedData);
      } else {
        toast.error(data.error || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    }
  };
  const handleDeactivate = async (
    student_id: number | string,
    currentStatus: string
  ) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this Student?"
        : "Are you sure you want to activate this Student?";
    const confirmed = await confirm({ confirmation: confirmMessage });
    if (confirmed) {
      try {
        const newStatus = currentStatus === "Active" ? "Deactive" : "Active";

        const response = await fetch(`/api/student/delete/${student_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          setstudentdata((prevData) =>
            prevData.map((school) =>
              school.student_id === student_id
                ? { ...school, status: newStatus }
                : school
            )
          );
          toast.success(
            `School ${newStatus === "Active" ? "activated" : "deactivated"
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
    setSerialnumber("");
    setStudentName("");
    setGrno("");
    setSaralId("");
    setSchoolname("");
    setStandard("");
    setMontherName("");
    setDob("");
    setGender("");
    setCast("");
    setAadhaar("");
    setContactNo("");
    setAddress("");
    setSicklecell("");
    setError("");
    setUpdateTownId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    setIsLoading(true);

    try {
      const method = updateTownId ? "PUT" : "POST";
      const url = updateTownId ? `/api/student/update` : `/api/student/insert`;
      const bodyData = {
        student_id: updateTownId ? updateTownId.toString() : undefined, // School ID if updating
        serial_number: serialnumber,
        full_name: studentName,
        gr_no: grno,
        uid: saralid,
        school_id: schoolname,
        current_std: standard,
        mother_name: mothername,
        date_of_birth: dob,
        gender: gender,
        cast: cast,
        aadhaar: aadhaar,
        contact_no: contactNo,
        address: address,
        sickle_cell: sicklecell,
        sickle_report: sicklecell == "Yes" ? sicklereport : "",
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
          setstudentdata((prevData) => [...prevData, newSchool]);
        } else {
          // If updating an existing entry
          setstudentdata((prevData: any) =>
            prevData.map((student: any) =>
              student.student_id === updateTownId
                ? { ...student, ...bodyData }
                : student
            )
          );
        }
        handleClosePrint(); // Close the modal or reset form after submission
      } else {
        const data = await response.json();

        toast.error(
          `Failed to ${updateTownId ? "update" : "insert"} School: ${data.error
          }`
        );
      }
    } catch (error) {
      console.error("Error during operation:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false); // End loading
    }
  };


  const handleEdit = (student: any) => {
    setUpdateTownId(student.student_id);
    setSerialnumber(student.serial_number);
    setStudentName(student.full_name);
    setGrno(student.gr_no);
    setSaralId(student.uid);
    setSchoolname(student.schoolid);
    setStandard(student.currentstd);
    setMontherName(student.mother_name);
    setDob(student.date_of_birth);
    setGender(student.gender);
    setCast(student.cast);
    setAadhaar(student.aadhaar);
    setContactNo(student.contact_no);
    setAddress(student.address);
    setSicklecell(student.sickle_cell);
    setsickleReport(student.sickle_report);
    handleShowPrint(); // Show the modal for editing
  };
  const handleimage = (school: any) => {
    alert(school.student_id);
  };
  const retrievedSchoolName = localStorage.getItem("schoolName");
  const retrievedDisplayedNumber = localStorage.getItem("displayedNumber");

  let options;

  if (retrievedDisplayedNumber) {

    options = [
      {
        value: retrievedDisplayedNumber,
        label: retrievedDisplayedNumber,
      },
    ];
  } else {

    options = standarddata.map((std) => ({
      value: std.standard_name,
      label: std.standard_name,
    }));
  }


  let schoolnameoption;

  if (retrievedSchoolName) {

    schoolnameoption = [
      {
        value: retrievedSchoolName,
        label: retrievedSchoolName,
      },
    ];
  } else {

    schoolnameoption = schooldata.map((student) => ({
      value: student.school_name,
      label: student.school_name,
    }));
  }


  return (
    <div>
      <TableOption
        data={data}
        columns={columns}
        filterOptions={options}
        additionalFilterOptions={schoolnameoption}
        Button={
          <AddData values={{
            serialnumber: "",
            studentId: "",
            studentName: "",
            grno: "",
            saralid: "",
            isLoading: false,
            schoolname: "",
            standard: "",
            mothername: "",
            dob: "",
            gender: "",
            cast: "",
            aadhaar: "",
            contactNo: "",
            address: "",
            sicklecell: "",
            sicklereport: "",
            error: "", // Added error handling
            updateTownId: null
          }} schooldata={schooldata} standarddata={standarddata} />
        }
      />


      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default Student;
