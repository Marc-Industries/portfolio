#!/usr/bin/env bash
# =============================================================================
# Asset generation pipeline for the Matteo Marcon portfolio.
# Generates hero/section stills with Higgsfield (nano_banana, 1 credit each).
# All prompts enforce the red/black cinematic palette.
# =============================================================================
set -e

cd "$(dirname "$0")"
mkdir -p assets/img assets/video

# Single helper: $1 = name, $2 = prompt, $3 = aspect (default 16:9)
gen() {
  local name="$1" prompt="$2" aspect="${3:-16:9}"
  echo "→ ${name} (${aspect})"
  higgsfield generate create nano_banana \
    --prompt "$prompt" \
    --aspect-ratio "$aspect" \
    --json 2>&1 | tail -3
}

# ----- HERO -----
gen hero-satellite \
  "Cinematic wide shot of a sleek modern CubeSat satellite orbiting above a dark earth at night, city lights glowing crimson red below, deep black space, subtle volumetric atmosphere, thin technical orbital line traced in red, photoreal, 8k, dramatic side lighting, mission control aesthetic, no text, no logos"

gen hero-engineer-console \
  "Cinematic portrait of a young aerospace engineer silhouette sitting at a mission control console bathed in red light, multiple curved monitors showing telemetry and 3D orbit visualizations, deep black room, volumetric haze, dramatic rim lighting, photoreal, 8k, no text, no logos"

# ----- AEROSPACE -----
gen aerospace-cubesat-bp \
  "Studio shot of a 1U CubeSat engineering model on a black velvet surface, dramatic red rim lighting, blueprint schematic overlay floating behind it in faint red lines, photoreal product photography, shallow depth of field, no text, no logos"

gen aerospace-fem-vibration \
  "Abstract visualization of finite element analysis modal shapes on a CubeSat structure, red wireframe over black background, deformation exaggerated, technical CAD style, dark moody lighting, no text, no logos"

gen aerospace-launch-pad \
  "Dramatic low-angle shot of a small rocket on a launch pad at night bathed in red floodlights, vapor venting, dark sky with stars, cinematic anamorphic lens, photoreal, no text, no logos"

# ----- MBSE / BEPI -----
gen mbse-digital-twin \
  "Abstract 3D digital twin visualization of a satellite, surrounded by interconnected glowing red nodes and lines representing system engineering data, requirements and interfaces, dark black void background, holographic look, no text, no logos"

gen mbse-dashboard \
  "Wide cinematic shot of a futuristic mission control dashboard on a massive curved screen, red and black UI, data flowing, 3D orbit visualization, holographic panels, photoreal, no text, no logos"

# ----- SOFTWARE -----
gen software-architecture \
  "Dramatic dark shot of a 3D holographic software architecture diagram floating in space, layers labeled as frontend API backend database, red glowing connection lines, deep black void, photoreal, no text, no logos"

gen software-code-rain \
  "Abstract visualization of code data flowing through a 3D network, red particles streaming through glowing nodes, dark void, cinematic depth of field, no text, no logos"

# ----- AI & AUTOMATION -----
gen ai-neural-network \
  "Abstract 3D neural network visualization, glowing red nodes connected by translucent data streams, dark void, deep perspective, cinematic, no text, no logos"

gen ai-workflow-loop \
  "Circular workflow diagram floating in dark space, red glowing nodes connected in a loop, automation visualization, photoreal render, no text, no logos"

# ----- PROJECTS — flagship 3D hero stills -----
gen proj-bepi \
  "Cinematic shot of a glowing red wireframe 3D satellite model inside a translucent digital cube, surrounded by floating data panels, deep black background, mission control aesthetic, photoreal, no text, no logos"

gen proj-albasat \
  "Hero shot of a CubeSat structure model in cleanroom lighting with dramatic red accent lights, technical render, photoreal product photography, dark background, no text, no logos"

gen proj-space-mission \
  "Wide cinematic shot of a spacecraft near Mars orbit, dramatic red planet below, deep black space, photoreal, mission poster aesthetic, no text, no logos"

gen proj-drivegen \
  "Abstract visualization of a cloud of documents being generated and flowing into a red glowing drive icon, dark void, photoreal, no text, no logos"

gen proj-instant-translate \
  "Floating 3D network of language symbols connected by red glowing data streams, dark void, multilingual typography floating, cinematic, no text legible"

gen proj-vsl-visualizer \
  "Cinematic visualization of a video content pipeline as 3D glowing nodes connected in a flow chart, red and black, dark void, no text"

gen proj-poodl-timezone \
  "Dramatic 3D globe with red glowing time zone arcs sweeping across continents, dark void, deep perspective, photoreal, no text, no logos"

gen proj-fullship \
  "Cinematic visualization of shipping containers and logistics data flowing through a 3D network, red accent lighting, dark warehouse, no text, no logos"

gen proj-spese-smart \
  "Abstract 3D financial data visualization, glowing red charts and particles floating in a dark void, no text, no logos"

gen proj-neurolex \
  "Abstract 3D brain network with glowing red neural connections forming vocabulary patterns, dark void, cinematic, no text, no logos"

gen proj-ghl-orchestrator \
  "Visualization of an event-driven lead distribution pipeline, red glowing data packets moving through routing nodes, dark void, photoreal, no text"

# ----- ABOUT / IDENTITY -----
gen about-hologram \
  "Cinematic shot of a holographic 3D human silhouette in profile surrounded by floating red data panels and orbital lines, deep black void, photoreal, no text, no logos"

gen about-hands-keyboard \
  "Close-up cinematic shot of an engineer's hands typing on a black keyboard bathed in red light, multiple monitors in the background showing 3D orbital visualizations, photoreal, no text"

# ----- EXPERIENCE / EDUCATION -----
gen experience-padua \
  "Dramatic architectural shot of an Italian university building at night, red accent lights, cinematic, photoreal, no text, no logos"

gen education-graduate \
  "Symbolic shot of an engineer holding a CubeSat model on a podium with a single red spotlight, dark background, photoreal, no text, no logos"

# ----- CONTACT -----
gen contact-cta \
  "Cinematic visualization of a single bright red light at the end of a long dark corridor, mission-control aesthetic, photoreal, no text, no logos"

gen og-image \
  "Square hero image suitable for social media preview, CubeSat orbiting red earth at night, mission control aesthetic, dramatic, no text, no logos"

echo ""
echo "Done generating all images. Check assets/img/ and Higgsfield UI for downloads."
