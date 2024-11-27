// lib/mongodb.js
import mongoose from "mongoose";

const connection = {}; /* creating connection object */

async function dbConnect() {
  if (connection.isConnected) {
    return mongoose.connection; // Return existing Mongoose connection
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000, // Ensure this is included
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected"); // Log connection success
    return db.connection; // Return the Mongoose connection
  } catch (error) {
    console.error("MongoDB connection error:", error); // Log connection error
    throw error; // Rethrow the error for handling in the API
  }
}

export default dbConnect;
