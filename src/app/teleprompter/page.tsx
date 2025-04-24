"use client"
import React, { Key, useEffect, useState } from "react";
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
import { PlayIcon, PlusIcon } from "lucide-react";
import PageLayout from "../layout/pageLayout";
import { useFullScreenHandle } from "react-full-screen";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { AddButton, CoolButton } from "@/components/ui/button";
import FullScreenComponent from "@/components/fullScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setTexts, setUserData } from "@/lib/features/textsSlice";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function List() {

  const dispatch = useDispatch()
  const texts = useSelector((state: RootState) => state.texts.texts)
  const userData = useSelector((state: RootState) => state.texts.userData)

  const [selectedText, setSelectedText] = useState<TText>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const handleFullScreen = useFullScreenHandle();

  const { isLoading: isLoadingUser } = useUser();

  const getUserData = async () => {
    try {
      await teleprompterService.getUserData().then(response => {
        handleSetUserDataDispatch(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createUserData = async () => {
    try {
      await teleprompterService.createUserData().then(response => {
        handleSetUserDataDispatch(response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSetTextsDispatch = (payload: TText[]) => {
    dispatch(setTexts(payload));
  }

  const handleSetUserDataDispatch = (payload: TUserData) => {
    dispatch(setUserData(payload));
  }

  const getTextsForUser = async () => {
    try {
      await teleprompterService.getTextsByUserId().then(response => {
        handleSetTextsDispatch(response.sort((a, b) => a.order - b.order));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
    setSelectedText(text);
    e.stopPropagation(); // Prevent the click from propagating to the card
    //Added because of the race condition when opening full screen the first time
    setTimeout(() => {
      handleFullScreen.enter();
    }, 0)
    
  }

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
      handleSetTextsDispatch(reordered);
    }
  };

  return (
    <PageLayout title="Teleprompter">
      {isLoading || isLoadingUser ? (
        <div className="flex flex-col gap-6 pt-6 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
            <Skeleton key={e} className="w-full h-24 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400" />
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
                              <Card key={text._id as Key} onClick={() => goDetailPage(text._id)} className="duration-300 bg-stone-900 hover:bg-purple-800 text-white  cursor-pointer">
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

              <AddButton onClick={goCreateText} icon={<PlusIcon />}/>

            </>)
            :
            <div className="flex items-center text-center flex-col gap-4 flex-1 justify-center">
              <p>Looks like you don't have any texts yet! <br/>
                 Click here to create some!
              </p>
              <CoolButton onClick={goCreateText} label="Create text"/>
            </div>
          }
          {selectedText && <FullScreenComponent texts={texts} selectedText={selectedText} handleFullScreen={handleFullScreen} />}
        </>
      )}
    </PageLayout>
  )
}

