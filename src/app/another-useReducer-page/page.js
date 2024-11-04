// /app/page.js

"use client";
import { useReducer, useState } from "react";
import Modal from "@/components/Modal"; // Import Modal component

// Initial state for the reducer
const initialState = {
  imageSize: 100,
  textSize: 16,
  theme: 'light',
};

// Reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE_SIZE':
      return { ...state, imageSize: action.payload };
    case 'SET_TEXT_SIZE':
      return { ...state, textSize: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { imageSize, textSize, theme } = state;
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

        {/* Theme Selector */}
        <div>
          <label className="block font-semibold">Theme</label>
          <select
            value={theme}
            onChange={(e) => dispatch({ type: 'SET_THEME', payload: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded-lg text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="bumblebee">Bumblebee</option>
            <option value="cupcake">Cupcake</option>
          </select>
          <button className="mt-2 underline" onClick={() => openModal("theme")}>
            What is Theme?
          </button>
        </div>
      </div>

      {/* Explanation Modals with Enhanced Content */}
      <Modal isOpen={isModalOpen === "imageSize"} onClose={closeModal} title="Image Size">
        <p><strong>Image Size</strong> refers to the dimensions of an image displayed on the screen, usually measured in pixels. Adjusting the image size dynamically helps improve user experience by ensuring images are appropriately scaled across devices and screen sizes.</p>
        <p><strong>Real-World Application:</strong> In e-commerce, product images often have different size requirements depending on where they're shown (e.g., thumbnail vs. full view). Dynamically managing image sizes through a reducer is an efficient way to adjust image dimensions based on the user`&apos;s actions or screen size.</p>
      </Modal>
      
      <Modal isOpen={isModalOpen === "textSize"} onClose={closeModal} title="Text Size">
        <p><strong>Text Size</strong> controls the font size of text elements, affecting readability and design aesthetics. Adjusting text size is crucial for accessibility, especially for users with visual impairments who need larger fonts.</p>
        <p><strong>Real-World Application:</strong> News websites and blogs often let users control text size for readability. A `useReducer` setup allows an app to adjust text size across various sections seamlessly, enhancing accessibility and user control.</p>
      </Modal>
      
      <Modal isOpen={isModalOpen === "theme"} onClose={closeModal} title="Theme">
        <p><strong>Theme</strong> in a web application refers to the overall visual styling, including colors, backgrounds, and typography. Themes can be changed based on user preference to improve usability and aesthetics, such as switching between light and dark modes.</p>
        <p><strong>Real-World Application:</strong> Many applications, including social media platforms and operating systems, offer theme options. Using `useReducer` for theme management helps centralize the style changes, making it easy to apply a consistent look and feel across an entire application.</p>
      </Modal>
    </div>
  );
}
