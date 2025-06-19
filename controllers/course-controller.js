import { sql } from "../config/db.js";
//create a course
export const addCourse = async (req, res) => {
  const { name, code, description, credits, semester, lecturer } = req.body;

  try {
    const existingCourse = await sql`
        SELECT * FROM courses WHERE code = ${code};
        `;
    if (existingCourse.length > 0) {
      return res
        .status(400)
        .json({ error: "Course with this code already exists" });
    }

    const result = await sql`
        INSERT INTO courses (name, code, description, credits, semester, lecturer)
        VALUES (${name}, ${code}, ${description}, ${credits}, ${semester}, ${lecturer})
        RETURNING *;
        `;

    res.status(201).json({
      message: "Course created successfully",
      course: result[0],
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

//get all courses
export const getAllCourses = async (req, res) => {
  try {
    const result = await sql`
        SELECT * FROM courses;
        `;

    res.status(200).json({
      message: "Courses retrieved successfully",
      courses: result,
    });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ error: "Failed to retrieve courses" });
  }
};

//enroll in a course
export const enrollInCourse = async (req, res) => {
  const { userId, courseId, semester, status } = req.body;

  try {
    //check if user or course exist
    const existCourse = await sql`
        SELECT * FROM courses WHERE id = ${courseId};
        `;
    if (existCourse.length === 0) {
        return res.status(404).json({ error: "Course not found" });
    }
    const existUser = await sql`
        SELECT * FROM users WHERE id = ${userId};
        `;
    if (existUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    //check if user is already enrolled in the course
    const enrollmentExists = await sql`
        SELECT * FROM enrollments WHERE user_id = ${userId} AND course_id = ${courseId};
        `;
    if (enrollmentExists.length > 0) {
      return res.status(400).json({ error: "User is already enrolled in this course" });
    }


    const result = await sql`
        INSERT INTO enrollments (user_id, course_id, semester, status)
        VALUES (${userId}, ${courseId}, ${semester}, ${status})
        RETURNING *;
        `;

    //update number of students in the course
    await sql` SELECT number_of_students FROM courses WHERE id = ${courseId}`;
    await sql` UPDATE courses SET number_of_students = number_of_students + 1 WHERE id = ${courseId};`;

    res.status(201).json({
      message: "Enrollment successful",
      enrollment: result[0],
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ error: "Failed to enroll in course" });
  }
};

//unenroll from a course
export const unenrollFromCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  //check if enrollment exists
  const enrollmentExists = await sql`
    SELECT * FROM enrollments WHERE user_id = ${userId} AND course_id = ${courseId}`;
    if (enrollmentExists.length === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
    }



  try {
    const result = await sql`
        DELETE FROM enrollments
        WHERE user_id = ${userId} AND course_id = ${courseId}
        RETURNING *;
        `;

    //update number of students in the course
    await sql` UPDATE courses SET number_of_students = number_of_students - 1 WHERE id = ${courseId};`;

    if (result.length === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({
      message: "Unenrollment successful",
      unenrollment: result[0],
    });
  } catch (error) {
    console.error("Error unenrolling from course:", error);
    res.status(500).json({ error: "Failed to unenroll from course" });
  }
};
