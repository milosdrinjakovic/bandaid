"use client"
import { useRouter } from 'next/navigation'
import React from "react";

export default function Home() {

  const router = useRouter()

  const goToTelepromter = () => {
    router.push("/teleprompter")
  }

  return (
    <div className="flex flex-col bg-red-500">
       <button onClick={goToTelepromter}>Telepromter</button>
    </div>
  )
}
