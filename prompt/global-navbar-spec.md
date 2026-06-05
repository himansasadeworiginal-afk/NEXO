# NEXO — Global Navigation Bar

Three things in one task:
1. A smart hide/show fixed navbar at the top of index.html
2. A global search overlay (Cmd+K) that searches lessons, books, and glossary
3. A theme colour wheel inside the navbar replacing the old settings gear button

---

## PART 1 — THE NAVBAR

### Structure
- Position: fixed, top 0, left 0, right 0, z-index 900
- Height: 52px
- Background: rgba(6, 9, 6, 0.85)
- Backdrop-filter: blur(12px) saturate(160%)
- Border-bottom: 1px solid rgba(24, 34, 24, 0.8)
- Padding: 0 2rem

### Left side — Logo
- "NEXO" in green-to-teal gradient
- Font-size: 1.1rem, font-weight: 800, letter-spacing: 0.06em
- Smooth-scrolls to top
- Version badge "1.0" in teal pill

### Center — Navigation links
- Study Hub, Library, Books, About, Account
- Active state via IntersectionObserver (>40% in viewport)
- Account link has no active state

### Right side — Action icons
- Search (magnifying glass)
- Theme colour wheel
- Bookmarks (with green dot badge if bookmarks exist)
- Account avatar (initials from NEXO_MOCK_USER)

### Hide/show on scroll
- Scroll DOWN >80px: navbar-hidden class
- Scroll UP: show navbar
- Uses requestAnimationFrame

### Mobile (under 768px)
- Hide center nav links
- Add hamburger menu
- Full-screen mobile menu overlay

---

## PART 2 — GLOBAL SEARCH OVERLAY

- Cmd+K / Ctrl+K opens from anywhere
- Searches lessons, books, glossary via NEXO_SEARCH_INDEX
- Debounced search (80ms)
- Results grouped by type with highlighted matching text
- Keyboard navigation (arrows, Enter, Escape)
- Focus trap inside overlay
- Recent searches in sessionStorage
- Quick jump pills

---

## PART 3 — THEME COLOUR WHEEL

- Colour wheel icon in navbar
- Popover with:
  - Accent colour swatches (green, teal, purple, amber, rose)
  - Font size S/M/L (13/15/17px)
  - Reduce motion toggle
- Persistence via localStorage key nexo_prefs / nexo_theme
- Updates CSS variables on :root instantly
