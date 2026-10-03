# The Impossible Archive

Nikhil Tripathi's interactive portfolio. A filing cabinet opens into experience dossiers, project folders, an About Me note, education, and contact information.

## Run locally

Serve `dist/` with any static web server. For example:

```sh
python3 -m http.server 8010 --directory dist
```

No framework, build step, API keys, accounts, or external font services are needed. Deploy `dist/` as a static site. On Vercel, use the Other framework preset, no build command, and `dist` as the output directory.

## Contents

- `dist/index.html`: room, cabinet, and navigation
- `dist/style.css`: responsive CSS scene and paper layouts
- `dist/app.js`: drawer navigation, content, and canvas visual studies
- `dist/Nikhil-Tripathi-Resume.pdf`: owner-supplied résumé
- `dist/fonts`: self-hosted font and license

Canvas visual studies are illustrations, not live project telemetry. Only the Lorenz sketch performs a numerical integration. Project descriptions distinguish working code from prototypes and unfinished work. No participant audio, clinical records, employer code, or Garmin account data is included.

Keyboard navigation, Escape to return to the room, direct section URLs, reduced-motion preferences, and a simplified mobile layout are supported. No tracking or analytics is installed.

## Interactive visual explanations

Project and experience illustrations now correspond to their workflows: a continuous loop on a map, applicant stages, selectable discussion-topic clusters, implied odds probabilities, retrieval with exact SQL aggregation, audio processing with QA, and a synthetic sensor frame. Sample applicants, topics, prices, and diagrams are illustrative, not actual project results. Lorenz retains its numerical attractor animation.

The entrance uses a short camera-style approach, gentle pointer parallax, and an extruded active drawer. Header navigation bypasses the entrance; Escape returns to the room and cancels the approach. Reduced-motion preferences disable the camera transition and continuing decorative animation.

For Vercel, import this GitHub repository as a new project. `vercel.json` selects a static deployment with no build command and output directory `dist`. Share the production project domain rather than a protected preview URL. The portfolio uses hash-based section links, so it needs no SPA rewrite rules.
