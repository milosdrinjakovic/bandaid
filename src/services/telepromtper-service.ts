import axios from "axios";
import { UserData, NewTextObject } from "../app/types";
import { headers } from "next/headers";

const serviceUrl = process.env.NEXT_PUBLIC_TELEPROMPTER_SERVICE_URL;

if (!serviceUrl) {
  throw new Error("Service URL not found!");
}

const createUserData = (token): Promise<UserData> => {
  return new Promise<UserData>((res) => { 
    axios.post(serviceUrl, {
     
    }).then((response) => {
      res(response.data)
    })
  }) 
};

const getUserData = (): Promise<UserData> => {
  return new Promise<UserData>((res) => { 
    axios.get(serviceUrl).then((response) => {
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

const updateTextsOrder = async (ids: String[]) => {
  const response = await axios.put(`${serviceUrl}/texts`, ids);
  return response.data;
};

const deleteText = async (id) => {
  const response = await axios.delete(`${serviceUrl}/texts/${id}`);
  return response.data;
}

export default { createUserData, getUserData, getTextsByUserId, getTextById, createText, updateText, updateTextsOrder, deleteText }
