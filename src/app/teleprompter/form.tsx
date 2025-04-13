"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import teleprompterService from "../../services/telepromtper-service";
import React from "react";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";
import PageLayout from "@/app/layout/pageLayout";
import { InfoIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface FormPageProps {
  mode: 'create' | 'edit'
}

export default function Form(props: FormPageProps) {

  const { mode } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scrollSpeed, setScrollSpeed] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const { id } = useParams();
  const goHome = () => {
    router.push("/teleprompter")
  }

  useEffect(() => {
    if (mode === 'edit') {
      setIsLoading(true);
      setTimeout(() => {
        teleprompterService.getTextById(id).then(text => {
          const { title, content, scrollSpeed } = text;
          setTitle(title)
          setContent(content)
          setScrollSpeed(scrollSpeed || 10)
        }).finally(() => {
          setIsLoading(false);
        })
      }, 2000)
    }
  }, [])

  const onSubmit = async () => {
    if (mode === "edit") {
      try {
        await teleprompterService.updateText(
          id,
          {
            title: title,
            content: content,
            scrollSpeed: scrollSpeed
          });

        console.log("Successful saving data");
        goHome();
        toast.success('You have sucessfully edited the text!')
      } catch (error) {
        console.log("Error occurred:", error);
        toast.error('There was an error when editing the text :( Try again.')
      }
    } else {
      try {
        await teleprompterService.createText({
          title: title,
          content: content,
          scrollSpeed: scrollSpeed
        });

        console.log("Successful saving data");
        goHome();
        toast.success('You have created a new text!')
      } catch (error) {
        console.log("Error occurred:", error);
        toast.error('There was an error when saving the text :( Try again.')
      }
    }
  };

  const handleBack = () => {
    router.push("/teleprompter");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleScrollSpeedInputChange = (event) => {
    const speed = event.target.value;
    if (speed > 0) {
      setScrollSpeed(speed);
    }
  };

  const deleteText = async () => {
    try {
      await teleprompterService.deleteText(id);
      goHome();
      toast.success('You have sucessfully deleted the text!')
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error('There was an error when deleting the text :( Try again.')
    }
  }

  const deleteDialog = () => {
    return (
      <Dialog>
        <DialogTrigger>
          <TrashIcon className="text-red-600 cursor-pointer hover:text-red-400 duration-300" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will remove this item from your text list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end mt-10">
              <DialogClose>
                <button type="reset" className="bg-gray-300 rounded mr-5 w-28 h-10">
                  Close
                </button>
              </DialogClose>
              <button type="submit" className="bg-teal-300 rounded w-28 h-10" onClick={deleteText}>
                Confirm
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <PageLayout title={mode === 'edit' ? "Edit text" : "Create text"}>
      {isLoading ? (
        <Skeleton className="w-full h-full bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400" />
      ) : (
        <>
          <div className="flex flex-col mb-5">
            <div className="flex flex-row justify-between items-center">
              <input
                type="text"
                placeholder="Title goes here"
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
              min={0}
              onChange={handleScrollSpeedInputChange}
              className="text-stone-900 p-2 rounded w-20 mr-6"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Higher the number, higher the speed of scrolling</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>

          <div className="h-full text-stone-900 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
            <RichTextEditor value={content} onTextChange={handleContentChange} />
          </div>
          <div className="flex justify-end mt-10">
            <button
              type="reset"
              className="bg-stone-400 text-white hover:bg-stone-500 hover:text-stone-900 duration-300 rounded mr-5 w-28 h-10"
              onClick={handleBack}
            >
              Back
            </button>

            <button
              type="submit"
              onClick={onSubmit}
              className="bg-purple-700 text-white hover:bg-purple-400 hover:text-stone-900 duration-300 rounded w-28 h-10"
            >
              Save
            </button>
          </div>
        </>
      )}
    </PageLayout>
  );
}
