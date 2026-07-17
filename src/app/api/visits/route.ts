import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// POST /api/visits
// Body: { deviceId: string, isNewDevice: boolean }
// Increments total visit count on every call; increments unique device
// count only when this deviceId has never been seen before.
export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json();

    if (!deviceId || typeof deviceId !== "string" || deviceId.length > 64) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    const db = await getDb();

    // Register the device (no-op if it already exists)
    const deviceResult = await db.collection("devices").updateOne(
      { deviceId },
      {
        $setOnInsert: { deviceId, firstVisit: new Date() },
        $set: { lastVisit: new Date() },
        $inc: { visits: 1 },
      },
      { upsert: true }
    );

    const isNewDevice = deviceResult.upsertedCount === 1;

    // Increment global counters
    const statsResult = await db.collection("stats").findOneAndUpdate(
      { _id: "visits" } as never,
      {
        $inc: {
          totalVisits: 1,
          uniqueDevices: isNewDevice ? 1 : 0,
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json({
      totalVisits: statsResult?.totalVisits ?? 1,
      uniqueDevices: statsResult?.uniqueDevices ?? 1,
    });
  } catch (error) {
    console.error("Error recording visit:", error);
    return NextResponse.json(
      { error: "Failed to record visit" },
      { status: 500 }
    );
  }
}

// GET /api/visits — read-only fetch of current counters
export async function GET() {
  try {
    const db = await getDb();
    const stats = await db
      .collection("stats")
      .findOne({ _id: "visits" } as never);

    return NextResponse.json({
      totalVisits: stats?.totalVisits ?? 0,
      uniqueDevices: stats?.uniqueDevices ?? 0,
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
    return NextResponse.json(
      { error: "Failed to fetch visits" },
      { status: 500 }
    );
  }
}
