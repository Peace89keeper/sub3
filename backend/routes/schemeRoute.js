import express from "express";
import { getAllSchemes, analyzeSchemes, createScheme } from "../controller/schemeController.js"; // Import it

const router = express.Router();

router.get("/all", getAllSchemes);
router.post("/analyze", analyzeSchemes);
router.post("/create", createScheme); // <--- The new intake pipe

export default router;