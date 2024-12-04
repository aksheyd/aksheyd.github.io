"use client";

import Divider from '../extras/divider';
import projects from './projects';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
    // useGSAP(() => {
    //     projects.forEach((_, i) => {
    //         const triggerElement = `.project-section-${i}`;
    //         const textElement = `${triggerElement} .project-text`;
    //         const imageElement = `${triggerElement} .project-image`;

    //         gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: textElement,
    //                 start: "top bottom", // Start when the top of the section hits the bottom of the viewport
    //                 end: "bottom top", // End when the bottom of the section hits the top of the viewport
    //                 scrub: 1, // Smooth scrubbing effect
    //                 pin: imageElement, // Pin the image
    //                 anticipatePin: 1,
    //             },
    //         });
    //     });
    // }, []);

    return (
        <div id="Work" className="min-h-screen p-6 bg-white">
            <Divider />
            <h1 className="text-5xl font-thin tracking-wide">Projects</h1>
            <Divider />
            {projects.map((item, i) => (
                <div
                    key={item.name}
                    className={`relative min-h-screen grid grid-cols-6 gap-4 project-section-${i}`}
                >
                    {/* Text Section */}
                    <div className="project-text col-start-1 col-span-2 p-6 flex flex-col font-extralight text-lg tracking-wide">
                        <h2 className="text-3xl font-normal">{item.name}</h2>
                        <p className="p-3">{item.bio}</p>
                        <p className="p-3">{item.desc}</p>
                        <a className="p-3 underline font-normal" href={item.link}>Learn More</a>
                    </div>
                    {/* Image Section */}
                    <div className="project-image col-start-3 col-span-6">
                        <img
                            alt=""
                            src="https://aksheyd.github.io/images.jpeg"
                            className="w-full max-w-none rounded-xl bg-white shadow-xl ring-1 ring-gray-400/10"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}