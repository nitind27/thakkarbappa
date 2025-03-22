// components/manage/Clusteradd.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import '../../assets/parivahan.css'
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

import { Button, Form } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
// import { validateadhikanchaname } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import { formatDate } from "@/lib/utils";
import Tablefilter from "../table/Tablefilter";

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
  const t = useTranslations("parivahan");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [adhikanchaname, setAdhikanchaname] = useState("");
  const workofdates = new Date();
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState(new Set());
  const [installmentpers, setinstallmentpers] = useState<{ [key: string]: string }>({});
console.log("installmentpers",installmentpers)
  const [ParivahanDate, setParivahanDate] = useState(workofdates);
  const [yojnayear, setYojnaYear] = useState("");
  const [beneficiaryid, setbeneficryid] = useState("");
  const [bankname, setBankname] = useState("");
  const [javaksr, setJavakSr] = useState("");
  const [yojanatype, setYojnatype] = useState("");
  const [yojnaname, setYojnaname] = useState("");
  // const [installmentpers, setinstallmentpers] = useState("");
  const [parivahanno, setParivahanNo] = useState("");

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
  const yojnamsteramount = yojanaMaster.reduce((acc, year: YojanaMaster) => {
    acc[year.yojana_id] = year.amount; // Assuming taluka has id and name properties
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
          " / " +
          formatDate(parivhan.parivahan_date.toISOString()),

      parivahandate:
        typeof parivhan.parivahan_date === "string"
          ? formatDate(parivhan.parivahan_date)
          :

          formatDate(parivhan.parivahan_date.toISOString()),

      outward_no: parivhan.outward_no,
      sup_id:
        usersdata[parivhan.sup_id] +
        " " +
        "(" +
        Userdata.filter((user) => user.user_id == parivhan.sup_id).map((users) => users.address) +
        ")" + Userdata.filter((user) => user.user_id == parivhan.sup_id).map((users) => users.contact_no),
      yojana_year_id: yojna_year[parivhan.yojana_year_id],
      yojana_yearid: parivhan.yojana_year_id,

      sup_idusername:
        parivhan.sup_id,
      yojana_type: yojna_type[parivhan.yojana_type as any],
      yojanatype: parivhan.yojana_type,
      yojana_id: yojnamster[parivhan.yojana_id] + "Amount" + yojnamsteramount[parivhan.yojana_id],
      yojanaid: parivhan.yojana_id,
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

  // Displaying the result
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
      header: `${t("parivahandate")}`,
    },
    {
      accessorKey: "outward_no",
      header: `${t("outwardno")}`,
    },
    {
      accessorKey: "sup_id",
      header: `${t("officername")}`,
    },
    {
      accessorKey: "yojana_year_id",
      header: `${t("year")}`,
    },

    {
      accessorKey: "yojana_type",
      header: `${t("yojnatype")}`,
    },
    {
      accessorKey: "yojana_id",
      header: `${t("yojnaname")}`,
    },

    {
      accessorKey: "status",
      header: `${t("Status")}`,
    },


    {
      accessorKey: "actions",
      header: `${t("beneficiary")}`,
      cell: ({ row }: any) => (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  sr
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {t("name")}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {t("total")}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {t("AmountPaid")}
                </th>
              </tr>
            </thead>
            <tbody>

              {data1
                .filter((item) => {
                  // Split the original beneficiary_id by comma and trim whitespace
                  const beneficiaryIds = row.original.beneficiary_id.split(',').map((id: string) => id.trim());
                  return beneficiaryIds.includes(item.beneficiary_id) && row.original.parivahan_no == item.parivahan_no;
                })
                .map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {Beneficiary.filter(
                        (beneficiary) =>
                          beneficiary.beneficiary_id as any == item.beneficiary_id
                      ).map((filteredItem) => filteredItem.yojana_type == '2' ? filteredItem.gat_name : filteredItem.fullname).join(', ')}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {Beneficiary.filter(
                        (beneficiary) =>
                          beneficiary.beneficiary_id as any == item.beneficiary_id
                      ).map((filteredItem) => filteredItem.tot_finance).join(', ')} {/* Joining multiple finance values with a comma */}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {Parivahanbeneficiarys.filter(
                        (beneficiary) =>
                          beneficiary.beneficiary_id as any == item.beneficiary_id
                      ).map((filteredItem) => filteredItem.installment + "%").join(', ')}
                    </td>

                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      ),
    },
    {
      accessorKey: "actions1",
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

  const handleDeactivateupdatebeneficry = async (category_id: any, currentStatus: any) => {
    try {
      let apiUrl = '';
      let updateField = '';
      let updateValue = currentStatus === "No" ? "Yes" : "Yes";
      const installmentValues = Object.values(installmentpers); // Example: ['40', '60']

      // Determine API endpoint and field to update based on installment percentage
      if (installmentValues.includes("40")) {
        apiUrl = `/api/parivahan/updatedata/${category_id}`;
        updateField = "fourty";
      } else if (installmentValues.includes("60")) {
        apiUrl = `/api/parivahan/updatesixty/${category_id}`;
        updateField = "sixty";
      } else if (installmentValues.includes("100")) {
        apiUrl = `/api/parivahan/updatehundred/${category_id}`;
        updateField = 'hundred';
      } else {
        toast.error("Invalid installment percentage");
        return;
      }

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [updateField]: updateValue,
        }),
      });

      if (response.ok) {
        // Update local state logic here if needed
        toast.success(`Beneficiary Updated successfully!`);
      } else {
        toast.error("Failed to update beneficiary status");
      }
    } catch (error) {
      console.error("Error updating beneficiary:", error);
      toast.error("An unexpected error occurred");
    }
  };
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

  const datafilter = Beneficiary.filter((data) => data.yojana_year_id as any == yojnayear && data.yojana_type == yojanatype && data.yojana_id as any == yojnaname && data.status == "Active").map((data) => ({
    gat_name: data.yojana_type == '2' ? data.gat_name : data.fullname,
    tot_finance: data.tot_finance,
    installmentcheck: data.fourty + data.sixty + data.hundred,
    fourty: data.fourty,
    sixty: data.sixty,
    hundred: data.hundred,
    amount_paid: [data.amount_paid],
    caste_id: data.caste_id,
    beneficiary_id: data.beneficiary_id,
  }))




  const beneficiaryidArray = beneficiaryid.split(',').map(id => id.trim());

  const datafilterupdate = Beneficiary.filter((data) =>
    beneficiaryidArray.includes(data.beneficiary_id.toString()) && data.status === "Active").map((data) => ({
      gat_name: data.yojana_type == '2' ? data.gat_name : data.fullname,
      tot_finance: data.tot_finance,
      installmentcheck: data.fourty + data.sixty + data.hundred,
      fourty: data.fourty,
      sixty: data.sixty,
      hundred: data.hundred,
      amount_paid: [data.amount_paid],
      caste_id: data.caste_id,
      beneficiary_id: data.beneficiary_id,
    }))

  const handleCheckboxChange = (beneficiaryId: any, installmentPercentage: any) => {
    setSelectedBeneficiaries(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(beneficiaryId)) {
        newSelection.delete(beneficiaryId); // Uncheck
      } else {
        newSelection.add(beneficiaryId); // Check
      }
      return newSelection;
    });
  };
  const filtercolumns = [
    {
      accessorKey: "serial_number",
      header: () => (
        <div style={{ fontWeight: "bold", padding: "5px" }}>{t("SrNo")}</div>
      ),
      cell: ({ row }: any) => <div>{row.index + 1}</div>,
    },

    {
      accessorKey: "gat_name",
      header: `${t("table1")}`
    },
    {
      accessorKey: "tot_finance",
      header: `${t("table2")}`
    },
    {
      accessorKey: "amount_paid",
      header: `${t("table3")}`
    },

    {
      accessorKey: "actions2",
      header: `${t("table4")}`,
      cell: ({ row }: any) => {
        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setinstallmentpers((prev) => ({
            ...prev,
            [row.id]: e.target.value, // Row-wise state store
          }));
        };
    
        return (
          <div style={{ display: "flex", whiteSpace: "nowrap" }}>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleChange}
              value={installmentpers[row.id] || ""}
            >
              {row.original.amount_paid[0].split(",").map((value: any, index: any) => {
                const conditions = {
                  40: row.original.fourty == "No",
                  60: row.original.sixty == "No",
                  100: row.original.hundred == "No",
                } as any;

                return (
                  <option key={index} value={value} disabled={!conditions[value]}>
                    {conditions[value] ? `${value}%` : "N/A"}
                  </option>
                );
              })}
            </select>
          </div>
        );
      },
    },

    {
      accessorKey: "actions3",
      header: `${t("table5")}`,
      cell: ({ row }: any) => {
        const firstValue = row.original.amount_paid[0].split(',')[0];
        const conditions = {
          "40": row.original.fourty == "Yes",
          "60": row.original.sixty == "Yes",
          "100": row.original.hundred == "Yes",
        } as any;

        return (
          <div style={{ display: "flex", whiteSpace: "nowrap" }} className="mt-3">
            {row.original.amount_paid[0].split(',').length > 0 && (
              <Form.Check
                inline
                disabled={conditions[firstValue] ? true : false}
                name="group2"

                type="checkbox"
                id={`inline-checkbox-1`}
                // onClick={() =>
                //   handleDeactivateupdatebeneficry(
                //     row.original.beneficiary_id,
                //     row.original.fourty
                //   )
                // }
                checked={selectedBeneficiaries.has(row.original.beneficiary_id)} // Controlled component
                onChange={() => handleCheckboxChange(row.original.beneficiary_id, row.original.fourty)} // Use onChange
              
              />
            )}
          </div>
        );
      },
    }



  ];


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true); // Start loading
    const parivahan_no_string = parivahanno ? parivahanno.toString() : "";

    try {
      const method = updateClusterId ? "PUT" : "POST"; // Changed to POST for new entries
      const url = updateClusterId
        ? `/api/parivahan/update`
        : `/api/parivahan/insert`; // Assuming a different endpoint for creating new entries

      // Prepare the request body
      const requestBody = {
        parivahan_date: ParivahanDate,
        outward_no: javaksr,
        sup_id: adhikanchaname,
        parivahan_no: parivahan_no_string,
        yojana_year_id: yojnayear,
        yojana_type: yojanatype,
        yojana_id: yojnaname,
        beneficiary_id: beneficiaryid,

        ...(updateClusterId && { parivahan_id: updateClusterId }),
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
            prevData.map((cluster: any) =>
              cluster.parivahan_id === updateClusterId
                ? {
                  ...cluster,
                  parivahan_date: ParivahanDate,
                  outward_no: javaksr,
                  sup_id: adhikanchaname,
                  parivahan_no: parivahan_no_string,
                  yojana_year_id: yojnayear,
                  yojana_type: yojanatype,
                  yojana_id: yojnaname,
                  beneficiary_id: beneficiaryid,
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

        // Handle multiple checkbox updates here
        for (let beneficiaryId of selectedBeneficiaries) {
          const currentStatus = 'Yes'
          await handleDeactivateupdatebeneficry(beneficiaryId, currentStatus);
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
    console.log("cluster", cluster)
    setbeneficryid(cluster.beneficiary_id)
    setParivahanNo(cluster.parivahan_no)
    setUpdateClusterId(cluster.parivahan_id);
    setAdhikanchaname(cluster.sup_idusername);
    setParivahanDate(cluster.parivahandate);
    setJavakSr(cluster.outward_no);
    setYojnaYear(cluster.yojana_yearid);
    setYojnatype(cluster.yojanatype)
    setBankname(cluster.bankid);
    setYojnaname(cluster.yojanaid)
    handleShowPrint();
  };

  const handleShowPrint = () => setShowPrintModal(true);
  const reset = () => {
    setAdhikanchaname("");
    // setParivahanDate();
    setYojnaYear("");
    setbeneficryid("")
    setBankname("");
    setError("");
    setJavakSr("");
  };
  const handleClosePrint = () => {
    reset();
    setShowPrintModal(false);
    setAdhikanchaname("");
    setError("");
    setbeneficryid("")
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
            {t("submit")}
          </Button>
        }
      />

      <CustomModal
        size="lg"
        show={showPrintModal}
        handleClose={handleClosePrint}
        handleSubmit={handleSubmit}
        filterdata={datafilter.length != 0 && <Tablefilter
          data={updateClusterId ?
            datafilterupdate : datafilter}
          columns={filtercolumns}

        />
        }
        // title={updateClusterId ? `${parivahanno}` : `${parivahanno}`}
        title={updateClusterId ? `${t("updatepage")}` : `${t("updatepage")}`}
        formData={{
          fields: [
            {
              label: `${t("parivahandate")}`,
              value: ParivahanDate,
              type: "date",
              required: true,
              placeholder: `${t("parivahandate")}`,
              className: "col-3",
              onChange: (e: any) => setParivahanDate(e.target.value),
            },
            {
              label: `${t("outwardno")}`,
              value: javaksr,
              type: "text",
              placeholder: `${t("outwardno")}`,
              required: true,
              className: "col-3",
              onChange: (e: any) => setJavakSr(e.target.value),
            },
            {
              label: `${t("officername")}`,
              value: adhikanchaname,
              onChange: (e: any) => setAdhikanchaname(e.target.value),
              type: "select",
              options: Userdata.map((Userdata: TblUsers) => ({
                value: Userdata.user_id,
                label: Userdata.name,
              })),

              placeholder: `${t("officername")}`, // Optional placeholder for select input
              className: "col-6",
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
              className: "col-3",
              placeholder: `${t("year")}`, // Optional placeholder for select input
            },
            {
              label: `${t("yojnatype")}`,
              value: yojanatype,
              onChange: (e: any) => setYojnatype(e.target.value),
              type: "select",
              options: yojnatype.map((yojnatype: TblYojanaType) => ({
                value: yojnatype.yojana_type_id,
                label: yojnatype.yojana_type,
              })),

              placeholder: `${t("yojnatype")}`, // Optional placeholder for select input
              className: "col-3",
            },


            {
              label: `${t('yojnaname')}`,
              value: yojnaname,
              onChange: (e: any) => setYojnaname(e.target.value),
              type: "select",
              className: 'col-6',
              options: yojanaMaster
                .filter((type) =>
                  String(type.yojana_year_id) == yojnayear &&
                  type.yojana_type === yojanatype
                )
                .map((yojna, index) => ({
                  value: yojna.yojana_id,
                  label: index + 1 + ") " + yojna.yojana_name,
                })),
              placeholder: `${t("yojnaname")}`, // Optional placeholder for select input
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
