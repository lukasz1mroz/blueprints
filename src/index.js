import express from "express";
import { loggers } from "winston";

const app = express();
const port = 3000;

app.use("/", router);

app.listen(port, () => loggers.info(`App llistening on port: ${port}`));
