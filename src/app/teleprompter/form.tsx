"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import teleprompterService from "../../services/telepromtper-service";
import React from "react";
import { debounce } from 'lodash';
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";
import PageLayout from "@/app/layout/pageLayout";
import { PlayIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CoolButton, PrimaryButton, SecondaryButton, TertiaryButton } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useFullScreenHandle } from "react-full-screen";
import FullScreenComponent from "@/components/fullScreen";

interface FormPageProps {
  mode: 'create' | 'edit'
}

export default function Form(props: FormPageProps) {

  const { mode } = props;
  const [text, setText] = useState({
    title: "",
    content: "",
    scrollSpeed: 10
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFullScreen = useFullScreenHandle();

  const router = useRouter()
  const { id } = useParams();
  const goHome = () => {
    router.push("/teleprompter")
  }

  useEffect(() => {
    if (mode === 'edit') {
      setIsLoading(true);
      teleprompterService.getTextById(id).then(t => {
        setText(t)
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }, [])

  const onSubmit = async () => {
    if (mode === "edit") {
      try {
        await teleprompterService.updateText(
          id,
          {
            title: text.title,
            content: text.content,
            scrollSpeed: text.scrollSpeed
          });

        console.log("Successful saved data");
        toast.success('You have sucessfully edited the text!')
      } catch (error) {
        console.log("Error occurred:", error);
        toast.error('There was an error when editing the text :( Try again.')
      }
    } else {
      try {
        await teleprompterService.createText({
          title: text.title,
          content: text.content,
          scrollSpeed: text.scrollSpeed
        });

        console.log("Successfully saving data");
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
    setText((prev) => {
      return {
        ...prev,
        title: event.target.value
      }
    })
  }

  const handleContentChange = (value) => {
    setText((prev) => {
      return {
        ...prev,
        content: value
      }
    })
  };

  const debouncedSetValue = useMemo(
    () => debounce((value: number) => {
      setText((prev) => {
        return {
          ...prev,
          scrollSpeed: value[0]
        }
      })
    }, 500),
    []
  );

  const handleScrollSpeedChange = (value) => {
    debouncedSetValue(value)
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

  const handleSelect = () => {
    handleFullScreen.enter();
  }

  const deleteDialog = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <TertiaryButton icon={<TrashIcon />} className="text-red-600 cursor-pointer hover:text-red-400 duration-300" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will remove this item from your text list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-col md:flex-row justify-end mt-10 gap-2">
              <SecondaryButton label="Close" />
              <PrimaryButton label="Confirm" onClick={deleteText} />
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
            <p>Title</p>
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Title goes here"
                value={text.title}
                onChange={handleTitleChange}
                className="p-2 rounded mr-6 w-full md:w-1/2 text-stone-900"
              />

              {mode === 'edit' && deleteDialog()}
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-1 md:w-48">
            <p>Scroll speed</p>
            <Slider defaultValue={[text.scrollSpeed]} max={300} step={1} onValueChange={handleScrollSpeedChange} />
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <p>Content</p>
            <div className="h-full flex-1 text-stone-900 bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
              <RichTextEditor value={text.content} onTextChange={handleContentChange} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end mt-4 md:gap-2 gap-4">
            <SecondaryButton
              onClick={handleBack}
              label="Back"
            />

            <CoolButton
              onClick={handleSelect}
              label="Preview"
              icon={<PlayIcon />}
              iconPosition="left"
            />

            <PrimaryButton
              onClick={onSubmit}
              label="Save"
            />
          </div>
          {text && <FullScreenComponent selectedText={text} handleFullScreen={handleFullScreen} />}
        </>
      )}
    </PageLayout>
  );
}
