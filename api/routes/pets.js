import express from "express";
import { createPet, deletePet, getAllPets, getPet, updatePet } from "../controllers/PetController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create 
router.post("/:userid", verifyAdmin, createPet);
//update
router.put("/:id", verifyAdmin, updatePet)
//delete 
router.delete("/:id:userid", verifyAdmin, deletePet)
//get 
router.get("/:id", getPet)
//get all 
router.get("/", getAllPets);


export default router