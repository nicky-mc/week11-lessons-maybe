"use client";
import { useState, useContext, useEffect } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
import { ImageSizeContext } from './context.js';
import Image from 'next/image';

export default function App() {
  const [imageSize, setImageSize] = useState(100); // Default image size
  const [textSize, setTextSize] = useState(16); // Default text size
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <ImageSizeContext.Provider value={imageSize}>
      <div className="p-4">
        <label className="flex items-center space-x-2 mt-4">
          <span>Image Size: {imageSize}px</span>
          <input
            type="range"
            min="50"
            max="600"  // Set max image size to 600px
            value={imageSize}
            onChange={e => setImageSize(Number(e.target.value))}
            className="slider slider-primary"
          />
        </label>
        
        <label className="flex items-center space-x-2 mt-4">
          <span>Text Size: {textSize}px</span>
          <input
            type="range"
            min="12"
            max="30"  // Set max text size to 30px
            value={textSize}
            onChange={e => setTextSize(Number(e.target.value))}
            className="slider slider-primary"
          />
        </label>
        
        <label className="flex items-center space-x-2 mt-4">
          <span>Theme:</span>
          <select
            className="select select-primary"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="bumblebee">Bumblebee</option>
            <option value="cupcake">Cupcake</option>
          </select>
        </label>
        
        <hr className="my-4" />
        
        <List textSize={textSize} />
      </div>
    </ImageSizeContext.Provider>
  );
}

function List({ textSize }) {
  const listItems = places.map(place => (
    <li key={place.id} className="mb-4">
      <Place place={place} textSize={textSize} />
    </li>
  ));
  return <ul className="list-disc pl-5">{listItems}</ul>;
}

function Place({ place, textSize }) {
  return (
    <div className="card shadow-lg compact bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="card-body">
        <PlaceImage place={place} />
        <p
          className="mt-2 text-gray-900 dark:text-gray-100"
          style={{ fontSize: `${textSize}px` }} // Dynamic text size
        >
          <b>{place.name}</b>
          {': ' + place.description}
        </p>
      </div>
    </div>
  );
}

function PlaceImage({ place }) {
  const imageSize = useContext(ImageSizeContext);
  return (
    <Image
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
      className="rounded-lg"
    />
  );
}
