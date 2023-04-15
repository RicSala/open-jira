import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Entry } from "../models";

export const getEntryById = async (id) => {
  if (!isValidObjectId(id)) return null;

  await db.connectToDatabase();

  const entry = await Entry.findById(id).lean(); // lean() returns a lean version of the entry

  await db.disconnectFromDatabase();

  return entry; // this won't work because of serialization
};
