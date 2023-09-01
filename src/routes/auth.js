import express from "express";
import authController from "../controllers/auth";
import isAuthenticated from "../middleware/isAuthenthicated";
import {
  loginValidator,
  registorValidator,
  updateValidator,
} from "../middleware/validator/auth";
import { validate } from "../middleware/validator";

const auth = express.Router();

auth.post(
  "/register",
  registorValidator,
  validate,
  authController.registerUser
);
auth.post("/login", loginValidator, validate, authController.loginUser);
auth.put(
  "/update",
  isAuthenticated,
  updateValidator,
  validate,
  authController.updateUser
);
auth.delete("/", isAuthenticated, authController.deactivateAccount);

auth.get("/logout", isAuthenticated, authController.logoutUser);

auth.get("/protected", isAuthenticated, function (req, res) {
  res.status(200).json({ message: "Protected Route", user: req.user });
});

export default auth;
