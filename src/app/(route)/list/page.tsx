"use client";
import { useState, useEffect } from "react";

import InsertData from "../../components/insertData";
import Table from "../../components/table";

const List = () => {
  type data = {
    index: string;
    name: string;
    address: string;
  };

  type response = {
    data: data[];
    status: number;
  };

  const [dataList, setDataList] = useState<data[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const fetchDataList = async () => {
    try {
      const response = await fetch("/api/list");
      const data: response = await response.json();
      setDataList(data.data);
      setColumns(Object.keys(data.data[0]));
    } catch (error) {
      console.error("Error fetching length:", error);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <>
      <InsertData />
      <Table columns={columns} data={dataList} />
    </>
  );
};

export default List;
