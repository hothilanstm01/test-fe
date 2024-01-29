type IApiResultData<T = any> = {
  data: IApiResultDataItems & T;
  status: number;
  products: any;
  statusText: string;
};

type IApiResultDataItems<T = any> = {
  products: T;
  limit: number;
  skip: number;
  total: number;
};
