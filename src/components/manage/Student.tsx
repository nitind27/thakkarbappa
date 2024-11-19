"use client";
import React, { useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
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

    // {
    //     accessorKey: "profile_photo",
    //     header: `${t('attechments')}`,
    //     cell: ({ row }: any) => {
    //         const photoSrc = row.original.profile_photo.startsWith('/') ? row.original.profile_photo : `/${row.original.profile_photo}`;
    //         const notfound = '/media/img/imgenotfound.jpg'
    //         return (
    //             <div style={{ textAlign: 'center' }}>
    //                 <Image
    //                     src={photoSrc}
    //                     alt={t('image')}
    //                     style={{ objectFit: 'cover' }}
    //                     height={100} // Adjust size as needed
    //                     width={100}
    //                 />
    //                 <br />
    //                 {/* <Link href={photoSrc} target="_blank" rel="noopener noreferrer">
    //       view
    //     </Link> */}
    //             </div>
    //         );
    //     },
    // },
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

    // const errors = validateSchoolForm({

    // });
    // // If there are error messages, set them and prevent submission
    // if (errors.length > 0) {
    //     setError(errors.join("<br />"));
    //     return;
    // }
    setIsLoading(true); // Start loading

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

  const formFields = [
    {
      label: `${t("serialnumber")}`,
      value: serialnumber,
      type: "text",
      required: true,
      placeholder: `${t("serialnumber")}`,
      onChange: (e: any) => setSerialnumber(e.target.value),
    },
    {
      label: `${t("studentName")}`,
      value: studentName,
      type: "text",
      required: true,
      placeholder: `${t("studentName")}`,
      onChange: (e: any) => setStudentName(e.target.value),
    },
    {
      label: `${t("grno")}`,
      value: grno,
      type: "text",
      required: true,
      placeholder: `${t("grno")}`,
      onChange: (e: any) => setGrno(e.target.value),
    },
    {
      label: `${t("saralid")}`,
      value: saralid,
      required: true,
      type: "text",
      placeholder: `${t("saralid")}`,
      onChange: (e: any) => setSaralId(e.target.value),
    },
    {
      label: `${t("Schoolname")}`,
      required: true,
      value: schoolname || "", // Default value when updating
      onChange: (e: any) => setSchoolname(e.target.value),
      type: "select",
      options: schooldata.map((student: Schooldata) => ({
        value: student.school_id,
        label: student.school_name,
      })),
      placeholder: `${t("Schoolname")}`, // Optional placeholder for select input
    },
    {
      label: `${t("std")}`,
      required: true,
      value: standard || "", // Default value when updating
      onChange: (e: any) => setStandard(e.target.value),
      type: "select",
      options: standarddata.map((std: Standarddata) => ({
        value: std.standard_id,
        label: std.standard_name,
      })),
      placeholder: `${t("std")}`, // Optional placeholder for select input
    },
    {
      label: `${t("Monthername")}`,
      value: mothername,
      required: true,
      type: "text",
      placeholder: `${t("Monthername")}`,
      onChange: (e: any) => setMontherName(e.target.value),
    },
    {
      label: `${t("dob")}`,
      value: dob,
      required: true,
      type: "date",
      placeholder: `${t("dob")}`,
      onChange: (e: any) => setDob(e.target.value),
    },

    {
      label: `${t("gender")}`,
      value: gender,
      type: "select",
      placeholder: `${t("gender")}`,
      options: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Other", value: "Oth" },
        // Add other options here if needed
      ],
      onChange: (e: any) => setGender(e.target.value),
    },

    {
      label: `${t("cast")}`,
      value: cast,
      type: "select",
      placeholder: `${t("cast")}`,
      options: [
        { label: "SC", value: "SC" },
        { label: "ST", value: "ST" },
        { label: "OBC", value: "OBC" },
        { label: "SBC", value: "OBC" },
        { label: "NT B", value: "NT B" },
        { label: "General", value: "General" },
        // Add other options here if needed
      ],
      onChange: (e: any) => setCast(e.target.value),
    },

    {
      label: `${t("aadharcard")}`,
      value: aadhaar,
      required: true,
      type: "text",
      placeholder: `eg. 121212121212`,
      onChange: (e: any) => setAadhaar(e.target.value),
    },

    {
      label: `${t("Contact")}`,
      value: contactNo,
      required: true,
      type: "text",
      placeholder: `eg.7359595959`,
      onChange: (e: any) => setContactNo(e.target.value),
    },
    {
      label: `${t("address")}`,
      value: address,
      required: true,
      type: "text",
      placeholder: `${t("address")}`,
      onChange: (e: any) => setAddress(e.target.value),
    },

    {
      label: `${t("sicklecell")}`,
      value: sicklecell,
      type: "select",
      placeholder: `${t("sicklecell")}`,
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },

        // Add other options here if needed
      ],
      onChange: (e: any) => setSicklecell(e.target.value),
    },
  ];
  if (sicklecell === "Yes") {
    formFields.push({
      label: `Sickle Cell Report`,
      value: sicklereport,
      type: "select",
      placeholder: `Select Report Type`,
      options: [
        { label: "AS", value: "AS" },
        { label: "SS", value: "SS" },
      ],
      onChange: (e: any) => setsickleReport(e.target.value),
    });
  }
  // Define your filter options
  const filterOptions = [
    { value: "1st", label: "1st" },
    { value: "2nd", label: "2nd" },
    { value: "3rd", label: "3rd" },
    { value: "4th", label: "4th" },
    { value: "5th", label: "5th" },
    { value: "6th", label: "6th" },
    { value: "7th", label: "7th" },
    { value: "8th", label: "8th" },
    { value: "9th", label: "9th" },
    { value: "10th", label: "10th" },
    { value: "11th Arts", label: "11th Arts" },
    { value: "12th Arts", label: "12th Arts" },
    { value: "11th Science", label: "11th Science" },
    { value: "12th Science", label: "12th Science" },

    // Add more options as needed
  ];

  const retrievedSchoolName = localStorage.getItem("schoolName");
  const retrievedDisplayedNumber = localStorage.getItem("displayedNumber");

  // Check if retrievedDisplayedNumber has a value
  let options;

  if (retrievedDisplayedNumber) {
    // If there is a value, create an options array with only one entry
    options = [
      {
        value: retrievedDisplayedNumber,
        label: retrievedDisplayedNumber,
      },
    ];
  } else {
    // If there is no value, map through standarddata to create the options
    options = standarddata.map((std) => ({
      value: std.standard_name,
      label: std.standard_name,
    }));
  }

  // Check if retrievedSchoolName has a value
  let schoolnameoption;

  if (retrievedSchoolName) {
    // If there is a value, create a schoolnameoption array with only one entry
    schoolnameoption = [
      {
        value: retrievedSchoolName,
        label: retrievedSchoolName, // Assuming you want the same for label
      },
    ];
  } else {
    // If there is no value, map through schooldata to create the options
    schoolnameoption = schooldata.map((student) => ({
      value: student.school_name,
      label: student.school_name,
    }));
  }

  // Uncomment this line to log the third school name option for debugging
  // console.log('fadfaf', schoolnameoption[2]);
  return (
    <div>
      <TableOption
        data={data}
        columns={columns}
        filterOptions={options}
        additionalFilterOptions={schoolnameoption}
        Button={
          <Button
            variant="primary"
            onClick={() => {
              resetForm(); // Reset for new entry
              handleShowPrint();
            }}
            className="btn btn-sm"
          >
            <KTIcon
              iconName={"plus-circle"}
              className="fs-3"
              iconType="solid"
            />
            {t("addschool")}
          </Button>
        }
      />

      <CustomModal
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={updateTownId ? `${t("updatepage")}` : `${t("insertpage")}`}
        formData={{
          fields: formFields as any,
          error: "",
        }}
        submitButtonLabel={
          updateTownId
            ? isLoading
              ? "Submitting..."
              : t("editsubmit")
            : isLoading
              ? "Submitting..."
              : t("submit")
        }
        disabledButton={isLoading}
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
