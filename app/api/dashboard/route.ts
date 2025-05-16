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
    
    const today = new Date().toISOString().split("T")[0];
    const todayDailyRecord = await db.collection("dailyRecords").findOne({ email, date: today });

    return NextResponse.json({ profile: userProfile, todayDailyRecord })
  } catch (error) {
    console.error("Dashboard GET error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const { type, email, profileData, dailyRecord, workoutSummary } = body

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 })
  }
  try {
    const client = await clientPromise
    const db = client.db("GFIT")
    if (type === "profile") {
     
      await db.collection("users").updateOne(
        { email },
        { $set: profileData }, 
        { upsert: true }
      )
      return NextResponse.json({ message: "Profile updated successfully" })
    } else if (type === "logWorkout") {      if (!workoutSummary || typeof workoutSummary.caloriesBurned !== 'number') {
        return NextResponse.json({ message: "Workout summary with numeric calories burned is required" }, { status: 400 });
      }
      
      const today = new Date().toISOString().split("T")[0];

      await db.collection("users").updateOne(
        { email },
        {
          $set: { recentWorkout: workoutSummary },
          $push: { workoutHistory: workoutSummary },
          $inc: { totalLifetimeCaloriesBurned: Number(workoutSummary.caloriesBurned) }
        },
        { upsert: true } 
      );

      await db.collection("dailyRecords").updateOne(
        { email, date: today },
        {
          $inc: { caloriesBurnedToday: Number(workoutSummary.caloriesBurned) },
          $setOnInsert: { 
            email, 
            date: today, 
            caloriesConsumed: 0, 
            caloriesBurnedToday: 0,
            dailyCaloriesTargetAtRecordTime: profileData?.dailyCaloriesTarget || 0
          }
        },
        { upsert: true }
      );
      return NextResponse.json({ message: "Workout logged successfully" });    } else if (type === "daily") {
      if (!dailyRecord || !dailyRecord.date) {
        return NextResponse.json({ message: "Daily record with date is required" }, { status: 400 });
      }
   
      const existingRecord = await db.collection("dailyRecords").findOne({ email, date: dailyRecord.date })
      
      if (existingRecord) {
        const updateOps: any = { $inc: {} };
        if (typeof dailyRecord.dailyCalories === 'number') {
          updateOps.$set = { dailyCaloriesTargetAtRecordTime: Number(dailyRecord.dailyCalories) };
        }
        if (typeof dailyRecord.caloriesBurned === 'number') {
          updateOps.$inc.caloriesBurnedToday = Number(dailyRecord.caloriesBurned);
        }


        if (Object.keys(updateOps.$inc).length === 0) delete updateOps.$inc;
        if (Object.keys(updateOps.$set || {}).length === 0) delete updateOps.$set;


        if (Object.keys(updateOps).length > 0 && (updateOps.$inc || updateOps.$set)) {
            await db.collection("dailyRecords").updateOne(
              { email, date: dailyRecord.date },
              updateOps
            );
        }
        return NextResponse.json({ message: "Daily record updated successfully" })
      } else {
        // For a new daily record via "daily" type.
        await db.collection("dailyRecords").insertOne({            email, 
            date: dailyRecord.date,
            dailyCaloriesTargetAtRecordTime: Number(dailyRecord.dailyCalories || 0),
            caloriesConsumed: 0,
            caloriesBurnedToday: Number(dailyRecord.caloriesBurned || 0) 
        });
        return NextResponse.json({ message: "Daily record added successfully" });
      }
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Dashboard POST error:", error)
   
    const message = typeof error === 'string' ? error : (error as Error).message || "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 })
  }
}
