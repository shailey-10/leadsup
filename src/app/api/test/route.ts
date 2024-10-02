import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Origin", "*"); // Adjust this for production
  headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  headers.set("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (request.method === "OPTIONS") {
    // Ensure OPTIONS request is properly handled
    return new NextResponse(null, { headers, status: 204 });
  }

  try {
    const data = 'Server id live';
    return new NextResponse(JSON.stringify({ data }), { headers });
  } catch (error) {
    console.error("Error in server:", error);
    return new NextResponse("ERROR", { status: 500, headers });
  }
}