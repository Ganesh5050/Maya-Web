# Text Animation Components

A collection of 24 animated React text components built with Framer Motion and TypeScript.

## Installation

### Individual Components
```bash
# Install specific component
npx jsrepo add split-text
npx jsrepo add blur-text
npx jsrepo add circular-text
npx jsrepo add typewriter-text
npx jsrepo add shuffle-text
npx jsrepo add shiny-text
npx jsrepo add text-pressure
npx jsrepo add curved-loop
npx jsrepo add fuzzy-text
npx jsrepo add gradient-text
npx jsrepo add text-trail
npx jsrepo add falling-text
npx jsrepo add text-cursor
npx jsrepo add decrypted-text
npx jsrepo add true-focus
npx jsrepo add scroll-float
npx jsrepo add scroll-reveal
npx jsrepo add ascii-text
npx jsrepo add scrambled-text
npx jsrepo add rotating-text
npx jsrepo add glitch-text
npx jsrepo add scroll-velocity
npx jsrepo add variable-proximity
npx jsrepo add count-up
```

### All Components
```bash
npm install react-bits
```

## Usage

### JavaScript + Tailwind (Recommended)
```jsx
import { SplitText } from 'react-bits';

function MyComponent() {
  return (
    <SplitText
      text="Hello World"
      delay={0}
      duration={0.8}
      className="text-6xl font-bold text-white"
    />
  );
}
```

### TypeScript + Tailwind
```tsx
import { SplitText } from 'react-bits';

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

function MyComponent({ text, delay = 0, duration = 0.8, className }: Props) {
  return (
    <SplitText
      text={text}
      delay={delay}
      duration={duration}
      className={`text-6xl font-bold text-white ${className}`}
    />
  );
}
```

### JavaScript + CSS
```jsx
import { SplitText } from 'react-bits';

function MyComponent() {
  return (
    <SplitText
      text="Hello World"
      delay={0}
      duration={0.8}
      className="text-6xl font-bold"
      style={{ color: 'white' }}
    />
  );
}
```

## Available Components

1. **SplitText** - Letter-by-letter animation with staggering
2. **BlurText** - Blur-to-clear transition effect
3. **CircularText** - Text arranged in a circle
4. **TypewriterText** - Typewriter effect with cursor
5. **ShuffleText** - Random character shuffling animation
6. **ShinyText** - Shimmer effect across text
7. **TextPressure** - Spring-based pressure animation
8. **CurvedLoop** - Continuous rotation animation
9. **FuzzyText** - Random character replacement
10. **GradientText** - Gradient color animation
11. **TextTrail** - Multiple shadow trail effect
12. **FallingText** - Characters falling from above
13. **TextCursor** - Typing animation with blinking cursor
14. **DecryptedText** - Matrix-style decryption effect
15. **TrueFocus** - Focus ring animation
16. **ScrollFloat** - Floating up and down motion
17. **ScrollReveal** - Reveal on scroll animation
18. **ASCIIText** - ASCII character replacement
19. **ScrambledText** - Character scrambling effect
20. **RotatingText** - Continuous rotation
21. **GlitchText** - Glitch effect with position offset
22. **ScrollVelocity** - Scale animation on scroll
23. **VariableProximity** - Staggered character animation
24. **CountUp** - Number counting animation

## Common Props

All components accept these common props:

- `text: string` (required) - The text to animate
- `delay?: number` (default: 0) - Animation delay in seconds
- `duration?: number` (default: 0.8) - Animation duration in seconds
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Inline styles

## Component Variants

Each component is available in 4 variants:
- **JavaScript + CSS** - Uses inline styles
- **JavaScript + Tailwind** - Uses Tailwind classes
- **TypeScript + CSS** - TypeScript with inline styles
- **TypeScript + Tailwind** - TypeScript with Tailwind classes

## Dependencies

- React 18+
- Framer Motion
- TypeScript (for TS variants)
- Tailwind CSS (for Tailwind variants)

## License

MIT License
