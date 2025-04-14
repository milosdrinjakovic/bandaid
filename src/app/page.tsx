"use client";
import React from "react";
import PageLayout from "./layout/pageLayout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function Home() {
 
  const { user } = useUser()
  const router = useRouter()

  const goTeleprompter = () => {
    router.push("/teleprompter");
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center  text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
          🎤 Welcome to Bandaid
        </h1>
        <div className="text-lg md:text-xl text-gray-300 mb-6">
          Your words, your voice, your stage. <br />
          Features: 
          <ul>
            <li>
              Teleprompter - the on-stage friend who never forgets your lines
            </li>
          </ul>
          <button className="mt-5 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 text-white rounded 
               hover:text-stone-900 duration-300 p-4" onClick={goTeleprompter}>Check it out</button>
        </div>
        { !user && <><p className="text-md text-red-400 font-medium">
          🔒 Please log in to continue.
        </p>
        <a href="/api/auth/login" className="my-5 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 rounded-full py-2 hover:cursor-pointer w-[200px] transition duration-300 text-center">Log in</a></>
        }
        
      </div>
    </PageLayout>
  );
}
