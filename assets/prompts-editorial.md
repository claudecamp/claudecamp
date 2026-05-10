# Claude Camp — Editorial Image Prompts
## Design Direction: Typographic / Stripe Press Aesthetic
### Midjourney v6 · Style Raw · No text in image · No watermarks

---

## 1. Hero Background Texture

**Filename:** `hero-texture.jpg`

**Used in:** Full-bleed background behind the hero section. Sits beneath large white Cormorant Garamond italic type on a near-black (#0D0D0D) overlay. Must read as dark, quiet, and atmospheric — texture only, no focal subject competing with type.

**Alt text:** `Dark textured surface with faint organic grain, deep forest tones`

**Prompt:**
```
close macro texture of aged teak wood grain and dark moss, deep shadow, near-black tones with subtle warm undertones, flat lay, diffused overcast light, no highlights, extremely fine grain texture, organic imperfections, muted earth pigments, contemplative and still, medium format photography, shot on Phase One, editorial texture study, analog warmth, --ar 16:9 --style raw --v 6
```

**Notes:** Desaturate to 15–20% in post and overlay a dark vignette. The grain from this image + an SVG noise layer compound perfectly for the editorial texture feel without a busy background.

---

## 2. Editorial Place Shot — The Farm & Landscape

**Filename:** `editorial-pai-landscape.jpg`

**Used in:** Single large image in the "place" section of the site — likely below the hero, introducing Pai and the farm. Treated as a magazine travel spread. Can bleed full-width or be cropped to a tall portrait with generous white space.

**Alt text:** `Bamboo bungalows on a hillside farm at golden hour, jungle canopy rolling into misty mountains, Pai valley, Northern Thailand`

**Prompt:**
```
golden hour side light, bamboo bungalow with thatched roof on a raised wooden deck overlooking terraced farmland, dense jungle canopy descending into a valley, soft blue mountain ridges fading into haze in the distance, Northern Thailand Mae Hong Son province, warm amber light raking across rice paddies, long shadows, still air, smoke from a distant fire, a single figure barely visible on the deck, 35mm film, shot on Leica M, editorial travel photography, unhurried, quiet, National Geographic meets Monocle magazine, --ar 3:2 --style raw --v 6
```

---

## 3. Person at Work — Coding in Nature

**Filename:** `editorial-coding-in-nature.jpg`

**Used in:** Anchors the "what you'll actually do" section — the moment of flow: a person working on code surrounded by jungle. Conveys the promise of the retreat: focused, calm, connected to place. Not a stock photo. Editorial framing with strong natural light.

**Alt text:** `European man working at a laptop on an open bamboo deck, jungle canopy behind, morning light, focused and calm`

**Prompt:**
```
contemplative European man in his late 30s, light linen shirt, sitting cross-legged on a raised teak wooden deck of a bamboo bungalow, laptop open, soft morning light filtering through jungle canopy casting dappled shadows on his forearms, dense tropical green behind him, steam rising from a ceramic mug beside the laptop, depth of field blurring the forest to painterly bokeh, shot from a low 3/4 angle, intimate and still, 50mm equivalent, shot on Hasselblad X2D, medium format editorial photography, analog warmth, quiet concentration, Northern Thailand, --ar 3:2 --style raw --v 6
```

---

## 4. Detail / Still-Life — The Iconic Desk Moment

**Filename:** `editorial-laptop-deck-detail.jpg`

**Used in:** The hero detail shot — or used as a secondary image alongside the pricing/offer section. This is the single most important image for converting visitors: the laptop on the teak deck with hot springs steam, Claude Code on screen. Product-editorial quality — the kind of image that makes someone immediately want to be there.

**Alt text:** `MacBook laptop on aged teak deck planks, steam rising from a ceramic cup, jungle edge soft in background, warm morning light`

**Prompt:**
```
close editorial still-life, MacBook laptop open on weathered teak wooden deck planks, the screen showing a dark terminal with green text, a ceramic mug with faint steam curling upward beside it, two frangipani flowers resting near the keyboard, dense green jungle foliage soft and blurred in the background, golden morning side light raking across the wood grain, shadow of bamboo falling across the lower deck, extreme shallow depth of field, warm analog tones, shot on Hasselblad H6D 100C, medium format editorial photography, Kinfolk magazine aesthetic, quiet luxury, unhurried, --ar 3:2 --style raw --v 6
```

---

## Usage Notes

- All four images should be run through the same Lightroom preset or LUT to unify color temperature (warm shadows, desaturated mids, deep blacks).
- Target: 2800–3200K warmth in shadows, clean highlights, no clipped whites.
- Export at 2400px wide minimum for retina, compress to under 300KB using Squoosh or similar.
- The texture (hero-texture.jpg) can also be tiled or used as a CSS background with `background-size: cover` behind sections where the SVG noise alone isn't enough.
- For the coding shot, if Midjourney renders the screen illegibly or weirdly, inpaint a realistic dark IDE/terminal view in post.
