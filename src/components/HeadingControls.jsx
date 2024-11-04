// src/components/HeadingControls.jsx
"use client";
import { useHeading } from "@/context/HeadingContext";

export default function HeadingControls() {
  const { setLevel } = useHeading();

  return (
    <div className="flex gap-2 my-4">
      <button onClick={() => setLevel(1)} className="btn btn-sm">
        H1
      </button>
      <button onClick={() => setLevel(2)} className="btn btn-sm">
        H2
      </button>
      <button onClick={() => setLevel(3)} className="btn btn-sm">
        H3
      </button>
      <button onClick={() => setLevel(4)} className="btn btn-sm">
        H4
      </button>
    </div>
  );
}
