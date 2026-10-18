const sections = [
  ["experience", "01", "EXPERIENCE", "Places I’ve contributed."],
  ["projects", "02", "PROJECTS", "Things I’ve built."],
  ["about", "03", "ABOUT ME", "The person behind the folders."],
  ["education", "04", "EDUCATION", "A foundation. An open question."],
  ["contact", "05", "CONTACT", "Let’s make a connection."],
];
const entries = {
  projects: [
    {
      title: "Milemark",
      id: "P—001",
      category: "RUNNING × SOFTWARE",
      subtitle: "Marathon training, built around my own runs.",
      body: "Started while training for a marathon and wanting a better view of Garmin runs, sleep, and HRV. The dashboard puts those alongside a training calendar with adjustable race goals and weekly mileage targets.",
      notes:
        "Built a Python Garmin bridge and a React dashboard. Added daily run totals and recovery charts, then tested the mileage progression and taper logic. Garmin sync runs on my laptop; visitors can use sample data or enter their own runs.",
      tags: ["Python", "React", "TypeScript", "Garmin"],
      art: "route",
      link: "https://github.com/nikhiltrip/milemark",
      status: "WORKING LOCAL APP",
    },
    {
      title: "UCLA ATS",
      id: "P—002",
      category: "FULL-STACK SYSTEMS",
      subtitle: "Application forms and review, in one place.",
      body: "A team project for creating application forms and keeping track of candidates. Reviewers can rate submissions, leave comments, and move applicants through each stage.",
      notes:
        "Contributed to the React, Node.js, and PostgreSQL application, with analytics, CSV exports, migrations, and Docker setup. Source code is available; a public sandbox is not deployed.",
      tags: ["React", "Node.js", "PostgreSQL", "Docker"],
      art: "ats",
      link: "https://github.com/beck-2/ATS",
      status: "SOURCE AVAILABLE",
    },
    {
      title: "Lorenz Equations",
      id: "P—003",
      category: "MATHEMATICS × COMPUTATION",
      subtitle: "A high-school experiment with chaos.",
      body: "A Python simulation of the Lorenz equations, comparing trajectories that start close together. Small changes in the initial coordinates lead to different paths through the attractor.",
      notes:
        "Integrated ten starting conditions and their perturbations, plotted the trajectories, and fitted regressions to log-separation over selected windows. An early project exploring how code can make an abstract mathematical idea visible.",
      tags: ["Python", "Numerical methods", "Visualization"],
      art: "lorenz",
      link: "https://github.com/nikhiltrip/LorenzEquations",
      status: "COMPUTATIONAL EXPLORATION",
    },
    {
      title: "CampusTrendsML",
      id: "P—004",
      category: "TEXT × DATA",
      subtitle: "Making sense of campus discussion posts.",
      body: "A project for exploring what students talk about and how those discussions change over time. The first step was preparing the text and extracting timing, sentiment, and engagement features.",
      notes:
        "Implemented JSON and CSV ingestion, duplicate removal, and text preprocessing in Python. The repository contains the data-preparation work. Model training and evaluation are unfinished.",
      tags: ["Python", "Pandas", "Text processing"],
      art: "topics",
      link: "https://github.com/nikhiltrip/campustrends",
      status: "IN DEVELOPMENT",
    },
    {
      title: "PropShop",
      id: "P—005",
      category: "DATA PIPELINES × DASHBOARDS",
      subtitle: "Comparing the same prop across different sources.",
      body: "Matches sports projections with odds for the same player, statistic, and line. The dashboard supports searching and filtering results to inspect estimated pricing differences.",
      notes:
        "Built the collection and probability logic in Python, an Express API, and a React interface. Live collection and the refresh workflow need more work before the prototype can support a dependable live demo.",
      tags: ["Python", "Express", "React", "Data collection"],
      art: "odds",
      link: "https://github.com/nikhiltrip/propshop",
      status: "PROTOTYPE",
    },
  ],
  experience: [
    {
      title: "Visa",
      id: "E—001",
      category: "SOFTWARE ENGINEERING INTERN",
      subtitle: "Financial investigation with retrieval and SQL.",
      body: "Worked with Visa’s Global Tokenization Services team on an internal conversational assistant. The goal was to connect financial questions with the source information and calculations needed to answer them.",
      notes:
        "Built with Spring Boot, Spring AI, Redis, and PostgreSQL. Combined vector retrieval with SQL aggregation so responses could use document context and exact calculations. Developed evaluation cases and QA workflows around the assistant.",
      tags: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
      art: "retrieval",
      status: "SUMMER 2026",
    },
    {
      title: "UCLA Stress Lab",
      id: "E—002",
      category: "UNDERGRADUATE RESEARCH",
      subtitle: "Preparing clinical audio for stress research.",
      body: "Extracting acoustic features from clinical recordings at UCLA’s Semel Institute to study vocal stress and compare changes before and after lifestyle interventions across study groups.",
      notes:
        "Built local Whisper transcription and Librosa feature extraction with Pandas analysis workflows. Added checks for missing recordings and transcript-quality problems. The stress measures are exploratory; participant data stays private.",
      tags: ["Python", "Whisper", "Librosa", "Research"],
      art: "audio",
      status: "MARCH 2026 - PRESENT",
    },
    {
      title: "Rivet Industries",
      id: "E—003",
      category: "SOFTWARE ENGINEERING INTERN",
      subtitle: "Processing SPAD sensor images with Python.",
      body: "Worked on sensor-image pipelines and engineering tools at Rivet Industries, helping process image data and automate parts of the development workflow.",
      notes:
        "Contributed to ETL and signal-processing workflows, automated tests, and Docker-based development and deployment tooling. The work focused on making processing and verification easier to repeat.",
      tags: ["Python", "ETL", "Docker", "CI/CD"],
      art: "sensor",
      status: "SUMMER 2025",
    },
  ],
};
const projectOrder = [
  "Milemark",
  "CampusTrendsML",
  "UCLA ATS",
  "PropShop",
  "Lorenz Equations",
];
entries.projects.sort(
  (a, b) => projectOrder.indexOf(a.title) - projectOrder.indexOf(b.title),
);
entries.projects.forEach((project, index) => {
  project.id = `P—${String(index + 1).padStart(3, "0")}`;
});

let current = "projects",
  selected = 0,
  artifactFrame;
const app = document.querySelector("#app"),
  archive = document.querySelector("#archive");
document.querySelector("#drawers").innerHTML = sections
  .map(
    ([key, no, label]) =>
      `<button class="drawer" data-section="${key}" aria-label="Open ${label.toLowerCase()} drawer"><span class="drawer-no">${no}</span><span class="drawer-label">${label}</span><span class="handle"></span></button>`,
  )
  .join("");
function openSection(key, focus = true) {
  clearTimeout(walkTimer);
  app.classList.remove("walking");
  document.querySelector("#enter").disabled = false;
  document.querySelector(".walk-status").textContent = "";
  current = key;
  selected = 0;
  const s = sections.find((x) => x[0] === key);
  if (!s) return;
  app.classList.add("entered");
  document.querySelector(".intro").inert = true;
  archive.hidden = false;
  document.querySelector("#section-number").textContent = s[1];
  document.querySelector("#section-kicker").textContent =
    `DRAWER ${s[1]} / ${s[2]}`;
  document.querySelector("#section-title").textContent =
    key === "experience"
      ? "Experience."
      : key === "projects"
        ? "Selected work."
        : key === "about"
          ? "Outside the index."
          : key === "education"
            ? "Still learning."
            : "Say hello.";
  document.querySelectorAll(".drawer").forEach((b) => {
    b.classList.toggle("active", b.dataset.section === key);
    b.setAttribute("aria-expanded", String(b.dataset.section === key));
  });
  render();
  history.replaceState(null, "", `#${key}`);
  if (focus) {
    archive.tabIndex = -1;
    archive.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
}
function render() {
  cancelAnimationFrame(artifactFrame);
  const content = document.querySelector("#section-content");
  if (entries[current]) {
    content.innerHTML = `<div class="folder-grid"><div class="folder-list" role="group" aria-label="${current} files">${entries[current].map((e, i) => `<button class="folder-tab ${i === selected ? "selected" : ""}" data-entry="${i}" aria-pressed="${i === selected}"><small>${e.id}</small><b>${e.title}</b><span>↗</span></button>`).join("")}</div><article class="document" id="document"></article></div>`;
    renderDocument();
    return;
  }
  if (current === "about") {
    content.innerHTML = `<div class="about-layout"><div><h3 class="about-title">Curiosity doesn’t<br>keep office hours.</h3><p class="about-copy">I’m Nikhil, a computer science student at UCLA. I enjoy finding the point where an interesting idea becomes something someone can actually use.</p><p class="about-copy">My work has taken me through financial software, sensor-data pipelines, clinical-audio research, and projects inspired by my own everyday life.</p><p class="about-copy">I’m interested in software systems, applied machine learning, and the questions that sit between disciplines.</p><div class="profile-meta"><span>BASED IN<br>LOS ANGELES</span><span>CURRENTLY<br>BUILDING & LEARNING</span></div></div><aside class="hobby-note"><h3>Beyond the work.</h3><div class="hobby"><small>01</small>Running</div><div class="hobby"><small>02</small>Writing about philosophy</div><div class="hobby"><small>03</small>Cooking something new</div><div class="hobby"><small>04</small>Weightlifting</div><p>A few things that keep me curious, grounded, and away from a screen.</p></aside></div>`;
  } else if (current === "education") {
    content.innerHTML = `<div class="education-card"><span class="eyebrow">LOS ANGELES, CALIFORNIA</span><h3>University of California,<br>Los Angeles</h3><p>Bachelor of Science in Computer Science<br>Expected graduation: June 2028</p><div class="tags"><span>UCLA</span><span>Computer Science</span><span>Class of 2028</span></div></div><article class="document"><h4>QUESTIONS I KEEP COMING BACK TO</h4><div class="interest-list"><p><small>01</small>How much freedom do we have when software shapes our choices?</p><p><small>02</small>Does a model understand, or does it only predict?</p><p><small>03</small>Whose values decide what a system calls “better”?</p><p><small>04</small>Who is responsible when well-built software causes harm?</p></div></article>`;
  } else {
    content.innerHTML = `<p class="contact-sub">Want to talk about software, research, or something you found in the archive? I’d love to hear from you.</p><a class="contact-link" href="mailto:nikhiltrip1@gmail.com"><span>Email <small>nikhiltrip1@gmail.com</small></span><span>↗</span></a><a class="contact-link" href="https://github.com/nikhiltrip" target="_blank" rel="noopener"><span>GitHub <small>@nikhiltrip</small></span><span>↗</span></a><a class="contact-link" href="https://www.linkedin.com/in/nikhil-tripathi-443689233" target="_blank" rel="noopener"><span>LinkedIn <small>LET’S CONNECT</small></span><span>↗</span></a><a class="contact-link" href="Nikhil-Tripathi-Resume.pdf?v=milemark" target="_blank" rel="noopener"><span>Résumé <small>PDF / OPEN FILE</small></span><span>↗</span></a><p class="contact-note">FROM THE PERSONAL ARCHIVE OF NIKHIL TRIPATHI.</p>`;
  }
}
function renderDocument() {
  const e = entries[current][selected];
  document.querySelectorAll(".folder-tab").forEach((b, i) => {
    b.classList.toggle("selected", i === selected);
    b.setAttribute("aria-pressed", String(i === selected));
  });
  document.querySelector("#document").innerHTML =
    `<div class="document-head"><span>${e.category}</span><span>${e.id}</span></div><h3>${e.title}</h3><p class="lead">${e.subtitle}</p>${projectVisual(e)}<p>${e.body}</p><h4>INSIDE THE FILE</h4><p>${e.notes}</p><div class="tags">${e.tags.map((t) => `<span>${t}</span>`).join("")}</div><div class="doc-links">${e.link ? `<a href="${e.link}" target="_blank" rel="noopener">Explore source ↗</a>` : ""}<span class="contact-note" style="margin:0">${e.status}</span></div>`;
  if (e.art === "lorenz") drawArtifact(e.art);
  wireVisual(e.art);
}
let walkTimer;
function enterArchive(key = "projects") {
  if (reduced || app.classList.contains("entered")) return openSection(key);
  clearTimeout(walkTimer);
  app.classList.add("walking");
  document.querySelector("#enter").disabled = true;
  walkTimer = setTimeout(() => {
    app.classList.remove("walking");
    document.querySelector("#enter").disabled = false;
    document.querySelector(".walk-status").textContent = "";
    openSection(key);
  }, 1450);
}
function closeArchive() {
  clearTimeout(walkTimer);
  app.classList.remove("walking");
  document.querySelector("#enter").disabled = false;
  document.querySelector(".walk-status").textContent = "";
  cancelAnimationFrame(artifactFrame);
  archive.hidden = true;
  app.classList.remove("entered");
  document.querySelector(".intro").inert = false;
  history.replaceState(null, "", location.pathname);
  document.querySelectorAll(".drawer").forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-expanded", "false");
  });
  document.querySelector("#enter").focus({ preventScroll: true });
}
document.addEventListener("click", (e) => {
  const s = e.target.closest("[data-section]");
  if (s) {
    if (s.classList.contains("drawer") && !app.classList.contains("entered"))
      enterArchive(s.dataset.section);
    else openSection(s.dataset.section);
  }
  const entry = e.target.closest("[data-entry]");
  if (entry) {
    selected = Number(entry.dataset.entry);
    cancelAnimationFrame(artifactFrame);
    renderDocument();
  }
});
document.querySelector("#enter").onclick = () => enterArchive("projects");
document.querySelector("#close").onclick = closeArchive;
document.querySelector(".wordmark").onclick = (e) => {
  e.preventDefault();
  closeArchive();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeArchive();
});
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
function drawArtifact(type) {
  const c = document.querySelector("#artifact"),
    ctx = c.getContext("2d");
  const w = (c.width = c.clientWidth * 2),
    h = (c.height = c.clientHeight * 2);
  let t = 0;
  let points = [],
    x = 0.1,
    y = 0,
    z = 0;
  for (let i = 0; i < 3200; i++) {
    const dt = 0.006;
    const dx = 10 * (y - x),
      dy = x * (28 - z) - y,
      dz = x * y - (8 / 3) * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    if (i > 200) points.push([x, y, z]);
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#85966f18";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 36) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 0; i < h; i += 36) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "#e6b17f";
    ctx.beginPath();
    if (type === "lorenz") {
      for (let i = 0; i < points.length; i++) {
        const p = points[i],
          xx =
            w / 2 +
            ((p[0] * Math.cos(t * 0.003) + p[1] * Math.sin(t * 0.003)) * h) /
              58,
          yy = h * 0.86 - (p[2] * h) / 60;
        i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
      }
    } else if (type === "route") {
      for (let i = 0; i < 200; i++) {
        const a = i / 199,
          xx = w * 0.15 + a * w * 0.7 + Math.sin(a * 16) * 18,
          yy = h * 0.5 + Math.sin(a * 8) * h * 0.22 + Math.cos(a * 19) * 10;
        i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
      }
      ctx.stroke();
      const a = (t % 600) / 600;
      ctx.fillStyle = "#f3e4b5";
      ctx.beginPath();
      ctx.arc(
        w * 0.15 + a * w * 0.7 + Math.sin(a * 16) * 18,
        h * 0.5 + Math.sin(a * 8) * h * 0.22 + Math.cos(a * 19) * 10,
        5,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    } else if (type === "bars" || type === "cards") {
      for (let i = 0; i < 18; i++) {
        const hh = 20 + Math.abs(Math.sin(i * 1.7 + t * 0.006)) * h * 0.43;
        ctx.fillStyle = i % 3 === 0 ? "#d0a979" : "#728869";
        ctx.fillRect(w * 0.13 + i * w * 0.042, h * 0.73 - hh, w * 0.024, hh);
      }
    } else {
      for (let i = 0; i < w; i++) {
        const xx = i / w;
        const yy =
          h * 0.49 +
          Math.sin(xx * 23 + t * 0.018) * Math.sin(xx * Math.PI) * h * 0.16 +
          Math.sin(xx * 71 - t * 0.01) * h * 0.055;
        i ? ctx.lineTo(i, yy) : ctx.moveTo(i, yy);
      }
    }
    ctx.stroke();
    t++;
    if (!reduced) artifactFrame = requestAnimationFrame(frame);
  }
  frame();
}
const dust = document.querySelector("#dust"),
  d = dust.getContext("2d");
let dw,
  dh,
  t = 0;
function size() {
  dw = dust.width = dust.clientWidth;
  dh = dust.height = dust.clientHeight;
}
size();
window.addEventListener("resize", size);
const motes = Array.from({ length: 45 }, () => [
  Math.random(),
  Math.random(),
  Math.random(),
]);
function particles() {
  d.clearRect(0, 0, dw, dh);
  for (const [x, y, r] of motes) {
    d.fillStyle = `rgba(219,223,183,${0.04 + r * 0.15})`;
    d.beginPath();
    d.arc(
      (x * dw + Math.sin(t * 0.002 + r * 8) * 12) % dw,
      (y * dh - t * (0.03 + r * 0.04) + dh * 10) % dh,
      0.4 + r * 0.7,
      0,
      7,
    );
    d.fill();
  }
  t++;
  if (!reduced) requestAnimationFrame(particles);
}
particles();
let pointerFrame;
app.addEventListener("pointermove", (event) => {
  if (
    reduced ||
    event.pointerType !== "mouse" ||
    app.classList.contains("entered") ||
    app.classList.contains("walking")
  )
    return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    const bounds = app.getBoundingClientRect();
    app.style.setProperty(
      "--look-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`,
    );
    app.style.setProperty(
      "--look-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * 7}px`,
    );
  });
});
app.addEventListener("pointerleave", () => {
  app.style.setProperty("--look-x", "0px");
  app.style.setProperty("--look-y", "0px");
});
const initial = location.hash.slice(1);
if (sections.some((s) => s[0] === initial)) openSection(initial, false);
