"use client";

import { useEffect } from 'react';

export default function Unity2() {
    useEffect(() => {
        const iframe = document.createElement('iframe');
        iframe.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/unity2/index.html`;
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.style.margin = 'auto'; 

        document.getElementById('unity-container')?.appendChild(iframe);
    }, []);

    return (
        <div className="flex h-screen">
            {/* Game Description */}
            <div className="w-1/4 p-6 bg-gray-200 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-4">Destroy The Wormhole</h1>
                <h3 className="text-xl font-med mb-4">Authors: Akshey Deokule</h3>
                <p className="text-lg mb-4">
                    Given two weeks, I was tasked with creating a game with a novel concept. 
                </p>
  
                <p className="text-lg mb-4">
                    Destroy The Wormhole is an endless space flight game where players must close wormholes, avoid obstacles, and use their cloning skills to get through it all.
                    The game was developed in Unity and C#.
                </p>

            </div>
            {/* Game Section */}
            <div id="unity-container" className="flex-3 w-3/5 flex" style={{ minHeight: '900px' }} />

            {/* Instructions Section */}
            <div className="w-1/6 p-6 bg-gray-200 overflow-y-auto">

                {/* Instructions */}
                <h3 className="text-xl font-bold mb-4">Controls:</h3>
                <ul className="space-y-2 text-lg">
                    <li>WASD: Move</li>
                    <li>Q: Swap between clone and player</li>
                    <li>R: Spawn / Despawn clone</li>
                </ul>

                <h3 className="my-5 text-xl font-bold mb-4">Special:</h3>
                <ul className="space-y-2 text-lg">
                    <li>Esc: Pause</li>
                    <li>P: Skip Tutorial</li>
                </ul>
            </div>
        </div>
    );
};
