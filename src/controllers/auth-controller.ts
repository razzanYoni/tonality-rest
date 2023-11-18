import * as AuthService from "../services/auth-service";
import { NextFunction, Request, Response } from "express";
import { generateResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    generateResponse(res, StatusCodes.OK, {message: "Token is valid"});
  } catch (err) {
    next(err);
  }
}

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const createdUser = await AuthService.signup(req.body);
    generateResponse(res, StatusCodes.OK, createdUser);
  } catch (err) {
    next(err);
  }
};

// The storage of tokens on the client side follows the recommendations provided by OWASP
// https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-storage-on-client-side
const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log(req.body)
    const accessTokenAndFingerPrint = await AuthService.login(req.body);
    setFingerprintCookie(res, accessTokenAndFingerPrint.fingerprint);
    generateResponse(res, StatusCodes.OK, {accessToken: accessTokenAndFingerPrint.accessToken});
  } catch (err) {
    next(err);
  }
};

const setFingerprintCookie = (
  res: Response,
  fingerprint: string,
): void => {
  res.cookie("Secure-fingerprint", fingerprint, {
    maxAge: 60 * 60 * 1000, // 60 minutes max age (same as access token expiry)
    httpOnly: true,
    secure: true,
  });
};

const isUsernameAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isUsernameAvailable = await AuthService.isUsernameAvailable(req.body);
    generateResponse(res, StatusCodes.OK, isUsernameAvailable);
  } catch (err) {
    next(err)
  }
}

export { verifyToken, signup, login, isUsernameAvailable };
