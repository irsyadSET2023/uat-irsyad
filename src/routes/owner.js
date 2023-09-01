import express from "express";
import ownerController from "../controllers/owner";
import isAuthenticated from "../middleware/isAuthenthicated";
import isOwner from "../middleware/isOwner";

const owner = express.Router();
owner.get("/", async function (req, res) {
  res.status(200).json({ message: "Hai" });
});

owner.post("/", isAuthenticated, isOwner, ownerController.createProject);

export default owner;
