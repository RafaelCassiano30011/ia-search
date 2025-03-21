import axios from "axios";

import { ProviderProps } from ".";
import fs from "fs";
import { excelToJSON } from "@/utils/convertExcelToJson";

interface VtexProvider extends ProviderProps {}

function vtex({ account, appKey, appToken }: VtexProvider) {
  const api = axios.create({
    baseURL: `https://${account}.vtexcommercestable.com.br`,
    headers: {
      "X-VTEX-API-AppKey": appKey,
      "X-VTEX-API-AppToken": appToken,
    },
  });

  //async function getProducts(page: number = 1): Promise<any> {
  //  const pagezise = 1000;
  //  const { data } = await api.get(`/api/catalog_system/pvt/sku/stockkeepingunitids?page=${page}&pagesize=${pagezise}`);
  //  console.log(data);

  //  if (data.length === pagezise) {
  //    return [...data, ...(await getAllSkus(page + 1))];
  //  }

  //  return data;
  //}

  async function getAllProducts(files: any) {
    const productsIds = new Map();

    files.forEach((file: any) => {
      const jsonData = excelToJSON(file.file);

      jsonData.forEach((product) => {
        const productId = product["_IDProduto (Não alterável)"];

        if (!productsIds.has(productId)) {
          productsIds.set(productId, product);
        }
      });
    });

    console.log(productsIds);

    return productsIds;
  }

  return {
    getAllProducts,
  };
}

export { vtex };
