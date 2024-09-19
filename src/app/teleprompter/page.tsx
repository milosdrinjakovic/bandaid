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


export default function List() {

  const [data, setData] = React.useState<Lyric[]>([]);

  const getData = async () => {
    try {
      await telepromtperService.lyricsList().then(response =>
        setData(response as unknown as Lyric[])
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ data })


  React.useEffect(() => {
    getData();
  }, []);


  return (
    <>
      {data?.map(lyric => (
        <Card className="m-5">
          <CardHeader>
            <CardTitle>{lyric.title}</CardTitle>
            <CardDescription>{lyric.id}</CardDescription>
          </CardHeader>
          <CardContent>
            {lyric.content}
          </CardContent>
          <CardFooter className="flex justify-between">
            ti si govno, purgeru
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

