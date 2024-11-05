// src/components/Navbar.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <nav
        className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 shadow-lg"
        style={{
          backgroundImage: "linear-gradient(90deg, #55CDFC, #F7A8B8, #C837AB)",
        }}
      >
        {/* Week 11 Lessons Button using DaisyUI with SVG Icon */}
        <button
          onClick={toggleDrawer}
          className="btn btn-primary btn-md flex items-center gap-2"
        >
          {/* SVG Icon for Menu */}
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
          <span>Week 11 Lessons</span>
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
            <Link href="/passing-data-deeply-with-context" passHref>
              <span className="text-white hover:underline cursor-pointer">Passing Data Deeply with Context</span>
            </Link>
            <Link href="/object-orientated-programming" passHref>
              <span className="text-white hover:underline cursor-pointer">Object-Oriented Programming</span>
            </Link>
            <Link href="/weapon-Demo" passHref>
              <span className="text-white hover:underline cursor-pointer">Weapon Demo</span>
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

      {/* Conditionally apply width on main content */}
      <style jsx global>{`
        main {
          max-width: ${isDrawerOpen ? "66%" : "100%"};
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </>
  );
};

export default Navbar;
