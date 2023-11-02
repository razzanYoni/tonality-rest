import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { StandardError } from "../errors/standard-error";

const generateResponse = (
  res: Response,
  status: StatusCodes,
  data: any,
): void => {
  res.status(status).json(data ? data : null);
};

const generateStandardErrorResponse = (
  res: Response,
  e: StandardError,
): void => {
  res.status(e.status).json(e);
};

export { generateResponse, generateStandardErrorResponse };
