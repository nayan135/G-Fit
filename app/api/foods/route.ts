"use server"

import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("GFIT")
    const foods = await db.collection("foods").find({}).toArray()
    return NextResponse.json({ foods })
  } catch (error) {
    console.error("Error fetching foods:", error)
    return NextResponse.json({ message: "Error fetching foods" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, caloriesPer100g, user } = await request.json()
    // Extract email from the user object if present
    const uploadedBy = user && user.email ? user.email : "unknown"
    if (!name || !caloriesPer100g) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("GFIT")
    const result = await db.collection("foods").insertOne({ name, caloriesPer100g, uploadedBy })
    const newFood = { _id: result.insertedId, name, caloriesPer100g, uploadedBy }
    return NextResponse.json({ food: newFood })
  } catch (error) {
    console.error("Error adding food:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
