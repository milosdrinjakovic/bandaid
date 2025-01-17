"use client";
import { useState } from "react";
import teleprompterService from "../../../services/telepromtper-service";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import PageLayout from "@/app/layout/pageLayout";
import RichTextEditor from "@/app/RichTextEditor/RichTextEditor";

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
    <PageLayout title="Add new lyric">
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
          SAVE
        </button>

      </div>

    </PageLayout>
  );
}
