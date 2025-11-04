import { Router } from "express";
import { 
    registerCandidate, 
    getAllCandidates, 
} from "../controllers/candidate.controller.js";


const candidateRouter = Router();

// Get all candidates
candidateRouter.get("/get-candidates", getAllCandidates);

// Register a new candidate
candidateRouter.post("/register-candidate", registerCandidate);


export default candidateRouter;