import React, { ReactNode } from 'react';
import Sidebar from '../navigation/sidebar';
import Image, { StaticImageData } from 'next/image';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  logoUrl?: StaticImageData
}

const PageLayout: React.FC<LayoutProps> = ({ children, logoUrl, title = "Default Title" }) => {
  return (
    <div className="flex bg-stone-900 text-white font-semibold">
        <Sidebar />
      <div className="p-4 md:p-14 h-screen flex flex-col md:w-full w-5/6">
          {logoUrl && <Image src={logoUrl} width="20" height="10" alt="page-image" />}
          <div className="pb-4 text-white">{title}</div>
          {children}
      </div>
    </div>
  );
};

export default PageLayout;