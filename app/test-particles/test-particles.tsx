"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

export default function TestParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);


    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: { enable: false, zIndex: -5 },
            background: {
                color: {
                    value: "transparent", // Transparent background
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push", // Adds particles on click
                    },
                    onHover: {
                        enable: true,
                        mode: "grab", // Interactive connections on hover
                    },
                },
                modes: {
                    grab: {
                        distance: 300, // Distance for grabbing effect
                        links: {
                            opacity: 0.4, 
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: "#000000",
                },
                links: {
                    color: "#000000",
                    distance: 500, // Maximum distance for connecting particles
                    enable: true,
                    opacity: 0.05,
                    width: 1.5, // Thicker connecting lines
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.destroy,
                    },
                    random: true, 
                    speed: 1.5, 
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800, 
                    },
                    value: 140,
                },
                opacity: {
                    value: 1,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: 1,
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                // particlesLoaded={particlesLoaded}
                options={options}
                className="absolute h-screen w-screen -z-10"
            />
        );
    }

    return <></>;
};