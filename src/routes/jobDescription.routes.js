import { Router } from "express";
import {
    createJobDescription,
    getJobDescriptions,
    getJobDescriptionById,
    updateJobDescription,
    deleteJobDescription
} from "../controllers/jobDescription.controller.js";

const router = Router();

// Public routes - no authentication required
router.route("/").get(getJobDescriptions);
router.route("/").post(createJobDescription);
router.route("/:id").get(getJobDescriptionById);
router.route("/:id").patch(updateJobDescription);
router.route("/:id").delete(deleteJobDescription);

export default router; 
