"use client"
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BandageIcon,
  HomeIcon,
  ScreenShareIcon,
  LogOut,
  ArrowLeftToLine,
  ArrowRightToLine
} from "lucide-react";
import { useIsMobile } from "../../services/breakpoint-service";
import { useUser } from "@auth0/nextjs-auth0/client";

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const router = useRouter();

  const currentPathname = usePathname();
  const { user } = useUser();

  const getPath = () => {
    if (currentPathname.includes("/", 2)) {
      return currentPathname.substring(0, currentPathname.indexOf("/", 2));
    }
    return currentPathname;
  };

  let pathSubstring = getPath();

  const goToRoute = (route: string) => {
    router.push(route);
  };

  const toggleOpenSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      title: "Home",
      navigateTo: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Teleprompter",
      navigateTo: "/teleprompter",
      icon: <ScreenShareIcon />,
      protected: true
    },
    {
      title: "Logout",
      navigateTo: "/api/auth/logout",
      icon: <LogOut />,
      protected: true
    },
  ];
  const filteredNavItems = navItems.filter(
    (item) => !item.protected || user
  );
  return (
    
    <div className="flex">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen
        // state to control width and visibility
        className={`bg-stone-900 text-white 
                    h-screen transition-all 
                    duration-300 
                    box-content
                    border-r-2
                    flex
                    border-r-stone-100
                    ${isOpen ? "w-64" : "w-16 overflow-hidden"}`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            {filteredNavItems.map((item) => (
              <div
                key={item.title}
                className={`w-full px-3 py-6
                            hover:bg-white hover:text-stone-900 duration-300
                            flex flex-row items-center cursor-pointer
                            ${pathSubstring === item.navigateTo
                    ? "bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 text-white"
                    : ""}`}
                onClick={() => goToRoute(item.navigateTo)}
              >
                <div className="pl-2 pr-5">{item.icon}</div>
                {item.title}
              </div>
            ))}
          </div>
          <div className={`flex ${isOpen ? "justify-end" : "justify-start"}`}>
          <button
            className={`flex bg-stone-900 text-white p-4`}
            onClick={toggleOpenSidebar}
          >
            {/* Toggle icon based on isOpen state */}
            <div className="flex flex-row">
              {isOpen ? <ArrowLeftToLine /> : <ArrowRightToLine />}
            </div>
          </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
