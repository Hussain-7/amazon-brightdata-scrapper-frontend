"use client";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { query, collection, orderBy } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import SidebarRow from "./SidebarRow";

const Sidebar = () => {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "searches"), orderBy("start_eta", "desc"))
  );
  return (
    <div
      className="p-2 md:p-10 py-6 overflow-y-auto border-b border-indigo-500/30
    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
    "
    >
      <div className="flex flex-col items-center justify-center mb-10">
        <DocumentMagnifyingGlassIcon className="h-16 md:w-16 text-indigo-600" />
        <h1 className="hidden md:inline text-center text-3xl my-2 font-bold">
          Web Scrapper
        </h1>
        <h2 className="hidden md:inline text-center text-xs italic">
          Scrapping the unscrappable
        </h2>
      </div>
      <ul className="flex flex-col gap-2 py-2 overflow-x-auto">
        {snapshot?.docs.map((doc) => (
          <SidebarRow key={doc.id} doc={doc} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
