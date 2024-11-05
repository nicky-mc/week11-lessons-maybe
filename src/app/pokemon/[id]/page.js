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
  const { id } = await params; 
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
    const genImages = [];
    if (genSprites['red-blue']?.front_default) {
      genImages.push({ label: `${generation} Red-Blue Front`, src: genSprites['red-blue'].front_default });
    }
    if (genSprites['red-blue']?.back_default) {
      genImages.push({ label: `${generation} Red-Blue Back`, src: genSprites['red-blue'].back_default });
    }
    if (genSprites['gold']?.front_default) {
      genImages.push({ label: `${generation} Gold Front`, src: genSprites['gold'].front_default });
    }
    if (genSprites['gold']?.back_default) {
      genImages.push({ label: `${generation} Gold Back`, src: genSprites['gold'].back_default });
    }
    if (genSprites['silver']?.front_default) {
      genImages.push({ label: `${generation} Silver Front`, src: genSprites['silver'].front_default });
    }
    if (genSprites['silver']?.back_default) {
      genImages.push({ label: `${generation} Silver Back`, src: genSprites['silver'].back_default });
    }
    if (genSprites['crystal']?.front_default) {
      genImages.push({ label: `${generation} Crystal Front`, src: genSprites['crystal'].front_default });
    }
    if (genSprites['crystal']?.back_default) {
      genImages.push({ label: `${generation} Crystal Back`, src: genSprites['crystal'].back_default });
    }
    if (genSprites['ruby-sapphire']?.front_default) {
      genImages.push({ label: `${generation} Ruby-Sapphire Front`, src: genSprites['ruby-sapphire'].front_default });
    }
    if (genSprites['ruby-sapphire']?.back_default) {
      genImages.push({ label: `${generation} Ruby-Sapphire Back`, src: genSprites['ruby-sapphire'].back_default });
    }
    if (genSprites['emerald']?.front_default) {
      genImages.push({ label: `${generation} Emerald Front`, src: genSprites['emerald'].front_default });
    }
    if (genSprites['emerald']?.back_default) {
      genImages.push({ label: `${generation} Emerald Back`, src: genSprites['emerald'].back_default });
    }
    if (genSprites['firered-leafgreen']?.front_default) {
      genImages.push({ label: `${generation} FireRed-LeafGreen Front`, src: genSprites['firered-leafgreen'].front_default });
    }
    if (genSprites['firered-leafgreen']?.back_default) {
      genImages.push({ label: `${generation} FireRed-LeafGreen Back`, src: genSprites['firered-leafgreen'].back_default });
    }
    if (genSprites['diamond-pearl']?.front_default) {
      genImages.push({ label: `${generation} Diamond-Pearl Front`, src: genSprites['diamond-pearl'].front_default });
    }
    if (genSprites['diamond-pearl']?.back_default) {
      genImages.push({ label: `${generation} Diamond-Pearl Back`, src: genSprites['diamond-pearl'].back_default });
    }
    if (genSprites['platinum']?.front_default) {
      genImages.push({ label: `${generation} Platinum Front`, src: genSprites['platinum'].front_default });
    }
    if (genSprites['platinum']?.back_default) {
      genImages.push({ label: `${generation} Platinum Back`, src: genSprites['platinum'].back_default });
    }
    if (genSprites['heartgold-soulsilver']?.front_default) {
      genImages.push({ label: `${generation} HeartGold-SoulSilver Front`, src: genSprites['heartgold-soulsilver'].front_default });
    }
    if (genSprites['heartgold-soulsilver']?.back_default) {
      genImages.push({ label: `${generation} HeartGold-SoulSilver Back`, src: genSprites['heartgold-soulsilver'].back_default });
    }
    if (genSprites['black-white']?.front_default) {
      genImages.push({ label: `${generation} Black-White Front`, src: genSprites['black-white'].front_default });
    }
    if (genSprites['black-white']?.back_default) {
      genImages.push({ label: `${generation} Black-White Back`, src: genSprites['black-white'].back_default });
    }
    if (genSprites['black-2-white-2']?.front_default) {
      genImages.push({ label: `${generation} Black 2-White 2 Front`, src: genSprites['black-2-white-2'].front_default });
    }
    if (genSprites['black-2-white-2']?.back_default) {
      genImages.push({ label: `${generation} Black 2-White 2 Back`, src: genSprites['black-2-white-2'].back_default });
    }
    if (genSprites['x-y']?.front_default) {
      genImages.push({ label: `${generation} X-Y Front`, src: genSprites['x-y'].front_default });
    }
    if (genSprites['x-y']?.back_default) {
      genImages.push({ label: `${generation} X-Y Back`, src: genSprites['x-y'].back_default });
    }
    if (genSprites['omega-ruby-alpha-sapphire']?.front_default) {
      genImages.push({ label: `${generation} Omega Ruby-Alpha Sapphire Front`, src: genSprites['omega-ruby-alpha-sapphire'].front_default });
    }
    if (genSprites['omega-ruby-alpha-sapphire']?.back_default) {
      genImages.push({ label: `${generation} Omega Ruby-Alpha Sapphire Back`, src: genSprites['omega-ruby-alpha-sapphire'].back_default });
    }
    if (genSprites['sun-moon']?.front_default) {
      genImages.push({ label: `${generation} Sun-Moon Front`, src: genSprites['sun-moon'].front_default });
    }
    if (genSprites['sun-moon']?.back_default) {
      genImages.push({ label: `${generation} Sun-Moon Back`, src: genSprites['sun-moon'].back_default });
    }
    if (genSprites['ultra-sun-ultra-moon']?.front_default) {
      genImages.push({ label: `${generation} Ultra Sun-Ultra Moon Front`, src: genSprites['ultra-sun-ultra-moon'].front_default });
    }
    if (genSprites['ultra-sun-ultra-moon']?.back_default) {
      genImages.push({ label: `${generation} Ultra Sun-Ultra Moon Back`, src: genSprites['ultra-sun-ultra-moon'].back_default });
    }
    if (genSprites['lets-go-pikachu-lets-go-eevee']?.front_default) {
      genImages.push({ label: `${generation} Let's Go Pikachu-Let's Go Eevee Front`, src: genSprites['lets-go-pikachu-lets-go-eevee'].front_default });
    }
    if (genSprites['lets-go-pikachu-lets-go-eevee']?.back_default) {
      genImages.push({ label: `${generation} Let's Go Pikachu-Let's Go Eevee Back`, src: genSprites['lets-go-pikachu-lets-go-eevee'].back_default });
    }
    if (genSprites['sword-shield']?.front_default) {
      genImages.push({ label: `${generation} Sword-Shield Front`, src: genSprites['sword-shield'].front_default });
    }
    if (genSprites['sword-shield']?.back_default) {
      genImages.push({ label: `${generation} Sword-Shield Back`, src: genSprites['sword-shield'].back_default });
    }
    if (genSprites['brilliant-diamond-shining-pearl']?.front_default) {
      genImages.push({ label: `${generation} Brilliant Diamond-Shining Pearl Front`, src: genSprites['brilliant-diamond-shining-pearl'].front_default });
    }
    if (genSprites['brilliant-diamond-shining-pearl']?.back_default) {
      genImages.push({ label: `${generation} Brilliant Diamond-Shining Pearl Back`, src: genSprites['brilliant-diamond-shining-pearl'].back_default });
    }
    if (genSprites['legends-arceus']?.front_default) {
      genImages.push({ label: `${generation} Legends Arceus Front`, src: genSprites['legends-arceus'].front_default });
    }
    if (genSprites['legends-arceus']?.back_default) {
      genImages.push({ label: `${generation} Legends Arceus Back`, src: genSprites['legends-arceus'].back_default });
    }
    return genImages;
  }).filter(sprite => sprite.src); // Only keep sprites that have valid URLs

  return (
    <div className="container mx-auto p-4 flex justify-center items-center relative">
      {/* Back to List Button */}
      <Link href="/pokemon" className="absolute top-4 left-4 btn btn-outline">
        Back to list
      </Link>

      <div className="card lg:w-3/4 bg-base-100 shadow-xl">
        <div className="p-10">
          {/* Display main image versions at the top */}
          <figure className="w-full flex justify-center mb-8">
            <Image 
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt={`${pokemon.name} - Official Artwork`} 
              width={400} 
              height={400} 
              className="rounded-lg"
            />
          </figure>

          {/* Display other images */}
          <figure className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center mb-8">
            {spriteSets.map((sprite) =>
              sprite.src ? (
                <div key={sprite.label} className="text-center">
                  <Image 
                    src={sprite.src} 
                    alt={`${pokemon.name} - ${sprite.label}`} 
                    width={100} 
                    height={100} 
                    className="rounded-lg"
                  />
                  <p className="text-sm mt-2">{sprite.label}</p>
                </div>
              ) : null
            )}
          </figure>

          {/* Pokémon Details */}
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

            {/* Base Stats */}
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

            {/* Moves */}
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

            {/* Display generational sprites */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-center mb-4">Generational Sprites</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
                {generationSprites.map((genSprite) => (
                  <div key={genSprite.label} className="text-center">
                    <p className="text-sm font-semibold mb-2">{genSprite.label}</p>
                    <Image
                      src={genSprite.src}
                      alt={`${pokemon.name} - ${genSprite.label}`}
                      width={150}
                      height={150}
                      className="rounded-lg mx-auto mb-2"
                    />
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
