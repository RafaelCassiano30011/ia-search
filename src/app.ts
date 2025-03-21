import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyMultipart from "@fastify/multipart";

export const app = fastify();

app.register(fastifyMultipart, { limits: { fileSize: 10 * 1024 * 1024 } });
app.register(appRoutes);

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send({ message: "Validation error", issues: error.format });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  }

  return res.status(500).send({ message: error.message });
});
