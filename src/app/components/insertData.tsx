"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import dataSchema from "@/app/schemas/dataSchema";

const InsertData = () => {
  type data = {
    name: string;
    address: string;
  };

  type response = {
    data: data[];
    status: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      address: "",
    },
    resolver: zodResolver(dataSchema),
  });

  const clickInsert = async (data: data) => {
    const dataLen: string = await getIndex();
    const jsonData = JSON.stringify({ ...data, index: dataLen });
    console.log("jsonData:", jsonData);

    // try {
    //   const response = await fetch("/api/list");
    // } catch (error) {
    //   console.error("Error fetching length:", error);
    // }
  };

  const getIndex = async () => {
    const response = await fetch("/api/list/");
    const data: response = await response.json();
    return (data.data.length + 1).toString();
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md space-y-8 mb-8">
      <form className="space-y-6" onSubmit={handleSubmit(clickInsert)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
            required
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertData;
