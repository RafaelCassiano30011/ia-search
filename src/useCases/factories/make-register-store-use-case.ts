import { PrismaStoreRepository } from "@/repositories/prisma/prisma-store-repository";
import { RegisterStoreUseCase } from "@/useCases/register-store";

export function makeRegisterStoreUseCase() {
  const storeRepository = new PrismaStoreRepository();
  const registerStoreUseCase = new RegisterStoreUseCase(storeRepository);

  return registerStoreUseCase;
}
