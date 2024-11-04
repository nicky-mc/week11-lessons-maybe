// components/OOPExample.jsx
'use client';
import React, { useState } from 'react';

// Base Animal class which other animal classes will inherit from
class Animal {
  constructor(name) {
    this.name = name; // 'name' property is set through the constructor
  }

  // Method speak that returns a generic animal sound message
  speak() {
    return `${this.name} makes a sound.`;
  }
}

// Various animal classes extending Animal and overriding speak method
class Dog extends Animal {
  speak() {
    return `${this.name} barks!`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} meows!`;
  }
}

class Bird extends Animal {
  speak() {
    return `${this.name} chirps!`;
  }
}

class Cow extends Animal {
  speak() {
    return `${this.name} moos!`;
  }
}

class Sheep extends Animal {
  speak() {
    return `${this.name} baas!`;
  }
}

class Duck extends Animal {
  speak() {
    return `${this.name} quacks!`;
  }
}

class Horse extends Animal {
  speak() {
    return `${this.name} neighs!`;
  }
}

class Snake extends Animal {
  speak() {
    return `${this.name} hisses!`;
  }
}

class Frog extends Animal {
  speak() {
    return `${this.name} croaks!`;
  }
}

class Lion extends Animal {
  speak() {
    return `${this.name} roars!`;
  }
}

// Define the OOPExample component
const OOPExample = () => {
  const [message, setMessage] = useState(''); // State to store and display the result message

  // Function to demonstrate inheritance and polymorphism by selecting a random Animal subclass
  const demonstrateOOP = () => {
    const animals = [
      new Dog('Buddy'),
      new Cat('Whiskers'),
      new Bird('Tweety'),
      new Cow('Bessie'),
      new Sheep('Dolly'),
      new Duck('Donald'),
      new Horse('Spirit'),
      new Snake('Slither'),
      new Frog('Frodo'),
      new Lion('Simba')
    ];

    // Select a random animal from the animals array
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

    // Set the message to the speak result of the random animal
    setMessage(randomAnimal.speak());
  };

  return (
    <div className="p-8 bg-base-200 rounded-lg shadow-lg">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-6 text-primary">OOP Example: Inheritance & Polymorphism</h2>

      {/* Explanations using DaisyUI card components */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Explanation of Animal class */}
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl font-semibold">Animal Class</h3>
            <p>
              The <strong>Animal</strong> class serves as a base class with a <code>speak</code> method.
              This method is intended to be overridden by subclasses, enabling specific sounds based on the type of animal.
            </p>
          </div>
        </div>

        {/* Explanation of Inheritance and Polymorphism */}
        <div className="card bg-accent text-accent-content shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl font-semibold">Inheritance & Polymorphism</h3>
            <p>
              This example demonstrates <strong>inheritance</strong> and <strong>polymorphism</strong>:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li><strong>Inheritance</strong> allows various animal classes to reuse properties and methods from the <code>Animal</code> base class.</li>
              <li><strong>Polymorphism</strong> enables each animal subclass to implement its unique version of the <code>speak</code> method.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Instructional Alert using DaisyUI's alert component */}
      <div className="alert alert-info shadow-lg mb-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
          <span>Click the button below to see a random animal demonstrating inheritance and polymorphism!</span>
        </div>
      </div>

      {/* Button to trigger the demonstration */}
      <button className="btn btn-primary btn-wide mb-4" onClick={demonstrateOOP}>
        Run OOP Example
      </button>

      {/* Displaying the result message if available */}
      {message && (
        <div className="mt-4 p-4 bg-neutral text-neutral-content rounded-lg shadow-md">
          <p className="text-lg font-semibold">Output:</p>
          <p className="text-lg">{message}</p>
        </div>
      )}
    </div>
  );
};

// Export the OOPExample component for use in the main page
export default OOPExample;
