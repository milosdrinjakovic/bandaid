import React, { ReactNode, use } from 'react';
import Sidebar from '../navigation/sidebar';
import Image, { StaticImageData } from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  logoUrl?: StaticImageData
}

const PageLayout: React.FC<LayoutProps> = ({ children, logoUrl }) => {

  const { user } = useUser();
  return (
    <>
    
    <div className="flex bg-stone-900 text-white font-semibold">
      <Sidebar />
      <div className="p-4 md:p-14 h-screen flex flex-col md:w-full w-5/6 items-center justify-center">
        {logoUrl && <Image src={logoUrl} width="20" height="10" alt="page-image" />}
        {children}
      </div>
    </div>
  
    
 
    </>
  );
};

export default PageLayout;