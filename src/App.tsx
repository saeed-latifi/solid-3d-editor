import type { Component } from "solid-js";
import ThreeScene from "./components/ThreeScene";

const App: Component = () => {
  return (
    <>
      <>
        <h1 class="absolute left-4 top-4 text-lg font-bold rounded-lg p-3 text-white bg-blue-950">
          SolidJS-Three.js Demo with Orbit and Pan
        </h1>
        <ThreeScene />
      </>
    </>
  );
};

export default App;
