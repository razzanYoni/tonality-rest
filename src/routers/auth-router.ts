import express, { Router } from "express";
import * as AuthController from "../controllers/auth-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import multer from "multer";

const authRouter: Router = express.Router();

authRouter.post(
  "/api/signup",
  AuthController.signup,
  handleStandardError);

authRouter.post(
  "/api/login",
  AuthController.login,
  handleStandardError);

export { authRouter };
