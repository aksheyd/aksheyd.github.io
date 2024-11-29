import Divider from '../extras/divider'
import projects from './projects'

export default function Work() {
  return (
    <div id="Work" className="min-h-screen p-6 bg-gray-200">
      <Divider />
      <h1 className="text-5xl font-thin tracking-wide">Projects</h1>
      <Divider />
      {projects.map(item =>
        <div key={`${item.name}`} className="min-h-screen p-4">
          <span><img className="float-right" src="https://upload.wikimedia.org/wikipedia/commons/3/38/Robot-clip-art-book-covers-feJCV3-clipart.png"></img></span>
          <h2 className="text-3xl font-normal">{`${item.name}`}</h2>
          <p className="">{`${item.bio}`}</p>
          <p className="">{`${item.desc}`}</p>
          <p className="">{`${item.date}`}</p>
        </div>
      )}
    </div>
  );
}
