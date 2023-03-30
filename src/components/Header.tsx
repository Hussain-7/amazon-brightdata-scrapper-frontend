"use client";

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import React, { FormEvent, FormEventHandler, useRef } from "react";

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;
    if (inputValue) {
      inputRef.current!.value = "";
    }
    try {
      // call out api to activa the Scrapper...
    } catch (error) {}
    // Wait for the response to come back
  };
  return (
    <header>
      <form
        className="flex items-center justify-center rounded-full py-2 px-4 bg-indigo-100 max-w-md mx-auto"
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
