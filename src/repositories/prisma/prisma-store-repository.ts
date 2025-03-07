import { Prisma, Store } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { StoreRepository } from "../store-repository";

export class PrismaStoreRepository implements StoreRepository {
  async create(data: Prisma.StoreCreateInput): Promise<Store> {
    const store = prisma.store.create({ data });

    return store;
  }

  async findByAccount(account: string): Promise<Store | null> {
    const store = prisma.store.findUnique({
      where: {
        account,
      },
    });

    return store;
  }

  findAll(): Promise<Store[]> {
    const stores = prisma.store.findMany();

    //TODO IMPLEMENTAR AUTENTICAÇÃO

    return stores;
  }
}
