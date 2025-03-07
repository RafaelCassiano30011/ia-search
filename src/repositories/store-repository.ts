import { Prisma, Store } from "@prisma/client";

export interface StoreRepository {
  create(data: Prisma.StoreCreateInput): Promise<Store>;

  findByAccount(account: string): Promise<Store | null>;

  findAll(): Promise<Store[]>;
}
