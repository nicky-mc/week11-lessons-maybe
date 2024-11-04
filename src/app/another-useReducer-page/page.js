// /app/page.js

"use client";
import { useReducer, useState } from "react";
import Modal from "@/components/Modal"; // Import Modal component
import Image from "next/image"; // Import Next.js Image component for demonstration

// Initial state for the reducer
const initialState = {
  imageSize: 100,
  textSize: 16,
};

// Reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE_SIZE':
      return { ...state, imageSize: action.payload };
    case 'SET_TEXT_SIZE':
      return { ...state, textSize: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { imageSize, textSize } = state;
  const [isModalOpen, setModalOpen] = useState(null); // Track which modal to show

  // Function to open a specific modal
  const openModal = (modalId) => setModalOpen(modalId);
  const closeModal = () => setModalOpen(null);

  return (
    <div className={`min-h-screen p-8 flex flex-col items-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 text-white`}>
      <h1 className="text-4xl font-bold mb-6">Understanding <code>useReducer</code> in React</h1>

      {/* Interactive controls */}
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
        
        {/* Image Size Slider */}
        <div>
          <label className="block font-semibold">Image Size: {imageSize}px</label>
          <input
            type="range"
            min="50"
            max="500"
            value={imageSize}
            onChange={(e) => dispatch({ type: 'SET_IMAGE_SIZE', payload: Number(e.target.value) })}
            className="w-full"
          />
          <button className="mt-2 underline" onClick={() => openModal("imageSize")}>
            What is Image Size?
          </button>
        </div>

        {/* Text Size Slider */}
        <div>
          <label className="block font-semibold">Text Size: {textSize}px</label>
          <input
            type="range"
            min="12"
            max="40"
            value={textSize}
            onChange={(e) => dispatch({ type: 'SET_TEXT_SIZE', payload: Number(e.target.value) })}
            className="w-full"
          />
          <button className="mt-2 underline" onClick={() => openModal("textSize")}>
            What is Text Size?
          </button>
        </div>

        {/* Additional Button for useReducer Explanation */}
        <button className="mt-4 underline text-lg font-semibold" onClick={() => openModal("useReducer")}>
          What is useReducer?
        </button>
      </div>

      {/* Live Demo of Changes */}
      <div className="mt-10 flex flex-col items-center space-y-6">
        {/* Dynamic Image Display */}
        <div className="border border-white p-4 rounded-lg bg-gray-800">
          <Image
            src="/images/itbroke.jpeg" // Replace with a valid image path in your public folder
            alt="Sample Image"
            width={imageSize}
            height={imageSize}
            className="rounded-lg"
          />
          <p className="text-center mt-2">Dynamic Image Size: {imageSize}px</p>
        </div>

        {/* Dynamic Text Display */}
        <p
          className="text-center"
          style={{ fontSize: `${textSize}px` }}
        >
          This text size adjusts dynamically to {textSize}px
        </p>
      </div>

      {/* Explanation Modals with Enhanced Content */}
      <Modal isOpen={isModalOpen === "imageSize"} onClose={closeModal} title="Image Size">
  <p><strong>Image Size</strong> refers to the dimensions of an image displayed on the screen, usually measured in pixels. Adjusting the image size dynamically helps improve user experience by ensuring images are appropriately scaled across devices and screen sizes.</p>
  <p><strong>Real-World Application:</strong> In e-commerce, product images often have different size requirements depending on where they&apos;re shown (e.g., thumbnail vs. full view). Dynamically managing image sizes through a reducer is an efficient way to adjust image dimensions based on the user&apos;s actions or screen size.</p>
</Modal>

<Modal isOpen={isModalOpen === "textSize"} onClose={closeModal} title="Text Size">
  <p><strong>Text Size</strong> controls the font size of text elements, affecting readability and design aesthetics. Adjusting text size is crucial for accessibility, especially for users with visual impairments who need larger fonts.</p>
  <p><strong>Real-World Application:</strong> News websites and blogs often let users control text size for readability. A <code>useReducer</code> setup allows an app to adjust text size across various sections seamlessly, enhancing accessibility and user control.</p>
</Modal>

<Modal isOpen={isModalOpen === "useReducer"} onClose={closeModal} title="What is useReducer?">
  <p><strong>useReducer</strong> is a React hook that allows for more complex state management compared to <code>useState</code>. It is ideal for situations where the state logic involves multiple sub-values or where the state transitions depend on specific actions.</p>
  <p><strong>How it Works:</strong> <code>useReducer</code> accepts two arguments: a reducer function and an initial state. The reducer function receives the current state and an action, and based on the action type, it returns a new state. This setup enables you to centralize all state transitions, making the code more predictable and easier to debug.</p>
  <p><strong>Real-World Applications:</strong> In larger applications, <code>useReducer</code> can manage complex forms, handle multiple related state values, or even replace libraries like Redux for local component state. For instance, in an online shopping cart, <code>useReducer</code> can handle adding, removing, and updating items, each as a distinct action within the reducer function.</p>
</Modal>

    </div>
  );
}
