


// src/app/api/slider/delete/[sliderid]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { sliderid: string } }) {
  try {
    const slider_id = Number(params.sliderid);
    if (!slider_id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    let nextStatus = "Deactive";
    try {
      const body = await req.json();
      if (body?.slider_status === "Start" || body?.slider_status === "Deactive") {
        nextStatus = body.slider_status;
      }
    } catch {}

    const updated = await prisma.tbl_slider.update({
      where: { slider_id },
      data: { slider_status: nextStatus },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    console.error("Slider status update error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}