import Towntitle from "@/app/[locale]/title/towntitle";

import TalukaData from "@/components/manage/TalukaData";
import { talukasdata } from "@/components/type";

import prisma from "@/lib/db";
import React from "react";

const page = async () => {
    let talukasdata: talukasdata[] = [];

    let loading = true; // Initialize loading state

    try {
        talukasdata = await prisma.talukasData.findMany(); // Fetch all QR codes

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
            <h1 className="card card-body mt-5"><Towntitle /></h1>
            <TalukaData talukasdata={talukasdata} />

        </div>
    );
};

export default page;