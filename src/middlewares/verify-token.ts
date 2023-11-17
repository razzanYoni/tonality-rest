import { NextFunction, Request, Response } from "express";
import jwt, {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";
import { ErrorType, StandardError } from "../errors/standard-error";
import { hashFingerprint } from "../utils/token";

interface TonalityPayload {
  uid: number;
  usr: string;
  fgp: string;
  exp: number;
  nbf: number;
  iss: string;
}

// Compare fingerprint in the token payload with
// the fingerprint stored in the cookie
const verifyFingerprint = async (
  fingerprint: string,
  d: TonalityPayload,
): Promise<boolean> => {
  return (await hashFingerprint(fingerprint)) === d.fgp;
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
  // Authorization Bearer ${accessToken}
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new StandardError(ErrorType.AUTHORIZATION_HEADER_NOT_SET);
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      throw new StandardError(ErrorType.ACCESS_TOKEN_MISSING);
    }

    const fingerprint = req.cookies["Secure-fingerprint"];

    if (!fingerprint) {
      throw new StandardError(ErrorType.FINGERPRINT_MISSING);
    }

    const decodedPayload = jwt.verify(
      accessToken,
      process.env.JWT_SHARED_SECRET as string,
      {
        algorithms: ["HS256"],
        issuer: "Tonality REST Service",
      },
    );

    // Will generate run-time error when the decoded payload is not of the type TonalityPayload
    // This is a wanted behavior because we want to validate the payload type
    await verifyFingerprint(fingerprint, decodedPayload as TonalityPayload);

    next(); // The token is verified, pass to the next middleware
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new StandardError(ErrorType.ACCESS_TOKEN_EXPIRED));
    } else if (error instanceof NotBeforeError) {
      next(new StandardError(ErrorType.ACCESS_TOKEN_NOT_ACTIVE));
    } else if (error instanceof JsonWebTokenError) {
        next(new StandardError(ErrorType.INVALID_SIGNATURE));
    } else if (error instanceof StandardError) {
        next(error);
    }
    // unknown error
    next(error);
  }
};

export { verifyToken };
