export default function ProvidencePage() {
  return (
    <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto w-full flex justify-center border-x border-b border-dashed bg-card">
      <article className="max-w-3xl w-full px-6 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-3">
            Dueler&apos;s Providence
          </h1>
          <p className="text-sm text-muted-foreground">
            A soulslike sword combat game set in ancient Japan, focusing on
            mouse-based directional parrying, side dodging, and fast-paced
            combat.
          </p>
        </header>

        <section className="mb-8 pb-8 border-b border-dashed">
          <h2 className="font-serif text-xl mb-3">Links</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="https://aksheyd.itch.io/providence"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                itch.io
              </a>
            </li>
            <li>
              <a
                href="https://gamejolt.com/games/duelersprovidence0101/988590"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                Game Jolt
              </a>
            </li>
            <li>
              <a
                href="https://www.indiedb.com/games/duelers-providence"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                IndieDB
              </a>
            </li>
            <li>
              <a
                href="https://forums.tigsource.com/index.php?topic=76322.0"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                TIGSource DevLog
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=cIawFXmbvVA"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                Trailer (YouTube)
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8 pb-8 border-b border-dashed">
          <h2 className="font-serif text-xl mb-3">Summary</h2>
          <p className="text-sm">
            Dueler&apos;s Providence is a skill-based sword fighting game where
            you face progressively challenging enemies in 1v1 duels, culminating
            in a final boss battle. The core mechanic revolves around precise,
            mouse-based directional parrying and attacking. Successfully
            parrying requires matching the angle of incoming attacks, while your
            attack angles influence enemy reactions. Developed in Unity by a
            small student team, the game features intricate sword animations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl mb-1">My Contributions</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This project was created by a 5-person student team. While we
            collaborated on many aspects, my primary responsibilities included:
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="font-medium">Level Design and Creation:</span>{" "}
              Designing the layout and flow of the game environments.
            </li>
            <li>
              <span className="font-medium">
                Terrain Mapping, Lighting, and Skyboxes:
              </span>{" "}
              Sculpting the game world&apos;s terrain, setting up lighting to
              create mood, and implementing skyboxes for atmospheric backdrops.
            </li>
            <li>
              <span className="font-medium">Environment Details:</span> Adding
              props, foliage, and other details to enrich the game world and
              enhance immersion.
            </li>
            <li>
              <span className="font-medium">Lore / Story:</span> Developing the
              narrative background and story elements for the game.
            </li>
            <li>
              <span className="font-medium">Trailer:</span> Creating the
              promotional video to showcase the game&apos;s features and
              atmosphere.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
