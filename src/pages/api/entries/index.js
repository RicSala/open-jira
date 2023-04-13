import { db } from "../../../../database";
import { Entry } from "../../../../models";

export default function handler(req, res) {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      return getEntries(res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }

  res.status(200).json({ message: "John Doe" });
}

const getEntries = async (res) => {
  await db.connectToDatabase();

  const entries = await Entry.find({}).sort({ createdAt: "ascending" });
  res.status(200).json(entries);

  await db.disconnectFromDatabase();
};
