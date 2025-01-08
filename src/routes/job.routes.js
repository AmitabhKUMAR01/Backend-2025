import { Router } from "express";
import { 
    createJob,
    getAllJobs,
    updateJob,
    deleteJob
} from "../controllers/job.controller.js";

const router = Router();

// Public routes - no authentication required
router.route("/").get(getAllJobs);
router.route("/").post(createJob);
router.route("/:id").patch(updateJob);
router.route("/:id").delete(deleteJob);

export default router; 
