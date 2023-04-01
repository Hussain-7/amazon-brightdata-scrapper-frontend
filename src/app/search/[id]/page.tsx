"use client";

import { useRouter } from "next/router";
import { useDocument } from "react-firebase-hooks/firestore";
import React from "react";
import { doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import Results from "../../../components/Results";
type Props = {
  params: {
    id: string;
  };
};
const SearchPage = ({ params: { id } }: Props) => {
  // Using the db for client side hence not using admindb
  const [snapshot, loading, error] = useDocument(doc(db, "searches", id));
  if (loading)
    return (
      <h1 className="text-center p-10 animate-pulse text-xl text-indigo-600/50">
        Loading Results..
      </h1>
    );
  if (!snapshot) return;
  if (snapshot?.data()?.status === "pending")
    return (
      <div className="flex flex-col gap-y-5 py-10 itmes-center justify-between">
        <p className="text-indigo-600 animate-pulse text-center">
          Scraping the results from Amazon...
        </p>
      </div>
    );
  return (
    <div className="py-5">
      <div className="flex items-center justify-between mb-7">
        <div className="flex flex-col md:flex-row gap-x-4">
          <h1 className="font-bold">
            Search Results for {""}
            <span className="text-indigo-600">"{snapshot.data()?.search}"</span>
          </h1>
          <p className="text-gray-300">
            {snapshot.data()?.results?.length > 0 &&
              `${snapshot.data()?.results?.length} results found`}
          </p>
        </div>
      </div>
      {snapshot.data()?.results?.length > 0 && (
        <Results results={snapshot.data()?.results} />
      )}
    </div>
  );
};

export default SearchPage;
