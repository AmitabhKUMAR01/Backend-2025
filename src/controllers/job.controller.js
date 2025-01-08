import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";

const createJob = asyncHandler(async (req, res) => {
    const { title, department, location, status } = req.body;

    if ([title, department, location].some(field => !field?.trim())) {
        throw new ApiErrors(400, "All fields are required");
    }

    const job = await Job.create({
        title,
        department,
        location,
        status: status || 'active'
    });

    return res.status(201).json(
        new ApiResponse(201, "Job opening created successfully", job)
    );
});

const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ status: 'active' })
        .select("-__v")
        .sort({ createdAt: -1 });

    const formattedJobs = jobs.map(job => ({
        id: job._id,
        title: job.title,
        department: job.department,
        location: job.location,
        status: job.status,
        created_at: job.createdAt,
        updated_at: job.updatedAt
    }));

    return res.status(200).json({
        job_openings: formattedJobs
    });
});

const updateJob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, department, location, status } = req.body;

    const job = await Job.findByIdAndUpdate(
        id,
        {
            $set: {
                title,
                department,
                location,
                status
            }
        },
        { new: true }
    );

    if (!job) {
        throw new ApiErrors(404, "Job opening not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Job opening updated successfully", job)
    );
});

const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
        throw new ApiErrors(404, "Job opening not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Job opening deleted successfully", null)
    );
});

export {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob
}; 
