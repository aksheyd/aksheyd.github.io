"use client";

import { useEffect } from 'react';

export default function Unity() {
    useEffect(() => {
        const iframe = document.createElement('iframe');
        iframe.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/unity/index.html`;
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';

        document.getElementById('unity-container')?.appendChild(iframe);
    }, []);

    return (
        <div className="flex h-screen">
            {/* Game Description */}
            {/* Description */}
            <div className="w-1/4 p-6 bg-gray-200 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4">Legend of Zelda</h1>

        
            
            <h3 className="text-xl font-med mb-4">Authors: Akshey Deokule, Nathaniel Luyben</h3>
                <p className="text-lg mb-4">
                This is a dungeon inspired by the first dungeon in the original Legend of Zelda. It is built using Unity, C#, and Photoshop.
                </p>
                <p className="text-lg mb-4">
                    I developed most of the player movement, weapons, health system, combat mechanics, animations/visuals, weapons, and half the enemies. Nate mostly focused on the map including navigation and construction as well as the collectible system, cheats, audio, and the other half the enemies. That all being said, it was a team effort and we worked together on most tasks to bring the game together!
                    </p>
    
          </div>
      {/* Game Section */}
      <div id="unity-container" className="flex-3 bg-gray-100 w-2/4 h-full" />

      {/* Instructions Section */}
      <div className="w-1/4 p-6 bg-gray-200 overflow-y-auto">

        {/* Instructions */}
      <h3 className="text-xl font-bold mb-4">Controls:</h3>
        <ul className="space-y-2 text-lg">
          <li>ARROW KEYS / WASD: Move</li>
          <li>SPACE: Change Weapon (if available)</li>
          <li>X: Primary Attack</li>
          <li>Z: Secondary Attack</li>
        </ul>
        
        <h3 className="my-5 text-xl font-bold mb-4">Special:</h3>
        <ul className="space-y-2 text-lg">
          <li>1: God Mode</li>
          <li>4: Secret Room</li>
        </ul>
      </div>
    </div>
    );
};
