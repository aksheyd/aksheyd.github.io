import React from 'react';

const ProvidencePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Dueler's Providence</h1>

      <p className="text-lg mb-6 text-gray-600 text-center">
        A soulslike sword combat game set in ancient Japan, focusing on mouse-based directional parrying, side dodging, and fast-paced combat.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Links</h2>
        <ul className="space-y-2">
          <li><a href="https://aksheyd.itch.io/providence" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">itch.io</a></li>
          <li><a href="https://gamejolt.com/games/duelersprovidence0101/988590" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">Game Jolt</a></li>
          <li><a href="https://www.indiedb.com/games/duelers-providence" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">IndieDB</a></li>
          <li><a href="https://forums.tigsource.com/index.php?topic=76322.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">TIGSource DevLog</a></li>
          <li><a href="https://www.youtube.com/watch?v=cIawFXmbvVA" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">Trailer (YouTube)</a></li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Summary</h2>
        <p className="text-gray-700 leading-relaxed">
          Dueler's Providence is a skill-based sword fighting game where you face progressively challenging enemies in 1v1 duels, culminating in a final boss battle. The core mechanic revolves around precise, mouse-based directional parrying and attacking. Successfully parrying requires matching the angle of incoming attacks, while your attack angles influence enemy reactions. Developed in Unity by a small student team, the game features intricate sword animations.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">My Contributions</h2>
        <p className="text-gray-700 mb-4">
          This project was created by a 5-person student team. While we collaborated on many aspects, my primary responsibilities included:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><span className="font-medium">Level Design and Creation:</span> Designing the layout and flow of the game environments.</li>
          <li><span className="font-medium">Terrain Mapping, Lighting, and Skyboxes:</span> Sculpting the game world's terrain, setting up lighting to create mood, and implementing skyboxes for atmospheric backdrops.</li>
          <li><span className="font-medium">Environment Details:</span> Adding props, foliage, and other details to enrich the game world and enhance immersion.</li>
          <li><span className="font-medium">Lore / Story:</span> Developing the narrative background and story elements for the game.</li>
          <li><span className="font-medium">Trailer:</span> Creating the promotional video to showcase the game's features and atmosphere.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProvidencePage;