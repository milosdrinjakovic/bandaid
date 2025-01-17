"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import teleprompterService from "../../../services/telepromtper-service";
import React from "react";
import { Error, Lyric } from "../../types";
import toast from "react-hot-toast";
import RichTextEditor from "@/app/RichTextEditor/RichTextEditor";
import './preview.style.scss';
import PageLayout from "@/app/layout/pageLayout";

export default function Page() {

  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");

  const router = useRouter()
  const { id } = useParams();
  const goToTelepromter = () => {
    router.push("/teleprompter")
  }

  useEffect(() =>{
    teleprompterService.lyricById(id).then(lyric => {
      setInputValue(lyric.title)
      setText(lyric.content)
    })
  },[])

  const handleSubmit = async () => {

      try {
        await teleprompterService.updateLyric(
          id,
          {
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

  const handleCancel = () => {
    router.push("/teleprompter");
  };

  const handleTextChange = (value) => {
    setText(value)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <PageLayout title="Edit lyric">
    <div className="flex flex-col mb-5">
      <input
        type="text"
        placeholder="Title"
        value={inputValue}
        onChange={handleInputChange}
        className="p-2 rounded"
      />
    </div>
    <RichTextEditor value={text} onTextChange={handleTextChange} />

    <div className="flex justify-end mt-5">
      <button
        type="reset"
        className="bg-gray-300 rounded mr-5 w-28 h-10"
        onClick={handleCancel}
      >
        Cancel
      </button>

      <button
        type="submit"
        className="bg-teal-300 rounded w-28 h-10"
        onClick={handleSubmit}
      >
        Update
      </button>

    </div>

  </PageLayout>
  );
}
