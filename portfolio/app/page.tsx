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
        </div>
    )
}