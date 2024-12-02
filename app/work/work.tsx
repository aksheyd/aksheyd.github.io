import Divider from '../extras/divider'
import projects from './projects'
import Image from 'next/image'

export default function Work() {
    return (
        <div id="Work" className="min-h-screen p-6 bg-white">
            <Divider />
            <h1 className="text-5xl font-thin tracking-wide">Projects</h1>
            <Divider />
            {projects.map(item =>
                <div key={`${item.name}`} className="min-h-screen p-4 grid grid-cols-6 gap-4 content-left">
                    <div className="col-start-1 col-span-2 tracking-wide font-thin text-xl">
                        <h2 className="text-3xl font-normal">{`${item.name}`}</h2>
                        <p className="p-3">{`${item.bio}`}</p>
                        <p className="p-3 ">{`${item.desc}`}</p>
                        <p className="p-3">{`${item.date}`}</p>
                        <a className="p-3 underline " href={`${item.link}`}>Repo</a>
                    </div>
                    <img
                        alt=""
                        src="http://localhost:3000/images.jpeg"
                        className="col-start-3 col-span-6 rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                    />
                </div>
            )}
        </div>
    );
}