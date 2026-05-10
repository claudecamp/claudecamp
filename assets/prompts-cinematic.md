# Claude Camp — Cinematic Image Prompts
### Design Direction: Immersive / Luxury Retreat Film Poster
### Location: Pai, Mae Hong Son Province, Northern Thailand

---

## 01 — Hero Full-Bleed Background

**Filename:** `hero-cinematic-bg.jpg`

**Used in:** Full-bleed hero section background, sits beneath the 4-layer CSS gradient overlay and grain texture. Should read through semi-transparent color layers while providing depth, atmosphere, and a sense of place.

**Alt text:** `Aerial jungle canopy at golden hour over the mountains of Pai, Northern Thailand, mist drifting through the valley below`

**Prompt:**
```
Aerial view looking down across a dense jungle canopy in Northern Thailand, terraced mountain farmland visible in the distance, golden hour light raking across treetops casting long amber shadows, low mist pooling in the valley hollows, sky layered with warm haze and a single band of deep blue near the horizon, massive teak and bamboo trees catching backlight, depth of field bokeh on the far ridgeline, shot on ARRI Alexa 65 with a wide anamorphic lens, teal and orange color grade, warm amber highlights in the canopy, rich deep shadows underneath, cinematic, atmospheric, lush, immersive, like a frame from a Terrence Malick film, extreme detail in the foliage texture, no people, no text, no watermarks --ar 16:9 --style raw --v 6
```

---

## 02 — Arrival Shot

**Filename:** `arrival-dusk-wide.jpg`

**Used in:** Opening editorial still below the hero, likely the first full-width image as the user scrolls — establishes the physical place. Cinematic wide establishing shot.

**Alt text:** `A bamboo bungalow on a mountain farm at golden hour in Pai, Thailand, warm lamplight glowing from the raised wooden deck`

**Prompt:**
```
Wide cinematic establishing shot of a traditional bamboo bungalow with a thatched roof set on a raised teak wooden deck, surrounded by lush jungle on a mountain farm in Northern Thailand, golden hour light, warm tungsten glow spilling from open bungalow doorway, fireflies beginning to appear in the blue hour shadows, terraced farmland descending in the background, misty mountain ridge silhouetted against a deep amber-to-indigo sky, narrow dirt path leading toward the bungalow, overhanging tropical foliage framing the left edge, no people visible, cinematic depth of field with sharp foreground detail and soft bokeh ridgeline, 35mm anamorphic lens, anamorphic lens flares on the bungalow light source, film grain, teal shadows mixed with amber highlights, shot on ARRI Alexa, Malick-style golden hour atmosphere, rich sensory, no text, no watermarks --ar 16:9 --style raw --v 6
```

---

## 03 — The Moment (Laptop + Steam + Jungle)

**Filename:** `the-moment-laptop-steam.jpg`

**Used in:** The signature image of the retreat concept — used prominently in the "A Day in Pai" scroll section or as a hero editorial still. The iconic visual that captures the core product promise: deep work in a paradise setting.

**Alt text:** `Laptop open on a teak wooden deck in the jungle, steam rising from a hot spring nearby, lush green canopy overhead, golden morning light`

**Prompt:**
```
Close editorial shot of an open laptop on a worn teak wooden deck, the screen glowing with a dark terminal IDE interface showing code, white steam rising slowly in a thick column from a natural hot spring just beyond the deck railing, dense green jungle canopy filling the background in soft bokeh, early morning golden light filtering through palm and banana leaves above, condensation on a ceramic coffee mug beside the laptop, the warm amber of the wood contrasting with the deep cool greens of the jungle, shallow depth of field with the laptop keyboard in sharp focus and everything beyond dissolving into atmospheric haze, 35mm anamorphic lens, film grain, cinematic, sensory, like a still from a luxury travel film, no human hands or faces visible, no screen text legible, no watermarks --ar 3:2 --style raw --v 6
```

---

## 04 — Atmospheric Detail (Hot Springs at Dawn)

**Filename:** `hot-springs-dawn-mist.jpg`

**Used in:** Full-bleed atmospheric interlude between content sections, or used as a background layer for the pricing/booking section. Creates emotional texture and sells the sensory experience of the place.

**Alt text:** `Steam rising from natural hot spring pools at dawn, misty mountain ranges fading into blue haze behind, Pai, Northern Thailand`

**Prompt:**
```
Natural thermal hot spring pool at dawn in Northern Thailand, thick white steam rising and drifting across the surface of the water, the pool edged with dark volcanic stone and tropical grass, mountain ridgelines layered in blue-grey morning mist receding into the distance, the sky at the transition between deep indigo night and the first pale gold of sunrise, a single beam of early light catching the steam column and turning it amber, perfect stillness on the water surface below the steam, infinity edge aesthetic where water meets the misty valley view, no people, shot on ARRI Alexa with 50mm anamorphic lens, long exposure feel, blue hour mixed with warm dawn light, cinematic, meditative, deeply atmospheric, film grain, rich color depth, teal water shadows and amber steam highlights, no text, no watermarks --ar 16:9 --style raw --v 6
```

---

## 05 — Community Shot (Group at Night)

**Filename:** `community-night-table.jpg`

**Used in:** The social proof / community section — shows the human side of the retreat. Warm, candid, laughter-filled. Counters the solitude of the other images with energy and connection.

**Alt text:** `A small group of people laughing and talking around a wooden table at night on an open-air bamboo deck, warm lantern light, tropical jungle surrounding them`

**Prompt:**
```
Candid documentary photograph of a group of five people — mixed international group including a Western man and a Thai woman — seated around a low teak wooden table on an open-air bamboo deck at night in a tropical jungle setting, northern Thailand, laughing and in deep conversation, laptops and notebooks open among shared dishes of Thai food and glasses, warm amber tungsten lantern light and string lights overhead casting rich golden pools, the surrounding jungle dark and textured beyond the deck's edge, fireflies softly visible in the dark background, motion blur on gesturing hands suggesting real spontaneous movement, shallow depth of field, faces lit with genuine warmth, one person pointing at a laptop screen while others lean in, not posed or staged, shot on 35mm anamorphic lens, film grain, cinematic vérité style, fire-warm color grade, teal and orange, like a still from a documentary about a creative commune, no watermarks --ar 3:2 --style raw --v 6
```

---

## Usage Notes

- All hero and section backgrounds should be run at **--ar 16:9** and upscaled to at least 2560px wide before use
- Editorial stills at **--ar 3:2** — export at 1800px wide minimum
- Run each prompt 4x and select the frame that reads best through the CSS gradient overlays (test by overlaying the gradient stack in Figma or the browser before committing)
- The laptop screen in prompt 03 should be blurred or darkened in post if any legible UI appears — keep it atmospheric, not product-literal
- For prompt 05, if Midjourney renders faces that feel too sharp or stock-photo, add `--chaos 20` and re-run for more candid energy
