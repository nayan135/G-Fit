"use server"

import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 })
  }
  try {
    const client = await clientPromise
    const db = client.db("GFIT")
    const userProfile = await db.collection("users").findOne({ email })
    const dailyRecords = await db.collection("dailyRecords").find({ email }).toArray()
    return NextResponse.json({ profile: userProfile, dailyRecords })
  } catch (error) {
    console.error("Dashboard GET error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { type, email, profileData, dailyRecord } = await request.json()
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 })
  }
  try {
    const client = await clientPromise
    const db = client.db("GFIT")
    if (type === "profile") {
      // Update or insert profile data
      await db.collection("users").updateOne({ email }, { $set: profileData }, { upsert: true })
      return NextResponse.json({ message: "Profile updated successfully" })
    } else if (type === "daily") {
      // Insert daily record for the user
      await db.collection("dailyRecords").insertOne({ email, ...dailyRecord })
      return NextResponse.json({ message: "Daily record added successfully" })
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Dashboard POST error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
