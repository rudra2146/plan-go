import { auth } from "@/auth"
import { getCountryFromCoordinates } from "@/lib/actions/geocode"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      console.log("No session");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("Authenticated user:", session.user?.id);

    const locations = await prisma.location.findMany({
    where: {
      trip: {
        userId: session.user?.id,
      },
    },
    select: {
      locationTitle: true,
      lat: true,
      lng: true,
      trip: {
        select: {
          title: true,
        },
      },
    },
  });


    console.log("Fetched locations from DB:", locations);

    const transformedLocations = await Promise.all(
      locations.map(async (loc) => {
        try {
          const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);
          return {
            name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
            lat: loc.lat,
            lng: loc.lng,
            country: geocodeResult.country,
          };
        } catch (geoError) {
          console.error("Geocode failed for:", loc, geoError);
          return {
            name: `${loc.trip.title} - Unknown`,
            lat: loc.lat,
            lng: loc.lng,
            country: "Unknown",
          };
        }
      })
    );

    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.error("TRIPS API ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
