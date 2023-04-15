//

import mongoose from "mongoose";
import { db } from "../../../database";
import { seedData } from "../../../database/seed-data";
import { Entry } from "../../../models";

const dbUrl = process.env.MONGO_URL;

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Not allowed" });
  }
  //
  // We only want to allow the PURGE method for this endpoint
  // because it is a destructive action
  if (req.method !== "PURGE")
    return res.status(405).json({ message: "Not allowed" });

  // Connect to database
  await db.connectToDatabase();

  // Delete all entries and insert the seed data
  await Entry.deleteMany({});
  await Entry.insertMany(seedData.entries);

  // Disconnect from database
  await db.disconnectFromDatabase();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
