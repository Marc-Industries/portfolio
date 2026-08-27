# Phase 6 — Hero generation prompts

Final prompts after prompt-laws pass. Law 6 says vertical motion matches the scroll axis, so the hero is a slow push-in (the satellite gets closer as you scroll down — reads as "approaching"). Law 7 says compose for layout: subject bisects the frame slightly right of center, captions live in the left lane.

---

## Step 1 — Cost preflight

| Asset | Model | Params | Approx cost |
|---|---|---|---|
| Hero starting frame | `flux_2` | 16:9, 2k | ~2 credits |
| Hero video | `veo3_1_lite` | 1080p, 6s, standard, no audio | ~10 credits |
| Hero video (alt) | `seedance_2_0_mini` | 1080p, 6s | ~12 credits |
| Supporting still S1 | `nano_banana_2_lite` | 1:1 | ~1 credit |
| Supporting still S2 | `nano_banana_2_lite` | 1:1 | ~1 credit |
| Supporting still S3 | `nano_banana_2_lite` | 1:1 | ~1 credit |
| Supporting still S4 | `seedream_v5_lite` | 1:1 | ~1 credit |
| **Total** | | | **~17 credits** |

`get_cost: true` runs first — free — and confirms these before anything spends.

---

## Step 2 — Hero starting frame (image, 16:9, 2k, ~2 credits)

**Model:** `flux_2`
**Aspect:** 16:9
**Save as:** `assets/img/hero-frame.jpg` (then later ffmpeg-extracted to `assets/img/hero-poster.jpg`)

```
A sleek modern CubeSat satellite positioned at frame-right-of-center, bisecting
the frame so the right edge of the satellite is the same distance from the right
edge of the image as the right edge of the satellite's solar panel is from the
left edge of the frame. The satellite is composed as the first moment of a
slow forward push-in toward the camera. Behind it, a dark Earth at night fills
the entire frame edge to edge, city lights glowing crimson red below a curved
limb, deep black space continuing the same edge-to-edge world across the top.
Subtle volumetric atmosphere drifts along the orbital plane. A thin technical
orbital trail traces in faint red across the left third. Lighting: a single
warm-red rim light from frame right catches the satellite's solar panels, with
a soft fill from Earth-shine below. Palette: deep black void, crimson city
lights, blood-red rim light, off-white specular highlights on aluminum edges.
The left third of the frame is a continuous world, soft shadow and receding
depth, with no bright highlights or objects in that region. Cinematic,
photorealistic, 8k resolution. No text, no logos, no lettering anywhere.
```

Why this phrasing:
- "bisecting the frame so the right edge of the satellite is the same distance from the right edge" — Law 7 symmetric trap, prevents side panels.
- "edge to edge" repeated three times — Law 7 empty-darkness trap.
- "composed as the first moment of a slow forward push-in toward the camera" — Law 1 motion agrees with scroll.
- "left third of the frame is a continuous world, soft shadow" — Law 7 caption-safe negative space, described as part of the world.
- "no text, no logos, no lettering anywhere" — Law 12.

---

## Step 3 — Hero video (1080p, 6s, standard, no audio, ~10 credits)

**Model chosen:** `veo3_1_lite` (cheaper, legitimate, gives more headroom)
**Image-to-video** using the approved hero-frame.jpg as `start_image`.

```
One continuous shot, no cuts. The CubeSat satellite slowly approaches the
camera along a steady forward trajectory along the same orbital path it sat
on in the start frame. The satellite stays alive throughout: subtle solar
panel micro-adjustments, faint thermal-shield shimmer. The scene stays alive:
Earth rotates slowly beneath, orbital trail draws itself faintly in red across
the left third of the frame, city lights pulse softly. The camera push-in
continues through the entire 6 seconds, slowing gently as it arrives. The shot
ends at rest: the CubeSat centered slightly right, fully composed against the
red-lit Earth limb, solar panels catching the rim light at a sharp angle, the
orbital trail now a clear red arc behind it. No text, no logos, no lettering
anywhere.
```

Why this phrasing:
- "slowly approaches the camera" + "steadily forward trajectory" — Law 1, vertical-ish axis, reads as down scroll = approaching.
- "stays alive throughout" + "scene stays alive" — Law 3 lock the path, free the body.
- "ends at rest" with composed final frame explicitly described — Law 4.
- "along the same orbital path it sat on in the start frame" — Law 2 one continuous motion.
- No boundary crossing (Law 8 not applicable).

---

## Step 4 — Supporting stills (1:1, ~1 credit each)

### S1 — Aerospace supporting still
**Save as:** `assets/img/still-aerospace.jpg`
```
Studio shot of a 1U CubeSat engineering model in a cleanroom, dramatic red
rim lighting from the left, blueprint schematic overlay floating behind it in
faint red lines on a black background, photoreal product photography, shallow
depth of field, dark moody atmosphere. No text, no logos, no lettering
anywhere.
```

### S2 — MBSE / BEPI supporting still
**Save as:** `assets/img/still-mbse.jpg`
```
Cinematic visualization of a glowing red wireframe 3D satellite model inside
a translucent digital cube, surrounded by floating translucent data panels,
deep black void background, mission control aesthetic, photoreal render,
volumetric light, dark atmosphere. No text, no logos, no lettering anywhere.
```

### S3 — AI / Automation supporting still
**Save as:** `assets/img/still-automation.jpg`
```
Circular workflow diagram floating in dark space, five glowing red nodes
connected in a closed loop with animated red data packets flowing between them,
deep black void, photoreal render, soft volumetric haze. No text, no logos,
no lettering anywhere.
```

### S4 — About / Mission control supporting still
**Save as:** `assets/img/still-about.jpg`
```
Close-up cinematic shot of an engineer's hands resting on a black desk in
front of a black keyboard bathed in red light from a single off-frame source,
multiple curved monitors in the soft background showing orbital visualizations,
shallow depth of field, photoreal, dark moody atmosphere. The hands are at
rest, not typing. No text legible on any screen, no logos, no lettering
anywhere.
```

(Each still uses the same palette as the hero frame: deep black void, crimson
primary, blood-red rim light, off-white specular. They will read as the same
world on the page.)

---

## Step 5 — Inspection (myself, not the user)

After each asset lands, I check:
- **Image:** no sneaked trademarks (NASA, ESA, SpaceX, Boeing, etc.), no broken anatomy on S4 (hands look like hands, 5 fingers), composition matches the storyboard.
- **Video:** extract frames at t=0.0, t=3.0, t=6.0 with ffmpeg. Confirm:
  - motion is continuous (no cuts, no flicker)
  - final frame matches the planned composed ending
  - satellite stays alive (no frozen-frames mid-shot)
  - left-third remains caption-safe throughout
- **Brand coherence:** every still uses the same palette and lighting grade as the hero frame.

If any check fails, I re-roll the specific asset. The video gate (user approval) is only invoked AFTER my own inspection passes.

---

## Step 6 — Video gate

Per `references/scrub-pipeline.md` and the skill's standing rule: silent
scaffolding during the render wait is fine, but nothing is shown to the user
until they watch the video and approve. I save the video to
`review/hero.mp4` (OUTSIDE the deploy folder) and wait for user sign-off.
