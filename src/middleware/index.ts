import express, { Application } from "express";
import errorHandler from "./error.middleware";
import morganMiddleware from "./morgan.middleware";
import routes from "../routes/index";
import swaggerUI from "swagger-ui-express";
// import swaggerui from "../../public/swagger/swagger.json";

import env from "../config/env";

import { Environment } from "../constants/environment";


import cors from "cors";

const middlewares = (app: Application) => {

    app.use(cors());

    app.use(express.json());


    app.use(morganMiddleware);

    app.use(express.static("public/uploads"));

    app.use("/api", routes);

    if (
        env.NODE_ENV === Environment.Development ||
        env.NODE_ENV === Environment.Test
    ) {
        // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerui));
    }


    app.use(errorHandler);
};

export default middlewares;
