import "dotenv/config";
import fastify from "fastify";

import { appRoutes } from "../routes";

import { errorHandler } from "../utils/error-handler";

const app = fastify({ logger: true });

app.register(appRoutes);
app.setErrorHandler(errorHandler);

export { app };
