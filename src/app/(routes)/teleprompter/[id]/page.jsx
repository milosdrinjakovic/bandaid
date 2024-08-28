"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import textService from "@/services/text";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await textService.getById(id.toString());
      console.log("Fetched object with id:", response);
      setData(response.content ? response.content : "No Data found");
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>; // treba da se sredi

  const handlePlay = () => {

  }

  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex flex-row justify-center space-x-4 p-10 border-b text-3xl">
      <p className="cursor-pointer" onClick={handlePlay}>Play</p>
      <Link className="cursor-pointer" href={"/"}>Stop</Link>
    </div>
    <div className="flex justify-center items-center mt-5 p-4 w-full">
      <div className="scroll-text  max-w-full p-10 text-white  text-5xl ">
        <p>{data}</p>
      </div>
    </div>
  </div>
  );
}
