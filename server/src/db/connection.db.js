import mongoose from "mongoose";
const MONGO_URI =
  "mongodb+srv://sharanumesta1201:lTVkv16qHf3xvNLB@cluster0.b9ss4gt.mongodb.net/urlShortener";

const dbConnect = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Database connected successfully");
};
export default dbConnect;
