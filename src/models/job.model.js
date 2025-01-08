import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    location: {
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
    timestamps: true // This will automatically add created_at and updated_at fields
});

export const Job = mongoose.model('Job', jobSchema); 
