import { Router } from "express";
import { createUser, editUser , getUser} from "../controllers/user-controller.js";
const router = Router();


//Create a new user
router.post("/new-user", createUser);

//Get all users
router.get("/all-users", (req, res) => {});

//Get a user by ID
router.get("/user-get /:id", getUser);

//Update a user by ID
router.put("/user-update/:id", editUser);

export default router;