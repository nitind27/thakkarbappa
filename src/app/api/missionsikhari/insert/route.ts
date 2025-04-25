import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // Extract fields
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

    // ✅ परिवर्तन 1: tmp/uploads डायरेक्टरी का उपयोग करें
    const uploadDir = 'tmp/uploads';
    await fs.mkdir(uploadDir, { recursive: true });

    let imagePath;
    
    if (imgupload) {
      const fileExt = imgupload.name.split(".").pop();
      const uniqueFileName = `${nanoid()}.${fileExt}`;
      
      // ✅ परिवर्तन 2: imagePath में /uploads न जोड़ें (सर्वर-साइड पाथ)
      imagePath = `/${uniqueFileName}`;
      
      // ✅ परिवर्तन 3: फुल फाइल पाथ बनाएं
      const filePath = path.join(process.cwd(), uploadDir, uniqueFileName);
      
      const buffer = await imgupload.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));
    }

    // डेटाबेस में स्टोर करें
    const newDisbursement = await prisma.missionshikari.create({
      data: {
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
        ...(imagePath && { imgupload: imagePath }),
      },
    });

    return NextResponse.json(newDisbursement, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
