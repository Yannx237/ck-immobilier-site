# Design System: CK Immobilier SARL

## 1. Visual Theme & Atmosphere
A working real-estate agency site, not a brand manifesto. Crisp white surfaces, deep navy ink and one confident cobalt blue. The listings are the product: photos and prices come first, marketing copy comes last. It should feel like a well-run local agency in Douala that answers WhatsApp fast — direct, practical, trustworthy.
- Density 5 (portal-like, information-rich but breathable)
- Variance 5 (asymmetric where it helps, predictable where people scan listings)
- Motion 3 (restrained: hover lift on cards, smooth image transitions, nothing decorative)

## 2. Color Palette & Roles
- **Paper White** (#FFFFFF) — Main background
- **Mist** (#F3F6FA) — Alternate section background, input fills, map land
- **Hairline** (#E3E8EF) — 1px borders and dividers
- **Navy Ink** (#0E1B33) — Headlines, primary text, footer background
- **Slate** (#5A6478) — Secondary text, metadata
- **Cobalt** (#1747B5) — The single accent: primary buttons, links, active filters, selected map pin, focus ring
- **Cobalt Tint** (#E8EEFB) — Selected chip background, hover fill
- **WhatsApp Green** (#1FAF5A) — Only on WhatsApp buttons
- Status labels are text-only tags on white with a thin border: "À vendre", "À louer", "Par nuit" — never colored pills in three different hues.
- Banned: cream/beige backgrounds, gold, khaki/forest green, gradients, neon or glowing blues, purple.

## 3. Typography Rules
- **Display & UI:** Geist. Headlines weight 600, tracking -0.02em, sizes clamp(2.25rem, 4vw, 3.5rem) for H1, 1.75rem for H2. Hierarchy through weight and color, not huge sizes.
- **Body:** Geist 400, 16px, line-height 1.6, max 65ch.
- **Numbers & prices:** Geist Mono or tabular figures; "FCFA" in Slate at 0.8em.
- Banned: serif fonts, italic emphasis words in headlines, letter-spaced small-caps eyebrow labels above every section, Inter.

## 4. Component Stylings
- **Header:** White, 72px tall, 1px bottom hairline. Logo left; links Acheter, Louer, Nuits en auberge, L'agence, Contact; right: phone number "+237 678 38 68 75" in navy, FR/EN, and a cobalt button "WhatsApp". No hero overlay tricks.
- **Buttons:** 8px radius, 44px min height. Primary cobalt fill with white text; secondary white with 1px Hairline border and navy text. Pressed state translates 1px down. No shadows, no glow.
- **Listing card:** Photo 4:3 with 8px radius and a photo counter "1/8" bottom-right; under the photo (not inside a boxed card): price first in bold, then title, then "Quartier, Ville", then a one-line spec row "450 m² · 5 ch. · 4 sdb". Small text tag top-left on the photo ("À vendre"). Heart/save icon top-right. Hover: photo zooms 3%.
- **Search bar:** One horizontal white bar with hairline border and 8px radius: segmented Acheter / Louer / Par nuit, then Ville, Type de bien, Budget max, cobalt "Rechercher" button.
- **Inputs:** Label above, 44px height, Mist fill, cobalt 2px focus ring, error text in red below.
- **Map pins:** White pill with price in navy; selected pin is cobalt with white text.

## 5. Layout Principles
- Max width 1280px, 24px gutters on desktop, 16px on mobile.
- Hero: left-aligned, split — real building photo on one side, headline + search on the other. Never centered, never text over a dark photo overlay.
- Listings grid: 4 columns desktop, 2 tablet, 1 mobile; or a featured listing large (2x) next to smaller ones. Never "three identical feature cards".
- Sections separated by whitespace and hairlines, not by colored bands everywhere.
- Mobile: single column, sticky bottom bar with "Appeler" and "WhatsApp" on listing pages.

## 6. Motion & Interaction
- 200ms ease-out on hover states; card photo scale 1.03; gallery crossfade 300ms.
- No scroll-triggered fade-ins on every block, no parallax, no floating elements. The agency services section has a user-requested exception: three fictional cutout presenters alternate around a cobalt timeline that fills with scrolling. Each service enters once; reduced motion keeps the line complete and content static.

## 7. Content Voice
- French first, plain and concrete: "Appartement 3 chambres meublé, Logpom", "Disponible le 1er novembre", "Groupe électrogène, forage, gardien 24h/24".
- Real numbers from the catalogue only. No invented stats.
- Banned words: excellence, prestige, exception, sérénité, patrimoine (as a slogan), élevez, découvrez l'art de, havre de paix.

## 8. Anti-Patterns (Banned — these read as AI-generated)
- Numbered sections ("01 — Sélection"), eyebrow labels on every section
- Serif + italic accent word in headlines
- Stats strip of round numbers ("100%", "< 1h", "3 régions")
- Founder quote block with big quotation marks
- Three equal cards with icon + title + 2 lines
- Cream/beige + dark green + gold palettes
- Gradient text, glows, glassmorphism, emojis
- Generic AI renders of villas with infinity pools; browser UI chrome inside photos
- Filler like "Scroll to explore", bouncing chevrons
