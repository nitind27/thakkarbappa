// src/app/api/slider/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

export async function PATCH(req: Request) {
	try {
		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("multipart/form-data")) {
			return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
		}

		const formData = await req.formData();
		const slider_id = Number(formData.get("slider_id"));
		const slider_name = formData.get("slider_name")?.toString();
		const img_type = formData.get("img_type")?.toString();
		const slider_img = formData.get("slider_img") as File | null;

		if (!slider_id || !slider_name || !img_type) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		const updatedData: any = { slider_name, img_type };

		if (slider_img) {
			const uploadDir = path.join(process.cwd(), "tmp/uploads");
			await fs.mkdir(uploadDir, { recursive: true });

			const fileExt = slider_img.name.split(".").pop();
			const uniqueFileName = `${nanoid()}.${fileExt}`;
			const filePath = path.join(uploadDir, uniqueFileName);

			const buffer = await slider_img.arrayBuffer();
			await fs.writeFile(filePath, Buffer.from(buffer));

			updatedData.slider_img = `/api/uploads/${uniqueFileName}`;
		}

		const updated = await prisma.tbl_slider.update({
			where: { slider_id },
			data: updatedData,
		});

		return NextResponse.json(updated, { status: 200 });
	} catch (err) {
		console.error("Slider update error:", err);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
