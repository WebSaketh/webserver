import { RequestHandler } from "express";
import Repo from "../../models/repo";

export const getAllRepos: RequestHandler = (req, res, next) => {
  Repo.find({}, function (err, repos) {
    res.send(repos);
  });
};
