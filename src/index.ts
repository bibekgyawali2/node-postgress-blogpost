import app from "./config/app";
import dataSource from "./config/database.config";
import Env from "./config/env";
import Print from "./utils/print";

dataSource
    .initialize()
    .then(async () => {
        app.listen(Env.PORT, async () => {
            Print.info(`Server is running on port ${Env.PORT}`);
            Print.info("DataBase Connected Successfully ");
        });
    }).catch((err) => {
        Print.error(err);
    })