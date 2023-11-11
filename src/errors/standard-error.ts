import { StatusCodes } from "http-status-codes";

enum ErrorType {
  USERNAME_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  PASSWORD_HASH_FAILURE,
  PASSWORD_VERIFICATION_FAILURE,
  ACCESS_TOKEN_GENERATION_FAILURE,
  ACCESS_TOKEN_MISSING,
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_NOT_ACTIVE,
  AUTHORIZATION_HEADER_NOT_SET,
  FINGERPRINT_MISSING,
  ALBUM_NOT_FOUND,
  INPUT_DATA_NOT_VALID,
  INVALID_API_KEY,
}

class StandardError {
  title: string;
  status: number;

  constructor(t: ErrorType) {
    switch (t) {

      case ErrorType.USERNAME_ALREADY_EXISTS:
        this.title = "Username already exists.";
        this.status = StatusCodes.BAD_REQUEST;
        break;

      case ErrorType.USER_NOT_FOUND:
        this.title = "User not found.";
        this.status = StatusCodes.BAD_REQUEST;
        break;

      case ErrorType.WRONG_PASSWORD:
        this.title = "Wrong password."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      case ErrorType.PASSWORD_HASH_FAILURE:
        this.title = "Failed to hash password."
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
        break;

      case ErrorType.PASSWORD_VERIFICATION_FAILURE:
        this.title = "Failed to verify password."
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
        break;

      case ErrorType.ACCESS_TOKEN_GENERATION_FAILURE:
        this.title = "Failed to generate access token."
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
        break;

      case ErrorType.ACCESS_TOKEN_MISSING:
        this.title = "Your access token is missing."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      case ErrorType.ACCESS_TOKEN_EXPIRED:
        this.title = "Your access token is expired."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      case ErrorType.ACCESS_TOKEN_NOT_ACTIVE:
        this.title = "Your access token is not active yet."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      case ErrorType.AUTHORIZATION_HEADER_NOT_SET:
        this.title = "Authorization header not set."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      case ErrorType.FINGERPRINT_MISSING:
        this.title = "Fingerprint is missing."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      case ErrorType.ALBUM_NOT_FOUND:
        this.title = "Album not found."
        this.status = StatusCodes.NOT_FOUND;
        break;

      case ErrorType.INPUT_DATA_NOT_VALID:
        this.title = "Input data is not valid."
        this.status = StatusCodes.BAD_REQUEST;
        break;

      case ErrorType.INVALID_API_KEY:
        this.title = "Your API key is invalid."
        this.status = StatusCodes.UNAUTHORIZED;
        break;

      default:
        this.title = "Unknown error.";
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }
}

export { StandardError, ErrorType };
