"use client";
import React, { useState } from "react";
import { Mythcarver, Stormbreaker, Staff, Bow, Crossbow, Whisper, Fireball, IceShard, Spell } from "@/library/gameItems";
import Image from "next/image";

const WeaponDemo = () => {
  const [log, setLog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flash, setFlash] = useState(false);

  const rollD20 = () => Math.floor(Math.random() * 20) + 1; // Roll a 20-sided die
  const rollDamage = (damage) => Math.floor(Math.random() * damage) + 1; // Roll for damage based on weapon

  const handleAttack = (weapon) => {
    const roll = rollD20();
    let result;

    if (roll >= 10) { // Success threshold
      const damage = rollDamage(weapon.damage);
      result = weapon instanceof Spell
        ? `${weapon.name} succeeded! ${weapon.cast()} with ${damage} damage.`
        : `${weapon.name} hit! ${weapon.attack()} for ${damage} damage.`;
    } else {
      result = `${weapon.name} missed with a roll of ${roll}.`;
    }

    // Add flash effect on new log entry
    setFlash(true);
    setTimeout(() => setFlash(false), 300); // Reset flash after 300ms
    setLog((prevLog) => [...prevLog, result]);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleReset = () => setLog([]);

  // Instantiate weapon and spell objects
  const items = [
    new Mythcarver(),
    new Stormbreaker(),
    new Staff(),
    new Bow(),
    new Crossbow(),
    new Whisper(),
    new Fireball(),
    new IceShard(),
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-blue-200 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Weapon Demo</h1>

      {/* How this page works button */}
      <button className="btn btn-info mb-4 shadow-md hover:shadow-lg" onClick={toggleModal}>
        How this page works
      </button>

      {/* Reset Button */}
      <button className="btn btn-warning mb-6 shadow-md hover:shadow-lg" onClick={handleReset}>
        Reset Log
      </button>

      {/* Action Log */}
      <div className={`card w-full max-w-md bg-gray-100 shadow-inner rounded-lg p-4 mb-6 ${flash ? "animate-flash" : ""}`}>
        <h2 className="text-lg font-semibold mb-2 text-center">Action Log</h2>
        <ul className="list-disc list-inside space-y-1">
          {log.map((entry, index) => (
            <li key={index} className="text-gray-800">{entry}</li>
          ))}
        </ul>
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={toggleModal}>
              ✕
            </button>
            <h3 className="font-bold text-lg">Understanding the Weapon Demo</h3>
            <p className="py-4">
              This demo showcases <strong>Object-Oriented Programming (OOP)</strong> concepts:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li><strong>Inheritance:</strong> Each weapon inherits properties and methods from base classes like <code>GameItem</code> and <code>Weapon</code>.</li>
              <li><strong>Polymorphism:</strong> Each weapon and spell has a unique <code>attack</code> or <code>cast</code> method.</li>
              <li><strong>Encapsulation:</strong> Data like <code>name</code>, <code>description</code>, <code>damage</code>, and <code>manaCost</code> are encapsulated within each class.</li>
            </ul>
            <p>Click the weapon buttons to see different actions and attack messages for each type.</p>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-6">
        {items.map((item) => (
          <div key={item.name} className="card bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={150}
              height={150}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
            <h2 className="card-title text-2xl font-semibold text-center mb-2">{item.name}</h2>
            <p className="text-gray-700 text-center mb-4">{item.description}</p>
            <button
              className="btn btn-primary w-full mt-2 shadow-md hover:shadow-lg"
              onClick={() => handleAttack(item)}
            >
              {item instanceof Spell ? "Cast Spell" : "Attack"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponDemo;
