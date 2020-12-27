import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import express, { response } from "express";
import apiRoutes from "./routes/apiRoutes";
import fetch from "node-fetch";
import Repo from "./models/repo";
import mongoose from "mongoose";
import cors from "cors";

/**
 * DESCRIPTION
 */

//Retrive and Store RepoList
const getRepoData = async () => {
  try {
    const res = await fetch("https://api.github.com/users/octocat/repos");
    const body = await res.json();
    body.map((repo: any) => {
      const repoRecord = new Repo({
        _id: repo.id,
        title: repo.name,
        description: repo.description,
        url: repo.html_url,
        imageSRC: "https://picsum.photos/1000/700",
      });
      console.log(repoRecord);
      try {
        repoRecord.delete({});
        repoRecord.save();
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

async function main() {
  getRepoData();
  setInterval(getRepoData, 1000 * 3600 * 24);

  //express app
  const app = express();
  app.use(cors());
  //DataBase URL
  const dbURL = "REPLACE WITH MONOGDB URL";

  //Connect to MongoDB
  mongoose.connect(dbURL, { useNewUrlParser: true });

  //listen for requests
  app.listen(3001);

  //apiRequests
  app.use("/api", apiRoutes);

  //404
  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND);
    res.send("<p>404</p><p>Not Found</p>");
  });
}

try {
  main();
} catch (err) {
  console.log(err);
}
