
import Clusteradd from "@/components/manage/Clusteradd";
import { clusterdata } from "@/components/type";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {

    let clusterdata: clusterdata[] = [];

    let loading = true; // Initialize loading state

    try {
        clusterdata = await prisma.clusterdata.findMany(); // Fetch all QR codes


        loading = false; // Set loading to false after data fetch
    } catch (error) {
        console.error("Error fetching QR codes:", error);
        return (
            <div>
                <h1>Error fetching QR codes</h1>
            </div>
        );
    }
    // Dummy data
    const data = [
        { id: 1, name: "John Doe", status: "Pending" },
        { id: 2, name: "Jane Smith", status: "Approved" },
        { id: 3, name: "Alice Johnson", status: "Pending" },
        { id: 4, name: "Bob Brown", status: "Approved" },
        { id: 5, name: "Charlie White", status: "Pending" },
    ];

    // Column definitions
    const columns = [
        {
            accessorKey: "id", // Accessor for the column
            header: "ID", // Header for the column
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
    ];

    return (
        <div>
            <h1 className="text-center">Cluster Management</h1>
            <Clusteradd data={clusterdata} columns={columns} />
        </div>
    );
};

export default page;