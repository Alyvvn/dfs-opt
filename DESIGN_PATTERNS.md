# Design Patterns & Component Snippets

## 🎨 Reusable Design Patterns

### 1. Hover Lift Card (Feature Cards)
```jsx
<Link href={feature.href} className="group">
  <Card className="p-8 h-full cursor-pointer transition-all duration-300 
    hover:shadow-xl hover:-translate-y-2 
    border-border/50 
    bg-gradient-to-br from-card/50 to-card/25 
    backdrop-blur-sm">
    {/* content */}
  </Card>
</Link>
```

**Key Properties:**
- `transition-all duration-300` - Smooth 300ms transition
- `hover:-translate-y-2` - 8px lift effect
- `hover:shadow-xl` - Enhanced shadow
- `bg-gradient-to-br` - Subtle gradient background
- `backdrop-blur-sm` - Glass morphism

### 2. Quick Action Cards (Compact)
```jsx
<Link href="/path" className="group">
  <Card className="p-6 h-full cursor-pointer transition-all duration-300 
    hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 
    border-border/50 hover:border-primary/30 
    bg-card/50 backdrop-blur-sm">
    {/* icon and content */}
  </Card>
</Link>
```

**Key Properties:**
- `hover:-translate-y-1` - 2px lift (subtle)
- `hover:shadow-primary/10` - Color-specific shadow
- `bg-card/50` - Semi-transparent background

### 3. Icon Containers with Hover Scale
```jsx
<div className="w-12 h-12 bg-primary/10 rounded-xl 
  flex items-center justify-center mb-4 
  group-hover:bg-primary/20 
  transition-colors">
  <IconComponent className="w-6 h-6 text-primary" />
</div>
```

**Or for larger icons:**
```jsx
<div className="w-14 h-14 bg-primary/10 rounded-xl 
  flex items-center justify-center mb-4 
  group-hover:scale-110 
  transition-transform">
  <Icon className="w-7 h-7 text-primary" />
</div>
```

### 4. Animated Button with Arrow
```jsx
<Button size="lg" className="text-base font-semibold group" asChild>
  <Link href="/path">
    Start Optimizing
    <ArrowRight className="w-4 h-4 ml-2 
      group-hover:translate-x-1 transition-transform" />
  </Link>
</Button>
```

### 5. Gradient Text Effect
```jsx
<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter 
  bg-gradient-to-r from-foreground via-primary to-foreground 
  bg-clip-text text-transparent">
  Build Winning Lineups
</h1>
```

### 6. Badge Component
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 
  rounded-full bg-primary/10 border border-primary/20 
  text-primary text-sm font-medium">
  <Zap className="w-4 h-4" />
  <span>Professional DFS Optimization Platform</span>
  <div className="flex items-center gap-1 ml-2">
    <CheckCircle className="w-4 h-4 text-secondary" />
    <span className="text-xs">MLB Active</span>
  </div>
</div>
```

### 7. Responsive Grid
```jsx
{/* 1 col mobile, 2 col tablet, 3 col desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* items */}
</div>

{/* Or 4 columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* items */}
</div>
```

### 8. Stats Card with Emoji
```jsx
<Card className="p-8 text-center border-border/50 
  bg-gradient-to-br from-card/50 to-card/25 
  backdrop-blur-sm hover:border-primary/30 transition-colors">
  <div className="text-3xl mb-3">📊</div>
  <p className="text-4xl font-bold text-primary mb-2">98.7%</p>
  <p className="text-sm text-muted-foreground">Projection Accuracy</p>
</Card>
```

### 9. Feature List with Checkmarks
```jsx
<ul className="space-y-2">
  {features.map((feature, i) => (
    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
      <CheckCircle className="w-3 h-3 text-secondary flex-shrink-0" />
      {feature}
    </li>
  ))}
</ul>
```

### 10. Animated Background Orbs
```jsx
{/* In fixed background container */}
<div className="fixed inset-0 -z-10 overflow-hidden">
  {/* Base gradient */}
  <div className="absolute inset-0 
    bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
  
  {/* Animated orbs */}
  <div className="absolute top-0 right-0 w-96 h-96 
    bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
  
  <div className="absolute bottom-0 left-0 w-96 h-96 
    bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" 
    style={{ animationDelay: "1s" }} />
  
  <div className="absolute top-1/2 left-1/2 w-96 h-96 
    bg-primary/10 rounded-full blur-3xl opacity-10 
    transform -translate-x-1/2 -translate-y-1/2" />
</div>
```

### 11. Mobile Menu Animation
```jsx
{mobileMenuOpen && (
  <div className="md:hidden py-4 space-y-2 border-t border-border/30 
    animate-in fade-in slide-in-from-top-2 duration-200">
    {/* menu items */}
  </div>
)}
```

### 12. Navigation Link Hover
```jsx
<Link href="/path" className="px-3 py-2 text-sm font-medium 
  hover:text-primary transition-colors 
  rounded-lg hover:bg-primary/5">
  Page Name
</Link>
```

## 🎯 Color Coding Pattern

### Primary Features (Cyan-Blue)
```jsx
<div className="w-12 h-12 bg-primary/10 rounded-xl 
  flex items-center justify-center mb-4 
  group-hover:bg-primary/20 transition-colors">
  <TrendingUp className="w-6 h-6 text-primary" />
</div>
```

### Secondary Features (Green)
```jsx
<div className="w-12 h-12 bg-secondary/10 rounded-xl 
  flex items-center justify-center mb-4 
  group-hover:bg-secondary/20 transition-colors">
  <BarChart3 className="w-6 h-6 text-secondary" />
</div>
```

## 📐 Spacing Conventions

```
Hero Section:     py-20 md:py-32
Large Sections:   py-20
Medium Sections:  py-16
Subsections:      py-8
Containers:       px-4 (mobile-safe)
Max Width:        max-w-6xl mx-auto
Card Padding:     p-6 (small) to p-12 (large)
```

## 🔄 Responsive Patterns

```
Mobile First: 1 column
sm: 640px     → 2 columns where applicable
md: 768px     → 2-3 columns
lg: 1024px    → 3-4 columns
```

## ✨ Animation Utilities

```
Duration: 200ms-300ms (smooth but responsive)
Easing: transition-all (default)
Properties: transform, color, shadow
Disabled on: prefers-reduced-motion (built-in)
```

## 📏 Typography Scale

```
Hero:    text-6xl md:text-7xl lg:text-8xl
Section: text-4xl md:text-5xl
Card:    text-xl
Body:    text-lg/base
Small:   text-sm
Tiny:    text-xs
```

---

Use these patterns as templates for creating new components!
