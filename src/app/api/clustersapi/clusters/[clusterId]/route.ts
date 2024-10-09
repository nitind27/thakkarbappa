import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { clusterId: string } }) {
  const { clusterId } = params;

  try {
    // Attempt to delete the cluster by ID
    await prisma.clusterdata.delete({
      where: { cluster_id: Number(clusterId) }, // Ensure ID is a number and matches your model
    });

    // Return a 204 No Content response without any body
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error during deletion:", error); // More descriptive logging

    // Handle specific error for not found
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Cluster not found' }, { status: 404 });
    }

    // General error handling for other unexpected errors
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
