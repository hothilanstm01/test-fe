import { Card, Table } from "antd";
import React, { FC, useEffect, useState } from "react";
import { PAGE_SIZE } from "../../libs/others/constant-constructer";
import EmptyData from "../EmptyData";

const TableBase: FC<IPrimaryTable> = (props) => {
  const {
    columns,
    children,
    TitleCard,
    Extra,
    className,
    loading = false,
    bordered,
    pageSize = PAGE_SIZE,
  } = props;
  const { total, current, expand, data, onExpand, onChangePage, maxHeight } =
    props;

  const [dataSource, setDataSource] = useState([]);
  const [rowKeys, setRowKeys] = useState([{ currentPage: 1, listKeys: [] }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowActivated, setActive] = useState(null);

  const changePagination = (pageNumber: number, pageSize: number) => {
    setCurrentPage(pageNumber);
    if (!rowKeys.some((object) => object["currentPage"] == pageNumber)) {
      rowKeys.push({
        currentPage: pageNumber,
        listKeys: [],
      });
    }

    setRowKeys([...rowKeys]);

    if (typeof onChangePage != "undefined") {
      onChangePage(pageNumber, pageSize);
    } else {
      return pageNumber;
    }
  };

  const onChangeExpand = (expandedRows: any) => {
    setActive(parseInt(expandedRows[expandedRows.length - 1]) as any);

    if (rowKeys.some((object) => object["currentPage"] == currentPage)) {
      let index = rowKeys.findIndex((item) => item.currentPage == currentPage);
      rowKeys[index].listKeys = expandedRows;
    }

    setRowKeys([...rowKeys]);
  };

  const returnRowKeys = () => {
    let rowK: any = null;

    if (rowKeys.some((object) => object["currentPage"] == currentPage)) {
      const temp: any = rowKeys;
      rowK = temp.find(
        (item: any) => item.currentPage === currentPage
      ).listKeys;
    } else {
      rowK = [];
    }

    if (rowK.length > 1) {
      rowK.splice(rowK.length - 2, 1);
    }

    return rowK;
  };

  const _expand = (expand: any, record: any) => {
    if (typeof onExpand != "undefined") {
      onExpand(record);
    }
  };

  const onShowSizeChange = (current: any, size: any) => {};

  useEffect(() => {
    if (data) {
      let dataClone: any = [...data];
      dataClone.forEach((item: any, index: number) => {
        item.key = index.toString();
      });
      setDataSource(dataClone);
    }
  }, [data]);

  const getHeight = () => {
    const elmnt = document.getElementsByClassName("app-content");
    return elmnt.length > 0 ? elmnt[0]?.clientHeight - 300 : 600;
  };

  return (
    <div className="wrap-table">
      <Card
        className={`${className && className}`}
        title={TitleCard}
        extra={Extra}
      >
        {children}
        {dataSource.length == 0 && <EmptyData loading={loading} />}
        {dataSource.length > 0 && (
          <Table
            loading={loading}
            bordered={bordered}
            scroll={{ x: "max-content", y: maxHeight || getHeight() }}
            columns={columns}
            dataSource={dataSource}
            size="middle"
            pagination={{
              pageSize: pageSize,
              pageSizeOptions: ["20"],
              onShowSizeChange: onShowSizeChange,
              total: total && total,
              current: current && current,
              showTotal: () =>
                total && (
                  <div className="font-weight-black">Tổng cộng: {total}</div>
                ),
              onChange: (pageNumber, pageSize) =>
                changePagination(pageNumber, pageSize),
            }}
            rowClassName={(record, index) =>
              index == rowActivated
                ? "active"
                : index % 2 === 0
                ? "row-light"
                : "row-dark"
            }
            onRow={(record, index) => ({
              onClick: () => setActive(index as any),
            })}
            expandable={rowKeys[0].listKeys.length > 0 && expand}
            expandedRowRender={
              !expand
                ? undefined
                : (record, index, indent, expaned) => (expaned ? expand : null)
            }
            onExpandedRowsChange={onChangeExpand}
            onExpand={_expand}
            expandedRowKeys={returnRowKeys()}
          />
        )}
      </Card>
    </div>
  );
};

export default TableBase;
