// components/manage/Clusteradd.tsx
"use client";
import React, { useEffect, useState } from "react";
import Table from "../table/Table"; // Adjust path as necessary
import { Bank, Categorys, Facility, grampanchayat, Representative, SubCategory, talukasdata, TblBeneficiary, Villages, WorkMaster, WorkMasterDemo, YojanaYear } from "../type";

import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
// import { validateRepresentativeName } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";

type Props = {
    initialcategoryData: SubCategory[];
    YojnaYear: YojanaYear[];
    Bankdata: Bank[];
    category: Categorys[];
    Workmasters: WorkMasterDemo[];
    Workmastersdata: WorkMasterDemo[];
    reprenstive: Representative[];
    talukas: talukasdata[];
    grampanchayat: grampanchayat[];
    Villages: Villages[];
    facilities: Facility[];
    genid: any;
};

const Workmaster = ({ YojnaYear, Bankdata, category, Workmasters, reprenstive, talukas, grampanchayat, Villages, facilities, Workmastersdata, genid }: Props) => {
    const t = useTranslations("workmaster");
    const workdata = Workmastersdata.filter((data) => data.type !== "work").map((data) => data)


    const [RepresentativeName, setRepresentativeName] = useState(workdata.map((p) => String(p.representative_id)));
    const [subRepresentativeName, setSubRepresentativeName] = useState(workdata.map((p) => String(p.representative_name)));
    const [numberofwork, setNumberofwork] = useState(workdata.map((p) => String(p.number_work)));
    const [workofdate, setworkofdate] = useState(workdata.map((p) => String(p.genratedworkdate)));


    const [estimatetotalamount, setestimatetotalamount] = useState(
        workdata.map((p) => (Array.isArray(p.estimatedtotalamount) ? p.estimatedtotalamount[0] : String(p.estimatedtotalamount)))
    );

    const [showPrintModal, setShowPrintModal] = useState(false);

    const [randomNumber, setRandomNumber] = useState(null);
    const [dist, setDist] = useState("");
    const [town, setTown] = useState("");
    const [mahasulgaav, setMahsulgaav] = useState("");
    const [Facility, setFacility] = useState("");
    const [workname, setWorkname] = useState("");
    const [EstimatedAmount, setEstimatedAmount] = useState("");
    const [Tantricrecognitionamount, setTantricrecognitionamount] = useState("");
    const [Administrativerecognition, setAdministrativerecognition] = useState("No");
    const [Noadministrativerecognition, sestNoadministrativerecognition] = useState("");
    const [Giveadministrativerecognition, setGiveadministrativerecognition] = useState("");
    const [Administrativerecognitionamount, setAdministrativerecognitionamount] = useState("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [workmasterdata, setWorkmaster] =
        useState<WorkMasterDemo[]>(Workmasters); // State for Sub Category data
    const confirm = createConfirmation(ConfirmationDialog);

    const talukaMap = talukas.reduce((acc, taluka: any) => {
        acc[taluka.id] = taluka.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const gpmap = grampanchayat.reduce((acc, gp: any) => {
        acc[gp.id] = gp.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const village = Villages.reduce((acc, gp: Villages) => {
        acc[gp.id] = gp.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const beneficiarys = facilities.reduce((acc, gp: Facility) => {
        acc[gp.id as any] = gp.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const reprenstives = reprenstive.reduce((acc, gp: Representative) => {
        acc[gp.id as any] = gp.name; // Assuming taluka has id and name properties
        return acc;
    }, {} as Record<number, string>);
    const data = workmasterdata
        .map((workmaster) => ({
            id: workmaster.id,
            taluka_id: talukaMap[workmaster.taluka_id as any],
            talukaid: workmaster.taluka_id,
            gp_id: gpmap[workmaster.gp_id as any],
            gpid: workmaster.gp_id,
            village_id: village[workmaster.village_id as any],
            villageid: workmaster.village_id,
            facility_id: beneficiarys[workmaster.facility_id as any],
            facilityid: workmaster.facility_id,
            representative_id: reprenstives[workmaster.representative_id as any],
            representativeid: workmaster.representative_id,
            representative_name: workmaster.representative_name,
            name: workmaster.name,
            estimated_amount: workmaster.estimated_amount,
            tantrik_manyata_amount: workmaster.tantrik_manyata_amount,
            photo: workmaster.photo,
            prashashakiya_manyata: workmaster.prashashakiya_manyata,
            prashashakiya_manyata_no: workmaster.prashashakiya_manyata_no,
            prashashakiya_manyata_date: workmaster.prashashakiya_manyata_date,
            prashashakiya_manyata_amount: workmaster.prashashakiya_manyata_amount,
            latitude: workmaster.latitude,
            longitude: workmaster.longitude,
            address: workmaster.address,
            status: workmaster.status,
            created_at: workmaster.created_at,
            updated_at: workmaster.updated_at,


        }))
        .reverse(); // Reverse the order to show the last added items first

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
            accessorKey: "taluka_id",
            header: `${t("Dist")}`,
        },
        {
            accessorKey: "gp_id",
            header: `${t("grampanchayatname")}`,
        },
        {
            accessorKey: "village_id",
            header: `${t("MahasulGaav")}`,
        },
        {
            accessorKey: "facility_id",
            header: `${t("suvidha")}`,
        },

        {
            accessorKey: "representative_id",
            header: `${t("Representative")}`,
        },
        {
            accessorKey: "representative_name",
            header: `${t("pratinidhi")}`,
        },

        {
            accessorKey: "name",
            header: `${t("workname")}`,
        },
        {
            accessorKey: "estimated_amount",
            header: `${t("estimateamount")}`,
        },
        {
            accessorKey: "tantrik_manyata_amount",
            header: `${t("Tantricrecognitionamount")}`,
        },
        {
            accessorKey: "photo",
            header: `${t("photo")}`,
        },
        {
            accessorKey: "prashashakiya_manyata",
            header: `${t("noadministrativerecognition")}`,
        },
        {
            accessorKey: "prashashakiya_manyata_date",
            header: `${t("AdministrativerecognitionDate")}`,
        },
        {
            accessorKey: "prashashakiya_manyata_no",
            header: `${t("Administrativerecognitionamount")}`,
        },
        {
            accessorKey: "longitude",
            header: `${t("Longitude")}`,
        },
        {
            accessorKey: "latitude",
            header: `${t("Latitude")}`,
        },
        {
            accessorKey: "address",
            header: `${t("address")}`,
        },
        {
            accessorKey: "status",
            header: `${t("Status")}`,
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
                    setWorkmaster((prevData) =>
                        prevData.map((cluster) =>
                            cluster.id === category_id
                                ? {
                                    ...cluster,
                                    status: currentStatus === "Active" ? "Deactive" : "Active",
                                }
                                : cluster
                        )
                    );
                    toast.success(
                        `Workshop ${currentStatus === "Active" ? "deactivated" : "activated"
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

        setIsLoading(true); // Start loading

        try {
            const method = updateClusterId ? "PUT" : "POST";
            const url = updateClusterId
                ? `/api/workshow/update`
                : `/api/workshow/insert`;

            // Prepare the request body
            const workofdate = new Date();
            const Giveadministrativerecognition = new Date();
            const requestBody = {
                representative_id: String(RepresentativeName),
                representative_name: String(subRepresentativeName),
                number_work: String(numberofwork),
                genratedworkdate: workofdate.toISOString(),
                estimatedtotalamount: String(estimatetotalamount),
                generatednumber: genid,
                taluka_id: dist,
                gp_id: town,
                village_id: mahasulgaav,
                facility_id: Facility,
                name: workname,
                estimated_amount: EstimatedAmount,
                tantrik_manyata_amount: Tantricrecognitionamount,
                prashashakiya_manyata: Administrativerecognition,
                prashashakiya_manyata_no: Noadministrativerecognition,
                prashashakiya_manyata_date: Giveadministrativerecognition.toISOString(),
                prashashakiya_manyata_amount: Administrativerecognitionamount,
                ...(updateClusterId && { id: updateClusterId }),
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
                    setWorkmaster((prevData: any) =>
                        prevData.map((cluster: any) =>
                            cluster.id == updateClusterId
                                ? {
                                    ...cluster, representative_id: String(RepresentativeName),
                                    representative_name: String(subRepresentativeName),
                                    number_work: String(numberofwork),
                                    genratedworkdate: workofdate.toISOString(),
                                    estimatedtotalamount: String(estimatetotalamount),
                                    generatednumber: genid,
                                    taluka_id: dist,
                                    gp_id: town,
                                    village_id: mahasulgaav,
                                    facility_id: Facility,
                                    name: workname,
                                    estimated_amount: EstimatedAmount,
                                    tantrik_manyata_amount: Tantricrecognitionamount,
                                    prashashakiya_manyata: Administrativerecognition,
                                    prashashakiya_manyata_no: Noadministrativerecognition,
                                    prashashakiya_manyata_date: Giveadministrativerecognition.toISOString(),
                                    prashashakiya_manyata_amount: Administrativerecognitionamount,
                                }
                                : cluster
                        )
                    );
                    toast.success("Sub Category updated successfully!");
                } else {
                    const createdData = await response.json();
                    setWorkmaster((prevData) => [...prevData, createdData]);
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
        setUpdateClusterId(cluster.id); // Set ID for updating
        setDist(cluster.talukaid)
        setTown(cluster.gpid)
        setMahsulgaav(cluster.villageid)
        setFacility(cluster.facilityid)
        setWorkname(cluster.name)
        setEstimatedAmount(cluster.estimated_amount)
        setTantricrecognitionamount(cluster.tantrik_manyata_amount)
        setAdministrativerecognition(cluster.prashashakiya_manyata)
        sestNoadministrativerecognition(cluster.prashashakiya_manyata_no)
        setGiveadministrativerecognition(cluster.tantrik_manyata_amount)
        setAdministrativerecognitionamount(cluster.prashashakiya_manyata_amount)
        handleShowPrint(); // Open modal for editing
    };

    const handleShowPrint = () => setShowPrintModal(true);
    const reset = () => {
        setUpdateClusterId(null); // Set ID for updating
        setDist("");
        setTown("");
        setMahsulgaav("");
        setFacility("");
        setWorkname("");
        setEstimatedAmount("");
        setTantricrecognitionamount("");
        setAdministrativerecognition("");
        sestNoadministrativerecognition("");
        setGiveadministrativerecognition("");
        setAdministrativerecognitionamount("");
    }
    const handleClosePrint = () => {
        reset();
        setShowPrintModal(false);
        // setRepresentativeName("");
        setError("");
        setUpdateClusterId(null); // Reset update ID when closing
    };


    const generateRandomNumber = () => {
        const number = Math.floor(Math.random() * 90000) + 10000;
        setRandomNumber(number as any);
    };
    useEffect(() => {
        generateRandomNumber();
    }, []); // Empty dependency array means this runs once on mount

    const formFields = [

        {
            label: `${t("Representative")}`,
            value: RepresentativeName,
            onChange: (e: any) => setRepresentativeName(e.target.value),
            type: "select",
            options: reprenstive.map((category: Representative) => ({
                value: category.id,
                label: category.name,
            })),
            disabled: true,
            className: "col-4",
            placeholder: `${t("Representative")}`, // Optional placeholder for select input
        },
        {
            label: `${t("RepresentativeName")}`,
            value: subRepresentativeName,
            type: "text",
            disabled: true,
            className: "col-4",
            placeholder: `${t("RepresentativeName")}`,

            onChange: (e: any) => setSubRepresentativeName(e.target.value),
        },
        {
            label: `${t("numberofworktotal")}`,
            value: numberofwork,
            type: "text",
            className: "col-4",
            disabled: true,
            placeholder: `${t("numberofworktotal")}`,

            onChange: (e: any) => setNumberofwork(e.target.value),
        },
        {
            label: `${t("numberofwork")}`,
            value: workmasterdata.length + 1,
            type: "text",
            className: "col-4",
            disabled: true,
            placeholder: `${t("numberofwork")}`,

            onChange: (e: any) => setNumberofwork(e.target.value),
        },
        {
            label: `${t("AdministrativerecognitionDate")}`,
            value: workofdate,
            type: "date",
            disabled: true,
            className: "col-4",
            placeholder: `${t("AdministrativerecognitionDate")}`,

            onChange: (e: any) => setworkofdate(e.target.value),
        },



        {
            label: `${t("estimateamounttotal")}`,
            value: estimatetotalamount,
            required: true,
            type: "text",
            disabled: true,
            className: "col-4",
            placeholder: `${t("estimateamounttotal")}`,

            onChange: (e: any) => setestimatetotalamount(e.target.value),
        },
        {
            label: `${t("workname")}`,
            value: workname,
            required: true,
            type: "text",

            className: "col-4",
            placeholder: `${t("workname")}`,

            onChange: (e: any) => setWorkname(e.target.value),
        },


        {
            label: `${t("Dist")}`,
            value: dist,
            onChange: (e: any) => setDist(e.target.value),
            type: "select",
            className: "col-4",
            options: talukas.map((taluka: any) => ({
                value: taluka.id,
                label: taluka.name,
            })),
            placeholder: `${t("Dist")}`, // Optional placeholder for select input
        },

        {
            label: `${t("grampanchayatname")}`,
            value: town, // Ensure this uses townName
            type: "select",
            className: "col-4",
            placeholder: `${t('grampanchayatname')}`,
            onChange: (e: any) => setTown(e.target.value), // Keep this to set townName

            options: grampanchayat
                .filter((type) =>
                    String(type.taluka_id) == dist

                )
                .map((yojna) => ({
                    value: yojna.id,
                    label: yojna.name,
                })),
        },


        {
            label: `${t("MahasulGaav")}`,
            value: mahasulgaav,
            type: "select",
            className: "col-4",
            placeholder: `${t('MahasulGaav')}`,
            onChange: (e: any) => setMahsulgaav(e.target.value),
            options: Villages
                .filter((type) =>
                    String(type.taluka_id) == dist &&
                    String(type.gp_id) == town

                )
                .map((yojna) => ({
                    value: yojna.id,
                    label: yojna.name,
                })),
        },
        {
            label: `${t("suvidha")}`,
            value: Facility,

            onChange: (e: any) => setFacility(e.target.value),
            type: "select",
            className: "col-4",
            options: facilities.map((taluka: Facility) => ({
                value: taluka.id,
                label: taluka.name,
            })),
            placeholder: `${t("dist")}`, // Optional placeholder for select input
        },

        {
            label: `${t("estimateamount")}`,
            value: EstimatedAmount,
            required: true,
            type: "text",
            className: "col-4",
            placeholder: `${t("estimateamount")}`,

            onChange: (e: any) => setEstimatedAmount(e.target.value),
        },
        {
            label: `${t("Tantricrecognitionamount")}`,
            value: Tantricrecognitionamount,
            required: true,
            type: "text",
            className: "col-4",
            placeholder: `${t("Tantricrecognitionamount")}`,

            onChange: (e: any) => setTantricrecognitionamount(e.target.value),
        },


        {
            label: `${t("Administrativerecognition")}`,
            value: Administrativerecognition,
            type: "select",
            className: "col-4",
            placeholder: `${t("Administrativerecognition")}`,
            options: [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },

                // Add other options here if needed
            ],
            onChange: (e: any) => setAdministrativerecognition(e.target.value),
        },
    ];
    if (Administrativerecognition === "Yes") {
        formFields.push(
            {
                label: `${t("noadministrativerecognition")}`,
                value: Noadministrativerecognition,
                required: true,
                type: "text",
                className: "col-4",
                placeholder: `${t("noadministrativerecognition")}`,

                onChange: (e: any) => sestNoadministrativerecognition(e.target.value),
            },
            {
                label: `${t("AdministrativerecognitionDate")}`,
                value: Giveadministrativerecognition,
                required: true,
                type: "date",
                className: "col-4",
                placeholder: `${t("AdministrativerecognitionDate")}`,

                onChange: (e: any) => setGiveadministrativerecognition(e.target.value),
            },
            {
                label: `${t("Administrativerecognitionamount")}`,
                value: Administrativerecognitionamount,
                required: true,
                type: "text",
                className: "col-4",
                placeholder: `${t("Administrativerecognitionamount")}`,

                onChange: (e: any) => setAdministrativerecognitionamount(e.target.value),
            },);
    }
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
                        {t("addbenef")}
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
                    fields: formFields as any,
                    error: "",
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

export default Workmaster;