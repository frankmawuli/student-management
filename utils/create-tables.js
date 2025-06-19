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
      createCourseTable();
      createLecturerTable();
      createEnrollmentTable();
      
      console.log("User table created or already exists.");
    } catch (error) {
      console.error("Error creating users table:", error);
    }
  }

  export default initDB;




  const createLecturerTable = async () => {
    try{
      await sql`
        CREATE TABLE IF NOT EXISTS lecturers (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL UNIQUE,
          address TEXT,
          dob DATE NOT NULL,
          emergency_contact TEXT,
          department TEXT,
          specialization TEXT,
          status TEXT,
          office_location TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      console.log("Lecturer table created or already exists.");
    }catch (error) {
      console.error("Error creating lecturers table:", error);
    }
  }



const createCourseTable = async () => {
    try {
        await sql`
          CREATE TABLE IF NOT EXISTS courses (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            code TEXT NOT NULL UNIQUE,
            description TEXT,
            credits INT NOT NULL,
            semester TEXT NOT NULL,
            Lecturer TEXT NOT NULL,
            number_of_students INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Course table created or already exists.");
      } catch (error) {
        console.error("Error creating courses table:", error);
      }
  }



const createEnrollmentTable = async () => {
    try {
        await sql`
          CREATE TABLE IF NOT EXISTS enrollments (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(id),
            course_id INT NOT NULL REFERENCES courses(id),
            semester TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Enrollment table created or already exists.");
      } catch (error) {
        console.error("Error creating enrollments table:", error);
      }
  }

