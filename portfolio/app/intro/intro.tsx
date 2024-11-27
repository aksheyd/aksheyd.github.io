"use client";

import React, { useEffect } from 'react';
import Animate from '../text/textAnimation';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from "gsap/Observer";

gsap.registerPlugin(useGSAP, Observer);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  let hasRun = false;

  function dynamicIntro() {
    if (!hasRun) {
      // set first slide to left hand most side
      gsap.fromTo(".section:nth-of-type(1)",
        { xPercent: 75 },
        { xPercent: 0 }).timeScale(0.4);
      gsap.set(".section:nth-of-type(2)", 
        {xPercent: 0, yPercent: 0}
      );
    }
    hasRun = true;

  }

  useGSAP(() => {
    dynamicIntro();
    let sections = containerRef.current?.querySelectorAll(".section");
    let currentIndex = 0;
    let animating = false;

    function gotoSection(index: number, direction: number) {
      animating = true;
      if (!sections) return;
      index = gsap.utils.wrap(0, sections.length, index);

      let tl = gsap.timeline({
        defaults: { duration: 1, ease: "power1.inOut" },
        onComplete: () => { animating = false; },
      });

      gsap.set([sections], {
        zIndex: 0, autoAlpha: 0
      });
      gsap.set([sections[currentIndex]],
        { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index]],
        { zIndex: 2, autoAlpha: 1 });

      tl.fromTo(sections[index],
        { xPercent: 100 },
        { xPercent: 0 },
        1
      ).timeScale(0.8);

      currentIndex = index;
    }

    animating = false;

    Observer.create({
      target: containerRef.current,
      type: "wheel,touch",
      tolerance: 10,
      preventDefault: true,
      onUp: () => gotoSection(currentIndex - 1, -1),
      onDown: () => gotoSection(currentIndex + 1, 1),
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div id="Intro" className="section relative min-h-screen w-[200vw] bg-white snap-center">
        <div className="flex select-none items-center justify-left w-[100vw] min-h-screen bg-white">
          <div className="text-center">
            <h1 className="text-9xl font-bold tracking-tight text-left">
              <Animate text="Akshey" delay={200} />
            </h1>
            <h1 className="text-9xl font-bold tracking-tight text-left mt-2">
              <Animate text="Deokule" delay={150} />
            </h1>
          </div>
        </div>
      </div>

      <div className="section min-h-screen w-[100vw] bg-purple-200 flex items-center justify-center">
        <h1 className="text-9xl font-bold tracking-tight text-left">
              Woah
          </h1>
      </div>
    </div>
  );
}