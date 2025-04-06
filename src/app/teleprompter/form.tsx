"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import teleprompterService from "../../services/telepromtper-service";
import React from "react";
import toast from "react-hot-toast";
import RichTextEditor from "@/app/RichTextEditor/RichTextEditor";
import PageLayout from "@/app/layout/pageLayout";
import { InfoIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FormPageProps {
  mode: 'create' | 'edit'
}

export default function Form(props: FormPageProps) {

  const { mode } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scrollSpeed, setScrollSpeed] = useState(1);

  const router = useRouter()
  const { id } = useParams();
  const goToTelepromter = () => {
    router.push("/teleprompter")
  }

  useEffect(() => {
    if(mode === 'edit'){
      teleprompterService.lyricById(id).then(lyric => {
        setTitle(lyric.title)
        setContent(lyric.content)
        setScrollSpeed(lyric.scrollSpeed)
      })
    }
  }, [])

  const handleSubmit = async () => {
    if(id){
      try {
        await teleprompterService.updateLyric(
          id,
          {
            title: title,
            content: content,
            scrollSpeed: scrollSpeed
          });

        console.log("Successful saving data");
        goToTelepromter();
        toast.success('You have sucessfully edited the lyric!')
      } catch (error) {
        console.log("Error occurred:", error);
        toast.error('There was an error when editing the lyric :( Try again.')
      }
    } else {
      try {
        await teleprompterService.createLyric({
          title: title,
          content: content,
          scrollSpeed: scrollSpeed
        });

        console.log("Successful saving data");
        goToTelepromter();
        toast.success('You have created a new lyric!')
      } catch (error) {
        console.log("Error occurred:", error);
        toast.error('There was an error when saving the lyric :( Try again.')
      }
    }
  };

  const handleCancel = () => {
    router.push("/teleprompter");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleScrollSpeedInputChange = (event) => {
    setScrollSpeed(event.target.value);
  };

  const deleteLyric = async () => {
    try {
      await teleprompterService.deleteLyric(id).then(() => console.log('hello'));
      goToTelepromter();
      toast.success('You have sucessfully deleted the lyric!')
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error('There was an error when deleting the lyric :( Try again.')
    }
  }

  const deleteDialog = () => {
    return (
        <Dialog>
        <DialogTrigger>
            <TrashIcon className="text-red-600 cursor-pointer hover:text-red-400 duration-300"/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
                This will remove the lyric from your playlist.
            </DialogDescription>
            </DialogHeader>
        <DialogFooter>
            <div className="flex justify-end mt-10">
                <DialogClose>
                    <button type="reset" className="bg-gray-300 rounded mr-5 w-28 h-10">
                        Close
                    </button>
                </DialogClose>
                <button type="submit" className="bg-teal-300 rounded w-28 h-10" onClick={deleteLyric}>
                    Confirm
                </button>
            </div>
        </DialogFooter>
        </DialogContent>
        </Dialog>
    )
  }


  return (
    <PageLayout title={mode === 'edit' ? "Edit lyric" : "Create lyric"}>
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="p-2 rounded mr-6 w-full md:w-1/2 text-stone-900"
          />
          {mode === 'edit' && deleteDialog()}
        </div>
      </div>

      <div className="mb-5 flex items-center">
        <input
          type="number"
          placeholder="Speed"
          value={scrollSpeed}
          onChange={handleScrollSpeedInputChange}
          className="text-stone-900 p-2 rounded w-20 mr-6"
        />
        {/* TODO: Add a tooltip to show how this input above is used. */}
        <InfoIcon />
      </div>

      <div className="h-full text-stone-900 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
        <RichTextEditor value={content} onTextChange={handleContentChange} />
      </div>
      <div className="flex justify-end mt-10">
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
          Save
        </button>

      </div>
    </PageLayout>
  );
}
