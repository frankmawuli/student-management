import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import UserRoutes from "./routes/users.js"
import initDB from "./utils/create-tables.js";

dotenv.config();
const app = express();



// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", UserRoutes);




app.listen(3000, () => {
  initDB();
  console.log("Server is running on port 3000");
});
