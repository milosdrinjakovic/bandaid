import React, { ReactNode } from 'react';
import Sidebar from '../navigation/sidebar';
import Image, { StaticImageData } from 'next/image';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  logoUrl?: StaticImageData
}

const PageLayout: React.FC<LayoutProps> = ({ children, logoUrl, title }) => {

  return (
    
    <div className="flex bg-stone-900 text-white font-semibold">    
      <Sidebar />
      <div className="p-4 md:p-14 h-screen flex flex-col md:w-full w-5/6">
        {logoUrl && <Image src={logoUrl} width="20" height="10" alt="page-image" />}
        <h1 className="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}           
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;