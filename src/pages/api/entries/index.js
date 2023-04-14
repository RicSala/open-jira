import { db } from "../../../../database";
import { Entry } from "../../../../models";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }

  res.status(200).json({ message: "John Doe" });
}

const getEntries = async (res) => {
  await db.connectToDatabase(); // in nextjs, each time we receive a request, we need to connect to the database
  // due the the use of serverless functions

  const entries = await Entry.find({}).sort({ createdAt: "ascending" });
  res.status(200).json(entries);

  await db.disconnectFromDatabase();
};

const postEntry = async (req, res) => {
  const { description } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connectToDatabase();
    await newEntry.save();
    await db.disconnectFromDatabase();
    res.status(201).json({ newEntry });
  } catch (error) {
    await db.disconnectFromDatabase();
    console.log(error);
    return res.status(500).json({ message: "Error al guardar la entrada" });
  }
};
