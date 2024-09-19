import axios from "axios";
import { Lyric } from "../app/types";

const baseUrl = "http://localhost:3001/api/text";

const lyricsList = () => {
  return new Promise((res) => { 
    const request = axios.get(baseUrl);
    request.then((response) => {
      console.log({response})
      res(response.data)
    })
  }) 
};


const lyricById = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data
}

const createLyric = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { lyricsList, createLyric, lyricById }
