import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { _format } from "../../utils/format";
import { Input, Rate, Spin } from "antd";
import { CiSearch } from "react-icons/ci";
import SearchProduct from "./SearchProduct";
import { productListApi } from "../../../api/products/products";

type TProduct = {
  data: IProductList[];
  setData: any;
  loading: boolean;
  setLoading: any;
  todoApi?: any;
  setTodoApi?: any;
};
const ProductList: React.FC<TProduct> = ({
  data,
  setData,
  loading,
  setLoading,
  setTodoApi,
  todoApi,
}) => {
  const [search, setSearch] = useState("");
  const productListRef = useRef(null);
  const handleScroll = () => {
    const productListElement: any = productListRef.current;

    if (
      productListElement &&
      productListElement.scrollHeight - productListElement.scrollTop <=
        productListElement.clientHeight + 1
    ) {
      if (todoApi?.limit < 100) {
        setTodoApi((prevTodoApi: any) => ({
          ...prevTodoApi,
          limit: prevTodoApi.limit + 10,
        }));
      }
    }
  };

  useEffect(() => {
    const productListElement: any = productListRef.current;

    if (productListElement) {
      productListElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (productListElement) {
        productListElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [productListRef]);

  const getProduct = async (value: string) => {
    try {
      setLoading(true);
      const res = await productListApi.getSearch({ q: value });
      if (res.status === 200) {
        setLoading(false);
        setData(res.data?.products);
      }
    } catch (error) {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (value: string) => {
    if (value) {
      setSearch(value);
    } else {
      setSearch("");
    }
  };

  useEffect(() => {
    getProduct(search);
  }, [search]);

  return (
    <div className="wrapper-product">
      <div className="search-product">
        <SearchProduct handleSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <div className="product-list" ref={productListRef}>
          {data?.length > 0 &&
            data?.map((item: any, index: number) => (
              <div className="item" key={index}>
                <div className="inner-item">
                  <img src={item?.thumbnail} alt="" className="image" />
                  <div className="content-inner">
                    <Link to={"/"} className="title">
                      {item?.title}
                    </Link>
                    <div className="price">
                      {_format.numberToPrice(item?.price)}
                    </div>
                    <div className="rate">
                      <Rate disabled defaultValue={item?.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
