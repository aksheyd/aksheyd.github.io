import Divider from "../extras/divider"

export default function Future() {
    return (
        <div id="Future" className="">
            <Divider />
            <div className="grid grid-flow-col auto-cols-max grid-rows-4 items-center justify-center h-screen bg-white font-light tracking-wider p-6">
                <h1 className="text-4xl row-1 row-start-2">Future Features:</h1>
                <div className="flex flex-row space-x-4 text-xl p-4 row-start-2">
                    <ul>
                        <li>Animated Objects in Work</li>
                        <li>Updated Work SVGs/Images</li>
                        <li>Dark Mode</li>
                        <li>Animated Background in Intro</li>
                        <li>More ScrollTrigger Features</li>
                    </ul>
                </div>
                <div className="bg-white font-light tracking-wider p-6 col-start-2 row-start-3">
                    <p>Be sure to check back often for new updates!</p>
                    <p>I'm currently working in one week sprints <span>&#x1F61C;</span></p>
                </div>
            </div>

        </div>
    )
}