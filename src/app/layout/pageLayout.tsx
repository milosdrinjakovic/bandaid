import React, { ReactNode, use } from 'react';
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
    <>
     {user ? (
    <div className="flex bg-stone-900 text-white font-semibold">
      <Sidebar />
      <div className="p-4 md:p-14 h-screen flex flex-col md:w-full w-5/6">
        {logoUrl && <Image src={logoUrl} width="20" height="10" alt="page-image" />}
        <div className="pb-4 text-white">{title}</div>
        {children}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700  text-white">
      <div className=" shadow-xl rounded-lg p-10 text-center w-full max-w-md">
        <h1 className="text-4xl font-semibold text-white mb-6">Bandaid Teleprompter</h1>
        
        <p className="text-lg  mb-4">
          Dobrodošli na naš sajt! Bandaid Teleprompter je savršen alat za lako snimanje i prenos teksta.
          Idealno za vlogove, predavanja i još mnogo toga!
        </p>

        <div className="text-left mb-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold ">Šta nudi Bandaid?</h3>
          <ul className=" mt-2 ">
            <li>Jednostavno podešavanje i upotreba</li>
            <li>Visoka rezolucija i brzina kontrole</li>
            <li>Prilagodljivo u svakom trenutku</li>
            <li>Kompatibilnost sa svim uređajima</li>
          </ul>
        </div>

        <div>
          <a href="/api/auth/login" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300">
            Prijavi se
          </a>
        </div>
      </div>
    </div>
  )}
    </>
  );
};

export default PageLayout;