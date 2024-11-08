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
        return { ...state, showAlert: true };
      }
    case "RESET":
      return { ...state, count: 0 };
    case "CLOSE_ALERT":
      return { ...state, showAlert: false };
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
    <div className="flex flex-col items-center space-y-8 p-8 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 min-h-screen">
      {/* Counter Card */}
      <div className="card w-80 bg-base-100 shadow-xl p-6 text-center border-4 border-purple-300 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-yellow-500">Counter to Demonstrate useReducer</h1>

        {/* Display Count */}
        <p className={`text-2xl font-semibold mb-4 ${count > 0 ? "text-green-600" : "text-gray-800"}`}>
          Count:{" "}
          <span className={`badge badge-lg ${count > 0 ? "badge-success" : "badge-primary"} transition-all`}>
            {count}
          </span>
        </p>

        {/* Increment, Decrement, and Reset Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="btn btn-primary bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white font-bold px-4 py-2 rounded-full transition duration-300"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch({ type: "DECREMENT" })}
            className="btn btn-secondary bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white font-bold px-4 py-2 rounded-full transition duration-300"
            disabled={isZero}
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="btn btn-outline btn-accent text-lime-600 font-bold px-4 py-2 rounded-full hover:bg-lime-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Explanation Card */}
      <div className="card w-full max-w-lg bg-base-100 shadow-lg p-6 border-4 border-yellow-300 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center text-yellow-600">Understanding useReducer</h2>
        <p className="text-gray-800 mb-4">
          The <strong>useReducer</strong> hook in React is a powerful tool for managing complex state logic.
          It is particularly useful in cases where state transitions depend on multiple sub-values or specific actions,
          such as in form management, component interactions, or managing intricate state conditions.
        </p>
        <p className="text-gray-800 mb-4">
          Unlike <strong>useState</strong>, which is ideal for simple state updates, <strong>useReducer</strong> relies on a 
          <em> reducer function</em> that takes the current state and an <em>action</em> as arguments. This reducer function
          dictates how the state should change in response to each action, returning a new state based on the logic defined within.
        </p>
        <p className="text-gray-800 mb-4">
          Actions in <strong>useReducer</strong> are typically defined as objects with a <code>type</code> property 
          (indicating the action to take) and, optionally, additional data for the state update. The 
          <code>dispatch</code> function, returned by <strong>useReducer</strong>, is used to trigger these actions.
        </p>
        <p className="text-gray-800 mb-4">
          For example, in our counter component, the reducer function handles multiple action types: 
          <code>INCREMENT</code>, <code>DECREMENT</code>, <code>RESET</code>, and <code>CLOSE_ALERT</code>. Each action modifies 
          the state in specific ways, such as increasing or decreasing the count or resetting it to zero. The alert logic demonstrates 
          how we can conditionally update the state based on the current value, adding complexity that would be cumbersome to manage with simple state alone.
        </p>
        <p className="text-gray-800">
          <strong>useReducer</strong> is particularly beneficial when dealing with multi-faceted state requirements, as it 
          enables clear, organized, and scalable code. It is an excellent alternative to <strong>Redux</strong> for local 
          component state management, providing many of the same benefits for smaller-scale scenarios without requiring a 
          third-party library.
        </p>
      </div>
    </div>
  );
}
