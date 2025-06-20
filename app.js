import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import UserRoutes from "./routes/users.js"
import initDB from "./utils/create-tables.js";
import CourseRoutes from "./routes/courses.js"
import Auth from "./routes/auth.js";
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

app.use("/api/courses", CourseRoutes);
app.use("/api/auth", Auth);




app.listen(3000, () => {
  initDB();
  console.log("Server is running on port 3000");
});
