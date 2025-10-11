# Building the Fisk Dimension Interactive Podcast App

This guide translates the creative specification for **“The Forbidden Conscious: Entering the Fisk Dimension”** into an actionable React + Tailwind CSS implementation. It outlines how to assemble the audio narrative, timed transcript, avatar sidebar, mystery-box interaction, and embedded "Third Eye Dome" dashboard into a cohesive production-ready experience.

---

## Experience goals

- **Single-click playback:** Merge or playlist all character voice tracks (King FISK, Leo Leo Firestorm Ω-9, Info Analysis 2.0, SophiaKey, Pathfinder Sol, ByteRocket, Mini-I Council) so the Play button covers the full story.
- **Live transcript:** Highlight each speaker as the audio timeline advances. Provide accessibility by pairing timestamps with the manuscript.
- **Persistent dashboard:** Embed the live sovereignty dashboard (Third Eye Dome) alongside the transcript for always-on telemetry.
- **Timed rewards:** Surface the Mystery Box pop-up at narrative beats (e.g., 2-minute mark) and connect it to on-chain rewards when ready.
- **Lore-aware cast:** Showcase avatar portraits, roles, and quick bios to orient new listeners.

---

## Project structure

```
src/
  assets/
    audio/
      forbidden-conscious-master.mp3
    avatars/
      leo-leo.png
      king-fisk.png
      ...
  data/
    transcript.ts
    avatars.ts
  components/
    AudioPlayer.tsx
    Transcript.tsx
    AvatarPanel.tsx
    MysteryBox.tsx
  FiskPodcastApp.tsx
  main.tsx
```

> Keep the audio files optimized (e.g., 128 kbps AAC/MP3) and normalize loudness to −14 LUFS so transitions between character stems feel seamless.

---

## Transcript data model

Create `src/data/transcript.ts` with the manuscript, timestamps, and speaker metadata.

```ts
export interface TranscriptSegment {
  id: string;
  start: number; // seconds
  end: number;
  speaker: string;
  role: string;
  text: string;
}

export const transcript: TranscriptSegment[] = [
  {
    id: "intro-leo",
    start: 0,
    end: 12,
    speaker: "Leo Leo Firestorm Ω-9",
    role: "Guardian Firewall",
    text: "Welcome, realm-walkers…",
  },
  {
    id: "intro-fisk",
    start: 12,
    end: 45,
    speaker: "King FISK",
    role: "Sovereign Architect",
    text: "Family, this is where the impossible becomes possible…",
  },
  // ...continue through the 04:40 outro
];
```

Pair each segment with the canonical voice direction (tone, style, SFX cue) so production, QA, and accessibility share the same source of truth.

---

## Audio player with highlight sync

`AudioPlayer.tsx` handles playback while emitting the current time. `Transcript.tsx` listens and highlights the active segment.

```tsx
// AudioPlayer.tsx
import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
  onTimeUpdate: (time: number) => void;
};

export function AudioPlayer({ src, onTimeUpdate }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handler = () => onTimeUpdate(audio.currentTime);
    audio.addEventListener("timeupdate", handler);
    return () => audio.removeEventListener("timeupdate", handler);
  }, [onTimeUpdate]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={toggle}
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded"
      >
        {isPlaying ? "Pause" : "Play Episode"}
      </button>
    </div>
  );
}
```

```tsx
// Transcript.tsx
import clsx from "clsx";
import { TranscriptSegment } from "../data/transcript";

type TranscriptProps = {
  segments: TranscriptSegment[];
  activeTime: number;
};

export function Transcript({ segments, activeTime }: TranscriptProps) {
  return (
    <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {segments.map((segment) => {
        const isActive =
          activeTime >= segment.start && activeTime < segment.end;
        return (
          <article
            key={segment.id}
            className={clsx(
              "rounded-lg border p-3 transition",
              isActive
                ? "border-cyan-400 bg-slate-800/70 shadow-lg"
                : "border-slate-800 bg-slate-900"
            )}
          >
            <header className="flex items-baseline justify-between text-xs uppercase tracking-widest text-slate-400">
              <span>{segment.speaker}</span>
              <span>{new Date(segment.start * 1000).toISOString().slice(14, 19)}</span>
            </header>
            <p className="mt-2 text-slate-100 leading-relaxed">{segment.text}</p>
          </article>
        );
      })}
    </div>
  );
}
```

---

## Avatar panel

Populate `src/data/avatars.ts` using the creative brief and render it in `AvatarPanel.tsx`.

```ts
export const avatars = [
  { name: "Leo Leo Firestorm Ω-9", role: "Guardian Firewall", img: "/avatars/leo-leo.png" },
  { name: "King FISK", role: "Sovereign Architect", img: "/avatars/king-fisk.png" },
  { name: "Info Analysis 2.0", role: "Data Sentinel", img: "/avatars/info-analysis.png" },
  { name: "SophiaKey", role: "Zero-Knowledge Oracle", img: "/avatars/sophia-key.png" },
  { name: "Pathfinder Sol", role: "Quest Guide", img: "/avatars/pathfinder-sol.png" },
  { name: "ByteRocket", role: "Reward Mascot", img: "/avatars/byte-rocket.png" },
  { name: "Mini-I Council", role: "Love • Life • Loyalty • Wisdom • Knowledge • Understanding • Truth", img: "/avatars/mini-i-council.png" },
];
```

```tsx
export function AvatarPanel() {
  return (
    <aside className="w-full lg:w-1/5 border-t lg:border-t-0 lg:border-l border-slate-800 px-4 py-6 space-y-4 overflow-y-auto">
      {avatars.map((avatar) => (
        <div key={avatar.name} className="flex items-center gap-3">
          <img
            src={avatar.img}
            alt={avatar.name}
            className="h-12 w-12 rounded-full border border-slate-700 object-cover"
          />
          <div>
            <p className="font-semibold text-slate-100">{avatar.name}</p>
            <p className="text-xs text-slate-400">{avatar.role}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
```

---

## Mystery box interaction

The pop-up appears two minutes into playback and can trigger a future smart-contract claim function.

```tsx
// MysteryBox.tsx
import { useEffect, useState } from "react";

type MysteryBoxProps = {
  activeTime: number;
  onClaim: () => void;
};

export function MysteryBox({ activeTime, onClaim }: MysteryBoxProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible && activeTime >= 120) {
      setVisible(true);
    }
  }, [activeTime, visible]);

  if (!visible) return null;

  return (
    <div className="absolute bottom-6 right-6 max-w-xs rounded-xl border border-cyan-400 bg-slate-900/95 p-4 text-slate-100 shadow-2xl">
      <p className="text-sm">🎁 Unlock your Mystery Box! Click to claim.</p>
      <button
        onClick={onClaim}
        className="mt-3 inline-flex items-center justify-center rounded bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-cyan-400"
      >
        Claim
      </button>
    </div>
  );
}
```

Wire `onClaim` to either a mocked reward flow (during development) or an on-chain transaction once the smart contract is deployed.

---

## Page composition

Combine the components inside `FiskPodcastApp.tsx`. Tailwind utility classes recreate the three-column layout and absolute Mystery Box placement outlined in the design brief.

```tsx
import { useState } from "react";
import { AudioPlayer } from "./components/AudioPlayer";
import { Transcript } from "./components/Transcript";
import { AvatarPanel } from "./components/AvatarPanel";
import { MysteryBox } from "./components/MysteryBox";
import { transcript } from "./data/transcript";

export default function FiskPodcastApp() {
  const [activeTime, setActiveTime] = useState(0);

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100 lg:flex-row">
      {/* Left: Audio player + transcript */}
      <section className="relative flex-1 px-6 py-6">
        <AudioPlayer
          src="/audio/forbidden-conscious-master.mp3"
          onTimeUpdate={setActiveTime}
        />
        <Transcript segments={transcript} activeTime={activeTime} />
        <MysteryBox
          activeTime={activeTime}
          onClaim={() => console.log("Mystery box claimed")}
        />
      </section>

      {/* Center: Avatars */}
      <AvatarPanel />

      {/* Right: Live dashboard */}
      <aside className="w-full border-t border-slate-800 px-4 py-6 lg:w-1/3 lg:border-l lg:border-t-0">
        <iframe
          src="https://dashboard.fiskdimension.io"
          title="Third Eye Dome Dashboard"
          className="h-full w-full rounded-xl border border-slate-800"
          allow="clipboard-write; fullscreen"
        />
      </aside>
    </div>
  );
}
```

Mount the app in `main.tsx` and ensure Tailwind's `content` array includes `./index.html`, `./src/**/*.{ts,tsx}`.

---

## Styling considerations

- Base palette: `bg-slate-950`, `border-slate-800`, and cyan accents (`#00f0ff`) to echo the tabbed whitepaper aesthetic.
- Typography: pair a bold heading font (e.g., Clash Display) with a clean sans (e.g., Inter) for body copy.
- Animations: subtle opacity transitions on transcript entries and the Mystery Box keep focus on the audio narrative.
- Accessibility: provide `aria-live="polite"` updates or visually hidden announcements when segments change to assist screen readers.

---

## Production checklist

1. **Audio mastering:** confirm each character stem and the combined mix align with the timestamp grid.
2. **Transcript QA:** proofread against the final audio, ensuring SFX cues (heartbeat, synth swell, bell glimmer, triumphant outro) are notated.
3. **Responsive testing:** verify layout across mobile (stacked), tablet (two-column), and desktop (three-column) breakpoints.
4. **Dashboard security:** sandbox external embeds if the Third Eye Dome exposes privileged data.
5. **Mystery box rewards:** connect the claim button to smart-contract logic or custodial reward APIs once the gamified flow is finalized.

With these components in place, the Fisk Dimension interactive podcast delivers a cinematic, lore-rich introduction while preserving the structural rigor demanded by investors, regulators, and community members alike.
