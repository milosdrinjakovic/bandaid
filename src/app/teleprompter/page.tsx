"use client"
import React, { Key, useEffect, useRef } from "react";
import teleprompterService from "../../services/telepromtper-service";
import { TUserData } from "../models/userData";
import { TText } from "../models/text";
import isEqual from "lodash/isEqual"

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlayIcon, PlusIcon } from "lucide-react";
import PageLayout from "../layout/pageLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function List() {

  const [userData, setUserData] = React.useState<TUserData>();
  const [texts, setTexts] = React.useState<TText[]>([]);
  const [selectedText, setSelectedText] = React.useState<TText>();
  const [isScrolling, setIsScrolling] = React.useState(true);
  const [scrollSpeed, setScrollSpeed] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter()
  const handleFullScreen = useFullScreenHandle();

  const getUserData = async () => {
    try {
      await teleprompterService.getUserData().then(response => {
        setUserData(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createUserData = async () => {
    try {
      await teleprompterService.createUserData().then(response => {
        setUserData(response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getTextsForUser = async () => {
    try {
      await teleprompterService.getTextsByUserId().then(response => {
        setTexts(response.sort((a, b) => a.order - b.order));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
      getUserData();
      getTextsForUser();
  }, [])

  const goDetailPage = (id) => {
    router.push(`/teleprompter/${id}`)
  }

  const goCreateText = () => {
    if (!userData) {
      createUserData();
    }
    router.push("/teleprompter/add")
  }

  const handleSelect = (e: Event, text: TText) => {
    e.stopPropagation(); // Prevent the click from propagating to the card
    setSelectedText(text);
    handleFullScreen.enter();
  }

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const scrollElement: HTMLElement = scrollRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollElement.scrollTop + scrollElement.clientHeight < scrollElement.scrollHeight) {
          scrollElement.scrollTop += 1; // Increment scroll
        }
      }, 1000 / scrollSpeed);
    };

    if (isScrolling) {
      startScrolling();
    }

    return () => clearInterval(scrollInterval); // Cleanup
  }, [handleFullScreen.active, isScrolling, scrollSpeed]);

  const updateTextsOrder = async (reordered) => {
    const reorderedTexts: Partial<TText> = reordered.map((e, index) => ({
       _id: e._id,
       order: index + 1
  }));

    try {
      await teleprompterService.updateTextsOrder(reorderedTexts);

    } catch (error) {
      console.log("Error occurred:", error);
      toast.error('There was an error when updating the order :( Try again.')
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(texts);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    reordered.map((item, index) => {
      return {
        ...item,
        order: index + 1
      }
    })

    const areSame = isEqual(texts, reordered);
    if (!areSame) {
      updateTextsOrder(reordered);
      setTexts(reordered);
    }
  };


  function removeBackgroundColors(html) {
    // Create a temporary DOM element to manipulate the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Remove inline background color styles
    tempDiv.querySelectorAll("*").forEach((el: HTMLElement) => {
      if (el.style.backgroundColor) {
        el.style.backgroundColor = ""; // Reset background color
      }
      if (el.style.color) {
        el.style.color = "white"; // Set text color
      }
    });

    // Remove CSS classes related to background colors (optional, depends on class naming conventions)
    tempDiv.querySelectorAll("[class]").forEach((el) => {
      el.classList.forEach((cls) => {
        if (/bg-|background/i.test(cls)) {
          el.classList.remove(cls);
        }
      });
    });

    return tempDiv.innerHTML;
  }

  const goToNextText = () => {
    var nextTextOrderNumber = selectedText?.order?.valueOf ? selectedText.order + 1 : null;
    if (nextTextOrderNumber) {
      const nextText = texts.find(text => text.order === nextTextOrderNumber)
      if (nextText) {
        setSelectedText(nextText);
      }
    }
  }

  const goToPreviousText = () => {
    var previousTextOrderNumber = selectedText?.order?.valueOf ? selectedText.order - 1 : null;
    if (previousTextOrderNumber?.valueOf) {
      const prevText = texts.find(text => text.order === previousTextOrderNumber)
      if (prevText) {
        setSelectedText(prevText);
      }
    }
  }

  const handleSpeedUpdate = (mode: 'slower' | 'faster') => {
    let newScrollSpeed = mode === 'slower' ? scrollSpeed <= 20 ? 20 : scrollSpeed - 20 : scrollSpeed >= 280 ? 300 : scrollSpeed + 20;
    setScrollSpeed(newScrollSpeed);
  }

  console.log({texts})
  return (
    <PageLayout title="Teleprompter">
      {isLoading ? (
        <div className="flex flex-col gap-6 pt-6 overflow-y-auto">
          {[1,2,3,4,5,6,7,8].map(() => (
            <Skeleton className="w-full h-24 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400" />
          ))}
        </div>
        
      ) : (
        <>
          {texts && texts.length !== 0 ? (
            <>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="text-list">
                  {(provided) => (
                    <div
                      className="overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white flex flex-col"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {texts.map((text, index) => (
                        <Draggable key={text._id} draggableId={text._id!!} index={index}>
                          {(provided) => {
                            const style = {
                              ...provided.draggableProps.style,
                              //Used to fix the scrolling across Y axis only
                              transform: provided.draggableProps.style?.transform?.replace(
                                /translate\(([^,]+),\s*([^,]+)\)/,
                                (_, x, y) => `translate(0px, ${y})`
                              ),
                            };
                            return <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={style}
                              className="mt-5"
                            >
                              <Card key={text._id as Key} onClick={() => goDetailPage(text._id)} className="mr-2 duration-300 bg-stone-900 hover:bg-purple-800 text-white  cursor-pointer">
                                <CardHeader className="flex flex-row gap-3">
                                  <div>
                                    <PlayIcon className="text-2xl duration-300 hover:text-violet-400" onClick={(e: any) => handleSelect(e, text)} />
                                  </div>
                                  <CardTitle>{index + 1} {text.title}</CardTitle>
                                </CardHeader>
                              </Card>
                            </div>
                          }}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="cursor-pointer absolute right-16 bottom-10 md:right-32 md:bottom-20 bg-purple-700 text-white hover:bg-white hover:text-stone-900 duration-300 border-2 border-white rounded-full w-16 h-16 flex justify-center">
                <button onClick={goCreateText}><PlusIcon /></button>
              </div>

              <FullScreen handle={handleFullScreen}>
                {handleFullScreen.active && selectedText?.content ?
                  <div
                    ref={scrollRef}
                    onClick={() => setIsScrolling(!isScrolling)}
                    className="overflow-auto text-2xl md:text-5xl pt-10 pb-10 h-full px-2 md:p-20 select-none"
                    dangerouslySetInnerHTML={{ __html: removeBackgroundColors(selectedText.content) }} />
                  : null}

                {/* Floating Buttons */}
                {handleFullScreen.active && (
                  <>
                    {
                      <div className="flex">
                        <button
                          onClick={() => handleSpeedUpdate("slower")}
                          className="absolute top-5 right-40 bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white"
                        >
                          <div className="flex flex-row gap-2">
                            <MinusIcon />
                            Slower
                          </div>
                        </button>
                        <button
                          onClick={() => handleSpeedUpdate("faster")}
                          className="absolute top-5 right-10 bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white"
                        >
                          <div className="flex flex-row gap-2">
                            Faster
                            <PlusIcon />
                          </div>
                        </button>
                      </div>
                    }



                    {selectedText?.order?.valueOf() !== 1 &&
                      <button
                        onClick={goToPreviousText}
                        className="absolute bottom-5 left-10 bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white"
                      >
                        <div className="flex flex-row gap-2">
                          <ArrowLeftIcon />
                          Previous
                        </div>
                      </button>
                    }

                    {selectedText?.order?.valueOf() !== texts.length &&
                      <button
                        onClick={goToNextText}
                        className="absolute bottom-5 right-10 bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white"
                      >
                        <div className="flex flex-row gap-2">
                          <ArrowRightIcon />
                          Next
                        </div>
                      </button>
                    }
                  </>
                )}

              </FullScreen>
            </>)
            :
            <>
              <div>Looks like you don't have any texts yet! Click here to add some!</div>
              <button onClick={goCreateText}>Add text</button>
            </>
          }
        </>
      )}
    </PageLayout>
  )
}

