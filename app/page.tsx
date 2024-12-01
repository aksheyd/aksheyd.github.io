import API from "./api/page";
import Contact from "./contact/contact";
import Intro from "./intro/intro";
import Nav from "./nav/nav";
import Work from "./work/work";

export default function Page() {
    return (
        // add Tailwind?
        <div>
            <Nav />
            <section>
                <Intro />
            </section>

            <section>
                <Work />
            </section>


            <section>
                <Contact />
            </section>

            <section>
                <API />
            </section>
        </div>
    )
}