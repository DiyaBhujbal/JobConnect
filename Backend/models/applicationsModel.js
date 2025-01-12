import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: Schema.Types.ObjectId, ref: "Jobs" },
    // jobTitle: { type: String, required: [true, "Job Title is required"] },
    jobType: { type: String, required: [true, "Job Type is required"] },
    location: { type: String, required: [true, "Location is required"] },
    salary: { type: Number, required: [true, "Salary is required"] },
    // vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;