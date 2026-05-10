# claudecamp.org — Zen Direction: AI Image Generation Prompts
*Midjourney v6 prompts for the minimal/zen design variant*

---

## Direction Note

This design uses images as punctuation, not wallpaper. Every image should feel like it was found, not staged — the way a good travel magazine uses a single well-chosen frame to make you feel a place rather than describe it. Think *Kinfolk*, *Monocle*, *Cereal*, early *Apartamento*.

**What works:**
- Extreme negative space — subject occupies 20–35% of frame, the rest breathes
- Analog warmth: film grain, slight halation, Kodak Portra's characteristic skin tones
- Available light only — no flash, no blown highlights, no dramatic shadows
- Mundane subjects made sacred by framing and light
- Muted, low-saturation palette — warm whites, raw linen, fog grey, weathered wood

**What to avoid:**
- Golden hour drama or saturated sunsets
- Anything that looks like a stock photo or tourism brochure
- Smiling-at-camera portraits
- Technology shown as technology (no glowing screens, no keyboard closeups with LED backlight)
- Wide establishing shots — this is not landscape photography
- Perfect grooming, staged styling, or obviously arranged objects

---

## Image 1 — Hero Accent Detail

**Filename:** `hero-detail.jpg`

**Used:** Small inset image in the hero section, sitting quietly in the right column or lower-right quadrant alongside the headline and sub-text. Approximately 280–340px wide on desktop. It anchors the whitespace without competing with the typography.

**Alt text:** `Ceramic cup of tea resting on weathered teak, soft morning light from the left, Pai mountain farm`

### Prompt

```
A single handmade ceramic tea cup, matte glaze in off-white with subtle celadon undertones, resting on worn teak planks of a raised bamboo deck in northern Thailand, early morning, soft diffused light entering frame from left, shallow depth of field, background dissolves into pale warm blur of jungle canopy, extreme negative space — cup occupies lower-left third of frame, upper two-thirds pure blurred light and bokeh, wabi-sabi aesthetic, quiet and contemplative, shot on Leica M6, 50mm Summicron, Kodak Portra 400, film grain, analog warmth, muted earth tones, no people, no text --ar 4:5 --style raw --v 6
```

---

## Image 2 — Stillness (Farm at Dawn)

**Filename:** `stillness-dawn.jpg`

**Used:** Full-width section break between the "A Day in Pai" narrative and the pricing/offer section. Runs at around 40–50vh height, object-fit cover, slightly desaturated in CSS to push it further toward the background. This image should feel like a pause — the page takes a breath here.

**Alt text:** `Empty bamboo deck at dawn, Pai mountain farm, mist hanging over jungle valley below, no one awake yet`

### Prompt

```
Empty raised bamboo deck with thatched roof overhang on a small mountain farm, Pai Mae Hong Son Province northern Thailand, pre-dawn blue hour, thin mist hanging in layers over terraced farmland and jungle canopy in the valley below, two simple wooden chairs left empty, a cloth draped over the railing, absolute stillness, no people, long exposure feel, soft pre-dawn blue-grey light, colors barely saturated — fog white, raw timber, muted green, pale sky, shot on Hasselblad 500CM, 80mm Planar, Kodak Ektar 100 slightly underexposed, fine film grain, contemplative, like a breath held before dawn, rule of thirds horizon, Japanese aesthetic, Kinfolk magazine editorial --ar 3:2 --style raw --v 6
```

---

## Image 3 — Portrait of Connection (Sasha & Ying)

**Filename:** `sasha-ying-portrait.jpg`

**Used:** Small, intimate portrait in the "About" or "Your Hosts" section. Displayed at roughly 320×400px, left-aligned, with text running to the right. The image should feel like you accidentally came across it — like a photo someone keeps in their wallet.

**Alt text:** `Sasha and Ying sitting together on farm steps, candid and relaxed, northern Thailand`

### Prompt

```
Candid portrait of a couple — a Western European man in his late thirties, relaxed and unguarded, and a Thai woman, warm and grounded — sitting together on worn wooden farm steps, late morning, dappled shade from bamboo overhead, both looking slightly off-camera or at each other mid-conversation, natural body language, no pose, hands visible and relaxed, simple natural clothing in undyed linen and cotton, northern Thailand garden setting, organic textures, shallow depth of field, subject occupies center-left third of frame with breathing room on edges, shot on Contax G2, 45mm Planar, Fuji Pro 400H, slight color fade, film grain, warm analog tones, unhurried, intimate, like a letter from a friend, Kinfolk editorial style, no text --ar 4:5 --style raw --v 6
```

---

## Image 4 — Detail / Object Study

**Filename:** `object-study.jpg`

**Used:** Optional accent in the "The Work" or "What You'll Build" section — sits alongside a short text block to break the grid and add tactile warmth. Could also be used as a secondary accent in the footer area. Very small on the page, maybe 200px wide.

**Alt text:** `Bare feet on weathered wooden slats, laptop open just out of frame, morning light, wooden deck in jungle`

### Prompt

```
Bare feet, unhurried, resting on weathered teak deck slats of a raised bamboo platform in northern Thailand, one ankle crossed over the other, relaxed and still, a laptop just barely visible at the edge of the frame lower right, completely out of focus, morning light raking gently across the wood grain from the side revealing texture, extreme negative space — feet occupy only the lower third of frame, upper two-thirds is empty blurred canopy light and warm wood tones, no other objects, no clutter, contemplative and quiet, shot on Leica M6, 35mm Summicron, Kodak Portra 400, film grain, soft focus edges, desaturated highlights, muted warm palette, wabi-sabi, rule of thirds, like a detail from a Japanese design annual --ar 1:1 --style raw --v 6
```

---

## Usage Notes

- All four images should be processed consistently in post: slight desaturation (−10 to −15%), lifted blacks (+5 to +8), no sharpening. This creates a cohesive film-like palette across the page.
- Images 1 and 4 work equally well converted to near-monochrome if the color feels too warm against the site's off-white palette — test both.
- Image 3 (portrait) is the most important to get right. If it feels staged or stock-like, regenerate. The test: does it look like it came from someone's personal archive? If yes, use it.
- For Midjourney reruns: add `--seed [number]` after your first good result to get variations that stay in the same light and color space.
