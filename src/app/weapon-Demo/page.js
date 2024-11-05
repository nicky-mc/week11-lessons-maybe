"use client";
import React, { useState } from 'react';
import { Sword, Staff } from '@/library/gameItems';

const WeaponDemo = () => {
  const [log, setLog] = useState([]);

  const handleAttack = (weapon) => {
    setLog((prevLog) => [...prevLog, weapon.attack()]);
  };

  const sword = new Sword();
  const staff = new Staff();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Weapon Demo</h1>

      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-6 mb-6">
        <h2 className="card-title text-xl font-semibold">{sword.name}</h2>
        <p className="text-gray-700 mb-4">{sword.description}</p>
        <button
          className="btn btn-primary w-full mb-2"
          onClick={() => handleAttack(sword)}
        >
          Attack with Sword
        </button>
      </div>

      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-6 mb-6">
        <h2 className="card-title text-xl font-semibold">{staff.name}</h2>
        <p className="text-gray-700 mb-4">{staff.description}</p>
        <button
          className="btn btn-secondary w-full"
          onClick={() => handleAttack(staff)}
        >
          Attack with Staff
        </button>
      </div>

      <div className="card w-full max-w-md bg-gray-100 shadow-inner rounded-lg p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Action Log</h2>
        <ul className="list-disc list-inside space-y-1">
          {log.map((entry, index) => (
            <li key={index} className="text-gray-800">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeaponDemo;