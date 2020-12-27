import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repoSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageSRC: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

const Repo = mongoose.model("Repo", repoSchema);
export default Repo;
