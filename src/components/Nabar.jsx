// src/components/Navbar.jsx
"use client";
import React, { useState } from "react";
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
        {/* Week 11 Lessons Button to open drawer */}
        <button
          onClick={toggleDrawer}
          className="text-xl font-bold text-white transition hover:underline"
        >
          Week 11 Lessons
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
            <a href="/" className="text-white hover:underline">
              Home
            </a>
            <a href="/useReducer" className="text-white hover:underline">
              useReducer
            </a>
            <a href="/passing-data-deeply-with-context" className="text-white hover:underline">
              Passing Data Deeply with Context
            </a>
            <a href="/object-orientated-programming" className="text-white hover:underline">
              Object-Oriented Programming
            </a>
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