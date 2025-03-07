import { FastifyInstance } from "fastify";
import { registerStore } from "./controller/register-store-controller";

const appRoutes = async (app: FastifyInstance) => {
  app.get("/store", () => {
    return { message: "Store route" };
  });
  app.post("/store", registerStore)
};

export { appRoutes };
