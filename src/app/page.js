// Other imports
import Image from 'next/image';

export default function App() {
  // Your existing code

  return (
    <ImageSizeContext.Provider value={imageSize}>
      <div className="p-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isLarge}
            onChange={e => {
              setIsLarge(e.target.checked);
            }}
          />
          <span>Use large images</span>
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
        <List />
      </div>
    </ImageSizeContext.Provider>
  );
}

function List() {
  const listItems = places.map(place => (
    <li key={place.id} className="mb-4">
      <Place place={place} />
    </li>
  ));
  return <ul className="list-disc pl-5">{listItems}</ul>;
}

function Place({ place }) {
  return (
    <div className="card shadow-lg compact bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="card-body">
        <PlaceImage place={place} />
        <p className="mt-2 text-gray-900 dark:text-gray-100">
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