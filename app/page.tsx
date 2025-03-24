import About from "./about/about";
import Contact from "./contact/contact";
import Future from "./future/future";
import Intro from "./intro/intro";
import Nav from "./nav/nav";
import Work from "./work/work";
import TestParticles from "./test-particles/test-particles";
import Tooltip from "./test-particles/particles-tooltop";

export default function Page() {
    return (
        <div className="overflow-x-hidden"> 
            <Nav/>
            {/* <TestParticles /> */}
            <Intro/>
            <About/>
            <Work/>
            <Contact/>
        </div>
    )
}
