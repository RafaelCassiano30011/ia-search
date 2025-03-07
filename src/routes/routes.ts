import { FastifyInstance } from "fastify";

const appRoutes = async (app: FastifyInstance) => {
  app.post("/store", () => {
    return { message: "Store route" };
  });
};

export { appRoutes };
