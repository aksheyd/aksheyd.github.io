import GamePage from "@/components/GamePage";
import { UnityEmbed } from "@/components/UnityEmbed";

export default function LegendOfZeldaPage() {
  return (
    <GamePage
      title="Legend of Zelda"
      authors="Akshey Deokule, Nathaniel Luyben"
      description={
        <>
          <p>
            This is a dungeon inspired by the first dungeon in the original
            Legend of Zelda. It is built using Unity, C#, and Photoshop.
          </p>
          <p>
            I developed most of the player movement, weapons, health system,
            combat mechanics, animations/visuals, and half the enemies. Nate
            mostly focused on the map including navigation and construction as
            well as the collectible system, cheats, audio, and the other half of
            the enemies. That all being said, it was a team effort and we
            worked together on most tasks to bring the game together!
          </p>
        </>
      }
      controls={[
        { input: "WASD / arrows", action: "Move" },
        { input: "Space", action: "Change weapon" },
        { input: "X", action: "Primary attack" },
        { input: "Z", action: "Secondary attack" },
      ]}
      special={[
        { input: "1", action: "God mode" },
        { input: "4", action: "Secret room" },
      ]}
      game={<UnityEmbed src="/unity/index.html" title="Legend of Zelda" />}
    />
  );
}
