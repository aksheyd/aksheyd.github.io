"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        if (sectionRef.current === null) return;
        const section = sectionRef.current as HTMLElement;

        gsap.context(() => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "top top",
                    scrub: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "circ.inOut" },
            });
            tl.fromTo(
                section.querySelectorAll(".left-text, .right-image"),
                { xPercent: (index) => (index === 0 ? -100 : 200), opacity: 0 }, // Left moves left (-100), right moves right (100)
                { xPercent: 0, opacity: 1, stagger: 0 }, // Bring both elements to center without delay
            );
        }, sectionRef);
    }, []);
    
    return (
        <div>
            <div ref={sectionRef} id="About" className="relative min-h-screen max-w-screen p-6 bg-white grid grid-cols-4 grid-rows-4">
                <div className="left-text row-start-2 row-span-2 col-start-2 col-span-1">
                    <section>
                        <h1 className="text-5xl font-thin tracking-wide">
                            About
                        </h1>
                        <div className="mt-4 text-lg font-extralight tracking-wide space-y-4">
                            <p>
                                Hi, I'm Akshey - a passionate software developer with a deep interest in AI and full-stack development.
                                I'm currently pursuing my degree at the University of Michigan and love working on my skills through various projects and exploring a wide array of technologies.
                            </p>
                            <p>
                                When I'm not coding, you can find me learning, working out, or tackling new challenges. Nice to meet you!
                            </p>
                        </div>
                    </section>
                </div>

                <div className="right-image absolute left-4 row-start-2 row-span-2 col-start-3 col-span-2">
                    <section>
                        <img src="https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" alt="vscode" className="h-64 w-64" />
                    </section>
                </div>
            </div>


        </div>
    );
}