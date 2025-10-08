# Fisk Podcast React Experience

This example packages the **Forbidden Conscious Podcast** interface used inside the FISK Dimension storytelling demos.
It illustrates how to combine a timeline-based audio player with a reusable "style prompt" blueprint that creative teams
can reuse when generating slides, microsites, or AI-assisted copy.

## Features

- React component (`FiskPodcastApp.tsx`) that renders a Tailwind-friendly audio experience.
- Timeline controls that jump to specific archetypal segments of the transmission.
- Playback progress indicator with timestamp readout.
- Structured style prompt blueprint that captures the aesthetic, tone, and audience cues for Leo Leo Firestorm Ω-9.
- Embedded dashboard iframe that surfaces the live Third Eye Dome metrics.

## Usage

1. Add the component to any React or Next.js project with Tailwind (or adapt the class names to your design system).
2. Host `FORBIDDEN_CONSCIOUS_MASTER_MIX.mp3` in your public directory so the `<audio>` element can load it.
3. Import and render the component:

```tsx
import FiskPodcastApp from "./FiskPodcastApp";

export default function Page() {
  return <FiskPodcastApp />;
}
```

4. Optional: replace the `TIMELINE_ENTRIES` constants with your own timestamps, update the Copilot link, or extend the
   style prompt blueprint with custom glyphs, sigils, or multimedia cues.

The component is self-contained and does not ship additional OpenAI API calls. Use it as a canvas for your own realtime or narrative integrations.
