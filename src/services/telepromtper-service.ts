import axios from "axios";
import { NewTextObject } from "@/app/models/util";
import { TUserData } from "@/app/models/userData";
import { TText } from "@/app/models/text";

const serviceUrl = process.env.NEXT_PUBLIC_TELEPROMPTER_SERVICE_URL;

if (!serviceUrl) {
  throw new Error("Service URL not found!");
}

const createUserData = (): Promise<TUserData> => {
  return new Promise<TUserData>((res) => { 
    axios.post(`${serviceUrl}/users`).then((response) => {
      res(response.data)
    })
  }) 
};

const getUserData = (): Promise<TUserData> => {
  return new Promise<TUserData>((res) => { 
    axios.get(`${serviceUrl}/users`).then((response) => {
      res(response.data)
    })
  }) 
};

const getTextsByUserId = async() => {
  const response = await axios.get(`${serviceUrl}/texts`);
  return response.data
}

const getTextById = async(id) => {
  const response = await axios.get(`${serviceUrl}/texts/${id}`);
  return response.data
}

const createText = async (newObject: NewTextObject) => {
  const response = await axios.post(`${serviceUrl}/texts`, newObject);
  return response.data;
};

const updateText = async (id, updatedObject: NewTextObject) => {
  const response = await axios.put(`${serviceUrl}/texts/${id}`, updatedObject);
  return response.data;
};

const updateTextsOrder = async (orderedTexts: Partial<TText>) => {
  const response = await axios.put(`${serviceUrl}/texts`, orderedTexts);
  return response.data;
};

const deleteText = async (id) => {
  const response = await axios.delete(`${serviceUrl}/texts/${id}`);
  return response.data;
}

export default { createUserData, getUserData, getTextsByUserId, getTextById, createText, updateText, updateTextsOrder, deleteText }
