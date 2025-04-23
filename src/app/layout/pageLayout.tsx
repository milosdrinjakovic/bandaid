import React, { ReactNode } from 'react';
import Sidebar from '../navigation/sidebar';
import { useIsMobile } from '@/services/breakpoint-service';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const PageLayout: React.FC<LayoutProps> = ({ children, title }) => {

  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-1 bg-stone-900 text-white ${isMobile ? "justify-center" : ""}`}>    
      <Sidebar />
      <div className="p-4 md:p-14 h-screen flex flex-col flex-1">
        <h1 className={`mb-6 md:mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${isMobile ? "text-center" : ""}`}>
          {title}           
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;