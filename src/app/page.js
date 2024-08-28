"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import textService from '../services/text';

export default function Home() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const contentRef = useRef(null);

  const handleClick = async () => {
    let textInput = contentRef.current.value;
    textService.create({ content: textInput }).then((returnedText) => {
      setText(text.concat(returnedText));
    });

  };


  const fetchAllData = async () => {
    try {
      // setLoading(true);
      const response = await textService.getAll();
      console.log("Fetched all objects:", response);
      setData(response);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
        <ul>
          {data.map(function (object, i) {
            return <li key={i}>
              {object.id}
            </li>;
          })}
        </ul>
    
      {/* <div className="flex flex-col w-1/2">
        <p className="text-3xl text-center">
          Wellcome to Band<span className="text-red-600">aid! </span> We are
          here to help u{" "}
          <span className="text-yellow-300">IN SOME POSITIONS!</span>{" "}
        </p>
        <p className="text-center text-2xl mt-4">
          U can type in your text over here:{" "}
        </p>
        <div className="mb-4 mt-20 justify-center items-center">
          <label className="block text-lg font-medium mb-2 text-center">
            TEXT:
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
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleClick}
          >
            Sačuvaj
          </button>
          <button type="reset" className="bg-red-500 text-white px-4  rounded">
            Očisti
          </button>
        </div>
      </div> */}
    </main>
  );
}
