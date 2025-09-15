"use client";
import React, { useState } from "react";
import Table from "../table/Table";
import { TblSlider } from "../type";
import { Button } from "react-bootstrap";
import { KTIcon } from "@/_metronic/helpers";
import CustomModal from "@/common/CustomModal";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

type Props = {
    Slidertbl: TblSlider[];
};

const Slider = ({ Slidertbl }: Props) => {
    const t = useTranslations("IndexPage");
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [Imagename, setImagename] = useState("");
    const [error, setError] = useState<string>("");
    const [insertImage, setInsertImage] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateClusterId, setUpdateClusterId] = useState<number | null>(null);
    const [clusterData, setClusterData] = useState<TblSlider[]>(Slidertbl);

    const data = clusterData
        .filter((s) => (s.slider_status ?? "Start") === "Start")
        .map((cluster) => ({
            slider_id: cluster.slider_id,
            slider_name: cluster.slider_name,
            slider_img: cluster.slider_img,
            img_type: cluster.img_type,
            slider_status: cluster.slider_status ?? "Start",
        }))
        .reverse();

    const columns = [
        {
            accessorKey: "serial_number",
            header: `${t("Srno")}`,
            cell: ({ row }: any) => <div>{row.index + 1}</div>,
        },
        {
            accessorKey: "slider_name",
            header: "Image Name",
        },
        {
            accessorKey: "slider_img",
            header: "Image",
            cell: ({ row }: any) => (
                <ImageWithLoader src={row.original.slider_img} width={140} height={70} />
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
                        <KTIcon iconName={"pencil"} className="fs-6" iconType="solid" />
                        {t("edit")}
                    </button>
                    <button
                        className="btn btn-sm btn-danger ms-5"
                        onClick={() => handleDeactivate(row.original.slider_id)}
                    >
                        <KTIcon iconName={"status"} className="fs-6" iconType="solid" />
                        Deactivate
                    </button>
                </div>
            ),
        },
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("slider_name", Imagename);
        formData.append("img_type", "slider");
        if (insertImage) {
            formData.append("slider_img", insertImage);
        }
        setIsLoading(true);

        try {
            const method = updateClusterId ? "PATCH" : "POST";
            const url = updateClusterId ? `/api/slider/update` : `/api/slider/insert`;

            if (updateClusterId) {
                formData.append("slider_id", updateClusterId.toString());
            }

            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (response.ok) {
                const payload = await response.json();

                if (!updateClusterId) {
                    setClusterData((prev) => [...prev, payload]);
                    toast.success("Slider inserted successfully!");
                } else {
                    setClusterData((prev) =>
                        prev.map((s) => (s.slider_id === updateClusterId ? { ...s, ...payload } : s))
                    );
                    toast.success("Slider updated successfully!");
                }

                handleClosePrint();
            } else {
                toast.error(`Failed to ${updateClusterId ? "update" : "insert"} slider.`);
            }
        } catch (error) {
            console.error("Error during operation:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            setInsertImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEdit = (row: any) => {
        setUpdateClusterId(row.slider_id);
        setImagename(row.slider_name);
        const s = row.slider_img ?? "";
        const photoSrc =
            s.startsWith("/") || s.startsWith("http") || s.startsWith("blob:") ? s : `/${s}`;
        setImagePreview(photoSrc);
        setShowPrintModal(true);
    };

    const handleClosePrint = () => {
        setShowPrintModal(false);
        setImagename("");
        setInsertImage(null);
        setImagePreview("");
        setError("");
        setUpdateClusterId(null);
    };

    const handleDeactivate = async (sliderId: number) => {
        if (!window.confirm("Are you sure you want to deactivate this slider?")) return;
        try {
            const res = await fetch(`/api/slider/delete/${sliderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slider_status: "Deactive" }),
            });
            if (res.ok) {
                setClusterData((prev) =>
                    prev.map((s) => s.slider_id === sliderId ? { ...s, slider_status: "Deactive" } : s)
                );
                toast.success("Slider deactivated successfully!");
            } else {
                toast.error("Failed to deactivate slider.");
            }
        } catch (e) {
            console.error(e);
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <div>
            <Table
                data={data}
                columns={columns}
                Button={
                    <Button
                        variant="primary"
                        onClick={() => setShowPrintModal(true)}
                        className="btn btn-sm"
                    >
                        <KTIcon iconName={"plus-circle"} className="fs-3" iconType="solid" />
                        Add Slider
                    </Button>
                }
            />

            <CustomModal
                show={showPrintModal}
                handleClose={handleClosePrint}
                handleSubmit={handleSubmit}
                title={updateClusterId ? `Update Slider` : `Add Slider`}
                imagepriview={
                    imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "5%",
                                objectFit: "cover",
                                overflow: "hidden",
                            }}
                        />
                    )
                }
                formData={{
                    fields: [
                        {
                            label: `Image Name`,
                            value: Imagename,
                            type: "text",
                            placeholder: `Enter image name`,
                            required: true,
                            onChange: (e: any) => setImagename(e.target.value),
                        },
                        {
                            label: `Image`,
                            value: "",
                            type: "file",
                            placeholder: `Select image`,
                            onChange: handleImageChange,
                        },
                    ],
                    error,
                }}
                submitButtonLabel={
                    updateClusterId
                        ? isLoading
                            ? "Submitting..."
                            : "Save changes"
                        : isLoading
                            ? "Submitting..."
                            : "Create"
                }
                disabledButton={isLoading}
            />
        </div>
    );
};

const ImageWithLoader = ({
    src,
    width,
    height,
}: {
    src: string;
    width: number;
    height: number;
}) => {
    const [loaded, setLoaded] = React.useState(false);
    const [errored, setErrored] = React.useState(false);

    const displaySrc =
        src?.startsWith("/") || src?.startsWith("http") || src?.startsWith("blob:")
            ? src
            : `/${src ?? ""}`;

    return (
        <div
            style={{
                position: "relative",
                width,
                height,
                overflow: "hidden",
                borderRadius: 4,
                background: "#f2f2f2",
            }}
        >
            {!loaded && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)",
                        backgroundSize: "400% 100%",
                        animation: "shimmer 1.4s ease infinite",
                    }}
                />
            )}
            {!errored && (
                <img
                    src={displaySrc}
                    width={width}
                    height={height}
                    style={{ objectFit: "cover", display: loaded ? "block" : "none" }}
                    onLoad={() => setLoaded(true)}
                    onError={() => {
                        setErrored(true);
                        setLoaded(true);
                    }}
                    alt=""
                />
            )}
            {errored && (
                <div
                    style={{
                        width,
                        height,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#999",
                        fontSize: 12,
                    }}
                >
                    Image unavailable
                </div>
            )}
            <style>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
        </div>
    );
};

export default Slider;