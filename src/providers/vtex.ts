import axios from "axios";
import { ProviderProps } from ".";

interface VtexProvider extends ProviderProps {}

function vtex({ account, appKey, appToken }: VtexProvider) {
  const api = axios.create({
    baseURL: `https://${account}.vtexcommercestable.com.br`,
    headers: {
      "X-VTEX-API-AppKey": appKey,
      "X-VTEX-API-AppToken": appToken,
    },
  });

  async function getAllSkus(page: number = 1): Promise<any> {
    const pagezise = 1000;
    const { data } = await api.get(`/api/catalog_system/pvt/sku/stockkeepingunitids?page=${page}&pagesize=${pagezise}`);

    console.log(data);

    if (data.length === pagezise) {
      return [...data, ...(await getAllSkus(page + 1))];
    }

    return data;
  }

  async function getAllProducts(): Promise<void> {
    const skus = await getAllSkus();
  }

  return {
    getAllProducts,
  };
}

export { vtex };
