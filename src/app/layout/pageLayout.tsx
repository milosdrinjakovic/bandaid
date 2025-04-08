import React, { ReactNode } from 'react';
import Sidebar from '../navigation/sidebar';
import Image, { StaticImageData } from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  logoUrl?: StaticImageData
}

const PageLayout: React.FC<LayoutProps> = ({ children, logoUrl, title = "Default Title" }) => {

  const { user } = useUser();
  
  return (
    <div className="flex bg-stone-900 text-white font-semibold">
      <Sidebar />
      {user ? (
        <div className="p-4 md:p-14 h-screen flex flex-col md:w-full w-5/6">
          {logoUrl && <Image src={logoUrl} width="20" height="10" alt="page-image" />}
          <div className="pb-4 text-white">{title}</div>
          {children}
        </div>
      ) : (
        <div>User not logged in</div>
      )}
    </div>
  );
};

export default PageLayout;