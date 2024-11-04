// /app/page.jsx
"use client";
import { useReducer, useEffect } from "react";

// Reducer function for managing count state
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      if (state.count > 0) {
        return { ...state, count: state.count - 1 };
      } else {
        return { ...state, showAlert: true }; // Trigger alert when attempting to go below zero
      }
    case "RESET":
      return { ...state, count: 0 };
    case "CLOSE_ALERT":
      return { ...state, showAlert: false }; // Close the alert
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, showAlert: false });

  const { count, showAlert } = state;

  // Effect to handle showing an alert when attempting to decrement below zero
  useEffect(() => {
    if (showAlert) {
      alert("Count cannot go below zero!");
      dispatch({ type: "CLOSE_ALERT" });
    }
  }, [showAlert]);

  // Check if the count is zero to disable the decrement button
  const isZero = count === 0;

  return (
    <div className="card w-80 bg-base-100 shadow-lg p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Counter</h1>

      {/* Display Count */}
      <p className={`text-lg mb-4 transition-all ${count > 0 ? "text-green-600" : "text-gray-800"}`}>
        Count:{" "}
        <span className={`badge badge-lg ${count > 0 ? "badge-success" : "badge-primary"}`}>
          {count}
        </span>
      </p>

      {/* Increment, Decrement, and Reset Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="btn btn-primary"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="btn btn-secondary"
          disabled={isZero} // Disable if count is zero
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="btn btn-outline btn-accent text-lime-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
