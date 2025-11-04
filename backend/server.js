import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import candidateRouter from "./routes/candidate.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// API routes
app.use("/api/candidates", candidateRouter);


app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});