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
  // TODO: it could be disconnecting and this would be a problem
  if (mongoConnection.isConnected !== 0) {
    console.log("=> using existing database connection");
    return;
  }

  // if there is a connection, use it
  if (mongoose.connections.length > 0) {
    // and read its state
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    // if it is connected, return
    if (mongoConnection.isConnected === 1) {
      console.log("=> using existing database connection");
      return;
    }

    // otherwise, force disconnect
    await mongoose.disconnect();
  }

  // create a new connection (at this poing we are sure there is no connection)
  const db = await mongoose.connect(process.env.MONGO_URL, {});
  // and store its state
  mongoConnection.isConnected = 1;
  console.log("Connected to MongoDB", process.env.MONGO_URL);
};

export const disconnectFromDatabase = async () => {
  // TODO: change this in production.
  // for dev we don't want to disconnect from the database each time
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected !== 0) return;
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  mongoConnection.isConnected = 0;
};
