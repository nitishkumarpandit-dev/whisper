import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("❌MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);

    console.log("✅MongoDB connected successfully");

    // process.exit(0);
  } catch (error) {
    console.error("❌MongoDB connect error", error);
    process.exit(1); // Exit the procees
  }
};
