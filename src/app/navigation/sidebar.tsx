import React, { useState } from 'react';
import Image from 'next/image'
import teleprompterIcon from "../../../public/teleprompter-icon.png"
import homeIcon from "../../../public/home-icon.png"
import sampleIcon from "../../../public/sample-icon.png"
import { usePathname, useRouter } from 'next/navigation';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter()

  const currentPathname = usePathname()

  const getPath = () => {
    if(currentPathname.includes("/", 2)){
      return currentPathname.substring(0, currentPathname.indexOf("/", 2))
    } 
    return currentPathname;
  }

  let pathSubstring = getPath()

  const goToRoute = (route: string) => {
    router.push(route)
  }

  const navItems = [
    {
      title: "Home",
      navigateTo: "/",
      icon: homeIcon
    },
    {
      title: "Teleprompter",
      navigateTo: "/teleprompter",
      icon: teleprompterIcon
    },
    {
      title: "About",
      navigateTo: "/about",
      icon: sampleIcon
    }
  ]

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen 
        // state to control width and visibility
        className={`bg-blue-950 text-white 
                    h-screen transition-all 
                    duration-300 
                    ${isOpen ? 'w-64' : 'w-16 overflow-hidden'
          }`}>
        {/* Sidebar content */}
        <div className="flex flex-col">

          <div className={`flex-1 mt-3`}>
            {/* Button to toggle sidebar */}
            <div className={`flex mb-4 duration-300 ${isOpen ? 'ml-52' : 'ml-2.5'}`}>
              <button
                className="flex justify-center items-center bg-blue-950 hover:bg-blue-900 
                       text-white font-bold rounded-full h-10 w-10"
                onClick={() => setIsOpen(!isOpen)}>
                {/* Toggle icon based on isOpen state */}
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>

            {navItems.map(item => (

              <div key={item.title} className={`w-full p-3 text-white 
                        hover:bg-blue-900
                          duration-300
                          flex flex-row items-center cursor-pointer
                          ${pathSubstring === item.navigateTo ? "bg-blue-900" : ""}`}
                onClick={() => goToRoute(item.navigateTo)}>
                <Image
                  src={item.icon}
                  width={40}
                  height={40}
                  alt={item.title}
                  style={{ marginRight: "12px" }}
                />
                {item.title}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;