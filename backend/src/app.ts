import "express-async-errors";
import * as dotenv from "dotenv";
import HandleError from "@middleware/errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";
import { CorsOptions } from "@config/server/CorsConfig";
import { Routes } from "./routes";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { handleError } = new HandleError();
const app: express.Express = express();

app.use(cors(CorsOptions));
app.use(helmet());
app.use(express.json());
app.use(Routes);
app.use(handleError);

export { app };
