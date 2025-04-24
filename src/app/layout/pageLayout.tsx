import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const PageLayout: React.FC<LayoutProps> = ({ children, title }) => {

  return (
    <div className="flex flex-1 bg-stone-900 text-white justify-center md:justify-normal">    
      <div className="p-4 md:p-14 h-screen flex flex-col flex-1">
        <h1 className="mb-6 md:mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center md:text-start" >
          {title}           
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;