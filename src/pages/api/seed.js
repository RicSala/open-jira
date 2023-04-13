//

import mongoose from "mongoose";
import { db } from "../../../database";
import { seedData } from "../../../database/seed-data";
import { Entry } from "../../../models";

const dbUrl = process.env.MONGO_URL;

//
export default async function handler(req, res) {
  // mongoose
  //   .connect(dbUrl)
  //   .then(() => console.log("Connected to MongoDB"))
  //   .then(() => {
  //     Entry.insertMany(seedData.entries);
  //   })
  //   .catch((e) => console.log("ERROR connecting MongoDB: ", e));

  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Not allowed" });
  }
  if (req.method !== "PURGE")
    return res.status(405).json({ message: "Not allowed" });

  await db.connectToDatabase();
  console.log(seedData.entries);

  try {
    await Entry.deleteMany({});
    const result = await Entry.insertMany(seedData.entries);
  } catch (error) {
    console.log("ERROR!:", error);
  }

  await db.disconnectFromDatabase();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
