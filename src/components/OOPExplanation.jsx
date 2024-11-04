'use client';

import React from 'react';
import Image from 'next/image';

const OOPExplanation = () => {
  // Function to play a sound based on the audio file path provided
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <div className="p-8 bg-base-200 rounded-lg shadow-lg">
      {/* Main heading */}
      <h1 className="text-4xl font-bold mb-6 text-primary">Object-Oriented Programming (OOP) Concepts in Web Development</h1>

      {/* Introductory alert */}
      <div className="alert alert-info shadow-lg mb-8">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
          <span className='text-md'>Explore the key concepts of Object-Oriented Programming (OOP) with examples and applications in web development!</span>
        </div>
      </div>

      {/* Section for Classes - Custom Layout with bg-primary */}
      <div className="card bg-primary text-primary-content shadow-xl mb-6 flex flex-col lg:flex-row">
        <Image
          src="/images/blueprint.png"
          alt="Abstract blueprint representation of classes"
          width={300}
          height={300}
          className="rounded-lg lg:w-1/2 cursor-pointer"
          onClick={() => playSound('/audio/571513__legitcheese__soft-notifications-bell-ding-dong.mp3')}
        />
        <div className="card-body lg:w-1/2">
          <h2
            className="card-title text-2xl font-semibold cursor-pointer"
            onClick={() => playSound('/audio/571513__legitcheese__soft-notifications-bell-ding-dong.mp3')}
          >
            Classes
          </h2>
          <p>
            A <strong>Class</strong> is a blueprint for creating objects with specific properties and methods. In OOP, classes define the structure and behavior of an object, encapsulating related properties and functions. Classes help organize code into logical units, making it more reusable and maintainable.
          </p>
          <p className="mt-2">
            <strong>Usage in Web Development:</strong> In JavaScript, classes are commonly used to structure data and behavior in applications. For example, a class representing a `User` object might contain properties like `username`, `email`, and methods for tasks like `login()` and `logout()`. This structure simplifies managing complex entities in front-end applications, such as user data, forms, or shopping carts.
          </p>
        </div>
      </div>

      {/* Section for Inheritance - Custom Layout with bg-secondary */}
      <div className="card bg-secondary text-secondary-content shadow-xl mb-6 flex flex-col lg:flex-row">
        <Image
          src="/images/hierarchy.png"
          alt="Hierarchical structure representing inheritance"
          width={300}
          height={300}
          className="rounded-lg lg:w-1/2 cursor-pointer"
          onClick={() => playSound('/audio/170585__setuniman__orchestral-drama-0w39m.mp3')}
        />
        <div className="card-body lg:w-1/2">
          <h2
            className="card-title text-2xl font-semibold cursor-pointer"
            onClick={() => playSound('/audio/170585__setuniman__orchestral-drama-0w39m.mp3')}
          >
            Inheritance
          </h2>
          <p>
            <strong>Inheritance</strong> is a principle in which one class, called a subclass or child class, inherits properties and behaviors from another class, called the parent or base class. This allows child classes to reuse code and extend or modify behaviors as needed.
          </p>
          <p className="mt-2">
            <strong>Usage in Web Development:</strong> Inheritance is especially useful in front-end frameworks like React when creating reusable UI components. For example, a `Button` base class might define common properties for buttons, and specialized buttons, like `SubmitButton` and `CancelButton`, could inherit from `Button` but modify certain behaviors or styling. In back-end code, inheritance can model hierarchies like `AdminUser` inheriting from `User` to add permissions.
          </p>
        </div>
      </div>

      {/* Section for Encapsulation - Custom Layout with bg-teal-500 */}
      <div className="card bg-teal-500 text-teal-100 shadow-xl mb-6 flex flex-col lg:flex-row">
        <Image
          src="/images/secure.png"
          alt="A secure lock symbol representing encapsulation"
          width={300}
          height={300}
          className="rounded-lg lg:w-1/2 cursor-pointer"
          onClick={() => playSound('/audio/158626__mrauralization__door-lock.wav')}
        />
        <div className="card-body lg:w-1/2">
          <h2
            className="card-title text-2xl font-semibold cursor-pointer"
            onClick={() => playSound('/audio/158626__mrauralization__door-lock.wav')}
          >
            Encapsulation
          </h2>
          <p>
            <strong>Encapsulation</strong> restricts direct access to an object’s internal state, allowing controlled access only through methods. This prevents unintended interference and maintains a clear interface between the object's inner workings and its public interactions.
          </p>
          <p className="mt-2">
            <strong>Usage in Web Development:</strong> In JavaScript, encapsulation can be achieved using closures or private properties (like `#` in ES6). For example, an encapsulated `APIService` class can handle API requests internally while exposing only specific methods like `getData()` and `postData()`. This protects sensitive data or logic from being accessed or modified from outside, improving code reliability and security.
          </p>
        </div>
      </div>

      {/* Section for Polymorphism - Custom Layout with bg-purple-600 */}
      <div className="card bg-purple-600 text-purple-100 shadow-xl flex flex-col lg:flex-row">
        <Image
          src="/images/abstract.png"
          alt="Abstract shapes representing polymorphism"
          width={300}
          height={300}
          className="rounded-lg lg:w-1/2 cursor-pointer"
          onClick={() => playSound('/audio/342336__division4884__simple-mutate-monster.mp3')}
        />
        <div className="card-body lg:w-1/2">
          <h2
            className="card-title text-2xl font-semibold cursor-pointer"
            onClick={() => playSound('/audio/342336__division4884__simple-mutate-monster.mp3')}
          >
            Polymorphism
          </h2>
          <p>
            <strong>Polymorphism</strong> allows objects to be treated as instances of their parent class while behaving differently. This enables a single interface to represent different types, letting code interact with various objects in a unified way.
          </p>
          <p className="mt-2">
            <strong>Usage in Web Development:</strong> Polymorphism is commonly used in frameworks that support event handling. For instance, a `handleClick` method in React could handle clicks on both `Button` and `Link` components if they implement a similar interface. In the back end, polymorphism enables services to handle different types of objects, such as processing payment methods (CreditCard, PayPal, etc.) with a common `pay` method, simplifying and unifying code handling.
          </p>
        </div>
      </div>
    </div>
  );
};

// Exporting the OOPExplanation component for use on the main page
export default OOPExplanation;