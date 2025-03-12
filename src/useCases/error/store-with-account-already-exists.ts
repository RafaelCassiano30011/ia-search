export class StoreWithAccountAlreadyExist extends Error {
  constructor() {
    super("Store with account already exists");
  }
}
