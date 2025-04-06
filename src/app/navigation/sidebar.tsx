import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BandageIcon, ChevronLeftIcon, HomeIcon, MenuIcon, ScreenShareIcon } from 'lucide-react';
import { useIsMobile } from '../../services/breakpoint-service';

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

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
      icon: <HomeIcon />
    },
    {
      title: "Teleprompter",
      navigateTo: "/teleprompter",
      icon: <ScreenShareIcon />
    },
    {
      title: "About",
      navigateTo: "/about",
      icon: <BandageIcon />
    }
  ]

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen 
        // state to control width and visibility
        className={`bg-stone-900 text-white 
                    h-screen transition-all 
                    duration-300 
                    border-r-8
                    border-purple-800
                    box-content
                    ${isOpen ? 'w-64' : 'w-16 overflow-hidden'
          }`}>
        {/* Sidebar content */}
        <div className="flex flex-col">
            {/* Button to toggle sidebar */}
            <div className='flex '>
              <button
                className={`flex flex-1 ${isOpen ? 'justify-end pr-4' : 'justify-center'} bg-stone-900 text-white hover:bg-white duration-300 hover:text-stone-900 pt-4 pb-4`}
                onClick={() => setIsOpen(!isOpen)}>
                {/* Toggle icon based on isOpen state */}
                <div className="flex flex-row">
                  {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </div> 
              </button>
            </div>

            {navItems.map(item => (

              <div key={item.title} className={`w-full px-3 py-6
                          hover:bg-white hover:text-stone-900 duration-300
                          flex flex-row items-center cursor-pointer
                          ${pathSubstring === item.navigateTo ? "bg-purple-800 text-white" : ""}`}
                onClick={() => goToRoute(item.navigateTo)}>
                <div className="pl-2 pr-5">
                  {item.icon}
                </div>
                  {item.title}
              </div>
            ))}
          
        </div>

      </div>
    </div>
  );
};

export default Sidebar;