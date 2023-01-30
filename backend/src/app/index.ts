import "dotenv/config";
import fastify from "fastify";

import { appRoutes } from "../routes";

const app = fastify({ logger: true });
app.register(appRoutes);

export { app };
