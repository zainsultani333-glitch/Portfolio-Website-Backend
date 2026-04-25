import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import subscriberRoutes from "./routes/subscriberRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/messages", messageRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));