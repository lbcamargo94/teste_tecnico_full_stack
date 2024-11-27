// Express
import { ApiError } from "@erro/index";
import { NextFunction, Request, Response } from "express";
// API Error

export default class HandleError {
  public handleError(
    error: Error & Partial<ApiError>,
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void | any {
    const statusCode = error.statusCode ?? 500;

    const message = error.statusCode ? error.message : error.cause;

    return response.status(statusCode).json({ message });

    next();
  }
}
