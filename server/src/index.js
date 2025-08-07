import express from "express";
import dbConnect from "./db/connection.db.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

import urlRoutes from "./routes/url.routes.js";
app.use("/api", urlRoutes);

dbConnect()
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
}); 