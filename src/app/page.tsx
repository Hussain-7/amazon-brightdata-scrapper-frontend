import React from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <DocumentMagnifyingGlassIcon className="h-32 w-32 md:h-64 md:w-64 text-indigo-600/20" />
      <h1 className="text-2xl md:text-3xl mt-2 text-black font-bold mb-5 text-center">
        Welcome to the Amazon Web Scraper
      </h1>
      <h2 className="text-base md:text-lg italic text-center text-black/50">
        To learn more about the Amazon Web Scraper, contact me at
        <Link
          href="mailto:hussain2000.rizvi@gmail.com"
          target="_blank"
          className="text-blue-600 /50"
        >
          {" "}
          hussain2000.rizvi@gmail.com
        </Link>
      </h2>
    </div>
  );
};

export default Home;
