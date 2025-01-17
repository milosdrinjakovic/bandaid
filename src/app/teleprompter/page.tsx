"use client"
import React, { Key, useEffect, useRef } from "react";
import telepromtperService from "../../services/telepromtper-service";
import { Lyric } from "../types";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { PlayIcon, PlusIcon } from "lucide-react";
import PageLayout from "../layout/pageLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


export default function List() {

  const [data, setData] = React.useState<Lyric[]>([]);
  const [selectedLyric, setSelectedLyric] = React.useState<Lyric>();
  const router = useRouter()
  const handleFullScreen = useFullScreenHandle();

  const getData = async () => {
    try {
      await telepromtperService.lyricsList().then(response =>
        setData(response as unknown as Lyric[])
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
      console.error('scrollRef is null'); // Debug log
      return;
    }
  
    const scrollElement = scrollRef.current;
    let scrollInterval;
  
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
          scrollElement.scrollTop = 0; // Reset to top
        } else {
          scrollElement.scrollTop += 1; // Increment scroll
        }
      }, 50);
    };
  
    startScrolling();
  
    return () => clearInterval(scrollInterval); // Cleanup
  }, [handleFullScreen.active]);

  return (
    <PageLayout title="Teleprompter">
      <div className="w-full h-full overflow-auto">
        {data?.map((lyric, index) => (
          <div>
            <Card key={lyric._id as Key} onClick={() => navigateToDetailPage(lyric._id)} className="m-2 mb-5 hover:bg-slate-400 cursor-pointer">
              <CardHeader className="flex flex-row gap-3">
                <PlayIcon className="hover:bg-fuchsia-300" onClick={(e) => handleSelect(e, lyric)} />  
                <CardTitle>{index + 1} {lyric.title}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <div className="cursor-pointer absolute right-20 bottom-20 bg-teal-600 hover:bg-teal-400 hover:text-white duration-300 rounded-full w-16 h-16 flex justify-center items-center">
        <button onClick={navigateToCreateLyric}><PlusIcon /></button>
      </div>


      <FullScreen handle={handleFullScreen}>
        {handleFullScreen.active && selectedLyric?.content ?
          <div ref={scrollRef} 
        
          className="text-white text-5xl ml-20 mt-20 overflow-auto h-full"
          dangerouslySetInnerHTML={{ __html: selectedLyric.content }} /> : null}
      </FullScreen>
    </PageLayout>


  )
}

