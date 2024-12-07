"use client";

import Divider from '../extras/divider';
import projects from './projects';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

// Extend the ScrollTrigger type to include projectSectionIndex
// declare global {
//     namespace globalThis {
//         interface ScrollTrigger {
//             projectSectionIndex?: number;
//         }
//     }
// }
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
    useGSAP(() => {
        // let sectionSTs: globalThis.ScrollTrigger[] = [];
        // let allTLs: gsap.core.Timeline[] = [];
        // let masterTL = gsap.timeline();

        projects.forEach((_, i) => {
            const triggerElement = `.project-section-${i}`;
            // const textElement = `${triggerElement} .project-text`;
            const imageElements = `${triggerElement} .project-image`;

            let tl = gsap.timeline();

            tl.fromTo(
                imageElements,
                {
                    opacity: 0.5,
                    x: 0,
                    y: 0,
                    rotateX: 90,        
                    rotateY: 90,        
                    rotateZ: 90,       
                },
                {
                    opacity: 1,         
                    x: 0,
                    y: 0,
                    rotateX: 0,          
                    rotateY: 0,         
                    rotateZ: 0,          
                    stagger: 0.2,        
                    duration: 0.5,         
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    }
                },
            );

            // let sectionST = ScrollTrigger.create({
            //     trigger: triggerElement,
            //     start: "top top",
            //     end: "bottom top",
            //     scrub: 1,
            //     pin: true,
            //     anticipatePin: 1,
            //     onEnter: () => scrollObserver.enable(),
            //     onEnterBack: () => scrollObserver.enable(),
            //     onLeave: () => scrollObserver.disable(),
            //     onLeaveBack: () => scrollObserver.disable(),
            // });
            // sectionST.projectSectionIndex = i;

            // sectionSTs.push(sectionST);
            // allTLs.push(tl);
            // masterTL.add(tl, i);
        });


        // let scrollObserver = Observer.create({
        //     type: "wheel,touch",
        //     wheelSpeed: -1,
        //     debounce: false,
        //     dragMinimum: 2,
        //     preventDefault: true,
        //     onUp: () => {
        //         const currentSectionIndex = getCurrentActiveSectionIndex();
        //         if (currentSectionIndex !== null && currentSectionIndex !== undefined) {
        //             let currSection = sectionSTs[currentSectionIndex];
        //             currSection.scroll(currSection.end);
        //             allTLs[currentSectionIndex].eventCallback("onComplete", () => {
        //                 scrollObserver.disable();
        //             });
        //         }
        //       },
        //       onDown: () => {
        //         const currentSectionIndex = getCurrentActiveSectionIndex();
        //         if (currentSectionIndex !== null && currentSectionIndex !== undefined) {
        //             let currSection = sectionSTs[currentSectionIndex];
        //             currSection.scroll(currSection.start);
        //             allTLs[currentSectionIndex].eventCallback("onReverseComplete", () => {
        //                 scrollObserver.disable();
        //             });
        //         }
        //       },
        //     onEnable(self) {
        //         // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
        //         let savedScroll = self.scrollY();
        //         (self as any)._restoreScroll = (e: Event) => self.scrollY(savedScroll)
        //         document.addEventListener("scroll", (self as any)._restoreScroll, { passive: false });
        //     },
        //     onDisable(self) {
        //         document.removeEventListener("scroll", (self as any)._restoreScroll);
        //     }
        // });
        // scrollObserver.disable();

        // function getCurrentActiveSectionIndex() {
        //     const activeSection = sectionSTs.find(st => st.isActive);
            
        //     return activeSection ? activeSection.projectSectionIndex : null;
        // }
          
    }, []);

    return (
        <div id="Work" className="min-h-screen p-6 bg-white">
            <Divider />
            <h1 className="text-5xl font-thin tracking-wide">Projects</h1>
            <Divider />
            {projects.map((item, i) => (
                <div
                    key={item.name}
                    className={`relative min-h-screen grid grid-cols-6 grid-rows-auto items-center justify-center gap-4 project-section-${i}`}
                >
                    {/* Text Section */}
                    <div className="project-text col-start-1 col-span-2 p-6 flex flex-col font-extralight text-lg tracking-wide">
                        <h2 className="text-3xl font-normal animate-pulse">{item.name}</h2>
                        <p className="p-3">{item.bio}</p>
                        <p className="p-3">{item.desc}</p>
                        <a className="p-3 underline font-normal" target="_blank" href={item.link}>Learn More</a>
                    </div>

                    <div className="relative col-start-3 col-span-6 flex flex-wrap justify-center items-center">
                        {item.images.map((image, i) => (
                            <div key={i} className="project-image p-6 flex justify-center items-center">
                                <img
                                    key={i}
                                    alt=""
                                    src={image}
                                    className="max-h-28 w-auto object-contain hover:scale-110 transition duration-700 ease-in-out"
                                />
                            </div>
                        ))}

                    </div>

                </div>
            ))}
        </div>
    );
}