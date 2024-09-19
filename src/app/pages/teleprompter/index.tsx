import React, { Key } from "react";
import telepromtperService from "../../../services/telepromtper-service";
import { Lyric } from "../../types";

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

  console.log({data})


  React.useEffect(() => {
    getData();
  }, []);


  return (
    <div className="flex flex-col bg-red-500">
      {data?.map(lyric => <div key={lyric.id as Key}>{lyric.id}</div>)}
    </div>
  )
}
