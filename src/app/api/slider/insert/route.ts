import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid"; // For generating unique file names

export async function POST(req: Request) {
    try {
        // First, check if the content type is multipart/form-data (file upload)
        const contentType = req.headers.get("content-type") || "";

        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { error: "Invalid content type" },
                { status: 400 }
            );
        }

        // Get the form data
        const formData = await req.formData();

        // Extract all fields
        const slider_name = formData.get("slider_name") as any;

        const img_type = formData.get("img_type") as any;

        const slider_img = formData.get("slider_img") as File;


        // Ensure 'public/uploads' directory exists
     
        const uploadDir = path.join(process.cwd(), "tmp/uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileExt = slider_img.name.split(".").pop();
        const uniqueFileName = `${nanoid()}.${fileExt}`;
        const filePath = path.join(uploadDir, uniqueFileName);

        const buffer = await slider_img.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));

        // Insert into the database using Prisma
        const newDisbursement = await prisma.tbl_slider.create({
            data: {
                slider_name: slider_name,

                slider_img: `/api/uploads/${uniqueFileName}`, // Store served URL
                img_type: img_type,
            },
        });

        // Convert BigInt fields to string for the response
        const responseData = {
            ...newDisbursement,
            slider_id: newDisbursement.slider_id.toString(),
        };

        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        console.error("Error during disbursement creation:", error);
        return NextResponse.json(
            { error: error || "Internal Server Error" },
            { status: 500 }
        );
    }
}
