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

  const [dataList, setDataList] = useState<data[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const fetchDataList = async () => {
    try {
      const response = await fetch("/api/list");

      if (!response.ok) {
        throw new Error("Failed to fetch length");
      }

      const data = await response.json();
      setDataList(data);
      console.log(data);
      setColumns(Object.keys(data[0]));
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
