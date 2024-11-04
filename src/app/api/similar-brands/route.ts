import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { imageBuffer } = body;      
      const buffer = Buffer.from(imageBuffer, 'base64');
      const possessedImageResponse = await fetch('http://localhost:8080/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: buffer
      });
      const possessedImage = await possessedImageResponse.json();
      
      return NextResponse.json(possessedImage, {status: 200});
    } catch (error) {
      console.error('Error searching for similar brands:', error);
      return NextResponse.json({ error: 'Internal server error' }, {status: 500});
    }

}