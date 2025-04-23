"use client";
import React from "react";
import PageLayout from "./layout/pageLayout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { CoolButton, PrimaryButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import BandaidLogo from "../../public/bandaid-logo.svg"
import { useIsMobile } from "@/services/breakpoint-service";

export default function Home() {

  const { user, isLoading } = useUser()
  const isMobile = useIsMobile()
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
          <>
            <div className="flex flex-col items-center justify-center text-white px-4 text-center">
              <Image height="100" width="100" src={BandaidLogo} alt="bandaid-logo" />
              <h1 className="text-4xl md:text-5xl font-bold my-5 text-purple-400">
                Bandaid
              </h1>
              <div className="text-lg md:text-xl text-gray-300 mb-6">
                A set of tools that bands or musicians can use to enhance their performance.<br />
              </div>
            </div>

            {user ? (
              <div className={`${isMobile ? "flex-col gap-8" : "flex-row"} flex justify-around border-2 border-stone-500 rounded-sm p-6`}>
                <div>
                  <h2 className="text-3xl">
                    Teleprompter
                  </h2>
                  <p className="text-stone-400"><i>The on-stage assistant who never forgets your lines</i></p>
                </div>
                <div className="flex">
                  <CoolButton className={`${isMobile ? "flex-1" : "self-center"}`} label="Go to Teleprompter" onClick={goTeleprompter} />
                </div>
              </div>
            ) : (
              <div className="flex justify-center flex-col">
                <p className="text-center text-md font-medium mb-4">
                   Please log in to continue.
                </p>
                <a className="text-center" href="/api/auth/login">
                  <CoolButton label="Log in"/>
                </a>
              </div>
            )}
          </>
        )}
    </PageLayout>
  );
}
