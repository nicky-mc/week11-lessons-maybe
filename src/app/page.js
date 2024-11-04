// app/page.js

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <Image
          className="rounded-full border-4 border-white shadow-lg"
          src="/web.jpg"
          alt="Circular Image"
          width={180}
          height={180}
          priority
        />
        <div className="mt-8 w-full max-w-2xl">
          {/* useReducer Accordion */}
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Complex state with useReducer
            </div>
            <div className="collapse-content">
              <p>
                <strong>useReducer</strong> is a React hook that helps you manage
                more complex state logic in your application. Unlike useState, which
                is more suited for simple state updates, useReducer allows you to handle
                state transitions based on an action and a reducer function, making it
                ideal for scenarios where state has multiple sub-values or needs specific
                logic for transitions.
              </p>
              <p>
                A reducer function takes the current state and an action as arguments
                and returns a new state. This hook is particularly useful for form data,
                complex component interactions, and scenarios where actions and state
                updates are interdependent. In essence, it is inspired by Redux but is
                built into React, making it a lightweight option for managing complex
                local component state.
              </p>
            </div>
          </div>

          {/* OOP Accordion */}
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Classes and Inheritance (OOP)
            </div>
            <div className="collapse-content">
              <p>
                <strong>Object-Oriented Programming (OOP)</strong> is a paradigm that
                organizes code by grouping related data and behaviors into &quot;objects.&quot; Each
                object can represent a real-world entity, with properties (data) and
                methods (functions) to operate on that data. This organization allows for
                code that is reusable, extensible, and easy to maintain.
              </p>
              <p>
                Inheritance, a key concept in OOP, allows one class (called a child or
                subclass) to inherit properties and methods from another class (called a
                parent or superclass). This helps reduce code duplication by allowing
                shared functionality to be defined once in the parent class. JavaScript
                supports OOP principles and is well-suited for building complex
                applications, allowing developers to use classes to structure code in a
                clear, modular way.
              </p>
            </div>
          </div>

          {/* React Context Accordion */}
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Context: Avoiding Prop Drilling
            </div>
            <div className="collapse-content">
              <p>
                As your application grows, passing data through components as props can
                lead to a practice known as <strong>&quot;prop drilling&quot;</strong> – where data is
                passed through several components, even if only a deeply nested component
                needs it. This can make code harder to maintain and understand.
              </p>
              <p>
                <strong>React Context</strong> provides a solution by allowing you to share
                data and functions across the component tree without the need for prop
                drilling. You can create a context to store values (like theme settings,
                user info, or configurations) and provide those values to any component
                in your application that needs them, without having to pass them explicitly
                through each layer of components.
              </p>
              <p>
                While Context can seem magical, it’s essentially a centralized way of
                managing and distributing data across your app. Learning to use Context
                effectively will help simplify your component structure, organize
                functionality in one place, and make your codebase easier to maintain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}