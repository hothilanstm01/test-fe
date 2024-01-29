import React, { useEffect, useState } from "react";
import { productListApi } from "../../api/products/products";
import TableBase from "../../common/components/Table";
import { _format } from "../../common/utils/format";
import ProductList from "../../common/components/Products/ProductList";
import { Spin } from "antd";

const Home = () => {
  const [todoApi, setTodoApi] = useState({ limit: 10, skip: 0 });
  const [data, setData] = useState<IProductList[]>([]);
  const [loading, setLoading] = useState(false);
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await productListApi.getAll(todoApi);
      if (res.status === 200) {
        setLoading(false);
        setData(res.data.products);
      }
    } catch (err) {
      setLoading(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [todoApi]);

  return (
    <div className="home-page">
      <ProductList
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        setTodoApi={setTodoApi}
        todoApi={todoApi}
      />
    </div>
  );
};

export default Home;
