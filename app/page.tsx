import API from "./api/api";
import Contact from "./contact/contact";
import Intro from "./intro/intro";
import Nav from "./nav/nav";
import Work from "./work/work";

export default function Page() {
    return (
        // add Tailwind?
        <div> 
            <Nav/>
            <Intro/>
            <Work/>
            <Contact/>
            <API/>
        </div>
    )
}


// const containerRef = useRef<HTMLDivElement>(null);
// let hasRun = false;

// function dynamicIntro() {
//   if (!hasRun) {
//     // set first slide to left hand most side
//     gsap.fromTo(".section:nth-of-type(1)",
//       { xPercent: 75 },
//       { xPercent: 0 }).timeScale(0.4);
//     gsap.set(".section:nth-of-type(2)", 
//       {xPercent: 0, yPercent: 0}
//     );
//   }
//   hasRun = true;

// }
// useGSAP(() => {
//   dynamicIntro();
//   let sections = containerRef.current?.querySelectorAll(".section");
//   let currentIndex = 0;
//   let animating = false;

//   function gotoSection(index: number, direction: number) {
//     animating = true;
//     if (!sections) return;
//     index = gsap.utils.wrap(0, sections.length, index);

//     let tl = gsap.timeline({
//       defaults: { duration: 1, ease: "power1.inOut" },
//       onComplete: () => { animating = false; },
//     });

//     gsap.set([sections], {
//       zIndex: 0, autoAlpha: 0
//     });
//     gsap.set([sections[currentIndex]],
//       { zIndex: 1, autoAlpha: 1 });
//     gsap.set([sections[index]],
//       { zIndex: 2, autoAlpha: 1 });

//     tl.fromTo(sections[index],
//       { xPercent: 100 },
//       { xPercent: 0 },
//       1
//     ).timeScale(0.8);

//     currentIndex = index;
//   }

//   animating = false;

//   Observer.create({
//     target: containerRef.current,
//     type: "wheel,touch",
//     tolerance: 10,
//     preventDefault: true,
//     onUp: () => gotoSection(currentIndex - 1, -1),
//     onDown: () => gotoSection(currentIndex + 1, 1),
//   });

// }, { scope: containerRef });