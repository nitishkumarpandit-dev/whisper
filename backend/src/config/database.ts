import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅MongoDB connected successfully");

    // process.exit(0);
  } catch (error) {
    console.error("❌MongoDB connect error", error);
    process.exit(1); // Exit the procees
  }
};
