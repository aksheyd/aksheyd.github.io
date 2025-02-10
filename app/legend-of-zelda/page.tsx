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
        <div>
            <div className="mx-auto max-w-2xl text-center">
                <div id="unity-container" />
                <p>
                    Controls:
                </p>
                <p>
                    ARROW KEYS / WASD: Move
                </p>
                <p>
                    SPACE: Change Weapon (if available)
                </p>
                <p>
                    X: Primary Attack

                </p>
                <p>

                    Z: Secondary Attack
                </p>
            </div>
        </div>
    );
};
