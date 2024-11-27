import projects from './projects'

export default function Work() {
    return (
      <div id="Work" className="min-h-screen p-6">
        Project Section
        {projects.map(item =>
          <div key={`${item.name}`} className="min-h-screen p-4 shadow-md shadow-purple-300">
            <h2 className="">{`${item.name}`}</h2>
            <span>{`${item.desc}`}</span>
            {`${item.desc}`}
            {`${item.date}`}
          </div>
        )}

      </div>
    );
  }
  