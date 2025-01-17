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
    <div className="flex">
    <Sidebar />
    <div className="px-10 pt-20 pb-10 w-full h-screen flex flex-col">
        {logoUrl && <Image src={logoUrl} width="20" height="10" alt="page-image" />}
        <div className="mb-10">{title}</div>
        {children}
    </div>
    </div>
  );
};

export default PageLayout;