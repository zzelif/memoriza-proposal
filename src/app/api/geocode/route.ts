import { NextResponse } from "next/server";

// Server-side API route to proxy OpenStreetMap Nominatim requests
// This fixes CORS issues on mobile/tablet browsers

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: "Query must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Make request to OpenStreetMap Nominatim API from server-side
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=5&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Memoriza Events Website (memoriza.events@gmail.com)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Nominatim");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json(
      { error: "Failed to search location" },
      { status: 500 }
    );
  }
}

// Reverse geocode: lat/lon to address
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lon } = body;

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude required" },
        { status: 400 }
      );
    }

    // Reverse geocode from coordinates
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Memoriza Events Website (memoriza.events@gmail.com)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to reverse geocode");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return NextResponse.json(
      { error: "Failed to get address from coordinates" },
      { status: 500 }
    );
  }
}
