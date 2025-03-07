import { NextApiRequest, NextApiResponse } from "next";
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const dataList: data[] = await getDataList();

      return res.status(200).json({ data: dataList });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const data: data = req.body;
      await writeDataList(data);

      return res.status(200).json({ message: "Data written successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to write data" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export const getDataList = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedData: data[] = JSON.parse(data);

    return parsedData;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const writeDataList = async (data: data) => {
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

// export const GET_LENGTH = async () => {
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

export default handler;
