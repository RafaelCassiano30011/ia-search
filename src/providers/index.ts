import { vtex } from "./vtex";

export interface ProviderProps {
  account: string;
  appKey: string;
  appToken: string;
}

interface Providers {
  [key: string]: (props: ProviderProps) => {
    getAllProducts: () => Promise<void>;
  };
}

const providers: Providers = {
  vtex: vtex,
};

export { providers };
