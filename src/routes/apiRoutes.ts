import express from "express";
import { getAllRepos } from "../controllers/repo/getAllRepos";

const router = express.Router();

router.get("/repo", getAllRepos);

export default router;
