import { instance } from "../instance";

const url = "/products";

export const productListApi = {
  getAll(params: { limit?: number; skip?: number }) {
    return instance.get<IApiResultData<IProductList[]>>(url, {
      params,
    });
  },
  getSearch(params: { q: string }) {
    return instance.get<IApiResultData<IProductList[]>>(`${url}/search`, {
      params,
    });
  },
};
