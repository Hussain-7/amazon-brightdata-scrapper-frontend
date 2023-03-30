import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

const Sidebar = () => {
  return (
    <div className="p-2 md:p-10 py-6 overflow-y-auto border-b border-indigo-500/30">
      <div className="flex flex-col items-center justify-center mb-10">
        <DocumentMagnifyingGlassIcon className="h-16 md:w-16 text-indigo-600" />
        <h1 className="hidden md:inline text-center text-3xl my-2 font-bold">
          Web Scrapper
        </h1>
        <h2 className="hidden md:inline text-center text-xs italic">
          Scrapping the unscrappable
        </h2>
      </div>
      <ul>{/* SideBar Row Components */}</ul>
    </div>
  );
};

export default Sidebar;
