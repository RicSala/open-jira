import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};

export const connectToDatabase = async () => {
  if (mongoConnection.isConnected !== 0) {
    console.log("=> using existing database connection");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("=> using existing database connection");
      return;
    }

    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGO_URL, {});
  mongoConnection.isConnected = 1;
  console.log("Connected to MongoDB", process.env.MONGO_URL);
};

export const disconnectFromDatabase = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected !== 0) return;
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  mongoConnection.isConnected = 0;
};
