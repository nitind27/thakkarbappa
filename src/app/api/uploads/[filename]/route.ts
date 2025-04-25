import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
  
  // Security check: Prevent directory traversal
  if (filename.includes('..') || filename.includes('/')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'tmp/uploads', filename);

  try {
    // Check if file exists
    await fs.promises.access(filePath, fs.constants.F_OK);
    
    // Get file stats
    const stats = await fs.promises.stat(filePath);
    
    // Create read stream
    const fileStream = fs.createReadStream(filePath) as any;
    
    // Determine content type (you might need a proper mime-type library)
    const contentType = getContentType(filename) || 'application/octet-stream';

    return new NextResponse(fileStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': stats.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }
}

// Helper function to determine content type
function getContentType(filename: string): string | null {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const typeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };

  return typeMap[extension as string] || null;
}
