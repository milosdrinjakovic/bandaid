"use client";
import React from "react";
import PageLayout from "./layout/pageLayout";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
 
  const {user} = useUser()
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center  text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
          🎤 Dobrodošli na BandAid Teleprompter
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl">
          Tvoje reči. Tvoj glas. Tvoja scena. BandaAid – sufler koji nikad ne
          zaboravlja tekst.
        </p>
        { !user && <><p className="text-md text-red-400 font-medium">
          🔒 Da biste nastavili, molimo vas da se prijavite.
        </p>
        <a href="/api/auth/login" className="my-5 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 rounded-full py-2 hover:cursor-pointer w-[200px] transition duration-300 text-center">login</a></>
        }
        
      </div>
    </PageLayout>
  );
}
