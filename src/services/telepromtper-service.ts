import axios from "axios";
import { Lyric, NewLyricObject } from "../app/types";

const baseUrl = "http://localhost:3001/api/teleprompter";

const lyricsList = (): Promise<Lyric[]> => {
  return new Promise<Lyric[]>((res) => { 
    axios.get(baseUrl).then((response) => {
      res(response.data)
    })
  }) 
};


const lyricById = async(id) => {
  console.log({id})
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log({response})
  return response.data
}

const createLyric = async (newObject: NewLyricObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { lyricsList, createLyric, lyricById }
