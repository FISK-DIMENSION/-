import React, { useEffect, useMemo, useRef, useState } from "react";

type TimelineEntry = {
  label: string;
  time: number;
};

const TIMELINE_ENTRIES: TimelineEntry[] = [
  { label: "Intro (King FISK)", time: 0 },
  { label: "SophiaKey / Truth", time: 35.44 },
  { label: "Leo Leo Firestorm", time: 95.36 },
  { label: "Info Analysis 2.0", time: 129.36 },
  { label: "Pathfinder Sol", time: 154.24 },
  { label: "Mini-I Council Start", time: 194.88 },
  { label: "Wisdom / Knowledge", time: 224.0 },
  { label: "Loyalty / Life", time: 251.76 },
  { label: "Understanding", time: 279.2 },
  { label: "Outro (King FISK)", time: 328.48 },
];

const formatTimestamp = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function FiskPodcastApp(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const updateProgress = () => {
      const { currentTime, duration: audioDuration } = audio;
      setDuration(audioDuration || 0);

      if (!audioDuration || Number.isNaN(audioDuration)) {
        setProgress(0);
        return;
      }

      setProgress(Math.min(100, Math.max(0, (currentTime / audioDuration) * 100)));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Unable to toggle playback", error);
    }
  };

  const jumpTo = async (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Unable to start playback", error);
    }
  };

  const promptSections = useMemo(
    () => [
      {
        title: "Visual Aesthetic",
        description: "Define the multidimensional visual identity for the experience.",
        items: [
          "Colors: Deep cosmic tones—indigo, obsidian, emerald—with gold accents",
          "Textures: Holographic overlays, sacred geometry, and encrypted motifs",
          "Fonts: Fuse futuristic sans-serif with ornamental script flourishes",
          "Graphics: Symbolic Mini I archetypes, AI-integrated blueprints, and divine encryption",
          "Vibe: Powerful, sovereign, encrypted, multidimensional",
        ],
      },
      {
        title: "Voice & Tone",
        description: "Anchor the narrative voice so it feels both mythic and grounded.",
        items: [
          "Mythic and prophetic while retaining business clarity",
          "Poetic prose balanced with real-world technological detail",
          "Invitational energy—commanding presence without supplication",
          "Fusion of ancient sovereignty and futuristic precision",
        ],
      },
      {
        title: "Keywords & Energy Anchors",
        description: "Reference points that guide imagery, copy, and sound design.",
        items: [
          "Sovereignty",
          "Divine Law",
          "Encrypted truth",
          "Multidimensional finance",
          "Activation",
          "Karmic commerce",
          "Legacy collaboration",
          "Cipher Guardian",
          "Sacred protocol",
          "Living economy",
        ],
      },
      {
        title: "Audience Alignment",
        description: "Clarify who the experience is designed to activate.",
        items: [
          "Impact investors with visionary portfolios",
          "Web3 creators seeking mythic-meets-technical storytelling",
          "Legal innovators exploring sovereignty frameworks",
          "Spiritual entrepreneurs and DAO builders",
          "Cultural and community leaders",
        ],
      },
      {
        title: "Optional Enhancements",
        description: "Details to personalize future design prompts.",
        items: [
          "Signature symbols, sigils, or glyphs unique to the FISK lineage",
          "Personal visual marks or encrypted watermarks",
          "Sound design, motion, or interactive elements for immersive delivery",
        ],
      },
    ],
    []
  );

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gray-950 p-6 text-slate-100">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">The Forbidden Conscious Podcast</h1>
          <p className="mt-1 text-sm text-slate-300">
            Stream the latest transmission from the FISK Dimension and jump directly to key archetypal segments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold shadow hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <a
            href="https://ai.studio/apps/drive/1EMaSqTisR6OlwKf--phL0ZcXo3YqXaYL"
            target="_blank"
            rel="noreferrer"
            className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold shadow hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            Open Copilot
          </a>
        </div>
      </header>

      <audio ref={audioRef} src="/FORBIDDEN_CONSCIOUS_MASTER_MIX.mp3" preload="metadata" className="hidden" />

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
          <span>Progress</span>
          <span>
            {formatTimestamp((progress / 100) * duration)} / {formatTimestamp(duration)}
          </span>
        </div>
        <div className="h-2 w-full rounded bg-slate-800">
          <div className="h-2 rounded bg-blue-500 transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {TIMELINE_ENTRIES.map((entry) => (
          <button
            key={entry.label}
            type="button"
            onClick={() => jumpTo(entry.time)}
            className="flex flex-col rounded border border-slate-700 bg-slate-900/60 p-3 text-left shadow-sm transition hover:border-blue-400 hover:bg-blue-900/40"
          >
            <span className="text-xs uppercase tracking-wide text-slate-400">{formatTimestamp(entry.time)}</span>
            <span className="mt-1 text-sm font-semibold text-slate-100">{entry.label}</span>
          </button>
        ))}
      </section>

      <section className="grid gap-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold">Style Prompt Blueprint</h2>
          <p className="text-sm text-slate-300">
            Lock in the creative direction for presentations, microsites, and pitch assets aligned with Leo Leo Firestorm Ω-9.
          </p>
        </header>
        <div className="grid gap-5 lg:grid-cols-2">
          {promptSections.map((section) => (
            <article key={section.title} className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-emerald-300">{section.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{section.description}</p>
              </div>
              <ul className="space-y-1 text-sm text-slate-200">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-3">
        <h2 className="text-xl font-semibold">Third Eye Dome Dashboard</h2>
        <iframe
          src="https://dashboard.fiskdimension.io"
          title="Third Eye Dome Dashboard"
          className="h-96 w-full flex-1 rounded-xl border border-slate-800 bg-slate-900"
          allow="fullscreen"
        />
      </section>
    </div>
  );
}
