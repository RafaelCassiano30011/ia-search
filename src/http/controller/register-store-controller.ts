import { StoreWithAccountAlreadyExist } from "@/useCases/error/store-with-account-already-exist";
import { makeRegisterStoreUseCase } from "@/useCases/factories/make-register-store-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const registerStore = async (req: FastifyRequest, res: FastifyReply) => {
  const registerStoreSchema = z.object({
    name: z.string(),
    account: z.string(),
    segment: z.string(),
    plataform: z.enum(["vtex"]),
  });

  const { name, account, segment, plataform } = registerStoreSchema.parse(req.body);

  try {
    const registerStoreUseCase = makeRegisterStoreUseCase();
    const store = await registerStoreUseCase.execute({ name, account, segment, plataform });

    return res.status(201).send(store);
  } catch (err) {
    if (err instanceof StoreWithAccountAlreadyExist) {
      return res.status(409).send({ message: err.message });
    }
  }
};
