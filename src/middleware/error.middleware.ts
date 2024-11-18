import { ErrorRequestHandler } from 'express';
import { Request, Response, NextFunction } from "express";
import Print from "../utils/print";
import messages from "../constants/messages";
import env from "../config/env";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(error);

    Print.debug("Error Handler");
    Print.error(error);

    let statusCode = 500;

    let data = {
        success: false,
        message: messages["serverError"],
        data: [],
        ...(env.DEBUG_MODE == true && { originalError: error.message }),
    };

    if (error.isCustom) {
        statusCode = error.statusCode;
        data = {
            ...data,
            message: error.message,
        };
    }

    // Don't return the response, just send it
    res.status(statusCode).json(data);
    // Either add this line if you want to pass to next error handler
    // next();
};

export default errorHandler;