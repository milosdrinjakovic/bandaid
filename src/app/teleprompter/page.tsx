"use client"
import React, { Key, useEffect, useRef } from "react";
import teleprompterService from "../../services/telepromtper-service";
import { Lyric } from "../types";
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


export default function List() {

  const [data, setData] = React.useState<Lyric[]>([]);
  const [selectedLyric, setSelectedLyric] = React.useState<Lyric>();
  const router = useRouter()
  const handleFullScreen = useFullScreenHandle();
  const [isScrolling, setIsScrolling] = React.useState(true);
  const [scrollSpeed, setScrollSpeed] = React.useState(10);

  const getData = async () => {
    try {
      await teleprompterService.lyricsList().then(response =>
        setData((response as unknown as Lyric[]).sort((a, b) => a.order - b.order))
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, [])

  const navigateToDetailPage = (id) => {
    router.push(`/teleprompter/${id}`)
  }

  const navigateToCreateLyric = () => {
    router.push("/teleprompter/add")
  }

  const handleSelect = (e: Event, lyric: Lyric) => {
    e.stopPropagation(); // Prevent the click from propagating to the card
    setSelectedLyric(lyric);
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

  const updateLyricsOrder = async (reordered) => {
    const orderIds = reordered.map(e => e._id);

    try {
      await teleprompterService.updateLyricsOrder(orderIds);
      console.log("Successful updated order");

    } catch (error) {
      console.log("Error occurred:", error);
      toast.error('There was an error when updating the order :( Try again.')
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(data);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    const areSame = isEqual(data, reordered);
    if (!areSame) {
      setData(reordered);
      updateLyricsOrder(reordered);
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
        el.style.color = "white"; // Reset background color
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

  const goToNextLyric = () => {
    var nextLyricOrderNumber = selectedLyric?.order.valueOf ? selectedLyric.order + 1 : null;
    if (nextLyricOrderNumber) {
      const nextLyric = data.find(lyric => lyric.order === nextLyricOrderNumber)
      if (nextLyric) {
        setSelectedLyric(nextLyric);
      }
    }
  }

  const goToPreviousLyric = () => {
    var previousLyricOrderNumber = selectedLyric?.order.valueOf ? selectedLyric.order - 1 : null;
    if (previousLyricOrderNumber?.valueOf) {
      const prevLyric = data.find(lyric => lyric.order === previousLyricOrderNumber)
      if (prevLyric) {
        setSelectedLyric(prevLyric);
      }
    }
  }

  const handleSpeedUpdate = (mode: 'slower' | 'faster') => {
    let newScrollSpeed = mode === 'slower' ? scrollSpeed <= 20 ? 20 : scrollSpeed - 20 : scrollSpeed >= 280 ? 300 : scrollSpeed + 20;
    setScrollSpeed(newScrollSpeed);
  }

  return (
    <PageLayout title="Teleprompter">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="lyric-list">
          {(provided) => (
            <div
              className="overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data?.map((lyric, index) => (
                <Draggable key={lyric._id} draggableId={lyric._id} index={index}>
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
                      <Card key={lyric._id as Key} onClick={() => navigateToDetailPage(lyric._id)} className="mr-2 duration-300 bg-stone-900 hover:bg-purple-800 text-white  cursor-pointer">
                        <CardHeader className="flex flex-row gap-3">
                          <div>
                            <PlayIcon className="text-2xl duration-300 hover:text-violet-400" onClick={(e: any) => handleSelect(e, lyric)} />
                          </div>
                          <CardTitle>{index + 1} {lyric.title}</CardTitle>
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

      <div className="cursor-pointer absolute right-16 bottom-10 md:right-32 md:bottom-20 bg-purple-800 text-white hover:bg-white hover:text-stone-900 duration-300 border-2 border-white rounded-full w-16 h-16 flex justify-center">
        <button onClick={navigateToCreateLyric}><PlusIcon /></button>
      </div>

      <FullScreen handle={handleFullScreen}>
        {handleFullScreen.active && selectedLyric?.content ?
          <div
            ref={scrollRef}
            onClick={() => setIsScrolling(!isScrolling)}
            className="text-white overflow-auto text-2xl md:text-5xl pt-10 pb-10 h-full px-2 md:p-20 select-none"
            dangerouslySetInnerHTML={{ __html: removeBackgroundColors(selectedLyric.content) }} />
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



            {selectedLyric?.order.valueOf() !== 0 &&
              <button
                onClick={goToPreviousLyric}
                className="absolute bottom-5 left-10 bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white"
              >
                <div className="flex flex-row gap-2">
                  <ArrowLeftIcon />
                  Previous
                </div>
              </button>
            }

            {selectedLyric?.order.valueOf() !== data.length - 1 &&
              <button
                onClick={goToNextLyric}
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
    </PageLayout>
  )
}

