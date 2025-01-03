"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav
        className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 shadow-lg"
        style={{
          backgroundImage: "linear-gradient(90deg, #55CDFC, #F7A8B8, #C837AB)",
        }}
      >
        {/* Button to toggle drawer */}
        <button
          onClick={toggleDrawer}
          className="btn btn-primary btn-md flex items-center gap-2"
        >
          {/* Menu Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <span>Menu</span>
        </button>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

        {/* Drawer Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={toggleDrawer}
        />

        {/* Drawer */}
        <aside
          className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-600 via-pink-500 to-blue-400 text-white p-6 shadow-lg transform transition-transform duration-300 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <nav className="flex flex-col space-y-4">
            <Link href="/" passHref>
              <span className="text-white hover:underline cursor-pointer">Home</span>
            </Link>
            <Link href="/useReducer" passHref>
              <span className="text-white hover:underline cursor-pointer">useReducer</span>
            </Link>
            <Link href="/another-useReducer-page" passHref>
              <span className="text-white hover:underline cursor-pointer">useReducer 2: the reducering</span>
            </Link>
            <Link href="/passing-data-deeply-with-context" passHref>
              <span className="text-white hover:underline cursor-pointer">Passing Data Deeply</span>
            </Link>
            <Link href="/object-orientated-programming" passHref>
              <span className="text-white hover:underline cursor-pointer">Object-Oriented Programming</span>
            </Link>
            <Link href="/weapon-Demo" passHref>
              <span className="text-white hover:underline cursor-pointer">Weapon Demo</span>
            </Link>
            <Link href="/pokemon" passHref>
              <span className="text-white hover:underline cursor-pointer">Pokédex</span>
            </Link>
            <Link href="/pathfinder-pc-generator" passHref>
              <span className="text-white hover:underline cursor-pointer">Pathfinder Character Creator</span>
            </Link>
          </nav>
          <button
            onClick={toggleDrawer}
            className="mt-8 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          >
            Close
          </button>
        </aside>
      </nav>

      {/* Main content margin adjustment based on drawer state */}
      <style jsx global>{`
        main {
          transition: margin-left 0.3s ease;
          margin-left: ${isDrawerOpen ? "16rem" : "0"};
        }
      `}</style>
    </>
  );
};

export default Navbar;
