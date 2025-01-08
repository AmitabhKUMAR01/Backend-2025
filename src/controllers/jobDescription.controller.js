import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JobDescription } from "../models/jobDescription.model.js";

const createJobDescription = asyncHandler(async (req, res) => {
    const { 
        job_opening_id,
        description,
        requirements,
        responsibilities,
        pay,
        experience,
        status 
    } = req.body;

    if ([job_opening_id, description, requirements, responsibilities, pay, experience]
        .some(field => !field?.trim())) {
        throw new ApiErrors(400, "All fields are required");
    }

    const jobDescription = await JobDescription.create({
        job_opening_id,
        description,
        requirements,
        responsibilities,
        pay,
        experience,
        status: status || 'active'
    });

    return res.status(201).json({
        job_descriptions: [jobDescription]
    });
});

const getJobDescriptions = asyncHandler(async (req, res) => {
    const jobDescriptions = await JobDescription.find({ status: 'active' })
        .sort({ createdAt: -1 });

    return res.status(200).json({
        job_descriptions: jobDescriptions
    });
});

const getJobDescriptionById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jobDescription = await JobDescription.findOne({
        job_opening_id: id,
        status: 'active'
    });

    if (!jobDescription) {
        throw new ApiErrors(404, "Job description not found");
    }

    return res.status(200).json({
        job_descriptions: [jobDescription]
    });
});

const updateJobDescription = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { 
        description,
        requirements,
        responsibilities,
        pay,
        experience,
        status 
    } = req.body;

    const jobDescription = await JobDescription.findByIdAndUpdate(
        id,
        {
            $set: {
                description,
                requirements,
                responsibilities,
                pay,
                experience,
                status
            }
        },
        { new: true }
    );

    if (!jobDescription) {
        throw new ApiErrors(404, "Job description not found");
    }

    return res.status(200).json({
        job_descriptions: [jobDescription]
    });
});

const deleteJobDescription = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const jobDescription = await JobDescription.findByIdAndDelete(id);

    if (!jobDescription) {
        throw new ApiErrors(404, "Job description not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Job description deleted successfully", null)
    );
});

export {
    createJobDescription,
    getJobDescriptions,
    getJobDescriptionById,
    updateJobDescription,
    deleteJobDescription
}; 
