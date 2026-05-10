# Claude Camp — Editorial Image Prompts (ChatGPT / DALL-E 3)
## Design Direction: Typographic / Stripe Press Aesthetic
### Converted from Midjourney v6 format for DALL-E 3

---

## Tips for Getting the Best Results from DALL-E 3

1. **Always say "photograph of" not just describe a scene.** DALL-E 3 defaults to illustration or render if you don't anchor it. Begin prompts with "A photograph of..." or "An editorial photograph of..." to lock it into realistic photographic output.

2. **Be explicit about what should NOT appear.** DALL-E 3 tends to add people, text overlays, watermarks, or generic stock-photo elements unless you actively exclude them. End every prompt with "No text, no watermarks, no logos" and call out unwanted elements mid-prompt (e.g. "no people visible").

3. **Describe aspect ratio in plain language — do not use ratio notation.** DALL-E 3 ignores `--ar` flags. Instead use: "wide landscape format" (16:9), "standard landscape format" (3:2), "portrait orientation" (4:5), or "square crop" (1:1). In the ChatGPT interface, select **Landscape 4:3** from the aspect ratio dropdown for all editorial stills — this gives the horizontal 3:2 feel. All editorial images should be **horizontal format, minimum 1800px wide**.

---

## 1. Hero Background Texture

**Filename:** `hero-texture.jpg`

**Used in:** Full-bleed background behind the hero section. Sits beneath large white Cormorant Garamond italic type on a near-black (#0D0D0D) overlay. Must read as dark, quiet, and atmospheric — texture only, no focal subject competing with type.

**Alt text:** `Dark textured surface with faint organic grain, deep forest tones`

**Prompt:**
```
A close-up macro photograph of aged teak wood grain and dark moss, in wide landscape format. The tones are near-black with subtle warm earth undertones — very dark, very still. Diffused overcast lighting with no bright highlights, no hotspots. The surface is completely flat, shot straight down. Extremely fine organic grain texture, natural imperfections in the wood, muted muted pigments of charcoal, deep umber, and forest green. Medium format film quality with rich tonal depth and subtle analog film grain texture. Editorial texture study aesthetic, in the style of Kinfolk magazine photography. Contemplative and still. No people, no text, no watermarks, no objects — pure surface texture only.
```

**Notes:** Desaturate to 15–20% in post and overlay a dark vignette. The grain from this image + an SVG noise layer compound perfectly for the editorial texture feel without a busy background.

---

## 2. Editorial Place Shot — The Farm & Landscape

**Filename:** `editorial-pai-landscape.jpg`

**Used in:** Single large image in the "place" section of the site — likely below the hero, introducing Pai and the farm. Treated as a magazine travel spread. Can bleed full-width or be cropped to a tall portrait with generous white space.

**Alt text:** `Bamboo bungalows on a hillside farm at golden hour, jungle canopy rolling into misty mountains, Pai valley, Northern Thailand`

**Prompt:**
```
An editorial travel photograph of a bamboo bungalow with a thatched roof on a raised wooden deck overlooking terraced farmland, in standard landscape format (3:2 proportions). Warm late-afternoon sunlight coming from the side, raking golden light across rice paddies and casting long shadows. Dense jungle canopy descends into a valley below. Soft blue-grey mountain ridges fade into atmospheric haze in the far distance — Northern Thailand, Mae Hong Son province. The air is still. A faint wisp of smoke rises from a distant fire. A single small human figure is barely visible on the deck, too far away to make out clearly. Analog film quality with rich tonal depth, subtle film grain, warm amber shadows, slightly soft focus edges. Editorial travel photography style, the aesthetic of National Geographic meets Monocle magazine — unhurried, quiet, deeply atmospheric. No text, no watermarks, no logos.
```

---

## 3. Person at Work — Coding in Nature

**Filename:** `editorial-coding-in-nature.jpg`

**Used in:** Anchors the "what you'll actually do" section — the moment of flow: a person working on code surrounded by jungle. Conveys the promise of the retreat: focused, calm, connected to place. Not a stock photo. Editorial framing with strong natural light.

**Alt text:** `European man working at a laptop on an open bamboo deck, jungle canopy behind, morning light, focused and calm`

**Prompt:**
```
An editorial photograph of a contemplative European man in his late 30s sitting cross-legged on a raised teak wooden deck of a bamboo bungalow, in standard landscape format (3:2 proportions). He is wearing a light linen shirt and has a laptop open in front of him. Soft morning light filters through the jungle canopy overhead, casting dappled moving shadows across his forearms and the deck. Dense tropical green foliage fills the background. A ceramic mug with faint steam curling upward sits beside the laptop. The camera angle is low and slightly to the side — intimate and grounded. The background jungle is blurred to a soft painterly out-of-focus quality, as if shot at a wide aperture with a 50mm lens. Medium format film quality with rich tonal depth, warm analog tones, subtle film grain. The mood is quiet concentration, stillness, flow state. In the style of editorial lifestyle photography — not stock, not posed. No text, no watermarks, no logos.
```

---

## 4. Detail / Still-Life — The Iconic Desk Moment

**Filename:** `editorial-laptop-deck-detail.jpg`

**Used in:** The hero detail shot — or used as a secondary image alongside the pricing/offer section. This is the single most important image for converting visitors: the laptop on the teak deck with hot springs steam, Claude Code on screen. Product-editorial quality — the kind of image that makes someone immediately want to be there.

**Alt text:** `MacBook laptop on aged teak deck planks, steam rising from a ceramic cup, jungle edge soft in background, warm morning light`

**Prompt:**
```
An editorial still-life photograph of a MacBook laptop open on weathered teak wooden deck planks, in standard landscape format (3:2 proportions). The laptop screen shows a dark terminal interface with faint green text — a coding environment. A handmade ceramic mug with faint steam curling upward sits beside it. Two white frangipani flowers rest casually near the keyboard. In the background, dense green jungle foliage is soft and blurred — shot at very shallow depth of field so the background dissolves into smooth green. Warm early morning sunlight rakes in from the side, catching the wood grain and casting a thin shadow of bamboo across the lower deck planks. The lighting is warm and golden — the quality of light at 7am in a tropical jungle. Medium format film quality, rich tonal depth, warm analog color grading, subtle film grain texture. In the style of Kinfolk magazine product photography — quiet luxury, unhurried, beautiful without being precious. No people visible, no text overlays, no watermarks, no logos.
```

---

## Usage Notes

- All four images should be run through the same Lightroom preset or LUT to unify color temperature (warm shadows, desaturated mids, deep blacks).
- Target: 2800–3200K warmth in shadows, clean highlights, no clipped whites.
- **Export at 1800px wide minimum** (3:2 ratio = 1800×1200px). For hero/full-bleed use, target 2400×1600px. In ChatGPT, select **Landscape 4:3** from the aspect ratio dropdown — this is the closest option to 3:2 and gives you the horizontal editorial format. After generating, crop to exact 3:2 in post if needed.
- The texture (hero-texture.jpg) can also be tiled or used as a CSS background with `background-size: cover` behind sections where the SVG noise alone isn't enough.
- For the coding shot, if DALL-E renders the screen illegibly or with fake/garbled text, use the generated image as a base and inpaint a realistic dark IDE/terminal view in post (Photoshop generative fill or a manual composite works well).
- DALL-E 3 in ChatGPT allows you to click "Edit image" after generation to refine specific areas — useful for fixing the laptop screen, adjusting the steam, or darkening the background without regenerating the whole image.
