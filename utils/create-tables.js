import { sql } from "../config/db.js";
async function initDB() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL UNIQUE,
          address TEXT,
          dob DATE NOT NULL,
          emergency_contact TEXT,
          program TEXT,
          academic_year TEXT,
          current_gpa FLOAT,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      console.log("User table created or already exists.");
    } catch (error) {
      console.error("Error creating users table:", error);
    }
  }

  export default initDB;