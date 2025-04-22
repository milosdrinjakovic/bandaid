"use client";
import React from "react";
import PageLayout from "./layout/pageLayout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {

  const { user, isLoading } = useUser()
  const router = useRouter()

  const goTeleprompter = () => {
    router.push("/teleprompter");
  };

  return (
    <PageLayout>
      {isLoading ?  
         <div className="flex flex-col gap-6 pt-6 overflow-y-auto">
         {[1, 2, 3].map((e) => (
           <Skeleton key={e} className="w-full h-52 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400" />
         ))}
       </div>
      : (
        <div className="flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
            🎤 Welcome to Bandaid
          </h1>
          <div className="text-lg md:text-xl text-gray-300 mb-6">
            Bandaid is a set of tools that bands or musicians can use to enhance their performance.<br />
          </div>
          <ul className={"list-disc list-inside"}>
            <li>
              Teleprompter - the on-stage assistant who never forgets your lines <PrimaryButton label="Go to Teleprompter" onClick={goTeleprompter} />
            </li>
          </ul>

          {!user && <><p className="text-md text-red-400 font-medium">
            🔒 Please log in to continue.
          </p>
            <a href="/api/auth/login" className="my-5 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 rounded-full py-2 hover:cursor-pointer w-[200px] transition duration-300 text-center">Log in</a></>
          }

        </div>
      )}
    </PageLayout>
  );
}
