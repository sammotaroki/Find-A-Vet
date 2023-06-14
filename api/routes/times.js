import express from "express"
import { createTime, deleteTime, getAllTimes, getTime, updateTime, updateTimeAvailability } from "../controllers/TimeController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create 
router.post("/:clinicid", verifyAdmin, createTime);
//update
router.put("/:id", verifyAdmin, updateTime)
router.put("/available/:id", updateTimeAvailability)
//delete 
router.delete("/:id/:clinicid", verifyAdmin, deleteTime)
//get 
router.get("/:id", getTime)
//get all 
router.get("/", getAllTimes);


export default router