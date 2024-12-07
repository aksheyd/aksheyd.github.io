export default function Tooltip() {
    return (
        <div className="group animate-cuspulse absolute flex items-center justify-center bottom-10 right-10 z-1">
            <button className="rounded-xl text-white bg-gray-800 hover:bg-gray-900 font-medium text-sm px-3 py-1 text-center">?</button>

            <span className="absolute text-center w-64 h-8 right-10 scale-0 transition-all rounded bg-gray-500 p-2 text-xs text-white group-hover:scale-100">
                Click on the screen to spawn more particles!
            </span>
        </div>
    )
}