import express from "express";
import { countByCity, countByType, createGroomer, deleteGroomer, getAllGroomers, getGroomer, updateGroomer } from "../controllers/GroomerController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create 
router.post("/", verifyAdmin, createGroomer);
//update
router.put("/:id", verifyAdmin, updateGroomer)
//delete 
router.delete("/:id", verifyAdmin, deleteGroomer)
//get 
router.get("/find/:id", getGroomer)
//get all 
router.get("/", getAllGroomers);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router