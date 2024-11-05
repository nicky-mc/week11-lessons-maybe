import Image from 'next/image';
import Link from "next/link";

async function fetchPokemonData(id) {
  console.log(`Fetching data for Pokemon ID: ${id}`); // Logging for debugging
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon data: ${response.statusText}`);
  }
  return response.json();
}

export default async function PokemonDetail({ params }) {
  const { id } = params; // No need to await here
  let pokemon;
  let error;

  try {
    pokemon = await fetchPokemonData(id);
  } catch (err) {
    error = err.message || "An unknown error occurred";
  }

  if (error) {
    return <div className="text-error">Error: {error}</div>;
  }

  const spriteSets = [
    { label: "Front", src: pokemon.sprites.front_default },
    { label: "Back", src: pokemon.sprites.back_default },
    { label: "Shiny Front", src: pokemon.sprites.front_shiny },
    { label: "Shiny Back", src: pokemon.sprites.back_shiny },
    { label: "Dream World", src: pokemon.sprites.other.dream_world.front_default },
    { label: "Official Artwork", src: pokemon.sprites.other['official-artwork'].front_default },
  ];

  const generationSprites = Object.entries(pokemon.sprites.versions).flatMap(([generation, genSprites]) => {
    // Your existing logic for extracting generation sprites
  }).filter(sprite => sprite.src);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center relative">
      <Link href="/pokemon" className="absolute top-4 left-4 btn btn-outline">Back to list</Link>
      <div className="card lg:w-3/4 bg-base-100 shadow-xl">
        <div className="p-10">
          <figure className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center mb-8">
            {spriteSets.map((sprite) => sprite.src && (
              <div key={sprite.label} className="text-center">
                <Image src={sprite.src} alt={`${pokemon.name} - ${sprite.label}`} width={200} height={200} className="rounded-lg" />
                <p className="text-sm mt-2">{sprite.label}</p>
              </div>
            ))}
          </figure>

          <div className="card-body lg:w-full">
            <h2 className="card-title text-4xl capitalize text-center mb-4">{pokemon.name}</h2>
            <p className="text-center text-sm">#{pokemon.id.toString().padStart(3, '0')}</p>
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <progress className="progress progress-primary w-2/3" value={statInfo.base_stat} max="255"></progress>
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

            <div className="mt-8">
              <h3 className="text-xl font-bold text-center mb-4">Generational Sprites</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
                {generationSprites.map((genSprite) => (
                  <div key={genSprite.label} className="text-center">
                    <p className="text-sm font-semibold mb-2">{genSprite.label}</p>
                    <Image src={genSprite.src} alt={`${pokemon.name} - ${genSprite.label}`} width={150} height={150} className="rounded-lg mx-auto mb-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
