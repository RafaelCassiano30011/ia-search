import { StoreRepository } from "@/repositories/store-repository";
import { StoreWithAccountAlreadyExist } from "./error/store-with-account-already-exist";

export interface RegisterStoreUseCaseProps {
  name: string;
  segment: string;
  account: string;
  plataform: "vtex";
}

export class RegisterStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(data: RegisterStoreUseCaseProps) {
    const storeWithAccount = await this.storeRepository.findByAccount(data.account);

    if (storeWithAccount) {
      throw new StoreWithAccountAlreadyExist();
    }

    const store = await this.storeRepository.create(data);

    return { store };
  }
}
