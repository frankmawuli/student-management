import { sql } from "../config/db.js";
//create a new  user 
export const createUser = async (req, res) => {
    const {id ,name, email, phone ,dob, password , program} = req.body;
    if( !id || !name || !email || !phone || !dob || !password ||!program) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const [day, month, year] = dob.split("/");
    const formattedDob = `${year}-${month}-${day}`;


    try {
        const existingUser = await sql`SELECT * FROM users WHERE email = ${email} OR phone = ${phone}
        program = ${program}`;
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User with this email or phone already exists" });
        }

        const newUser = await sql`
            INSERT INTO users (id, name, email, phone, dob, password)
            VALUES (${id}, ${name}, ${email}, ${phone}, ${formattedDob}, ${password})
            RETURNING *;
        `;

        return res.status(201).json(newUser[0]);

    }catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }


}


//edit user details
export const  editUser = async (req, res) => {
    const {id } = req.params;
    const {name, email, phone, address, dob, emergency_contact, program, academic_year, current_gpa} = req.body;


    const [day, month, year] = dob.split("/");
    const formattedDob = `${year}-${month}-${day}`;


     const userExist = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (userExist.length === 0) {
        return res.status(404).json({ message: "User not found" }); 
    }
    try{
        const updatedUser = await sql`
            UPDATE users
            SET 
                name = COALESCE(${name}, name),
                email = COALESCE(${email}, email),
                phone = COALESCE(${phone}, phone),
                address = COALESCE(${address}, address),
                dob = COALESCE(${formattedDob}, dob),
                emergency_contact = COALESCE(${emergency_contact}, emergency_contact),
                program = COALESCE(${program}, program),
                academic_year = COALESCE(${academic_year}, academic_year),
                current_gpa = COALESCE(${current_gpa}, current_gpa)
            WHERE id = ${id}
            RETURNING *;
        `;

        return res.status(200).json(updatedUser[0]);    
    }catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await sql`SELECT * FROM users WHERE id = ${id}`;
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
