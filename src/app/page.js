"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useRef, useState, useEffect } from "react";
import textService from "../services/text";
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const [text, setText] = useState("");
  const contentRef = useRef(null);
  const router = useRouter();
  const handleClick = async () => {
    const textInput = contentRef.current.value;
   
    const newObject = {
      content: textInput,
      title: inputValue,
    };
    try {
      const returnedTextObj = await textService.create(newObject);

      console.log("Data returned from server", returnedTextObj);

      console.log("Successful saving data");

      router.push(`/teleprompter/${returnedTextObj.id}`);

      if (contentRef.current) {
        contentRef.current.value = "";
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleClear = () => {
    contentRef.current.value = "";
  };

  const getData = async () => {
    try {
      const response = await textService.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    getData();
  });

  const songs = [
    { id: 1, title: "Pesma o suncu", dateAdded: "2024-08-01", length: "3:45" },
    { id: 2, title: "Zvuci tišine", dateAdded: "2024-08-05", length: "4:12" },
    { id: 3, title: "Ritam vetra", dateAdded: "2024-08-10", length: "2:58" },
    { id: 4, title: "Ples u noći", dateAdded: "2024-08-15", length: "5:22" },
    { id: 5, title: "Šapat kiše", dateAdded: "2024-08-20", length: "3:33" },
    { id: 6, title: "Zora svitanja", dateAdded: "2024-08-25", length: "4:05" },
    { id: 7, title: "Oluja u meni", dateAdded: "2024-09-01", length: "3:47" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col w-1/2 space-y-5">
        <p className="text-3xl text-center">
          Wellcome to Band<span className="text-red-600">aid! </span> We are
          here to help u{" "}
          <span className="text-yellow-300">IN SOME POSITIONS!</span>{" "}
        </p>
        <p className="text-center text-2xl mt-4">
          U can type in your text over here:{" "}
        </p>
        <div className="mb-4 mt-20 justify-center items-center">
          <div className="flex flex-col text-center ">
            <label className="mb-2 text-xl">HEADLINE</label>
            <input
              type="text"
              placeholder="Insert title over here..."
              value={inputValue}
              onChange={handleInputChange}
              className=" p-2 border border-gray-600 bg-slate-900 rounded"
            />
          </div>
          <label className="block text-lg font-medium mb-2 mt-2 text-center">
            TEXT
          </label>

          <textarea
            id="content"
            name="content"
            rows="10"
            className="w-full p-2 border border-gray-600 bg-slate-900 rounded"
            placeholder="Insert your text over here... "
            ref={contentRef}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 w-28 h-10"
            onClick={handleClick}
          >
            SAVE
          </button>
          <button
            type="reset"
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 w-28 h-10"
            onClick={handleClear}
          >
            CLEAR
          </button>
        </div>
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
