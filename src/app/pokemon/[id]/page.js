import Image from 'next/image';
import Link from "next/link";

async function fetchPokemonData(id) {
  console.log("Fetching data for ID:", id);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'no-store' });
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    throw new Error(`Failed to fetch Pokemon data: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Pokemon data fetched:", data);
  return data;
}

export default async function PokemonDetail({ params }) {
  const { id } = params;
  let pokemon;
  let error;

  try {
    pokemon = await fetchPokemonData(id);
  } catch (err) {
    console.error("Fetch error:", err);
    error = err.message || "An unknown error occurred";
  }

  if (error) {
    return <div className="text-error">Error: {error}</div>;
  }

  if (!pokemon || typeof pokemon !== 'object') {
    return <div className="text-error">Error: Invalid Pokemon data</div>;
  }

  if (!pokemon.name || !pokemon.sprites || !pokemon.types) {
    return <div className="text-error">Error: Incomplete Pokemon data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/pokemon" className="btn btn-outline mb-4">Back to list</Link>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <Image 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            width={200} 
            height={200} 
            className="rounded-xl"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-4xl capitalize">{pokemon.name}</h2>
          <p className="text-sm">#{pokemon.id.toString().padStart(3, '0')}</p>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><span className="font-bold">Type:</span> {pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}</p>
              <p><span className="font-bold">Height:</span> {pokemon.height / 10} m</p>
              <p><span className="font-bold">Weight:</span> {pokemon.weight / 10} kg</p>
            </div>
            <div>
              <p><span className="font-bold">Abilities:</span> {pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(", ")}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold mb-2">Base Stats</h3>
            {pokemon.stats.map((statInfo) => (
              <div key={statInfo.stat.name} className="flex items-center mb-1">
                <span className="w-1/3 text-sm capitalize">{statInfo.stat.name}:</span>
                <progress 
                  className="progress progress-primary w-2/3" 
                  value={statInfo.base_stat} 
                  max="255"
                ></progress>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold mb-2">Moves</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 5).map((moveInfo) => (
                <span key={moveInfo.move.name} className="badge badge-primary">
                  {moveInfo.move.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}