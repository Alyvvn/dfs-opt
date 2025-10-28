# Design System Guide - DFS Optimizer

## 🎨 Visual Design Principles

### 1. Web3-Inspired Aesthetic
- Modern, premium dark mode aesthetic
- Vibrant cyan-blue primary color (PSX brand)
- Subtle gradient backgrounds and animations
- Glass morphism effects on cards
- Minimal but purposeful animations

### 2. Component Design Patterns

#### Card Component
```tsx
// Base styling with hover effects
className="p-8 h-full cursor-pointer transition-all duration-300 
  hover:shadow-xl hover:-translate-y-2 
  border-border/50 
  bg-gradient-to-br from-card/50 to-card/25 
  backdrop-blur-sm
  hover:border-primary/30"
```

**Features:**
- 2px lift effect on hover (`-translate-y-2`)
- Shadow glow with color-specific tint
- Subtle gradient background
- Glass morphism with backdrop blur
- Smooth transitions (300ms)

#### Button Styling
- Primary: Solid primary color
- Ghost: Transparent with hover highlight
- Outline: Border-only variant
- Arrow animations on CTA buttons

#### Icon Integration
- Colored icon containers (primary/10 background)
- Hover scale effect (110%)
- Color-coded by feature type
- Checkmark badges for features

### 3. Typography Hierarchy

```
Hero Headline: 6xl-8xl, bold, gradient text
Section Title: 4xl-5xl, bold
Card Title: xl, bold
Body Text: lg/base, regular
Caption: sm/xs, muted
```

### 4. Color System

| Role | Light Mode | Dark Mode (Default) |
|------|-----------|------------------|
| Background | oklch(0.99 0 0) | oklch(0.12 0 0) |
| Card | oklch(1 0 0) | oklch(0.15 0 0) |
| Primary | oklch(0.6 0.19 235) | oklch(0.7 0.19 235) |
| Secondary | oklch(0.7 0.17 160) | oklch(0.75 0.17 160) |
| Border | oklch(0.92 0 0) | oklch(0.25 0 0) |
| Text Primary | oklch(0.15 0 0) | oklch(0.98 0 0) |
| Text Secondary | oklch(0.5 0 0) | oklch(0.65 0 0) |

### 5. Animation Principles

**Hover Effects:**
- Card lift: `translate-y -2px` over 300ms
- Icon scale: `scale-110` over 200ms
- Button arrow: `translate-x 4px` over 200ms
- Color transition: smooth 200ms blend

**Page Transitions:**
- Fade in: opacity 0→1 over 200ms
- Slide in: translateY -2px→0 over 200ms

**No:**
- Parallax scrolling
- Continuous animations
- Excessive motion

### 6. Spacing System

```
xs: 4px  (--radius - 4px)
sm: 6px  (--radius - 2px)
md: 8px  (--radius)
lg: 12px (--radius + 4px)
xl: 16px
2xl: 24px
```

### 7. Border Radius

- Icons/Badges: `rounded-xl` (12px)
- Containers: `rounded-lg` (8px)
- Input Fields: `rounded-md` (6px)

## 🎯 Component Examples

### Hero Section
- Animated background with gradient orbs
- Gradient text headline
- Trust indicators with checkmarks
- Dual CTA buttons
- Clear value proposition

### Quick Actions Grid
- 4-column responsive grid
- Simplified card layout
- Icon with label and description
- Hover lift effect
- Color-coded by feature type

### Feature Cards
- Icon in rounded container
- Title + description
- Feature list with checkmarks
- Hover effects with scale
- Link to feature page

### Navbar
- Minimal logo (DFS)
- Navigation links (no icons)
- CTA buttons
- Mobile menu with animation
- Sticky positioning

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
  - Single column layouts
  - Simplified navigation
  - Larger touch targets

- **Tablet**: 641px - 1024px
  - Two-column layouts
  - Visible desktop menu
  - Balanced spacing

- **Desktop**: 1025px+
  - Multi-column layouts
  - Full feature set
  - Hover animations active

## ✅ Quality Checklist

- [ ] All text has WCAG AA contrast ratio
- [ ] Animations are GPU-accelerated
- [ ] Keyboard navigation works
- [ ] Mobile layout is responsive
- [ ] Dark mode is fully implemented
- [ ] No parallax on scroll
- [ ] Load time < 3s
- [ ] Build passes with no errors

## 🔌 Integration Notes

- Uses Tailwind CSS v4 with OKLCH color space
- Supports dark/light mode via CSS custom properties
- All animations use CSS transitions (no JS animations)
- Card hover effects use Tailwind group modifiers
- Responsive design uses Tailwind breakpoints

---

**Version**: 1.0  
**Last Updated**: October 26, 2025
