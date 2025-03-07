import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface data {
  index: string;
  name: string;
  address: string;
}

const filePath: string = path.join(
  process.cwd(),
  "src",
  "app",
  "jsons",
  "listData.json",
);

const getDataList = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedData: data[] = JSON.parse(data);

    return parsedData;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
};

const writeDataList = async (data: data) => {
  try {
    const existingData = await fs
      .readFile(filePath, "utf8")
      .then(JSON.parse)
      .catch(() => []);
    const updatedData = [...existingData, data];

    await fs.writeFile(filePath, JSON.stringify(updatedData), "utf8");
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const GET = async () => {
  try {
    const dataList = await getDataList();
    return NextResponse.json({ data: dataList }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const newData: data = await req.json();
    await writeDataList(newData);

    return NextResponse.json(
      { data: "Data written successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to write data" },
      { status: 500 },
    );
  }
};

// const getLength = async () => {
//   try {
//     const data = await fs.readFile(filePath, "utf8");
//     const length = JSON.parse(data).length + 1;
//
//     return NextResponse.json({ length: length.toString() });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: "Failed to fetch length",
//       },
//       { status: 500 },
//     );
//   }
// };
