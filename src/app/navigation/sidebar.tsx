"use client"
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  ScreenShareIcon,
  LogOut,
  ArrowLeftToLine,
  ArrowRightToLine,
  MenuIcon,
  X
} from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "../../services/breakpoint-service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import BandaidLogo from "../../../public/bandaid-logo.svg"

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(isMobile);
  const router = useRouter();

  const currentPathname = usePathname();
  const { user, isLoading } = useUser();

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

  const textDissapearStyling = () => {
    return `${isOpen ? "opacity-100 duration-500" : "opacity-0 duration-300"}`;
  }

  const rotateLogoStyling = () => {
    return `${isOpen ? "duration-300": "rotate-90 duration-300 h-10 w-10 ml-8"}`;
  }

  const sidebar = () => {
    return (
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {!isMobile && (
            <div className="flex flex-1 my-6 align-middle justify-center gap-2">
              <Image className={rotateLogoStyling()} height="60" width="60" src={BandaidLogo} alt="bandaid-logo" />
              <p className={`${textDissapearStyling()} font-extrabold self-center text-4xl`}>bandaid</p>
            </div>
          )}
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
                <div className={textDissapearStyling()}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
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
        )}
      </div>
    )
  }

  return (
    <>
      {isMobile ?
        <div className="absolute top-5 left-4">
          <Drawer direction="left">
            <DrawerTrigger><MenuIcon /></DrawerTrigger>
            <DrawerContent>
            <DrawerClose className="absolute right-4 top-4 text-gray-500 hover:text-black">
              <X className="h-5 w-5" />
            </DrawerClose>
              <DrawerHeader>
                <DrawerTitle>
                  <div className="flex flex-1 flex-col justify-center items-center">
                    <Image height="50" width="50" src={BandaidLogo} alt="bandaid-logo" />
                    <p className="text-white font-extrabold mt-2 text-2xl font-mono">bandaid</p>
                  </div>
                </DrawerTitle>
              </DrawerHeader>
              <DrawerDescription className="ml-5 mb-5">
                Menu
              </DrawerDescription>
              <div className="flex">
                  {sidebar()}
                </div>
            </DrawerContent>
          </Drawer>
        </div>
        : (
          <div className="flex">
            {/* Sidebar */}
            <div
              // Conditional class based on isOpen
              // state to control width and visibility
              className={`
                  bg-stone-900
                  text-white 
                    h-screen 
                    transition-all 
                    duration-300 
                    box-content
                    border-r-2
                    flex
                  border-r-stone-100
                    ${isOpen ? "w-64" : "w-16 overflow-hidden"}`}>
              {sidebar()}
            </div>
          </div>
        )}
    </>
  );
};

export default Sidebar;
