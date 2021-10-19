import express from "express";
import Router from "./controller/Router.js";
import { returnError } from "./utils/errorHandler.js";
import { logger } from "./utils/logger.js";

const app = express();
const port = 3000;

app.use("/", Router);
app.use(returnError);

app.listen(port, () => logger.info(`App listening on port: ${port}`));
