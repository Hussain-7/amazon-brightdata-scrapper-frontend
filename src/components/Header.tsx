"use client";

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler, useRef } from "react";
import { toast } from "react-hot-toast";
const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;
    const notification = toast.loading(`Starting a Scraper for: ${inputValue}`);
    if (inputValue) {
      inputRef.current!.value = "";
    }
    try {
      // call out api to activa the Scrapper...
      const response = await fetch("/activateScraper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: inputValue }),
      });
      const { collection_id, start_eta } = await response.json();
      toast.success(`Scraper Started Successfully!`, {
        id: notification,
      });
      router.push(`/search/${collection_id}`);
    } catch (error) {
      toast.error("Whoops... Something Went Wrong!", {
        id: notification,
      });
    }
    // Wait for the response to come back
  };
  return (
    <header>
      <form
        className="flex items-center justify-center rounded-full py-2 px-4 bg-indigo-100 max-w-2xl mx-auto"
        onSubmit={handleSearch}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300"
        />
        <button type="submit" hidden>
          Search
        </button>
        <MagnifyingGlassCircleIcon className="h-6 w-6 text-indigo-300" />
      </form>
    </header>
  );
};

export default Header;
