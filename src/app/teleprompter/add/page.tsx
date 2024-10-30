"use client";
import { useState } from "react";
import teleprompterService from "../../../services/telepromtper-service";
import React from "react";
import { Lyric } from "../../types";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");

  
  const router = useRouter()

  const goToTelepromter = () => {
    router.push("/teleprompter")
  }
  
  const handleSubmit = async () => {

    try {
      await teleprompterService.createLyric({
        title: inputValue,
        content: text
      });

      console.log("Successful saving data");
      goToTelepromter();
      toast.success('You have created a new lyric!')
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error('There was an error when saving the lyric :( Try again.')
    } 
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <main className="mb-4 mt-4 h-7 flex flex-col space-y-3">
      <div className="flex flex-col">
        <label>Title</label>
        <input
          type="text"
          placeholder="Insert title here"
          value={inputValue}
          onChange={handleInputChange}
          className=" p-2 border border-gray-600 bg-slate-900 rounded"
        />
      </div>
      <div className="h-10">
        <label>
          Text
        </label>
        <textarea
          id="content"
          name="content"
          className="w-full p-2 border text-white border-gray-600 bg-slate-900 rounded"
          placeholder="Insert your text here"
          onChange={handleTextChange}
        ></textarea>
      </div>

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          className="bg-green-300 rounded mr-8 w-28 h-10"
          onClick={handleSubmit}
        >
          SAVE
        </button>
        <button
          type="reset"
          className="bg-red-300 rounded w-28 h-10"
          onClick={handleClear}
        >
          CLEAR
        </button>
      </div>
    </main>
    // stranica za upis novog text-a
    // <main className="flex min-h-screen flex-col items-center p-24 ">
    //   <p className="text-3xl">Songs List</p>
    //   {songs.map(song => (
    //      <div key={song.id} className="border-white border-2 w-full h-24 rounded-full mt-5 flex flex-row items-center   text-xl  hover:bg-zinc-900 transition duration-300 cursor-pointer">
    //      <div className="text-center justify-center rounded-full border-r-4 items-center flex  border-zinc-700 h-full w-2/4 flex-col">
    //        <p>{song.title}</p>
    //      </div>

    //      <div className="rounded-full border-r-4 border-zinc-700 h-full items-center flex flex-col w-1/3 justify-center">
    //        <p>Date Added</p>
    //        <p>{song.dateAdded}</p>
    //      </div>
    //      <div className="flex">
    //        <div className="space-x-4">
    //        <button className="ml-4">Preview</button>
    //        <button className="text-yellow-500">Edit</button>
    //        <button className="text-red-500">Delete</button>
    //        </div>
    //      </div>
    //    </div>
    //   ))}

    // </main>
  );
}
