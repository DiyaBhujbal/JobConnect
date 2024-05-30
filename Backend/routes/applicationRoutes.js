import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  ApplyJob,
//   deleteJobPost,
//   getJobById,
//   getJobPosts,
//   updateJob,
} from "../controllers/applicationController.js";

const router = express.Router();

// POST JOB
router.post("/apply-now", userAuth, ApplyJob);

// // IPDATE JOB
// router.put("/update-job/:jobId", userAuth, updateJob);

// // GET JOB POST
// router.get("/find-jobs", getJobPosts);
// router.get("/get-job-detail/:id", getJobById);

// // DELETE JOB POST
// router.delete("/delete-job/:id", userAuth, deleteJobPost);

export default router;