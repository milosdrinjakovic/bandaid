"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import teleprompterService from "../../../services/telepromtper-service";
import Link from "next/link";
import React from "react";
import { Error, Lyric } from "../../types";

export default function Page() {
  const [lyric, setLyric] = useState<Lyric | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const params = useParams();
  const { id } = params;

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await teleprompterService.lyricById(id.toString());
      console.log("Fetched object with id:", response);
      setLyric(response);
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
    } else setLyric(null)
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>; // treba da se sredi

  const handlePlay = () => {

  }

  return (
    <div>
      {lyric && (
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-row justify-center space-x-4 p-10 border-b text-3xl">
            <p className="cursor-pointer" onClick={handlePlay}>Play</p>
            <Link className="cursor-pointer" href={"/"}>Stop</Link>
          </div>
          <div className="flex justify-center items-center mt-5 p-4 w-full">
            <div className="scroll-text  max-w-full p-10 text-white  text-5xl ">
              <p>{lyric.content}</p>
            </div>
          </div>
        </div>
      )} 
      <div>
        Lyric not found :(
      </div>
    </div>
  );
}
