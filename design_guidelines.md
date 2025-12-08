# Design Guidelines: Gen-Z Dark Rave Portfolio

## Design Approach
**Reference-Based:** Drawing from cyberpunk aesthetics (Cyberpunk 2077 UI, rave culture visuals) combined with modern portfolio sites like Bruno Simon's interactive portfolio and Awwwards-winning projects. This is an experience-focused, visually-differentiated project requiring custom UI elements.

## Core Design Principles
1. **Neon Rebellion:** High-contrast neon accents against pure black create electric energy
2. **Motion as Identity:** Every element pulses with life through subtle animations
3. **Controlled Chaos:** Glitch effects and noise textures feel intentional, not random
4. **3D Depth:** Three.js elements provide immersive spatial dimension

## Color System
**Primary Palette:**
- Background: Pure Black (#000000)
- Neon Pink: #FF00FF (primary accent, CTAs, highlights)
- Toxic Green: #39FF14 (secondary accent, success states, skill indicators)
- Electric Blue: #00FFFF (tertiary accent, links, hover states)

**Application:**
- Text: White (#FFFFFF) primary, neon colors for emphasis
- Gradients: Soft blends between neon colors for cards and sections
- Glow effects: Neon colors with blur for depth
- Grain overlay: 5-10% opacity noise texture globally

## Typography
**Fonts:**
- Primary Display: "Orbitron" or "Audiowide" (Google Fonts) - futuristic, geometric
- Body Text: "Space Grotesk" or "Inter" - clean, readable
- Accent: "VT323" for retro terminal effects (sparingly)

**Hierarchy:**
- H1 (Hero): 4-6rem, bold, letter-spacing: 0.1em, neon pink glow
- H2 (Section): 2.5-3rem, neon outline effect
- H3 (Cards): 1.5rem, uppercase
- Body: 1rem, white with 80% opacity, line-height: 1.7
- All headings: uppercase for rave aesthetic

## Layout System
**Spacing:** Tailwind units of 4, 8, 12, 16, 24, 32 (p-4, p-8, etc.)

**Grid Structure:**
- Full-width sections with max-w-7xl containers
- Projects: 3-column grid (lg), 2-column (md), 1-column (mobile)
- Skills: 4-column grid for tech stack
- Asymmetric layouts for visual interest

**Page Transitions:**
- Barba.js glitch transition between pages (0.6s duration)
- Fade + slide combo for smooth navigation
- Distortion shader effect on transition

## Component Library

### Global Elements
**Custom Cursor:**
- Trailing particle effect (neon pink/green)
- Magnetic pull on interactive elements
- Larger on hover (scale: 1.5)

**Preloader:**
- Animated 3D wireframe cube spinning
- Loading percentage in neon green
- Glitch text effect on "Loading..."

**Navigation:**
- Fixed top bar, glass-morphism background (backdrop-blur)
- Logo: "NG" monogram in neon pink
- Menu items: horizontal, neon underline on hover
- Mobile: full-screen overlay with glitch transition

### Home Page
**Hero Section:**
- Full viewport (100vh)
- Three.js animated 3D object (rotating icosahedron with neon wireframe + vertex displacement shader)
- Centered content overlay
- Name: Large display font, neon pink with glow
- Title: Typing animation effect, toxic green
- CTA Buttons: "View Projects" (primary - neon pink), "Contact Me" (secondary - electric blue outline)
- Floating particles in background (slow drift)

### About Page
**Photo Section:**
- Circular frame, 300px diameter
- Neon pink border (4px) with pulsing glow
- Holographic gradient overlay (subtle rainbow shift on hover)
- Positioned left, content right (2-column layout)

**Bio & Skills:**
- Bio: max-w-prose, flowing text with neon green first letter
- Tech Stack Grid: 4 columns, cards with icon + name
- Card hover: lift effect, neon border glow, scale 1.05
- Three.js background: Floating geometric shapes (low opacity, slow rotation)

### Skills Page
**Layout:**
- Categorized sections stacked vertically with generous spacing (py-24)
- Each category: heading + skill items

**Skill Visualization:**
- Circular progress rings (animated on scroll)
- Neon gradient fills (pink to green)
- Percentage text in center
- Glow effect on hover
- 3-4 columns per category

### Projects Page
**Grid Layout:**
- Masonry-style grid (varying heights based on content)
- Each card: 
  - Preview image (16:9 ratio) with scan-line overlay
  - Gradient overlay on hover (pink to blue)
  - Tech stack badges (small pills, neon outlines)
  - Title + short description
  - "View Project" link with arrow animation
- Click animation: scale + glitch effect before transition

**Project Detail (Modal/Page):**
- Full-screen overlay
- Large preview image/video
- Description on right
- GitHub + Live Demo buttons (prominent)
- Close with "X" in corner (neon pink)

### Experience & Education
**Timeline:**
- Vertical line (neon blue, 2px)
- Items alternate left/right of line
- Circle nodes at connection points (filled on scroll-in)
- Cards: glass-morphism background, neon border on hover
- Date labels in toxic green
- Smooth scroll-triggered animations (GSAP)

### Contact Page
**Form:**
- Dark cards for input fields
- Neon pink focus borders
- Labels: uppercase, small, neon blue
- "Send Message" button: large, neon pink background, particle burst on click
- Success message: glitch-in animation

**Social Links:**
- Icon buttons in a row
- Neon glow on hover
- Rotate + scale animation

**Background:**
- Three.js shader with moving gradient waves
- Particle system flowing across screen

## Animation Guidelines
**Micro-interactions:**
- Button hover: scale 1.05, glow intensifies
- Card hover: lift (translateY: -8px), border glow appears
- Text hover: subtle glitch effect (2-frame displacement)
- Cursor magnetic pull: smooth ease-out transition

**Page Animations:**
- Scroll-triggered: fade-up + scale (GSAP ScrollTrigger)
- Stagger children animations (0.1s delay between items)
- Parallax on hero background (slow movement)

**Special Effects:**
- Glitch: Random horizontal displacement for 0.2s
- Scan lines: Moving horizontal lines overlay (5% opacity)
- Chromatic aberration: RGB split on transitions
- Grain: Animated noise texture (60fps loop)

## Images
**Hero Background:** Abstract 3D render with neon geometric shapes in dark space (no literal image needed - Three.js renders this live)

**About Page Photo:** Professional headshot with dramatic neon lighting (pink/blue rim light), dark background

**Project Previews:** Screenshots of live projects, mockups, or abstract tech visualizations - each should feel polished and modern

**All images:** Apply subtle grain overlay, neon border treatment, and ensure high contrast for rave aesthetic

## Responsive Behavior
- Desktop (lg): Full effects, multi-column layouts
- Tablet (md): 2-column max, simplified 3D
- Mobile: Single column, reduced particles, touch-optimized interactions
- All viewports: Maintain neon aesthetic and smooth transitions