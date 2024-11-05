"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import SearchBar from "@/components/SearchBar";

const CONCURRENT_REQUESTS = 450;
const RETRY_LIMIT = 3;

async function fetchPokemonDataByGeneration(generation) {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.pokemon_species.map((species) => species.name);
}

async function fetchPokemonDetails(pokemonNames) {
  const pokemonDetails = [];

  for (let i = 0; i < pokemonNames.length; i += CONCURRENT_REQUESTS) {
    const chunk = pokemonNames.slice(i, i + CONCURRENT_REQUESTS);
    const chunkDetails = await Promise.all(
      chunk.map(async (name) => {
        let attempts = 0;
        while (attempts < RETRY_LIMIT) {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!res.ok) throw new Error(`Failed to fetch details for ${name}: ${res.statusText}`);
            return await res.json();
          } catch (error) {
            attempts++;
            if (attempts >= RETRY_LIMIT) return null;
          }
        }
      })
    );
    pokemonDetails.push(...chunkDetails.filter((data) => data !== null));
  }

  return pokemonDetails;
}

export default function PokemonFetch() {
  const [pokePosts, setPokePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const pokemonNames = await fetchPokemonDataByGeneration(generation);
        const pokemonDetails = await fetchPokemonDetails(pokemonNames);
        setPokePosts(pokemonDetails);
        setFilteredPosts(pokemonDetails);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [generation]);

  const handleGenerationChange = (gen) => setGeneration(gen);
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredPosts(pokePosts.filter((post) =>
      post.name.toLowerCase().includes(query.toLowerCase())
    ));
  };

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Pokémon Explorer</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-4">Who do you choose?</h1>
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            onClick={() => handleGenerationChange(gen)}
            className={`btn ${generation === gen ? "btn-active" : "btn-outline"}`}
          >
            Generation {gen}
          </button>
        ))}
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/pokemon/${post.id}`}>
            <div className="card shadow-lg hover:shadow-xl transition duration-200">
              <div className="card-body">
                <h2 className="card-title">{post.name}</h2>
                <p>Type: {post.types.map((typeInfo) => typeInfo.type.name).join(", ")}</p>
                <img 
                  src={post.sprites.other.dream_world.front_default || post.sprites.other['official-artwork'].front_default} 
                  alt={post.name} 
                  className="w-24 h-24 mx-auto" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loading && <div className="text-center mt-4">Loading...</div>}
    </div>
  );
}