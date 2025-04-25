import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

export async function PATCH(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const id = formData.get("id");
    const designation = formData.get("designation");
    const studentname = formData.get("studentname");
    const schoolhosteltype = formData.get("schoolhosteltype");
    const schoolhostelname = formData.get("schoolhostelname");
    const subject = formData.get("subject");
    const testdate = formData.get("testdate");
    const totalmarks = formData.get("totalmarks");
    const obtainmarks = formData.get("obtainmarks");
    const percentage = formData.get("percentage");
    const aadharcard = formData.get("aadharcard");
    const parentsnumber = formData.get("parentsnumber");
    const imgupload = formData.get("imgupload") as File;

    let updatedData: any = {
      designation: designation?.toString(),
      studentname: studentname?.toString(),
      schoolhosteltype: schoolhosteltype?.toString(),
      schoolhostelname: schoolhostelname?.toString(),
      subject: subject?.toString(),
      testdate: testdate?.toString(),
      totalmarks: totalmarks?.toString(),
      obtainmarks: obtainmarks?.toString(),
      percentage: percentage?.toString(),
      aadharcard: aadharcard?.toString(),
      parentsnumber: parentsnumber?.toString(),
    };

    if (imgupload) {
      // ✅ परिवर्तन 1: tmp/uploads डायरेक्टरी का उपयोग करें
      const uploadDir = path.join(process.cwd(), "tmp/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const fileExt = imgupload.name.split(".").pop();
      const uniqueFileName = `${nanoid()}.${fileExt}`;
      
      // ✅ परिवर्तन 2: फुल फाइल पाथ बनाएं
      const filePath = path.join(uploadDir, uniqueFileName);
      
      // ✅ परिवर्तन 3: imagePath को सर्वर-साइड पाथ के साथ सेट करें
      updatedData.imgupload = `/tmp/uploads/${uniqueFileName}`;

      const buffer = await imgupload.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));
    }

    const updatedDisbursement = await prisma.missionshikari.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return NextResponse.json({
      ...updatedDisbursement,
      id: updatedDisbursement.id.toString()
    }, { status: 200 });

  } catch (error) {
    console.error("Error during update:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
