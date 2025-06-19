import { sql } from "../config/db.js";


//sign in a user
export const signInUser = async (req, res) => {
   const  {userId, password} = req.body;
   try{
         const user = await sql`
              SELECT * FROM users WHERE id = ${userId} AND password = ${password};
         `;
         if (user.length === 0) {
              return res.status(404).json({ error: "User not found or incorrect password" });
         }
         res.status(200).json({
              message: "User signed in successfully",
              user: user[0],
         });
   }catch (error) {
         console.error("Error signing in user:", error);
         res.status(500).json({ error: "Failed to sign in user" });
   }
}

