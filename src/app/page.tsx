"use client"
import { useRouter } from 'next/navigation'
import React from "react";
import Image from 'next/image'
import teleprompterIcon from "../../public/teleprompter-icon.png"

export default function Home() {

  const router = useRouter()

  const goToTeleprompter = () => {
    router.push("/teleprompter")
  }

  return (
    <div className="flex flex-row items-center cursor-pointer" onClick={goToTeleprompter}>
         <Image
      src={teleprompterIcon}
      width={100}
      height={100}
      alt="teleprompter"
    />
    Teleprompter
    </div>
  )
}
