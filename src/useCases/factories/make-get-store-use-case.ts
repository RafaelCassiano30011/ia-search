import { PrismaStoreRepository } from "@/repositories/prisma/prisma-store-repository";
import { GetStoreUseCase } from "@/useCases/get-store";

export function makeGetStoreUseCase() {
  const storeRepository = new PrismaStoreRepository();
  const registerStoreUseCase = new GetStoreUseCase(storeRepository);

  return registerStoreUseCase;
}
