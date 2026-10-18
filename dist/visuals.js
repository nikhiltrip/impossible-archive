/* Small, explanatory illustrations. All sample content is synthetic. */
const visualNotes = {
  route: "Follow the runner around bends, switchbacks, and the park.",
  ats: "A sample application moves through submitted, review, and decision stages. Click “Move application” to try it.",
  topics:
    "Illustrative topic map · select a cluster to explore the kinds of language a discussion-analysis tool might organize.",
  odds: "Illustrative prices for the same fictional prop. Implied probability = 1 / decimal odds.",
  retrieval:
    "Conceptual workflow · a question connects to retrieval and SQL, then source information supports an answer.",
  audio:
    "Conceptual research pipeline · synthetic waveform, local transcription, acoustic features, and quality checks.",
  sensor:
    "Conceptual engineering workflow · a synthetic sensor frame is processed and checked before export.",
};
function visualShell(type, title, body) {
  return `<figure class="visual-study visual-${type}" aria-label="${title}"><div class="study-top"><span>${title}</span><span class="study-live">ILLUSTRATED WORKFLOW</span></div>${body}<figcaption class="study-caption" aria-live="polite">${visualNotes[type]}</figcaption></figure>`;
}
function projectVisual(entry) {
  const type = entry.art;
  if (type === "lorenz")
    return `<div class="artifact"><canvas id="artifact" aria-label="Animated Lorenz attractor"></canvas><span class="artifact-label">LORENZ / LIVE NUMERICAL SKETCH</span><span class="artifact-number">${entry.id}</span></div>`;
  if (type === "route")
    return visualShell(
      type,
      "A ROUTE, NOT A STRAIGHT LINE",
      `<div class="route-map"><svg viewBox="0 0 600 240" role="img" aria-label="A continuous running route with loops and switchbacks through an illustrated street map"><defs><pattern id="streets" width="60" height="48" patternUnits="userSpaceOnUse"><path d="M0 0H60M0 0V48" stroke="#637956" stroke-width="1" opacity=".2"/></pattern><path id="run-loop" d="M120 168 L120 72 Q120 50 143 50 L230 50 Q254 50 254 76 L254 126 Q254 151 280 151 L343 151 Q371 151 371 124 L371 65 Q371 42 398 42 L465 42 Q491 42 491 66 L491 179 Q491 201 466 201 L399 201 Q376 201 376 180 L376 171 Q376 157 357 170 L303 207 Q280 220 255 205 L227 186 Q204 173 204 150 L204 106 Q204 87 184 87 L176 87 Q158 87 158 108 L158 168 Q158 187 140 187 Q120 187 120 168Z"/></defs><rect width="600" height="240" fill="url(#streets)"/><path d="M0 174Q90 111 159 144T310 88T600 134" fill="none" stroke="#263e3c" stroke-width="22"/><rect x="287" y="36" width="55" height="79" rx="20" fill="#33492e"/><text x="301" y="78" fill="#94a17c" font-size="8" font-family="monospace">PARK</text><g fill="none" stroke="#899573" stroke-width="5" opacity=".15"><path d="M20 20H580V221H20Z"/><path d="M80 0V240M540 0V240M0 25H600M0 220H600"/></g><use href="#run-loop" fill="none" stroke="#ee85552a" stroke-width="13"/><use href="#run-loop" fill="none" stroke="#eea878" stroke-width="3.5" stroke-linejoin="round"/><circle cx="120" cy="168" r="8" fill="#182119" stroke="#e5e8d0" stroke-width="2"/><text x="75" y="166" fill="#d7dfc7" font-size="9" font-family="monospace">START</text><circle r="5" fill="#fff4da" stroke="#ee8555" stroke-width="3">${matchMedia("(prefers-reduced-motion: reduce)").matches ? '<set attributeName="cx" to="254"/><set attributeName="cy" to="100"/>' : '<animateMotion dur="18s" repeatCount="indefinite"><mpath href="#run-loop"/></animateMotion>'}</circle></svg><span class="map-label">LOOP / EASY EFFORT</span></div>`,
    );
  if (type === "ats")
    return visualShell(
      type,
      "ONE APPLICATION, THROUGH THE PIPELINE",
      `<div class="ats-board">${["SUBMITTED", "IN REVIEW", "DECISION"].map((stage, i) => `<div class="ats-column"><div class="ats-label"><i></i>${stage}<span>${i === 0 ? "01" : "00"}</span></div><div class="candidate-slot" data-slot="${i}">${i === 0 ? candidateCard() : ""}</div></div>`).join("")}</div><div class="study-actions"><button class="study-action" id="advance-application">Move application →</button><button class="study-action reject-action" id="reject-application">Reject applicant ×</button></div>`,
    );
  if (type === "topics")
    return visualShell(
      type,
      "FROM DISCUSSION TO TOPICS",
      `<div class="topic-map"><svg viewBox="0 0 600 190" aria-hidden="true"><g stroke="#8b9a712d" stroke-dasharray="3 5"><path d="M105 105L300 60L490 112L105 105M300 60L315 150"/></g>${[
        [105, 105],
        [300, 60],
        [490, 112],
      ]
        .map(([x, y], j) =>
          Array.from({ length: 16 }, (_, i) => {
            const a = i * 2.399,
              r = 12 + Math.sqrt(i) * 10;
            return `<circle cx="${x + Math.cos(a) * r}" cy="${y + Math.sin(a) * r}" r="${2 + (i % 3)}" fill="${["#e6b583", "#b4c298", "#87afb0"][j]}" opacity="${0.35 + (i % 4) * 0.15}"/>`;
          }).join(""),
        )
        .join(
          "",
        )}</svg><button class="topic-cluster cluster-one" data-topic="Campus life: housing, dining, student organizations, and everyday university life.">Campus life <span>↗</span></button><button class="topic-cluster cluster-two" data-topic="Academics: classes, assignments, study strategies, and academic interests.">Academics <span>↗</span></button><button class="topic-cluster cluster-three" data-topic="Careers: internships, recruiting, interviews, and professional development.">Careers <span>↗</span></button></div>`,
    );
  if (type === "odds")
    return visualShell(
      type,
      "COMPARE THE SAME PLAYER, STAT, AND LINE",
      `<div class="prop-label"><span>EXAMPLE PLAYER · POINTS</span><strong>OVER 24.5</strong><span class="same-line">SAME LINE ✓</span></div><div class="odds-table"><div class="odds-row heading"><span>SOURCE</span><span>AMERICAN ODDS</span><span>IMPLIED PROBABILITY</span></div><div class="odds-row"><span>Book A</span><b>−110</b><span><i style="--prob:52.4%"></i>52.4%</span></div><div class="odds-row best"><span>Book B <small>BETTER PRICE</small></span><b>+110</b><span><i style="--prob:47.6%"></i>47.6%</span></div></div><p class="odds-explanation">A higher payout implies a lower break-even probability. Comparing prices starts with matching the exact line.</p>`,
    );
  if (type === "retrieval")
    return visualShell(
      type,
      "QUESTION → EVIDENCE → ANSWER",
      `<div class="query-bubble">“Help me investigate this transaction.”<span>ILLUSTRATIVE QUESTION</span></div><div class="evidence-flow"><button class="diagram-node" data-explain="Retrieval finds relevant source information for the question."><span>01 / RETRIEVE</span><b>Source documents</b><small>Vector retrieval</small></button><span class="flow-plus">+</span><button class="diagram-node" data-explain="SQL aggregates structured data precisely instead of relying on a language model to do the arithmetic."><span>02 / CALCULATE</span><b>Structured records</b><small>PostgreSQL / SQL</small></button><span class="flow-plus">→</span><button class="diagram-node" data-explain="The response combines source context and calculated results. This diagram explains the architecture, not a live internal tool."><span>03 / RESPOND</span><b>Supported answer</b><small>Context + exact results</small></button></div>`,
    );
  if (type === "audio")
    return visualShell(
      type,
      "AUDIO → FEATURES → QUALITY CONTROL",
      `<div class="audio-pipeline"><div class="wave-input"><span>SYNTHETIC AUDIO</span><div>${Array.from({ length: 39 }, (_, i) => `<i style="--h:${12 + Math.abs(Math.sin(i * 1.31)) * 41}px;--delay:${i * 0.04}s"></i>`).join("")}</div></div><div class="audio-stages"><button class="diagram-node" data-explain="Local Whisper transcription turns audio into text without displaying participant recordings here."><span>01</span><b>Transcribe</b><small>Local Whisper</small></button><button class="diagram-node" data-explain="Acoustic extraction measures features such as pitch variability and onset rate for exploratory analysis."><span>02</span><b>Extract features</b><small>Librosa / Pandas</small></button><button class="diagram-node" data-explain="Quality checks flag coverage gaps and suspicious transcripts before analysis. This is not a clinical diagnosis."><span>03</span><b>Check quality</b><small>Coverage + transcript QA</small></button></div></div>`,
    );
  return visualShell(
    "sensor",
    "SENSOR FRAME → PROCESS → CHECK",
    `<div class="sensor-flow"><div class="sensor-grid" aria-label="Illustrated sensor image">${Array.from({ length: 64 }, (_, i) => `<i style="opacity:${0.12 + ((i * 17 + 7) % 37) / 46}"></i>`).join("")}</div><span class="flow-plus">→</span><div class="sensor-stages"><button class="diagram-node" data-explain="ETL turns sensor-image inputs into consistently structured data for downstream workflows."><span>01 / ETL</span><b>Process frames</b><small>Python pipelines</small></button><button class="diagram-node" data-explain="Automated checks and container-based workflows help keep processing reproducible."><span>02 / VERIFY</span><b>Test & export</b><small>Checks / Docker / CI</small></button></div></div>`,
  );
}
function candidateCard(outcome = "") {
  return `<div class="candidate-card"><span class="candidate-avatar">A</span><div><b>Sample applicant</b><small>Application #028</small>${outcome ? `<span class="candidate-outcome">${outcome}</span>` : ""}</div><span class="candidate-paper">▤</span></div>`;
}
function wireVisual(type) {
  const study = document.querySelector(".visual-study");
  if (!study) return;
  study.querySelectorAll("[data-topic],[data-explain]").forEach((button) =>
    button.addEventListener("click", () => {
      study
        .querySelectorAll("[data-topic],[data-explain]")
        .forEach((b) => b.classList.remove("chosen"));
      button.classList.add("chosen");
      study.querySelector("figcaption").textContent =
        button.dataset.topic || button.dataset.explain;
    }),
  );
  if (type === "ats") {
    let stage = 0;
    let outcome = "";
    const move = study.querySelector("#advance-application");
    const reject = study.querySelector("#reject-application");
    function update() {
      study.querySelectorAll("[data-slot]").forEach((slot, i) => {
        slot.innerHTML = i === stage ? candidateCard(outcome) : "";
      });
      study.querySelectorAll(".ats-label span").forEach((count, i) => {
        count.textContent = i === stage ? "01" : "00";
      });
      study.classList.toggle("has-rejection", outcome === "Rejected");
      move.textContent = stage === 2 ? "Start over ↺" : "Move application →";
      reject.disabled = outcome === "Rejected";
      study.querySelector("figcaption").textContent = outcome
        ? "Application #028: rejected. Start over to try the workflow again."
        : `Application #028: ${["submitted", "in review", "awaiting decision"][stage]}.`;
    }
    move.addEventListener("click", () => {
      stage = stage === 2 ? 0 : stage + 1;
      outcome = "";
      update();
    });
    reject.addEventListener("click", () => {
      stage = 2;
      outcome = "Rejected";
      update();
    });
  }
}
