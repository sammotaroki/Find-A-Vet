import express from "express";
import { countByCity, countByService, countByType, createClinic, deleteClinic, getAllClinics, getClinic, getClinicTimes, updateClinic } from "../controllers/ClinicController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create 
router.post("/", verifyAdmin, createClinic);
//update
router.put("/:id", verifyAdmin, updateClinic)
//delete 
router.delete("/:id", verifyAdmin, deleteClinic)
//get 
router.get("/find/:id", getClinic)
//get all 
router.get("/", getAllClinics);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/countByService", countByService);
router.get("/time/:id", getClinicTimes);


export default router