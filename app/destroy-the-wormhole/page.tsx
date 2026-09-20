import type { Metadata } from "next";
import GamePage from "@/components/GamePage";
import { UnityEmbed } from "@/components/UnityEmbed";

export const metadata: Metadata = {
  title: "destroy the wormhole",
};

export default function DestroyTheWormholePage() {
  return (
    <GamePage
      title="Destroy The Wormhole"
      authors="Akshey Deokule"
      description={
        <>
          <p>
            Given two weeks, I was tasked with creating a game with a novel
            concept.
          </p>
          <p>
            Destroy The Wormhole is an endless space flight game where players
            must close wormholes, avoid obstacles, and use their cloning skills
            to get through it all. The game was developed in Unity and C#.
          </p>
        </>
      }
      controls={[
        { input: "WASD", action: "Move" },
        { input: "Q", action: "Swap clone and player" },
        { input: "R", action: "Spawn / despawn clone" },
      ]}
      special={[
        { input: "Esc", action: "Pause" },
        { input: "P", action: "Skip tutorial" },
      ]}
      game={
        <UnityEmbed
          src="/unity2/index.html"
          title="Destroy The Wormhole"
        />
      }
    />
  );
}
