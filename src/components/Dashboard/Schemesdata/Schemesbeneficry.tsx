// components/manage/Clusteradd.tsx
"use client";
import React, { useState } from "react";

import { Bank, Categorys, grampanchayat, SubCategory, talukasdata, Tblbankmaster, TblBeneficiary, TblCaste, TblMembers, TblYojanaType, Villages, YojanaMaster, YojanaYear } from "@/components/type";
import { useRouter } from 'next/navigation';
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
// import { validatecategoryName } from "@/utils/Validation";
import { useTranslations } from "next-intl";
import { createConfirmation } from "react-confirm";
import ConfirmationDialog from "@/common/ConfirmationDialog";
import { formatDate } from "@/lib/utils";

import { usePathname } from "next/navigation";
import Addmembers from "@/components/Schemes/Addmembers";

type Props = {
    initialcategoryData: SubCategory[];
    YojnaYear: YojanaYear[];
    Bankdata: Bank[];
    category: Categorys[];
    beneficiary: TblBeneficiary[];
    yojnatype: TblYojanaType[];
    yojnamaster: YojanaMaster[];
    talukas: talukasdata[];
    grampanchayat: grampanchayat[];
    Villages: Villages[];
    castdata: TblCaste[];
    membersadd: TblMembers[];
    Bankmasterdata: Tblbankmaster[];
    yojnaiddata: String;
};

const
    Schemesbeneficry = ({ initialcategoryData, YojnaYear, Bankdata, category, beneficiary, yojnatype, yojnamaster, talukas, grampanchayat, Villages, castdata, membersadd, Bankmasterdata, yojnaiddata }: Props) => {
        const t = useTranslations("beneficiary");
        const router = useRouter();
        const pathname = usePathname(); // Gets the current URL pathname
        const pathSegments = pathname.split("/").filter(Boolean); // ['en', 'yojna', 'schemes', 'beneficiary', 'beneficiryidwise', '66']
        const filteredPath = pathSegments.slice(1, 5).join("/"); // 'yojna/schemes/beneficiary'

        const [showPrintModal, setShowPrintModal] = useState(false);
        const [showPrintModalvi, setShowPrintModalvi] = useState(false);

        const [showPrintModalgp, setShowPrintModalgp] = useState(false);
        const [townName, setTownName] = useState("");
        const [nameMarathi, setNameMarathi] = useState("");
        const [nameEnglish, setNamenglish] = useState("");
        const [population, setPopulation] = useState<number | string>("");
        const [showPrintModalMembers, setShowPrintModalMembers] = useState(false);
        const [showNumberMembers, setShowNumberMembers] = useState(0);
        const [showBachatNameMembers, setShowBachatnameMembers] = useState("");
        const [categoryName, setCategoryName] = useState("");
        const [subcategoryName, setSubCategoryName] = useState("");
        const [yojnayear, setYojnaYear] = useState("");
        const [yojnatyp, setYojnatype] = useState("");
        const [yojnaname, setYojnaName] = useState("");
        const [dist, setDist] = useState("");
        const [town, setTown] = useState("");
        const [mahasulgaav, setMahsulgaav] = useState("");
        const [bankname, setBankname] = useState("");
        const [ifccode, setIFCcode] = useState("");
        const [accountno, setAccountno] = useState("");
        const [amount, setAmount] = useState("");
        const [surname, setSurname] = useState("");
        const [firstname, setFistname] = useState("");
        const [parentsname, setParentsname] = useState("");
        const [organizationname, setorganizationname] = useState("");
        const [Commencementdate, setCommencementdate] = useState("");
        const [cast, setcast] = useState("");
        const [beneficiariestype, setbeneficiariestype] = useState("");
        const [rationcardnumber, setrationcardnumber] = useState("");
        const [aadharcardnumber, setaddharcardnumber] = useState("");
        const [mobilenumber, setmobilenumber] = useState("");
        const [savinggroupname, setsavinggroupname] = useState("");
        const [Registrationerti, setRegistrationerti] = useState("");
        const [numberofmember, setnumberofmember] = useState("");
        const [fourty, setfourty] = useState("");
        const [sixty, setsixty] = useState("");
        const [hundred, sethundred] = useState("");
        const [error, setError] = useState<string>("");
        const [isLoading, setIsLoading] = useState(false);
        const [isLoadinggp, setIsLoadinggp] = useState(false);
        const [isLoadingvi, setIsLoadingvi] = useState(false);
        const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
        const [clusterData, setClusterData] =
            useState<TblBeneficiary[]>(beneficiary); // State for Beneficiary data
        const confirm = createConfirmation(ConfirmationDialog);
        const yojna_year = YojnaYear.reduce((acc, year: YojanaYear) => {
            acc[year.yojana_year_id] = year.yojana_year; // Assuming taluka has id and name properties
            return acc;
        }, {} as Record<number, string>);
        const usercastdata = castdata.reduce((acc, year: TblCaste) => {
            acc[year.caste_id] = year.caste_name; // Assuming taluka has id and name properties
            return acc;
        }, {} as Record<number, string>);
        const categorydata = category.reduce((acc, year: Categorys) => {
            acc[year.category_id] = year.category_name; // Assuming taluka has id and name properties
            return acc;
        }, {} as Record<number, string>);
        const subcat = initialcategoryData.reduce((acc, subcat: SubCategory) => {
            acc[subcat.sub_category_id] = subcat.sub_category_name; // Assuming taluka has id and name properties
            return acc;
        }, {} as Record<number, string>);

        const yojnatypes = yojnatype.reduce((acc, year: TblYojanaType) => {
            acc[year.yojana_type_id] = year.yojana_type; // Assuming taluka has id and name properties
            return acc;
        }, {} as Record<number, string>);
        const yojnamastername = yojnamaster.reduce((acc, year: YojanaMaster) => {
            acc[year.yojana_id] = year.yojana_name; // Assuming taluka has id and name properties
            return acc;
        }, {} as Record<number, string>);

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

        const calculateTotalEstimatedAmount = (category: { amount: string }[]) => {
            return category.reduce((total, item) => total + parseFloat(item.amount), 0);
        };

        const sumcategory = initialcategoryData
            .filter((category: SubCategory) => String(category.category_id) === categoryName && category.status === "Active")
            .map((category: SubCategory) => ({
                amount: category.amount // Ensure this is an object with an 'amount' property
            }));

        const totalEstimatedAmount = calculateTotalEstimatedAmount(sumcategory);

    



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
                    ? `/api/benefucuary/update`
                    : `/api/benefucuary/insert`;

                // Prepare the request body
                const workofdate = new Date();

                const requestBody = {
                    category_id: categoryName,
                    sub_category_id: subcategoryName,
                    yojana_year_id: yojnayear,
                    yojana_type: yojnatyp,
                    yojana_id: yojnaname,
                    taluka_id: dist,
                    gp_id: town,
                    village_id: mahasulgaav,
                    surname: surname,
                    firstname: firstname,
                    middlename: parentsname,
                    fullname: surname + firstname + parentsname,
                    gat_name: organizationname,
                    gat_certificate: Registrationerti,
                    member: numberofmember,
                    caste_id: cast,
                    beneficiary_type: beneficiariestype,
                    rashion_no: rationcardnumber,
                    aadhar: aadharcardnumber,
                    mobile: mobilenumber,
                    bank_name: bankname,
                    ifsc: ifccode,
                    ac_no: accountno,
                    tot_finance: amount,
                    amount_paid: amount,
                    fourty: fourty,
                    sixty: sixty,
                    hundred: hundred,
                    organization: amount,
                    work_order_date: workofdate.toISOString(),
                    ...(updateClusterId && { beneficiary_id: updateClusterId }),
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
                        setClusterData((prevData) =>
                            prevData.map((cluster) =>
                                cluster.beneficiary_id == updateClusterId
                                    ? { ...cluster, ...requestBody as any }
                                    : cluster
                            )
                        );
                        toast.success("Beneficiary updated successfully!");
                    } else {
                        const createdData = await response.json();
                        setClusterData((prevData) => [...prevData, createdData]);
                        toast.success("Beneficiary inserted successfully!");
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

        const handleSubmitgpvi = async (event: React.FormEvent) => {
            event.preventDefault();


            setIsLoadinggp(true); // Start loading

            try {
                const method = "POST";
                const url =
                    `/api/grampanchayat/insert`;

                const bodyData = {
                    // id: updateTownId ? updateTownId.toString() : undefined,
                    name: town,
                    name_marathi: nameMarathi,
                    taluka_id: dist,
                    population: '0',
                };

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                });

                if (response.ok) {
                    toast.success(
                        `Grampanchayat inserted successfully!`
                    );

                    router.refresh();
                    handleClosePrintgpvi();
                } else {
                    const data = await response.json();

                    toast.error(
                        `Failed to insert Grampanchayat: ${data.error
                        }`
                    );
                }
            } catch (error) {
                console.error("Error during operation:", error);
                toast.error("An unexpected error occurred.");
            } finally {
                setIsLoadinggp(false); // End loading
            }
        };


        const handleSubmitvi = async (event: React.FormEvent) => {
            event.preventDefault();

            setIsLoadingvi(true); // Start loading

            try {
                const method = "POST";
                const url = `/api/mahasulgaav/insert`;

                // Prepare data for submission
                const bodyData = {

                    taluka_id: dist,
                    gp_id: town,
                    name: mahasulgaav,
                    name_marathi: nameMarathi,
                    total_population: 0,
                    trible_population: 0,
                    arthik_maryada: 0,
                    village_type: "",
                };

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                });

                if (response.ok) {

                  
                    toast.success(
                        `Village inserted successfully!`
                    );
                    router.refresh();
                    handleClosePrintgpvi();
                } else {
                    const data = await response.json();
                    toast.error(
                        `Failed to insert Village: ${data.error}`
                    );
                }
            } catch (error) {
                console.error("Error during operation:", error);
                toast.error("An unexpected error occurred.");
            } finally {
                setIsLoadingvi(false); // End loading
            }

        };



        const reset = () => {
            setUpdateClusterId(null); // Set ID for updating
            setCategoryName("");
            setSubCategoryName("");
            setYojnaYear("");
            setYojnatype("");
            setYojnaName("");
            setDist("");
            setTown("");
            setMahsulgaav("");
            setBankname("");
            setIFCcode("");
            setAccountno("");
            setAmount("");
            setSurname("");
            setFistname("");
            setParentsname("");
            setorganizationname("");
            setCommencementdate("");
            setcast("");
            setbeneficiariestype("");
            setrationcardnumber("");
            setaddharcardnumber("");
            setmobilenumber("");
            setsavinggroupname("");
            setRegistrationerti("");
            setnumberofmember("");
            setfourty("");
            setsixty("");
            sethundred("");
        }

        const resetgpvi = () => {
            setUpdateClusterId(null); // Set ID for updating
            setCategoryName("");
            // setTown("");
            setNameMarathi("");
            // setTown("");
            setMahsulgaav("");
            // setDist("");
            setPopulation("");
        }
        const handleShowPrint = () => setShowPrintModal(true);
        const handleshowprintwithdata = (rowid: any) => {
          
            setShowPrintModal(true);
            setCategoryName(rowid.category_id);
            setSubCategoryName(rowid.sub_category_id);
            setYojnaYear(rowid.yojana_year_id);
            setYojnatype(rowid.yojana_type);
            setYojnaName(rowid.yojana_id)
            

        }
        const handleShowPrintgp = () => setShowPrintModalgp(true);
        const handleShowPrintvi = () => setShowPrintModalvi(true);

        const handleClosePrint = () => {
            setShowPrintModal(false);
            setShowPrintModalgp(false);
            setShowPrintModalvi(false);

            setCategoryName("");
            setError("");
            reset();
            setUpdateClusterId(null); // Reset update ID when closing
        };


        const handleClosePrintgpvi = () => {

            setShowPrintModalgp(false);
            setShowPrintModalvi(false);

            setCategoryName("");
            setError("");
            resetgpvi();
            setUpdateClusterId(null); // Reset update ID when closing
        };

        const optionsdata = [
            {
                label: "अपंग",
                value: "अपंग",
            },
            { label: "B.P.L", value: "B.P.L" },
            { label: "वन पट्टेधारक", value: "वन पट्टेधारक" },
            { label: "वन पट्टेधारक", value: "वन पट्टेधारक" },
            { label: "विधवा", value: "विधवा" },
            { label: "परितक्त्या", value: "परितक्त्या" },
            { label: "इतर", value: "इतर" },
        ]

        const formFields = [
            {
                label: `${t('categoryname')}`,
                value: categoryName,
                required: true,
                onChange: (e: any) => setCategoryName(e.target.value),
                type: "select",
                options: category.map((category: Categorys) => ({
                    value: category.category_id,
                    label: category.category_name,
                })),
                placeholder: `${t('categoryname')}`, // Optional placeholder for select input
            },
            {
                label: `${t('subcategoryname')}`, // Label for the select input
                value: subcategoryName, // Use state for the selected subcategory
                onChange: (e: any) => setSubCategoryName(e.target.value), // Function to update selected subcategory
                type: "select", // Type of input
                options: [
                    ...initialcategoryData
                        .filter((category: SubCategory) => String(category.category_id) == categoryName && category.status == "Active")
                        .map((category: SubCategory) => ({
                            value: category.sub_category_id, // Unique identifier for subcategories
                            label: `${category.sub_category_name} ( ${category.amount} )`, // Display name for the 
                        })),
                    {
                        value: 'Oth', // Unique value for the create option
                        label: 'Other', // Label for the create option, assuming you have a translation key for it
                    },
                    {
                        value: 'Other', // Unique value for the create option
                        label: "Total" + " " + totalEstimatedAmount, // Label for the create option, assuming you have a translation key for it
                    },
                ],
                placeholder: `${t('subcategoryname')}`, // Optional placeholder for select input
            }
            ,

            {
                label: `${t('year')}`,
                value: yojnayear,
                onChange: (e: any) => setYojnaYear(e.target.value),
                type: "select",
                options: YojnaYear.map((year: YojanaYear) => ({
                    value: year.yojana_year_id,
                    label: year.yojana_year,
                })),
                placeholder: `${t("year")}`, // Optional placeholder for select input
            },
            {
                label: `${t('yojnatype')}`,
                value: yojnatyp,
                onChange: (e: any) => setYojnatype(e.target.value),
                type: "select",

                options: yojnatype
                    .filter((type) =>
                        String(type.sub_category_id) == subcategoryName &&
                        String(type.category_id) == categoryName
                    )
                    .map((yojna) => ({
                        value: yojna.yojana_type_id,
                        label: yojna.yojana_type,
                    })),
                placeholder: `${t("yojnatype")}`, // Optional placeholder for select input
            },
            {
                label: `${t('yojnaname')}`,
                value: yojnaname,
                onChange: (e: any) => setYojnaName(e.target.value),
                type: "select",
                className: 'col-12',
                options: yojnamaster
                    .filter((type) =>
                        String(type.yojana_year_id) == yojnayear &&
                        String(type.yojana_type) == yojnatyp &&
                        String(type.category_id) == categoryName &&
                        String(type.sub_category_id) == subcategoryName
                    )
                    .map((yojna) => ({
                        value: yojna.yojana_id,
                        label: yojna.yojana_name,
                    })),
                placeholder: `${t("yojnaname")}`, // Optional placeholder for select input
            },
            {
                label: `${t('dist')}`,
                value: dist,
                onChange: (e: any) => setDist(e.target.value),
                type: "select",
                options: talukas.map((taluka: any) => ({
                    value: taluka.id,
                    label: taluka.name,
                })),
                placeholder: `${t("dist")}`, // Optional placeholder for select input
            },
            {
                label: `${t('GramPanchayat')}`,
                value: town, // Ensure this uses townName

                type: "inputselectgp",
                placeholder: `${t('GramPanchayat')}`,
                onChange: (e: any) => setTown(e.target.value), // Keep this to set townName

                options: grampanchayat
                    .filter((type) => String(type.taluka_id) == dist)
                    .map((yojna, index, array) => ({
                        value: yojna.id,
                        label: `${array.length - index}) ${yojna.name_marathi}`, // Reverse the order of display without altering the index
                    })).reverse(),
            }
            ,


            ...(yojnatyp !== "3" ? [
                {
                    label: `${t('Village')}`,
                    value: mahasulgaav,
                    type: "inputselectvi",
                    placeholder: `${t('Village')}`,
                    onChange: (e: any) => setMahsulgaav(e.target.value),
                    options: Villages
                        .filter((type) =>
                            String(type.taluka_id) == dist &&
                            String(type.gp_id) == town

                        )
                        .map((yojna) => ({
                            value: yojna.id,
                            label: yojna.name_marathi,
                        })).reverse(),
                },
            ] : []),


            {
                label: `${t('BankName')}`,
                value: bankname || "",
                type: "select",
                options: Bankmasterdata
                    .filter((type) =>
                        String(type.talukaid) == dist

                    ).map((yojna) => ({
                        value: yojna.bank_name,
                        label: yojna.bank_name,
                    })),
                required: true,
                placeholder: `${t("BankName")}`,
                onChange: (e: any) => setBankname(e.target.value),
            },

            {
                label: `${t('IFSCCode')}`,
                value: Bankmasterdata.filter((f) => f.bank_name == bankname && f.talukaid == dist as any).map((f) => f.ifsc_code),
                type: "text",
                disabled: true,
                required: true,
                placeholder: `${t("IFSCCode")}`,
                onChange: (e: any) => setIFCcode(e.target.value),
            },
            {
                label: `${t('AccountNo')}`,
                value: accountno || "",
                type: "text",
                required: true,
                placeholder: `${t("AccountNo")}`,
                onChange: (e: any) => setAccountno(e.target.value),
            },
            {
                label: `${t('AmountPaid')}`,
                value: amount || "",
                required: true,
                type: "text",

                placeholder: `${t("AmountPaid")}`,
                onChange: (e: any) => setAmount(e.target.value),
            },

        ];


        const formFieldsGp = [
            {
                label: `${t("dist")}`,
                value: dist,
                disabled: dist !== "",
                className: "col-12",
                onChange: (e: any) => setDist(e.target.value),
                type: "select",
                options: talukas.map((taluka: any) => ({
                    value: taluka.id,
                    label: taluka.name,
                })),
                placeholder: `${t("dist")}`, // Optional placeholder for select input
            },
            {
                label: `${t("englishname")}`,
                value: town,
                required: true,
                className: "col-12",
                onChange: (e: any) => setTown(e.target.value),
                type: "text",
                placeholder: `${t("englishname")}`,

            },
            {
                label: `${t("marathiname")}`,
                value: nameMarathi,
                required: true,
                className: "col-12",
                type: "text",
                placeholder: `${t("marathiname")}`,
                onChange: (e: any) => setNameMarathi(e.target.value),
            },

        ]

        const formFieldsVi = [
            {
                label: `${t('GramPanchayat')}`,
                value: town, // Ensure this uses townName
                disabled: town !== "",
                className: "col-12",
                readonly: true,
                type: "inputselectgp",
                placeholder: `${t('GramPanchayat')}`,
                onChange: (e: any) => setTown(e.target.value), // Keep this to set townName

                options: grampanchayat
                    .filter((type) =>
                        String(type.taluka_id) == dist

                    )
                    .map((yojna, index) => ({
                        value: yojna.id,
                        label: `${index + 1}) ${yojna.name_marathi}`,
                    })),
            },

            {
                label: `${t("dist")}`,
                value: dist,
                disabled: dist !== "",
                className: "col-12",
                onChange: (e: any) => setDist(e.target.value),
                type: "select",
                options: talukas.map((taluka: any) => ({
                    value: taluka.id,
                    label: taluka.name,
                })),
                placeholder: `${t("dist")}`, // Optional placeholder for select input
            },
            {
                label: `${t("englishname")}`,
                value: mahasulgaav,
                required: true,
                className: "col-12",
                type: "text",
                placeholder: `${t("englishname")}`,
                onChange: (e: any) => setMahsulgaav(e.target.value),
            },

            {
                label: `${t("marathiname")}`,
                value: nameMarathi,
                required: true,
                className: "col-12",
                type: "text",
                placeholder: `${t("marathiname")}`,
                onChange: (e: any) => setNameMarathi(e.target.value),
            },


        ]
        if (yojnatyp == "1") {

            const surnameField = {
                label: `${t('surname')}`,
                value: surname || "",
                required: true,
                type: "text",
                placeholder: `${t('surname')}`,
                onChange: (e: any) => setSurname(e.target.value),
            };
            formFields.splice(8, 0, surnameField);
            const firstnameField = {
                label: `${t('firstname')}`,
                value: firstname || "",
                type: "text",
                required: true,
                placeholder: `${t('firstname')}`,
                onChange: (e: any) => setFistname(e.target.value),
            };
            formFields.splice(9, 0, firstnameField);
            const parentsnameField = {
                label: `${t('parentsname')}`,
                value: parentsname || "",
                type: "text",
                required: true,
                placeholder: `${t('parentsname')}`,
                onChange: (e: any) => setParentsname(e.target.value),
            };
            formFields.splice(10, 0, parentsnameField);
            // Insert at index 2, shifting existing elements.


            const castField = {
                label: `${t('Cast')}`,
                value: cast || "",
                type: "select",
                required: true,
                options: castdata.map((cast: TblCaste) => ({
                    value: cast.caste_id,
                    label: cast.caste_name,
                })),
                placeholder: `${t('Cast')}`,
                onChange: (e: any) => setcast(e.target.value),
            };
            formFields.splice(11, 0, castField);


            const beneficiarytypeField = {
                label: `${t('beneficiarytype')}`,
                value: beneficiariestype || "",
                type: "select",
                required: true,
                options: optionsdata.map((cast: any) => ({
                    value: cast.value,
                    label: cast.label,
                })),
                placeholder: `${t('beneficiarytype')}`,
                onChange: (e: any) => setbeneficiariestype(e.target.value),
            };
            formFields.splice(12, 0, beneficiarytypeField);



            const aadharcardField = {
                label: `${t('aadharcard')}`,
                value: aadharcardnumber || "",
                type: "text",
                required: true,
                className: "col-4",
                placeholder: `${t('aadharcard')}`,
                // onChange: (e: any) => setaddharcardnumber(e.target.value),
                onChange: (e: any) => {
                    // Ensure that only digits are allowed and limit to 11 digits
                    const inputValue = e.target.value;
                    if (/^\d*$/.test(inputValue) && inputValue.length <= 12) {
                        setaddharcardnumber(inputValue);
                    }
                },
            };
            formFields.splice(13, 0, aadharcardField as any);



            const ContactField = {
                label: `${t('Contact')}`,
                value: mobilenumber || "",
                required: true,
                type: "text",
                className: "col-4",
                placeholder: `${t('Contact')}`,
                // onChange: (e: any) => setmobilenumber(e.target.value),

                onChange: (e: any) => {
                    // Ensure that only digits are allowed and limit to 11 digits
                    const inputValue = e.target.value;
                    if (/^\d*$/.test(inputValue) && inputValue.length <= 12) {
                        setmobilenumber(inputValue);
                    }
                },
            };
            formFields.splice(14, 0, ContactField as any);




            const RegistrationcardField = {
                label: `${t('Registrationcard')}`,
                value: rationcardnumber || "",
                type: "text",
                className: "col-4",
                required: true,
                placeholder: `${t('Registrationcard')}`,
                onChange: (e: any) => setrationcardnumber(e.target.value),
            };
            formFields.splice(15, 0, RegistrationcardField as any);


            formFields.push({


                label: `${t('Eligible40')}`,
                value: fourty || "",
                required: false,

                type: "checkbox",
                placeholder: `40%`,
                onChange: (e: any) => setfourty(e.target.value),
            },
                {
                    label: `${t('Eligible60')}`,
                    value: sixty || "",
                    type: "checkbox",
                    required: false,
                    placeholder: `60%`,
                    onChange: (e: any) => setsixty(e.target.value),
                },
                {
                    label: `${t('Eligible100')}`,
                    value: hundred || "",
                    type: "checkbox",
                    required: false,
                    placeholder: `100%`,
                    onChange: (e: any) => sethundred(e.target.value),
                },);

        } else if (yojnatyp == "2") {
            formFields.push({
                label: `${t('bachtgat')}`,
                value: savinggroupname || "",
                type: "text",
                required: true,
                placeholder: `${t('bachtgat')}`,
                onChange: (e: any) => setsavinggroupname(e.target.value),
            },
                {
                    label: `${t('registerdcert')}`,
                    value: Registrationerti || "",
                    type: "text",
                    required: true,
                    placeholder: `${t('registerdcert')}`,
                    onChange: (e: any) => setRegistrationerti(e.target.value),
                },
                {
                    label: `${t('members')}`,
                    value: numberofmember || "",
                    type: "text",
                    required: true,
                    placeholder: `${t('members')}`,
                    onChange: (e: any) => setnumberofmember(e.target.value),
                },
               
                {
                    label: `${t('Eligible40')}`,
                    value: fourty || "",
                    type: "checkbox",
                    required: false,
                    placeholder: `40%`,
                    onChange: (e: any) => setfourty(e.target.value),
                },
                {
                    label: `${t('Eligible60')}`,
                    value: sixty || "",
                    type: "checkbox",
                    required: false,


                    placeholder: `60%`,
                    onChange: (e: any) => setsixty(e.target.value),
                },

                {
                    label: `${t('Eligible100')}`,
                    value: hundred || "",
                    type: "checkbox", required: false,
                    placeholder: `100%`,
                    onChange: (e: any) => sethundred(e.target.value),
                },

            );
        }
        else if (yojnatyp == "3") {
            formFields.push({
                label: `${t('sansthaname')}`,
                value: organizationname || "",
                type: "text",
                required: true,
                placeholder: `${t('sansthaname')}`,
                onChange: (e: any) => setorganizationname(e.target.value),
            },);
            formFields.push({
                label: `${t('Commencementorderdate')}`,
                value: Commencementdate || "",
                type: "date",
                required: true,
                placeholder: `${t('Commencementorderdate')}`,
                onChange: (e: any) => setCommencementdate(e.target.value),
            },);
            formFields.push(
                {
                    label: `${t('Eligible40')}`,
                    value: (fourty == "true" ? 1 : fourty || "").toString(),
                    type: "text",
                    placeholder: `%`,
                    required: false,
                    onChange: (e: any) => setfourty(e.target.value),
                },
                {
                    label: `${t('Eligible60')}`,
                    value: (sixty == "true" ? 1 : sixty || "").toString(),
                    type: "text",
                    placeholder: `%`,
                    required: false,
                    onChange: (e: any) => setsixty(e.target.value),
                },
                {
                    label: `${t('Eligible100')}`,
                    value: (hundred == "true" ? 1 : hundred || "").toString(),
                    type: "text",
                    required: false,
                    placeholder: `%`,
                    onChange: (e: any) => sethundred(e.target.value),
                },
            );

        }

        return (
            <div>

                <Addmembers initialcategoryData={initialcategoryData} YojnaYear={[]} Bankdata={[]} category={[]} beneficiary={[]} yojnatype={yojnatype} yojnamaster={[]} talukas={[]} grampanchayat={[]} Villages={[]} castdata={castdata} showPrintModalMembers={showPrintModalMembers} showNumberMembers={showNumberMembers} membersadd={membersadd} showBachatNameMembers={showBachatNameMembers} />

                <span onClick={() => handleshowprintwithdata(yojnaiddata)}>अर्ज करा </span>

                <CustomModal
                    show={showPrintModal}
                    handleClose={handleClosePrint}

                    btttongroupgp={

                        <Button variant="primary" id="button-addon2" size="sm" onClick={handleShowPrintgp}>
                            +
                        </Button>
                    }
                    btttongroupgpvi={

                        <Button variant="primary" id="button-addon2" size="sm" onClick={handleShowPrintvi}>
                            +
                        </Button>
                    }

                    handleSubmit={handleSubmit}
                    size={"xl"}
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

                <CustomModal
                    show={showPrintModalgp}
                    handleClose={handleClosePrintgpvi}


                    handleSubmit={handleSubmitgpvi}
                    size={"ml"}
                    title={updateClusterId ? `${t("GramPanchayat")}` : `${t("GramPanchayat")}`}
                    formData={{
                        fields: formFieldsGp as any,
                        error: "",
                    }}

                    submitButtonLabel={
                        updateClusterId
                            ? isLoadinggp
                                ? "Submitting..."
                                : t("editsubmit")
                            : isLoadinggp
                                ? "Submitting..."
                                : t("submit")
                    }
                    disabledButton={isLoadinggp}
                />

                <CustomModal
                    show={showPrintModalvi}
                    handleClose={handleClosePrintgpvi}


                    handleSubmit={handleSubmitvi}
                    size={"ml"}
                    title={updateClusterId ? `${t("Village")}` : `${t("Village")}`}
                    formData={{
                        fields: formFieldsVi as any,
                        error: "",
                    }}

                    submitButtonLabel={
                        updateClusterId
                            ? isLoadingvi
                                ? "Submitting..."
                                : t("editsubmit")
                            : isLoadingvi
                                ? "Submitting..."
                                : t("submit")
                    }
                    disabledButton={isLoading}
                />
            </div>
        );
    };

export default Schemesbeneficry;
