# claudecamp.org — Zen Direction: Image Generation Prompts for ChatGPT (DALL-E 3)
*Rewritten from the Midjourney v6 source. All Midjourney flags removed. Prompts use explicit natural language for DALL-E 3.*

---

## Tips for DALL-E 3: Fighting the "Fill the Frame" Problem

DALL-E 3's default instinct is to pack the frame with visual information — it considers negative space "wasted." For minimal/zen aesthetics, you have to explicitly override this at every step. Three things that actually work:

1. **Repeat the negative space instruction twice, in different words.** DALL-E weighs repeated concepts more heavily. Don't just say "negative space" — say it once as a spatial instruction ("the upper two-thirds of the frame is empty") and again as a tonal instruction ("large area of soft, out-of-focus, pale light with no objects or detail"). One instruction often gets ignored; two in different forms tend to stick.

2. **Name a specific editorial reference alongside the aesthetic.** Saying "Kinfolk magazine photography" or "Monocle travel editorial" primes a stylistic register that DALL-E has learned tends to be restrained and quiet. Pair it with "minimal Japanese aesthetic" or "wabi-sabi composition" — these act as vocabulary anchors that suppress the model's tendency toward drama and clutter.

3. **Use the phrase "almost nothing in the frame."** It sounds blunt but it works. Phrases like "sparse," "empty," "minimal" are underweighted. "Almost nothing in the frame except [subject]" is concrete enough that DALL-E treats it as a hard compositional rule rather than a vague stylistic preference. If the result still comes back too busy, add: "Do not add decorative elements, props, or background detail beyond what is described."

---

## Direction Note

This design uses images as punctuation, not wallpaper. Every image should feel like it was found, not staged — the way a good travel magazine uses a single well-chosen frame to make you feel a place rather than describe it. Think *Kinfolk*, *Monocle*, *Cereal*, early *Apartamento*.

**What works:**
- Extreme negative space — subject occupies 20–35% of frame, the rest breathes
- Analog warmth: soft film grain, slight halation, warm color cast characteristic of Kodak Portra
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
A single handmade ceramic tea cup photographed in portrait orientation, taller than wide. The cup has a matte off-white glaze with subtle celadon green undertones and sits on worn teak planks of a raised bamboo deck in northern Thailand. Early morning. Soft diffused light enters from the left, creating gentle warmth with no harsh shadows. Shallow depth of field — the background dissolves entirely into a pale warm blur of out-of-focus jungle canopy. Almost nothing in the frame except the cup. The cup sits in the lower-left third of the image; the upper two-thirds is empty, filled only with soft blurred light and faint bokeh — no objects, no detail, no decoration. Large area of empty, pale, luminous space occupying the upper portion of the frame. Wabi-sabi composition. Quiet and contemplative. No people, no text. Soft analog film photography style: gentle film grain, lifted blacks, muted earth tones, slightly warm color cast, analog texture. Kinfolk magazine photography style, minimal Japanese aesthetic, editorial still life photography.
```

---

## Image 2 — Stillness (Farm at Dawn)

**Filename:** `stillness-dawn.jpg`

**Used:** Full-width section break between the "A Day in Pai" narrative and the pricing/offer section. Runs at around 40–50vh height, object-fit cover, slightly desaturated in CSS to push it further toward the background. This image should feel like a pause — the page takes a breath here.

**Alt text:** `Empty bamboo deck at dawn, Pai mountain farm, mist hanging over jungle valley below, no one awake yet`

### Prompt

```
An empty raised bamboo deck with a thatched roof overhang on a small mountain farm in Pai, Mae Hong Son Province, northern Thailand. Landscape format, wider than tall. Pre-dawn blue hour — the moment just before sunrise when the world is blue-grey and absolutely still. Thin mist hangs in soft horizontal layers over terraced farmland and jungle canopy in the valley below. Two simple wooden chairs are left empty on the deck; a cloth is draped loosely over the railing. No people. The scene has the feeling of a long exposure — smooth, breathless, unhurried. Colors are barely saturated: fog white, raw timber, muted deep green, pale grey-blue sky. The horizon sits on the lower third of the frame; sky and mist occupy the upper two-thirds. Almost nothing in the frame except stillness. Soft analog film photography style: fine film grain, lifted blacks, muted cool tones with slight warmth in the wood, very low saturation overall, analog texture. Kinfolk magazine editorial, minimal Japanese aesthetic, wabi-sabi composition. Like a breath held before dawn.
```

---

## Image 3 — Portrait of Connection (Sasha & Ying)

**Filename:** `sasha-ying-portrait.jpg`

**Used:** Small, intimate portrait in the "About" or "Your Hosts" section. Displayed at roughly 320×400px, left-aligned, with text running to the right. The image should feel like you accidentally came across it — like a photo someone keeps in their wallet.

**Alt text:** `Sasha and Ying sitting together on farm steps, candid and relaxed, northern Thailand`

### Prompt

```
A candid photograph of two people sitting together on worn wooden farm steps in a northern Thailand garden setting. Portrait orientation, taller than wide. The man is Western European, late thirties, relaxed and unguarded, wearing simple undyed linen or cotton clothing. The woman is Thai, warm and grounded, also in simple natural-colored clothing. Neither person is looking at the camera — they are mid-conversation, looking slightly to the side or at each other, with completely natural expressions. No posed smiles, no awareness of the camera. Hands are visible and relaxed. Dappled shade from bamboo overhead creates soft, uneven light across both figures. Late morning light, gentle and diffused. Shallow depth of field — the background garden blurs softly. The subjects occupy the center-left third of the frame with breathing room on all edges. Do not crop tightly. Soft analog film photography style: slight color fade, gentle film grain, warm analog tones, muted saturation, lifted blacks, analog texture. Kinfolk magazine editorial style. Intimate, unhurried. Like a photograph from someone's personal archive, not a professional shoot.
```

---

## Image 4 — Detail / Object Study

**Filename:** `object-study.jpg`

**Used:** Optional accent in the "The Work" or "What You'll Build" section — sits alongside a short text block to break the grid and add tactile warmth. Could also be used as a secondary accent in the footer area. Very small on the page, maybe 200px wide.

**Alt text:** `Bare feet on weathered wooden slats, laptop open just out of frame, morning light, wooden deck in jungle`

### Prompt

```
Bare feet photographed in square format, one ankle crossed loosely over the other, resting on weathered teak deck slats of a raised bamboo platform in northern Thailand. Completely unhurried and still. Morning light rakes gently across the wood grain from one side, revealing the texture of the timber. At the very edge of the lower-right corner of the frame, a laptop is barely visible — entirely out of focus, just a hint of its presence, nothing more. Almost nothing in the frame except the feet and the wood. The feet occupy only the lower third of the image; the upper two-thirds is empty — blurred canopy light, soft warm air, and bare wood tone with no objects or clutter. Large area of empty, out-of-focus, warm-toned space occupying the upper portion of the frame. Do not add any other objects, decorations, or props. Soft analog film photography style: gentle film grain, soft focus at the edges, desaturated highlights, muted warm palette, lifted blacks, analog texture. Wabi-sabi composition. Minimal Japanese aesthetic. Like a detail from a Japanese design annual.
```

---

## Usage Notes

- All four images should be processed consistently in post: slight desaturation (−10 to −15%), lifted blacks (+5 to +8), no sharpening. This creates a cohesive film-like palette across the page.
- Images 1 and 4 work equally well converted to near-monochrome if the color feels too warm against the site's off-white palette — test both.
- Image 3 (portrait) is the most important to get right. If it feels staged or stock-like, regenerate. The test: does it look like it came from someone's personal archive? If yes, use it.
- For DALL-E 3 reruns: if a result comes back too busy or too saturated, prepend your prompt with: "Do not add decorative elements, props, or background detail beyond what is described." This acts as a hard constraint on DALL-E's tendency to embellish.
