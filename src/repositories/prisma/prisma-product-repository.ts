import { Prisma, Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProductRepository } from "../product-repository";

export class PrismaProductRepository implements ProductRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = prisma.product.create({ data });

    return product;
  }
}
