import Divider from "../extras/divider";

export default function Future() {
    return (
        <div id="Future" className="min-h-screen bg-white font-light tracking-wider p-6">
            <Divider />
            <div className="grid grid-cols-6 grid-rows-3 h-screen items-center justify-center">
                {/* Text Section */}
                <div className="col-start-2 col-span-3 row-start-1 row-span-2 flex flex-col">
                    <h1 className="text-4xl mb-4">Future Features:</h1>
                    <ul className="text-xl space-y-2 mb-6">
                        <li>Animated Objects in Work</li>
                        <li>Updated Work SVGs/Images</li>
                        <li>Dark Mode</li>
                        <li>Animated Background in Intro</li>
                        <li>More ScrollTrigger Features</li>
                    </ul>
                    <div className="text-sm">
                        <p>Be sure to check back often for new updates!</p>
                        <p>I'm currently working in one-week sprints <span>&#x1F61C;</span></p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="col-start-3 col-span-3 row-start-2 flex justify-center">
                    <img
                        src="/sprint_board.png"
                        alt="Sprint Board"
                        className="w-3/4 h-auto rounded-xl transition-transform duration-700 hover:scale-110 origin-left ease-in-out"
                    />
                </div>
            </div>
        </div>

    );
}