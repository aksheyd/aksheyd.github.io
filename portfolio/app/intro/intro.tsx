"use client";

import React, { useEffect } from 'react';
import Animate from '../text/textAnimation';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger} from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Intro() {
  let hasRun = false;
  const container = useRef(null);

  function dynamicIntro() {
    if (!hasRun) {
      // set first slide to left hand most side
      gsap.fromTo(".dyn_intro",
        { xPercent: 75 },
        { xPercent: 0 }).timeScale(0.4);
    }
    hasRun = true;
  }

  useGSAP(() => {
    dynamicIntro();

    const sections = gsap.utils.toArray<Element>('.section');

    sections.forEach((section: Element) =>
      gsap.to(section, {
        zIndex: 1,
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom',
          end: 'top 20%',
          scrub: true,
        }
      })
    );
  }, {scope: container});

  return (
    <div ref={container}>
      <div id="Intro" className="dyn_intro relative min-h-screen w-[200vw] bg-white snap-center">
        <div className="flex select-none items-center justify-left w-[100vw] min-h-screen bg-white">
          <div className="text-center">
            <h1 className="text-9xl font-bold tracking-tight text-left">
              <Animate text="Akshey" delay={200} />
            </h1>
            <h1 className="text-9xl font-bold tracking-tight text-left mt-2">
              <Animate text="Deokule" delay={150} />
            </h1>
          </div>

          {/* <div>
            Woah
          </div> */}

        </div>
      </div>
    </div>
  );
}