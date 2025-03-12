export class StoreWithAccountNotExist extends Error {
  constructor() {
    super("Store with account not exists");
  }
}
