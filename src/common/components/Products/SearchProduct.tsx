import { Input } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";

type TSearchProduct = {
  handleSearch: any;
};
const SearchProduct: React.FC<TSearchProduct> = ({ handleSearch }) => {
  return (
    <Input
      className="input-search"
      suffix={<CiSearch />}
      onChange={(data: any) => handleSearch(data?.target?.value)}
      placeholder="Search..."
    />
  );
};

export default SearchProduct;
