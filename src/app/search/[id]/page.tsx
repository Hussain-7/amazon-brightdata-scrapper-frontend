"use client";

import { useRouter } from "next/navigation";
import { useDocument } from "react-firebase-hooks/firestore";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import Results from "../../../components/Results";
import Spinner from "react-spinkit";
type Props = {
  params: {
    id: string;
  };
};
const SearchPage = ({ params: { id } }: Props) => {
  // Using the db for client side hence not using admindb
  const router = useRouter();
  const [snapshot, loading, error] = useDocument(doc(db, "searches", id));
  const handleDelete = () => {
    deleteDoc(doc(db, "searches", id));
    router.push("/");
  };
  const deleteButton = (
    <button
      onClick={handleDelete}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-400"
    >
      Delete
    </button>
  );

  if (loading)
    return (
      <h1 className="text-center p-10 animate-pulse text-xl text-indigo-600/50">
        Loading Results..
      </h1>
    );
  if (!snapshot) return;
  if (snapshot?.data()?.status === "pending")
    return (
      <div className="flex flex-col gap-y-5 py-10 items-center justify-between">
        <p className="text-indigo-600 animate-pulse text-center">
          Scraping the results from Amazon...
        </p>
        <Spinner
          style={{
            width: "100px",
            height: "100px",
          }}
          name="cube-grid"
          fadeIn="none"
          color="indigo"
        />
        {deleteButton}
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
        {deleteButton}
      </div>
      {snapshot.data()?.results?.length > 0 && (
        <Results results={snapshot.data()?.results} />
      )}
    </div>
  );
};

export default SearchPage;
