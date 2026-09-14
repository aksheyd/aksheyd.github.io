export function UnityEmbed({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      className="h-full w-full border-0 bg-black"
      allow="fullscreen; autoplay; gamepad"
    />
  );
}
