import { StoreRepository } from "@/repositories/store-repository";
import { StoreWithAccountNotExist } from "./error/store-with-account-not-exist";

export interface GetStoreUseCaseProps {
  account: string;
}

export class GetStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(data: GetStoreUseCaseProps) {
    const store = await this.storeRepository.findByAccount(data.account);

    if (!store) {
      throw new StoreWithAccountNotExist();
    }

    return { store };
  }
}
