import Intro from "./intro/intro";
import Nav from "./nav/nav";
import Work from "./work/work";

export default function Page() {
    return (
        <div className="overflow-x-hidden"> 
            <Nav/>
            <Intro/>
            <Work/>
        </div>
    )
}
