# My Portfolio

[Explore my portfolio](https://nikhiltrip.vercel.app/)

I’m Nikhil Tripathi, a computer science student at UCLA. I built this portfolio as an interactive archive of my software projects, research, experience, and interests.

Instead of a conventional page of project cards, I designed a room with a filing cabinet. Each drawer opens a different part of my story.

## Inside my archive

- **Experience:** My work at Visa, the UCLA Stress Lab, and Rivet Industries.
- **Projects:** Milemark, CampusTrendsML, UCLA ATS, PropShop, and my Lorenz equations exploration.
- **About me:** My interests outside software, including running, writing about philosophy, cooking, and weightlifting.
- **Education:** My studies at UCLA and questions I think about at the intersection of philosophy and software engineering.
- **Contact:** My email, GitHub, LinkedIn, and résumé.

I added interactive visual explanations to connect each project with its actual workflow. Visitors can follow a running route, move a sample applicant through review stages, explore topic clusters, compare example odds, and watch a numerical Lorenz attractor.

These visual explanations use illustrative inputs. I do not publish clinical records, participant audio, employer code, or my Garmin account data here.

## How I built it

I used HTML, CSS, and JavaScript, with SVG and Canvas for the visual elements. I built the cabinet and room directly in CSS and hosted the font locally. The site does not need a backend, API keys, or a framework build step.

I included keyboard navigation, direct section links, an Escape shortcut to return to the room, reduced-motion support, and layouts for smaller screens. I do not use tracking or analytics.

## Run my portfolio locally

Serve the `dist` folder with a static web server:

```sh
python3 -m http.server 8010 --directory dist
```

Then open `http://localhost:8010`.

## Project files

- `dist/index.html`: My room, cabinet, and navigation.
- `dist/style.css`: My responsive layouts, room styling, and transitions.
- `dist/app.js`: My portfolio content and navigation logic.
- `dist/visuals.js`: My interactive project and experience illustrations.
- `dist/Nikhil-Tripathi-Resume.pdf`: My résumé.
- `dist/fonts/`: My self-hosted font and its license.
- `vercel.json`: My static deployment configuration.

## Deployment

I host the public portfolio on Vercel and keep the source in this repository. My deployment serves `dist` without a build command. Section URLs use hash navigation, so they do not require rewrite rules.

[Visit my portfolio](https://nikhiltrip.vercel.app/)
