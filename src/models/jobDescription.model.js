import mongoose, { Schema } from 'mongoose';

const jobDescriptionSchema = new Schema({
    job_opening_id: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    requirements: {
        type: String,
        required: true,
        trim: true
    },
    responsibilities: {
        type: String,
        required: true,
        trim: true
    },
    pay: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true,
    toJSON: { 
        transform: function(doc, ret) {
            ret.id = ret._id;
            ret.created_at = ret.createdAt;
            ret.updated_at = ret.updatedAt;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

export const JobDescription = mongoose.model('JobDescription', jobDescriptionSchema); 
