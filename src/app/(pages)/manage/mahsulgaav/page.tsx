import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Grampanchayat from "@/components/manage/Grampanchayat";
import Mahsulgaav from "@/components/manage/Mahsulgaav";
import TalukaData from "@/components/manage/TalukaData";
import { Villages } from "@/components/type";

import prisma from "@/lib/db";
import React from "react";

const page = async () => {
    let Villages: Villages[] = [];

    let loading = true; // Initialize loading state

    try {
        Villages = await prisma.villages.findMany(); // Fetch all QR codes

        loading = false; // Set loading to false after data fetch
    } catch (error) {
        console.error("Error fetching QR codes:", error);
        return (
            <div>
                <h1>Error fetching Data</h1>
            </div>
        );
    }


    return (
        <div>
            <h1 className="text-center">Cluster Management</h1>
            <Mahsulgaav Villages={Villages} />

        </div>
    );
};

export default page;
