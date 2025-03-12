import { FastifyInstance } from "fastify";
import { registerStore } from "./controller/register-store-controller";
import { registerProducts } from "./controller/register-products-controller";

const appRoutes = async (app: FastifyInstance) => {
  app.get("/store", () => {
    return { message: "Store route" };
  });
  app.post("/store", registerStore);

  app.post("/store/products", registerProducts);
};

export { appRoutes };
