"use client"
import React, { Key } from "react";
import telepromtperService from "../../services/telepromtper-service";
import { Lyric } from "../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { Icon, PlusIcon } from "lucide-react";


export default function List() {

  const [data, setData] = React.useState<Lyric[]>([]);
  const router = useRouter()

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
  }, []);

  const navigateToDetailPage = (id: String) => {
    router.push(`/teleprompter/${id}`)
  }

  const navigateToCreateLyric = () => {
    router.push("/teleprompter/add")
  }

  return (
    <div>
      <div className="m-5 flex justify-end">
        <button onClick={navigateToCreateLyric}><PlusIcon /></button>
      </div>
      {data?.map((lyric, index) => (
        <Card key={lyric._id as Key} className="m-5 hover:bg-slate-400 cursor-pointer" 
        onClick={() => navigateToDetailPage(lyric._id)}>
          <CardHeader>
            <CardTitle>{index + 1} {lyric.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

