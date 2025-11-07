import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

export default function ProvidencePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Dueler's Providence
      </h1>

      <p className="text-lg mb-6 text-center">
        A soulslike sword combat game set in ancient Japan, focusing on
        mouse-based directional parrying, side dodging, and fast-paced combat.
      </p>

      <div className="space-y-10">
        <Card>
          <CardHeader>Links</CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://aksheyd.itch.io/providence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  itch.io
                </a>
              </li>
              <li>
                <a
                  href="https://gamejolt.com/games/duelersprovidence0101/988590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Game Jolt
                </a>
              </li>
              <li>
                <a
                  href="https://www.indiedb.com/games/duelers-providence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  IndieDB
                </a>
              </li>
              <li>
                <a
                  href="https://forums.tigsource.com/index.php?topic=76322.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  TIGSource DevLog
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=cIawFXmbvVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Trailer (YouTube)
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Summary</CardHeader>
          <CardContent>
            Dueler's Providence is a skill-based sword fighting game where you
            face progressively challenging enemies in 1v1 duels, culminating in
            a final boss battle. The core mechanic revolves around precise,
            mouse-based directional parrying and attacking. Successfully
            parrying requires matching the angle of incoming attacks, while your
            attack angles influence enemy reactions. Developed in Unity by a
            small student team, the game features intricate sword animations.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            My Contributions
            <CardDescription>
              This project was created by a 5-person student team. While we
              collaborated on many aspects, my primary responsibilities
              included:
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Level Design and Creation:</span>{" "}
                Designing the layout and flow of the game environments.
              </li>
              <li>
                <span className="font-medium">
                  Terrain Mapping, Lighting, and Skyboxes:
                </span>{" "}
                Sculpting the game world's terrain, setting up lighting to
                create mood, and implementing skyboxes for atmospheric
                backdrops.
              </li>
              <li>
                <span className="font-medium">Environment Details:</span> Adding
                props, foliage, and other details to enrich the game world and
                enhance immersion.
              </li>
              <li>
                <span className="font-medium">Lore / Story:</span> Developing
                the narrative background and story elements for the game.
              </li>
              <li>
                <span className="font-medium">Trailer:</span> Creating the
                promotional video to showcase the game's features and
                atmosphere.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
