// components/manage/Clusteradd.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import {
  Bank,
  Categorys,
  SubCategory,
  TblBeneficiary,
  tblparivahan,
  TblParivahanBeneficiary,
  TblUsers,
  TblYojanaType,
  YojanaMaster,
  YojanaYear,
} from "../type";

import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
// import { validatecategoryName } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import { formatDate } from "@/lib/utils";

type Props = {
  initialcategoryData: SubCategory[];
  YojnaYear: YojanaYear[];
  Bankdata: Bank[];
  yojanaMaster: YojanaMaster[];
  category: Categorys[];
  yojnatype: TblYojanaType[];
  Parivahanbeneficiarys: TblParivahanBeneficiary[];
  Parivahantbl: tblparivahan[];
  Beneficiary: TblBeneficiary[];
  Userdata: TblUsers[];
};

const Parivahan = ({
  initialcategoryData,
  YojnaYear,
  Bankdata,
  yojanaMaster,
  category,
  Parivahantbl,
  yojnatype,
  Parivahanbeneficiarys,
  Beneficiary,
  Userdata,
}: Props) => {
  const t = useTranslations("Subcategory");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubCategoryName] = useState("");
  const [yojnayear, setYojnaYear] = useState("");
  const [bankname, setBankname] = useState("");
  const [amount, setAmount] = useState("");
  const [appyojna, setAppyojna] = useState("No");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
  const [parivahandata, setparivahandata] =
    useState<tblparivahan[]>(Parivahantbl); // State for Sub Category data
  const confirm = createConfirmation(ConfirmationDialog);
  const yojna_year = YojnaYear.reduce((acc, year: YojanaYear) => {
    acc[year.yojana_year_id] = year.yojana_year; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const yojna_type = yojnatype.reduce((acc, year: TblYojanaType) => {
    acc[year.yojana_type_id] = year.yojana_type; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const yojnamster = yojanaMaster.reduce((acc, year: YojanaMaster) => {
    acc[year.yojana_id] = year.yojana_name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const usersdata = Userdata.reduce((acc, year: TblUsers) => {
    acc[year.user_id] = year.name; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const beneficiaryname = Beneficiary.reduce((acc, year: TblBeneficiary) => {
    acc[year.beneficiary_id] = year.fullname; // Assuming taluka has id and name properties
    return acc;
  }, {} as Record<number, string>);
  const [currentDate, setCurrentDate] = useState("");


  const data = parivahandata
    .map((parivhan) => ({
      parivahan_id: parivhan.parivahan_id,
      parivahan_no: parivhan.parivahan_no,
      parivahan_date:
        typeof parivhan.parivahan_date === "string"
          ? parivhan.parivahan_no + " " + formatDate(parivhan.parivahan_date)
          : parivhan.parivahan_no +
          " " +
          formatDate(parivhan.parivahan_date.toISOString()),
      outward_no: parivhan.outward_no,
      sup_id:
        usersdata[parivhan.sup_id] +
        " " +
        "(" +
        Userdata.filter((user) => user.user_id == parivhan.sup_id).map((users) => users.address) +
        ")" + Userdata.filter((user) => user.user_id == parivhan.sup_id).map((users) => users.contact_no),
      yojana_year_id: yojna_year[parivhan.yojana_year_id],
      yojana_type: yojna_type[parivhan.yojana_type as any],
      yojana_id: yojnamster[parivhan.yojana_id],
      beneficiary_id: parivhan.beneficiary_id,
      beneficiaryid: beneficiaryname[parivhan.beneficiary_id as any],
      status: parivhan.status,
      ins_date: parivhan.ins_date,
    }))
    .reverse(); // Reverse the order to show the last added items first
  const data1 = Parivahanbeneficiarys.map((parivhan) => ({
    parivahan_id: parivhan.parivahan_id,
    parivahan_no: parivhan.parivahan_no,
    parivahan_date:
      typeof parivhan.parivahan_date === "string"
        ? parivhan.parivahan_no + " " + formatDate(parivhan.parivahan_date)
        : parivhan.parivahan_no +
        " " +
        formatDate(parivhan.parivahan_date.toISOString()),
    outward_no: parivhan.outward_no,
    sup_id: parivhan.sup_id,
    yojana_year_id: yojna_year[parivhan.yojana_year_id],
    yojana_type: yojna_type[parivhan.yojana_type as any],
    yojana_id: yojnamster[parivhan.yojana_id],
    beneficiary_id: parivhan.beneficiary_id,
    status: parivhan.status,
    ins_date: parivhan.ins_date,
  })).reverse(); // Reverse the order to show the last added items first
  const beneficiaryIdsToMatch = data.map((f) => f.beneficiary_id); // This should be an array
  const beneficiaryIdsToMatch1 = data1.map((f) => f.beneficiary_id); // This should be an array
  

// Displaying the result
console.log("MatchingBeneficiaryIDs:", beneficiaryIdsToMatch1);
  const columns = [
    {
      accessorKey: "serial_number",
      header: () => (
        <div style={{ fontWeight: "bold", padding: "5px" }}>{t("SrNo")}</div>
      ),
      cell: ({ row }: any) => <div>{row.index + 1}</div>,
    },

    {
      accessorKey: "parivahan_date",
      header: `${t("year")}`,
    },
    {
      accessorKey: "outward_no",
      header: `Bankname`,
    },
    {
      accessorKey: "sup_id",
      header: `${t("amount")}`,
    },
    {
      accessorKey: "yojana_year_id",
      header: `fasdf`,
    },

    {
      accessorKey: "yojana_type",
      header: `${t("amount")}`,
    },
    {
      accessorKey: "yojana_id",
      header: `${t("amount")}`,
    },
    {
      accessorKey: "beneficiary_id",
      header: `idbe`,
    },
    {
      accessorKey: "status",
      header: `${t("Status")}`,
    },
    {
      accessorKey: "ins_date",
      header: `${t("amount")}`,
    },

    {
      accessorKey: "actions",
      header: `${t("Action")}`,
      cell: ({ row }: any) => (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>

              {data1
                .filter(
                  (item) => item.beneficiary_id == row.original.beneficiary_id
                )

                .map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.original.beneficiaryid}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {Beneficiary.filter(
                        (beneficiary) =>
                          beneficiary.beneficiary_id ==
                          row.original.beneficiary_id
                      ).map((filteredItem) => filteredItem.tot_finance)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ),
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
            {" "}
            <KTIcon iconName={"pencil"} className="fs-6" iconType="solid" />
            {t("edit")}
          </button>
          <button
            className={`btn btn-sm ${row.original.status === "Active" ? "btn-danger" : "btn-warning"
              } ms-5`}
            onClick={() =>
              handleDeactivate(
                row.original.sub_category_id,
                row.original.status
              )
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
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString()); // Formats date only
  }, []);

  const handleDeactivate = async (category_id: any, currentStatus: any) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this subCategory ?"
        : "Are you sure you want to activate this subCategory?";
    const confirmed = await confirm({ confirmation: confirmMessage });
    if (confirmed) {
      try {
        const response = await fetch(`/api/subcategory/delete/${category_id}`, {
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
          setparivahandata((prevData) =>
            prevData.map((cluster) =>
              cluster.parivahan_id === category_id
                ? {
                  ...cluster,
                  status: currentStatus === "Active" ? "Deactive" : "Active",
                }
                : cluster
            )
          );
          toast.success(
            `Sub Category ${currentStatus === "Active" ? "deactivated" : "activated"
            } successfully!`
          );
        } else {
          toast.error("Failed to change the Sub Category status.");
        }
      } catch (error) {
        console.error("Error changing the Sub Category status:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // const errorMsg = validatecategoryName(categoryName);
    // if (errorMsg) {
    //   setError(errorMsg);
    //   return;
    // }

    setIsLoading(true); // Start loading

    try {
      const method = updateClusterId ? "PUT" : "POST";
      const url = updateClusterId
        ? `/api/subcategory/update`
        : `/api/subcategory/insert`;

      // Prepare the request body
      const requestBody = {
        category_id: categoryName,
        sub_category_name: subcategoryName,
        yojana_year_id: yojnayear,
        bank_id: bankname,
        amount: amount,

        ...(updateClusterId && { sub_category_id: updateClusterId }),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        if (updateClusterId) {
          setparivahandata((prevData) =>
            prevData.map((cluster) =>
              cluster.parivahan_id === updateClusterId
                ? {
                  ...cluster,
                  sub_category_name: subcategoryName,
                  category_id: parseInt(categoryName),
                  bank_id: parseInt(bankname),
                  amount: amount as any,
                  yojana_year_id: parseInt(yojnayear),
                }
                : cluster
            )
          );
          toast.success("Sub Category updated successfully!");
        } else {
          const createdData = await response.json();
          setparivahandata((prevData) => [...prevData, createdData]);
          toast.success("Sub Category inserted successfully!");
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
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleEdit = (cluster: any) => {
    setUpdateClusterId(cluster.sub_category_id); // Set ID for updating
    setCategoryName(cluster.categoryid); // Set current name for editing
    setSubCategoryName(cluster.sub_category_name);
    setAmount(cluster.amount);
    setYojnaYear(cluster.yojanayearid);
    setBankname(cluster.bankid);
    handleShowPrint(); // Open modal for editing
  };

  const handleShowPrint = () => setShowPrintModal(true);
  const reset = () => {
    setCategoryName("");
    setSubCategoryName("");
    setYojnaYear("");
    setBankname("");
    setError("");
    setAmount("");
  };
  const handleClosePrint = () => {
    reset();
    setShowPrintModal(false);
    setCategoryName("");
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
            className="btn btn-sm"
          >
            <KTIcon
              iconName={"plus-circle"}
              className="fs-3"
              iconType="solid"
            />
            {t("addsubcategory")}
          </Button>
        }
      />

      <CustomModal
        size="lg"
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        title={updateClusterId ? `${t("updatepage")}` : `${t("insertpage")}`}
        formData={{
          fields: [
            {
              label: `${t("categoryname")}`,
              value: categoryName,
              onChange: (e: any) => setCategoryName(e.target.value),
              type: "select",
              options: category.map((category: Categorys) => ({
                value: category.category_id,
                label: category.category_name,
              })),

              placeholder: `${t("categoryname")}`, // Optional placeholder for select input
              className: "col-3",
            },
            {
              label: `${t("subcategoryname")}`,
              value: subcategoryName,
              type: "date",
              required: true,
              placeholder: `${t("subcategoryname")}`,
              className: "col-3",
              onChange: (e: any) => setSubCategoryName(e.target.value),
            },
            {
              label: `${t("year")}`,
              value: yojnayear,
              onChange: (e: any) => setYojnaYear(e.target.value),
              type: "select",
              options: YojnaYear.map((year: YojanaYear) => ({
                value: year.yojana_year_id,
                label: year.yojana_year,
              })),
              className: "col-6",
              placeholder: `${t("year")}`, // Optional placeholder for select input
            },

            {
              label: `${t("Bankname")}`,
              value: bankname,
              onChange: (e: any) => setBankname(e.target.value),
              type: "select",
              options: Bankdata.map((Bank: Bank) => ({
                value: Bank.id,
                label: Bank.name,
              })),
              className: "col-3",
              placeholder: `${t("Bankname")}`, // Optional placeholder for select input
            },
            {
              label: `${t("amount")}`,
              value: amount,
              type: "text",
              placeholder: `${t("amount")}`,
              required: true,
              className: "col-3",
              onChange: (e: any) => setAmount(e.target.value),
            },
            {
              label: `${t("amount")}`,
              value: amount,
              type: "text",
              placeholder: `${t("amount")}`,
              required: true,
              className: "col-6",
              onChange: (e: any) => setAmount(e.target.value),
            },
          ],
          error,
        }}
        submitButtonLabel={
          updateClusterId
            ? isLoading
              ? "Submitting..."
              : t("editsubmit")
            : isLoading
              ? "Submitting..."
              : t("submit")
        }
        disabledButton={isLoading}
      />
    </div>
  );
};

export default Parivahan;
