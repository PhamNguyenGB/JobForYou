import { NextFunction, Request, RequestHandler, Response } from "express";
import { Schema } from "joi";

export const validate = (
  schema: Schema,
  property: "body" | "query" | "params" = "body"
): RequestHandler => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        errors: error.details.map((d) => d.message),
      });
      return; // Không cần return Response
    }

    req[property] = value;
    next();
  };
};
