import { ProductRepository } from "@/repositories/product-repository";

export interface RegisterProductUseCaseProps {
  name: string;
  segment: string;
  account: string;
  plataform: "vtex";
}

export class RegisterProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: RegisterProductUseCaseProps) {
    //const product = await this.productRepository.create();
    //return { product };
  }
}
