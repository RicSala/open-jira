import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry } from "../../../../models";

export default function handler(req, res) {
  // this queries are always string type
  const id = req.query.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);

    case "PUT":
      return updateEntry(req, res, id);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntry = async (req, res) => {
  const id = req.query.id;
  await db.connectToDatabase();

  const entry = await Entry.findById(id);
  if (!entry) {
    await db.disconnectFromDatabase();
    return res.status(404).json({ message: "Entrada no encontrada" });
  }

  await db.disconnectFromDatabase();
  return res.status(200).json(entry);
};

const updateEntry = async (req, res, id) => {
  // as we are using serverless functions, we need to connect to the database each time we receive a request
  await db.connectToDatabase();

  // search for the entry
  const entry = await Entry.findById(id);

  // if the entry is not found, return a 404
  if (!entry) {
    await db.disconnectFromDatabase();
    return res.status(404).json({ message: "Entry not found" });
  }

  // if req.body has a descrption, then use it, otherwise use the entry.description
  // if req.body has a status, then use it, otherwise use the entry.status

  const { description = entry.description, status = entry.status } = req.body;

  // update the entry
  entry.description = description;
  entry.status = status;

  // save the entry running validation
  try {
    await entry.save({ validateBeforeSave: true });
    await db.disconnectFromDatabase();
    return res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    await db.disconnectFromDatabase();
    return res.status(500).json({ message: error.errors.status.message });
  }
};
