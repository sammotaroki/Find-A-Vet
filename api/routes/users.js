import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/UserController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//     res.send("Authentication complete!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Authentication complete! You can now delete user")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Authentication complete! You can now delete user")
// })

//update
router.put("/:id", verifyUser, updateUser)
//delete 
router.delete("/:id", verifyUser, deleteUser)
//get 
router.get("/:id", verifyUser, getUser)
//get all 
router.get("/", verifyAdmin, getAllUsers);

export default router