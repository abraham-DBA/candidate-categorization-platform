import mongoose from "mongoose";

export const candidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        },
        skills: [
            {
                type: String,
                required: true,
            },
        ],
        tier: Number,
    },
    {
        timestamps: true,
    }
);
export const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;