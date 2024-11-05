"use client";
import React, { useState, useEffect } from "react";

const PathfinderPCGenerator = () => {
  const [characters, setCharacters] = useState([]);
  const [form, setForm] = useState({
    name: "",
    class: "",
    level: 1,
    race: "",
    alignment: "",
    stats: { strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 },
    feats: [{ name: "", description: "" }],
    spells: [{ name: "", level: 1, description: "" }],
  });
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const res = await fetch("/api/characters");
    const data = await res.json();
    setCharacters(data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleStatChange = (e) => setForm((prev) => ({
    ...prev,
    stats: { ...prev.stats, [e.target.name]: parseInt(e.target.value) },
  }));

  const handleFeatChange = (index, field, value) => {
    const updatedFeats = [...form.feats];
    updatedFeats[index][field] = value;
    setForm({ ...form, feats: updatedFeats });
  };

  const handleSpellChange = (index, field, value) => {
    const updatedSpells = [...form.spells];
    updatedSpells[index][field] = value;
    setForm({ ...form, spells: updatedSpells });
  };

  const addFeat = () => setForm({ ...form, feats: [...form.feats, { name: "", description: "" }] });
  const addSpell = () => setForm({ ...form, spells: [...form.spells, { name: "", level: 1, description: "" }] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const characterData = {
      ...form,
      feats: form.feats.filter((feat) => feat.name.trim()),
      spells: form.spells.filter((spell) => spell.name.trim()),
    };

    const url = selectedCharacter ? `/api/characters?id=${selectedCharacter.id}` : "/api/characters";
    const method = selectedCharacter ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(characterData),
    });
    if (res.ok) {
      fetchCharacters();
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      class: "",
      level: 1,
      race: "",
      alignment: "",
      stats: { strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 },
      feats: [{ name: "", description: "" }],
      spells: [{ name: "", level: 1, description: "" }],
    });
    setSelectedCharacter(null);
  };

  const handleEdit = (character) => {
    setForm(character);
    setSelectedCharacter(character);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/characters?id=${id}`, { method: "DELETE" });
    fetchCharacters();
  };

  return (
    <div className="min-h-screen p-8 bg-parchment bg-cover font-fantasy text-darkBrown">
      <h1 className="text-5xl font-bold text-center text-burntRed mb-8">Pathfinder PC Generator</h1>

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Basic Information Card */}
        <div className="card bg-white/90 p-6 rounded-lg shadow-md border-2 border-deepGold">
          <h2 className="text-2xl font-semibold text-center text-darkBrown mb-4">Basic Information</h2>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Class</label>
            <input type="text" name="class" value={form.class} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level</label>
            <input type="number" name="level" value={form.level} onChange={handleChange} min="1" max="20" className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Race</label>
            <input type="text" name="race" value={form.race} onChange={handleChange} className="input input-bordered w-full" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Alignment</label>
            <input type="text" name="alignment" value={form.alignment} onChange={handleChange} className="input input-bordered w-full" />
          </div>
        </div>

        {/* Stats Allocation Card */}
        <div className="card bg-white/90 p-6 rounded-lg shadow-md border-2 border-deepGold">
          <h2 className="text-2xl font-semibold text-center text-darkBrown mb-4">Point Allocation</h2>
          {Object.keys(form.stats).map((stat) => (
            <div key={stat} className="mb-2">
              <label className="block mb-1 font-medium">{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
              <input
                type="number"
                name={stat}
                value={form.stats[stat]}
                onChange={handleStatChange}
                min="8"
                max="15"
                className="input input-bordered w-full"
              />
            </div>
          ))}
        </div>

        {/* Feats Card */}
        <div className="card bg-white/90 p-6 rounded-lg shadow-md border-2 border-deepGold">
          <h2 className="text-2xl font-semibold text-center text-darkBrown mb-4">Feats</h2>
          {form.feats.map((feat, index) => (
            <div key={index} className="mb-2">
              <input type="text" placeholder="Feat Name" value={feat.name} onChange={(e) => handleFeatChange(index, "name", e.target.value)} className="input input-bordered w-full mb-1" />
              <textarea placeholder="Feat Description" value={feat.description} onChange={(e) => handleFeatChange(index, "description", e.target.value)} className="textarea textarea-bordered w-full" />
            </div>
          ))}
          <button type="button" onClick={addFeat} className="btn btn-accent w-full mt-2">Add Feat</button>
        </div>

        {/* Spells Card */}
        <div className="card bg-white/90 p-6 rounded-lg shadow-md border-2 border-deepGold">
          <h2 className="text-2xl font-semibold text-center text-darkBrown mb-4">Spells</h2>
          {form.spells.map((spell, index) => (
            <div key={index} className="mb-2">
              <input type="text" placeholder="Spell Name" value={spell.name} onChange={(e) => handleSpellChange(index, "name", e.target.value)} className="input input-bordered w-full mb-1" />
              <input type="number" placeholder="Spell Level" value={spell.level} onChange={(e) => handleSpellChange(index, "level", e.target.value)} className="input input-bordered w-full mb-1" />
              <textarea placeholder="Spell Description" value={spell.description} onChange={(e) => handleSpellChange(index, "description", e.target.value)} className="textarea textarea-bordered w-full" />
            </div>
          ))}
          <button type="button" onClick={addSpell} className="btn btn-secondary w-full mt-2">Add Spell</button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="btn btn-primary px-8 py-2">
            {selectedCharacter ? "Update Character" : "Create Character"}
          </button>
        </div>
      </form>

      <h2 className="text-3xl font-semibold text-center text-burntRed mt-10">Character List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {characters.map((char) => (
          <div key={char.id} className="card bg-white/90 shadow-lg rounded-lg p-6 border border-deepGold relative">
            <h3 className="text-2xl font-semibold mb-2 text-darkBrown">{char.name}</h3>
            <p>Class: {char.class}</p>
            <p>Level: {char.level}</p>
            <p>Race: {char.race}</p>
            <p>Alignment: {char.alignment}</p>

            <h4 className="font-bold mt-4 text-burntRed">Stats:</h4>
            <ul>
              {char.stats ? (
                Object.entries(char.stats).map(([stat, value]) => (
                  <li key={stat}>{`${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${value}`}</li>
                ))
              ) : (
                <li>Stats not available</li>
              )}
            </ul>

            <h4 className="font-bold mt-4 text-burntRed">Feats:</h4>
            <ul>
              {char.feats && char.feats.length > 0 ? (
                char.feats.map((feat) => (
                  <li key={feat.id}>{feat.name}: {feat.description}</li>
                ))
              ) : (
                <li>No feats available</li>
              )}
            </ul>

            <h4 className="font-bold mt-4 text-burntRed">Spells:</h4>
            <ul>
              {Array.isArray(char.spells) && char.spells.length > 0 ? (
                char.spells.map((spell) => (
                  <li key={spell.id}>{spell.name} (Level {spell.level}): {spell.description}</li>
                ))
              ) : (
                <li>No spells available</li>
              )}
            </ul>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleEdit(char)} className="btn btn-accent">Edit</button>
              <button onClick={() => handleDelete(char.id)} className="btn btn-error">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathfinderPCGenerator;