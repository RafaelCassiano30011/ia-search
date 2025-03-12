import { providers } from "@/providers";
import { StoreWithAccountNotExist } from "@/useCases/error/store-with-account-not-exist";
import { makeGetStoreUseCase } from "@/useCases/factories/make-get-store-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const registerProducts = async (req: FastifyRequest, res: FastifyReply) => {
  const registerProductsSchema = z.object({
    account: z.string(),
  });

  const { account } = registerProductsSchema.parse(req.body);

  try {
    const registerStoreUseCase = makeGetStoreUseCase();
    const { store } = await registerStoreUseCase.execute({ account });

    console.log(store);

    const storeProviderSchema = z.object({
      appKey: z.string(),
      appToken: z.string(),
      plataform: z.string(),
    });

    const { appKey, appToken, plataform } = storeProviderSchema.parse(store);

    const provider = providers[plataform]({ account, appKey, appToken });
    const allProducts = await provider.getAllProducts();

    return res.status(201).send("Products register successfully");
  } catch (err: any) {
    if (err instanceof StoreWithAccountNotExist) {
      return res.status(409).send({ message: err.message });
    }

    return res.status(500).send({ message: err.message });
  }
};
