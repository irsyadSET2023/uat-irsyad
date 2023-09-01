import express from "express";
import isAuthenticated from "../middleware/isAuthenthicated";
import adminController from "../controllers/admin";

const admin = express.Router();

admin.post(
  "/create_checklist",
  isAuthenticated,
  adminController.createCheckList
);

export default admin;
