"use client";

import API from "./api/page";
import Contact from "./contact/contact";
import Intro from "./intro/intro";
import Nav from "./nav/nav";
import Work from "./work/work";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

export default function Page() {
    // console.log("gello");
    // useGSAP(() => {
    //     Observer.create({
    //         target: window,
    //         type: "wheel,touch,scroll,pointer",
    //         ignore: '.ignore-me',
    //         onPress: () => console.log('press') 
    //     });
    // });

    
    // const containerRef = useRef<HTMLDivElement>(null);
    
    // // TODO: Observer?
    // useGSAP(() => {
    //     let sections = containerRef.current?.querySelectorAll(".berho");
    //     console.log("sections:", sections);
    //     let currentIndex = 0;
    //     let animating = false;

    //     function gotoSection(index: number, direction: number) {
    //         animating = true;
    //         if (!sections) return;
    //         index = gsap.utils.wrap(0, sections.length, index);

    //         let tl = gsap.timeline({
    //             defaults: { duration: 1, ease: "power1.inOut" },
    //             onComplete: () => { animating = false; },
    //         });

    //         tl.fromTo(sections[index],
    //             { yPercent: 50 },
    //             { yPercent: 0 },
    //             1
    //         ).timeScale(0.8);

    //         currentIndex = index;
    //     }

    //     animating = false;

    //     Observer.create({
    //         target: containerRef.current,
    //         type: "wheel,touch",
    //         tolerance: 10,
    //         preventDefault: true,
    //         onUp: () => gotoSection(currentIndex - 1, -1),
    //         onDown: () => gotoSection(currentIndex + 1, 1),
    //     });

    // }, { scope: containerRef });

    return (
        // add Tailwind?
        <div className="window">
            <section className="berho">
                <Nav />
            </section>

            <section className="berho">
                <Intro />
            </section>

            <section className="berho">
                <Work/>
            </section>

    
            <section className="berho">
                <Contact/>
            </section>          

            <section className="berho">
                <API/>
            </section>
        </div>
    )
}





