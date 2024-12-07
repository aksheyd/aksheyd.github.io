import About from "./about/about";
import Contact from "./contact/contact";
import Divider from "./extras/divider";
import Future from "./future/future";
import Intro from "./intro/intro";
import Nav from "./nav/nav";
import Work from "./work/work";

export default function Page() {
    return (
        <div className="overflow-x-hidden"> 
            <Nav/>
            <Intro/>
            <About/>
            <Work/>
            <Contact/>
            <Future/>
        </div>
    )
}
