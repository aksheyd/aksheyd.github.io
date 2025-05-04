"use client";

import React, { useEffect } from 'react';
import Animate from '../text/textAnimation';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './intro.css';
import Tooltip from '../test-particles/particles-tooltop';
import TestParticles from '../test-particles/test-particles';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Intro() {
  let hasRun = false;

  function dynamicIntro() {
    if (!hasRun) {
      gsap.fromTo(".dyn_intro",
        { xPercent: 125 },
        { xPercent: 0 }).timeScale(0.4);
    }
    hasRun = true;
  }

  useGSAP(() => {
    dynamicIntro();
  });

  useGSAP(() => {
    gsap.utils.toArray<Element>('.comparisonSection')
      .forEach((section: Element) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: () => "+=" + (section as HTMLElement).offsetWidth,
            scrub: true,
            pin: true,
            anticipatePin: 1
          },
          defaults: { ease: "none" }
        });
        tl.fromTo(section.querySelector('.after'), { xPercent: 100, x: 0 }, { xPercent: 0 })
          .fromTo(section.querySelector('.after section'), { xPercent: -100, x: 0 }, { xPercent: 0 }, 0);
      });
  });

  return (
    <div>
      <section id="#Intro" className="comparisonSection z-10 relative min-h-screen w-screen">
        <TestParticles />
        <div className="dyn_intro flex select-none items-center justify-left w-screen min-h-screen">
          <div className="comparison text-center">
            <div className="z-50 text-9xl font-bold tracking-tight text-left">
              <h1 className="">
                <Animate text="Akshey" delay={200} />
              </h1>
              <h1 className="mt-2">
                <Animate text="Deokule" delay={150} />
              </h1>
            </div>
          </div>
        </div>

        <Tooltip />



        <div className="after">
          <section>
            <div className="flex select-none items-center justify-left w-screen min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
              <div className="text-center">
                <h1 className="text-9xl font-bold tracking-tight text-left">
                  Software
                </h1>
                <h1 className="text-9xl font-bold tracking-tight text-left mt-2">
                  Engineer
                </h1>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}