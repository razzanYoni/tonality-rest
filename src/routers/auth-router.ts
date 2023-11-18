import express, { Router } from "express";
import * as AuthController from "../controllers/auth-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import {verifyToken} from "../middlewares/verify-token";

const authRouter: Router = express.Router();

authRouter.post(
  "/api/verify-token",
  verifyToken,
  AuthController.verifyToken,
  handleStandardError
)

authRouter.post(
  "/api/signup",
  AuthController.signup,
  handleStandardError
);

authRouter.post(
  "/api/login",
  AuthController.login,
  handleStandardError
);

authRouter.post(
  "/api/username-availability",
  AuthController.isUsernameAvailable,
  handleStandardError
);

export { authRouter };
