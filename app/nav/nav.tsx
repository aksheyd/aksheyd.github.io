// "use client";

import Link from 'next/link';
import sites from './sites';
// import { gsap } from 'gsap';
// import { useLayoutEffect } from 'react';
// import { useAboutTimeline } from "../about/about";


export default function Nav() {
    // const aboutTimeline = useAboutTimeline(null); 

    // useLayoutEffect(() => {
    //     console.log(aboutTimeline);
    //     // gsap.utils.toArray('.link')
    //     //     .forEach((link, index) => {
    //     //         if (index === 1) {
    //     //             (link as HTMLElement).addEventListener("click", (e) => {
    //     //                 e.preventDefault();
    //     //                 if (aboutTimeline.scrollTrigger === undefined) return;
    //     //                 gsap.to(window, {
    //     //                     duration: 1,
    //     //                     scrollTo: {
    //     //                         y: aboutTimeline.scrollTrigger.end,
    //     //                         autoKill: false
    //     //                     }
    //     //                 });
    //     //             })
    //     //         }
    //     //     });
    // }, [aboutTimeline.current])


    return (
        <div>
            <nav className={"fixed top-0 w-full bg-overlay backdrop-blur-xl p-4 z-50"}>
                <div className="text-md font-light tracking-wide text-black">
                    <ul className="flex justify-between">
                        {sites.map(submap => (
                            submap.name === "API" || submap.name === "Repo" ? (
                                // TODO: add hover text that tells you are redirecting for reasons
                                <li className="hover:text-xl" key={submap.link}>
                                    <Link href={submap.link} target='_blank'>
                                        {submap.name}
                                    </Link>
                                </li>
                            ) : (
                                <li className="link hover:text-xl" key={submap.link}>
                                    <Link href={submap.link}>
                                        {submap.name}
                                    </Link>
                                </li>
                            )
                        ))}

                        {/* Section for light/dark mode */}
                        <li>
                            <label className="flex items-center cursor-pointer space-x-2 
                                                transition-all duration-700 ease-in-out origin-center inline-block hover:animate-rainbow">
                                <span>Coming</span>
                                <input
                                    type="checkbox"
                                    // checked={isChecked}
                                    // onChange={handleCheckboxChange}
                                    value=""
                                    className="sr-only peer"
                                />
                                <span className="relative w-11 h-6 grey-900 rounded-full peer bg-gray-100 peer-focus:outline-none peer-focus:ring-0 dark:peer-focus:ring-b-800 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-200"></span>
                                <span>Soon</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}