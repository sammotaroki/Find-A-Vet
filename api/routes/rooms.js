import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/RoomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create 
router.post("/:clinicid", verifyAdmin, createRoom);
//update
router.put("/:id", verifyAdmin, updateRoom)
//delete 
router.delete("/:id/:clinicid", verifyAdmin, deleteRoom)
//get 
router.get("/:id", getRoom)
//get all 
router.get("/", getAllRooms);


export default router