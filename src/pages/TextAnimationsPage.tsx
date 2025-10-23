import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Heart, 
  ChevronRight,
  Play,
  Code,
  Search,
  ChevronDown,
  Star,
  Eye,
  Copy,
  Download
} from 'lucide-react';

// Advanced SplitText Component (React Bits Style)
const SplitText = ({ 
  text, 
  delay = 0, 
  duration = 0.8, 
  stagger = 0.05,
  direction = "up",
  distance = 50,
  easing = "easeOut",
  className = "",
  style = {}
}) => {
  const words = text.split(' ');
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: distance, opacity: 0 };
      case "down": return { y: -distance, opacity: 0 };
      case "left": return { x: distance, opacity: 0 };
      case "right": return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up": return { y: 0, opacity: 1 };
      case "down": return { y: 0, opacity: 1 };
      case "left": return { x: 0, opacity: 1 };
      case "right": return { x: 0, opacity: 1 };
      default: return { y: 0, opacity: 1 };
    }
  };

  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${className}`} style={style}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex gap-1">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial={getInitialPosition()}
              animate={getFinalPosition()}
              transition={{
                duration: duration,
                delay: delay + (wordIndex * 0.1) + (letterIndex * stagger),
                ease: easing
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Advanced BlurText Component
const BlurText = ({ 
  text, 
  delay = 0, 
  duration = 0.8, 
  blurAmount = 10,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ filter: `blur(${blurAmount}px)`, opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
};

// Advanced Typewriter Component
const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 100,
  cursor = true,
  className = "",
  style = {}
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </motion.div>
  );
};

// Advanced GradientText Component
const GradientText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  gradient = "from-purple-400 via-pink-500 to-red-500",
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
};

// Advanced ShuffleText Component
const ShuffleText = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  shuffleSpeed = 100,
  className = "",
  style = {}
}) => {
  const [shuffledText, setShuffledText] = useState(text);
  const [isShuffling, setIsShuffling] = useState(false);
  
  useEffect(() => {
    setIsShuffling(true);
    const interval = setInterval(() => {
      setShuffledText(prev => {
        return prev.split('').map(char => {
          if (char === ' ') return ' ';
          return String.fromCharCode(33 + Math.random() * 94);
        }).join('');
      });
    }, shuffleSpeed);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShuffledText(text);
      setIsShuffling(false);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, duration, shuffleSpeed]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {shuffledText}
    </motion.div>
  );
};

// CircularText Component
const CircularText = ({ 
  text, 
  delay = 0, 
  duration = 1,
  radius = 80,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  const angleStep = (2 * Math.PI) / characters.length;

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2, height: radius * 2, ...style }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      {characters.map((char, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);
        
        return (
          <motion.span
            key={index}
            className="absolute text-sm font-bold"
            style={{
              left: x - 8, // Center the character
              top: y - 8,
              color: style.color || 'white',
              transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: duration, 
              delay: delay + index * 0.1,
              type: 'spring',
              stiffness: 200
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

// ShinyText Component
const ShinyText = ({ 
  text, 
  delay = 0, 
  duration = 2,
  shineWidth = 100,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        style={{ width: shineWidth }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
};

// TextPressure Component
const TextPressure = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  pressure = 0.5,
  className = "",
  style = {}
}) => {
  const words = text.split(' ');
  
  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${className}`} style={style}>
      {words.map((word, wordIndex) => (
        <motion.div
          key={wordIndex}
          className="flex gap-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: duration,
            delay: delay + wordIndex * 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 20
          }}
        >
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// CurvedLoop Component
const CurvedLoop = ({ 
  text, 
  delay = 0, 
  duration = 3,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.div
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="inline-block"
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

// FuzzyText Component
const FuzzyText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  fuzziness = 0.1,
  className = "",
  style = {}
}) => {
  const [fuzzyText, setFuzzyText] = useState(text);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFuzzyText(text.split('').map(char => {
        if (char === ' ') return ' ';
        return Math.random() < fuzziness ? 
          String.fromCharCode(65 + Math.random() * 26) : char;
      }).join(''));
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setFuzzyText(text);
    }, duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, duration, fuzziness]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {fuzzyText}
    </motion.div>
  );
};

// TextTrail Component
const TextTrail = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  trailLength = 5,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration,
            delay: delay + index * 0.1
          }}
        >
          {char}
          {/* Trail effect */}
          {Array.from({ length: trailLength }).map((_, trailIndex) => (
            <motion.span
              key={trailIndex}
              className="absolute inset-0"
              style={{
                opacity: 0.3 - (trailIndex * 0.05),
                transform: `translateY(${(trailIndex + 1) * 2}px)`
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </div>
  );
};

// FallingText Component
const FallingText = ({ 
  text, 
  delay = 0, 
  duration = 1,
  fallHeight = 100,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: -fallHeight, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: duration,
            delay: delay + index * 0.1,
            type: 'spring',
            stiffness: 200
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// TextCursor Component
const TextCursor = ({ 
  text, 
  delay = 0, 
  speed = 100,
  cursor = true,
  className = "",
  style = {}
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {displayText}
      {cursor && showCursor && (
        <span className="ml-1">|</span>
      )}
    </motion.div>
  );
};

// DecryptedText Component
const DecryptedText = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  decryptSpeed = 50,
  className = "",
  style = {}
}) => {
  const [decryptedText, setDecryptedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDecryptedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, decryptSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, decryptSpeed]);

  useEffect(() => {
    setDecryptedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {decryptedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          █
        </motion.span>
      )}
    </motion.div>
  );
};

// TrueFocus Component
const TrueFocus = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  focusIntensity = 0.5,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, focusIntensity, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
};

// ScrollFloat Component
const ScrollFloat = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  floatHeight = 20,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.span
        animate={{
          y: [-floatHeight, floatHeight, -floatHeight]
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

// ScrollReveal Component
const ScrollReveal = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  direction = "up",
  className = "",
  style = {}
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 100, opacity: 0 };
      case "down": return { y: -100, opacity: 0 };
      case "left": return { x: 100, opacity: 0 };
      case "right": return { x: -100, opacity: 0 };
      default: return { y: 100, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={getInitialPosition()}
      whileInView={{
        y: 0,
        x: 0,
        opacity: 1
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true }}
    >
      {text}
    </motion.div>
  );
};

// ASCIIText Component
const ASCIIText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  const asciiChars = ['@', '#', '$', '%', '&', '*', '+', '=', '?', '!'];
  
  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + index * 0.05 }}
        >
          {char === ' ' ? ' ' : asciiChars[Math.floor(Math.random() * asciiChars.length)]}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ScrambledText Component
const ScrambledText = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  scrambleSpeed = 100,
  className = "",
  style = {}
}) => {
  const [scrambledText, setScrambledText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  useEffect(() => {
    setIsScrambling(true);
    const interval = setInterval(() => {
      setScrambledText(prev => {
        return prev.split('').map(char => {
          if (char === ' ') return ' ';
          return String.fromCharCode(65 + Math.random() * 26);
        }).join('');
      });
    }, scrambleSpeed);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setScrambledText(text);
      setIsScrambling(false);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, duration, scrambleSpeed]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {scrambledText}
    </motion.div>
  );
};

// RotatingText Component
const RotatingText = ({ 
  text, 
  delay = 0, 
  duration = 2,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.span
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

// ScrollVelocity Component
const ScrollVelocity = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true }}
    >
      {text}
    </motion.div>
  );
};

// VariableProximity Component
const VariableProximity = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  proximity = 0.5,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: duration,
            delay: delay + index * proximity * 0.1,
            type: 'spring',
            stiffness: 200
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// CountUp Component
const CountUp = ({ 
  text, 
  delay = 0, 
  duration = 2,
  className = "",
  style = {}
}) => {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(text) || 0;
  
  useEffect(() => {
    const increment = targetNumber / (duration * 60);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return Math.min(prev + increment, targetNumber);
      });
    }, 16);

    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {Math.floor(count)}
    </motion.div>
  );
};

// Advanced GlitchText Component
const GlitchText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  glitchIntensity = 0.1,
  className = "",
  style = {}
}) => {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * glitchIntensity * 10,
        y: (Math.random() - 0.5) * glitchIntensity * 10
      });
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setGlitchOffset({ x: 0, y: 0 });
    }, duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [glitchIntensity, duration]);

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
        filter: `hue-rotate(${glitchOffset.x * 10}deg)`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {text}
    </motion.div>
  );
};

// BounceText Component
const BounceText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  bounceHeight = 20,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0 }}
          animate={{ y: [-bounceHeight, 0] }}
          transition={{
            duration: duration,
            delay: delay + index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 10
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// WaveText Component
const WaveText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  waveHeight = 15,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -waveHeight, 0]
          }}
          transition={{
            duration: duration,
            delay: delay + index * 0.1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// PulseText Component
const PulseText = ({ 
  text, 
  delay = 0, 
  duration = 1,
  pulseScale = 1.2,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        scale: [1, pulseScale, 1]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {text}
    </motion.div>
  );
};

// SlideText Component
const SlideText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  slideDistance = 100,
  direction = 'left',
  className = "",
  style = {}
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: slideDistance, opacity: 0 };
      case 'right': return { x: -slideDistance, opacity: 0 };
      case 'up': return { y: slideDistance, opacity: 0 };
      case 'down': return { y: -slideDistance, opacity: 0 };
      default: return { x: slideDistance, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {text}
    </motion.div>
  );
};

// FlipText Component
const FlipText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {text}
    </motion.div>
  );
};

// ZoomText Component
const ZoomText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {text}
    </motion.div>
  );
};

// FadeInText Component
const FadeInText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {text}
    </motion.div>
  );
};

// ScaleText Component
const ScaleText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  scaleFrom = 0.5,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: scaleFrom }}
      animate={{ scale: 1 }}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {text}
    </motion.div>
  );
};

// WiggleText Component
const WiggleText = ({ 
  text, 
  delay = 0, 
  duration = 0.5,
  wiggleAmount = 5,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        rotate: [-wiggleAmount, wiggleAmount, -wiggleAmount, wiggleAmount, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeInOut'
      }}
    >
      {text}
    </motion.div>
  );
};

// ElasticText Component
const ElasticText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        type: 'spring',
        stiffness: 200,
        damping: 10
      }}
    >
      {text}
    </motion.div>
  );
};

// SpringText Component
const SpringText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {text}
    </motion.div>
  );
};

// MagneticText Component
const MagneticText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  magneticStrength = 0.3,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      {text}
    </motion.div>
  );
};

// HolographicText Component
const HolographicText = ({ 
  text, 
  delay = 0, 
  duration = 2,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30"
        animate={{
          backgroundPosition: ['0%', '100%', '0%']
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
};

// NeonText Component
const NeonText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  neonColor = '#00ffff',
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={{
        ...style,
        textShadow: `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor}`,
        color: neonColor
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      {text}
    </motion.div>
  );
};

// GlowText Component
const GlowText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  glowColor = '#ffffff',
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={{
        ...style,
        textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      {text}
    </motion.div>
  );
};

// ShadowText Component
const ShadowText = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  shadowOffset = 5,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={{
        ...style,
        textShadow: `${shadowOffset}px ${shadowOffset}px 0px rgba(0,0,0,0.3)`
      }}
      initial={{ opacity: 0, x: -shadowOffset, y: -shadowOffset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: duration, delay: delay }}
    >
      {text}
    </motion.div>
  );
};

const TextAnimationsPage = () => {
  const [activeAnimation, setActiveAnimation] = useState('Split Text');
  const [activeTab, setActiveTab] = useState('preview');
  const [customText, setCustomText] = useState('Hello, you!');
  const [animationDuration, setAnimationDuration] = useState(0.9);
  const [animationDelay, setAnimationDelay] = useState(0);
  const [textColor, setTextColor] = useState('white');
  const [fontSize, setFontSize] = useState('text-6xl');
  const [animationSize, setAnimationSize] = useState('large');
  const [animationStyle, setAnimationStyle] = useState('default');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [componentVariant, setComponentVariant] = useState('ts-tw');
  const [showProps, setShowProps] = useState(false);
  const [selectedPackageManager, setSelectedPackageManager] = useState('npm');

  const textAnimations = [
    'Split Text',
    'Blur Text',
    'Circular Text',
    'Text Type',
    'Shuffle',
    'Shiny Text',
    'Text Pressure',
    'Curved Loop',
    'Fuzzy Text',
    'Gradient Text',
    'Text Trail',
    'Falling Text',
    'Text Cursor',
    'Decrypted Text',
    'True Focus',
    'Scroll Float',
    'Scroll Reveal',
    'ASCII Text',
    'Scrambled Text',
    'Rotating Text',
    'Glitch Text',
    'Scroll Velocity',
    'Variable Proximity',
    'Count Up',
    'Bounce Text',
    'Wave Text',
    'Pulse Text',
    'Slide Text',
    'Flip Text',
    'Zoom Text',
    'Fade In Text',
    'Scale Text',
    'Wiggle Text',
    'Elastic Text',
    'Spring Text',
    'Magnetic Text',
    'Holographic Text',
    'Neon Text',
    'Glow Text',
    'Shadow Text'
  ];

  const getStartedItems = [
    'Introduction',
    'Installation'
  ];

  const backgroundItems = [
    'Liquid Ether',
    'Prism',
    'Dark Veil',
    'Silk',
    'Light Rays',
    'Pixel Blast',
    'Aurora',
    'Plasma',
    'Particles',
    'Gradient Blinds',
    'Beams',
    'Lightning',
    'Prismatic Burst',
    'Galaxy',
    'Dither',
    'Faulty Terminal',
    'Ripple Grid',
    'Dot Grid',
    'Threads',
    'Hyperspeed',
    'Iridescence',
    'Waves',
    'Grid Distortion',
    'Ballpit',
    'Orb',
    'Letter Glitch',
    'Grid Motion',
    'Squares',
    'Liquid Chrome',
    'Balatro'
  ];

  // Render the appropriate animation based on selection
  const renderAnimation = () => {
    const getSizeClass = () => {
      switch (animationSize) {
        case 'tiny': return 'text-xs';
        case 'small': return 'text-sm';
        case 'medium': return 'text-base';
        case 'large': return 'text-lg';
        case 'huge': return 'text-xl';
        default: return fontSize;
      }
    };

    const getStyleModifiers = () => {
      switch (animationStyle) {
        case 'subtle': return { duration: animationDuration * 0.5, intensity: 0.5 };
        case 'dramatic': return { duration: animationDuration * 1.5, intensity: 2 };
        case 'minimal': return { duration: animationDuration * 0.3, intensity: 0.3 };
        case 'playful': return { duration: animationDuration * 1.2, intensity: 1.5 };
        default: return { duration: animationDuration, intensity: 1 };
      }
    };

    const styleModifiers = getStyleModifiers();
    const sizeClass = getSizeClass();
    
    const commonProps = {
      text: customText,
      delay: animationDelay,
      duration: styleModifiers.duration,
      className: `${sizeClass} font-bold`,
      style: { color: textColor }
    };

    // Force re-render when any prop changes
    const key = `${activeAnimation}-${customText}-${animationDuration}-${animationDelay}-${textColor}-${fontSize}-${animationSize}-${animationStyle}`;

    switch (activeAnimation) {
      case 'Split Text':
        return <SplitText key={key} {...commonProps} />;
      case 'Blur Text':
        return <BlurText key={key} {...commonProps} />;
      case 'Circular Text':
        return <CircularText key={key} {...commonProps} />;
      case 'Text Type':
        return <TypewriterText key={key} {...commonProps} />;
      case 'Shuffle':
        return <ShuffleText key={key} {...commonProps} />;
      case 'Shiny Text':
        return <ShinyText key={key} {...commonProps} />;
      case 'Text Pressure':
        return <TextPressure key={key} {...commonProps} />;
      case 'Curved Loop':
        return <CurvedLoop key={key} {...commonProps} />;
      case 'Fuzzy Text':
        return <FuzzyText key={key} {...commonProps} />;
      case 'Gradient Text':
        return <GradientText key={key} {...commonProps} />;
      case 'Text Trail':
        return <TextTrail key={key} {...commonProps} />;
      case 'Falling Text':
        return <FallingText key={key} {...commonProps} />;
      case 'Text Cursor':
        return <TextCursor key={key} {...commonProps} />;
      case 'Decrypted Text':
        return <DecryptedText key={key} {...commonProps} />;
      case 'True Focus':
        return <TrueFocus key={key} {...commonProps} />;
      case 'Scroll Float':
        return <ScrollFloat key={key} {...commonProps} />;
      case 'Scroll Reveal':
        return <ScrollReveal key={key} {...commonProps} />;
      case 'ASCII Text':
        return <ASCIIText key={key} {...commonProps} />;
      case 'Scrambled Text':
        return <ScrambledText key={key} {...commonProps} />;
      case 'Rotating Text':
        return <RotatingText key={key} {...commonProps} />;
      case 'Glitch Text':
        return <GlitchText key={key} {...commonProps} />;
      case 'Scroll Velocity':
        return <ScrollVelocity key={key} {...commonProps} />;
      case 'Variable Proximity':
        return <VariableProximity key={key} {...commonProps} />;
      case 'Count Up':
        return <CountUp key={key} {...commonProps} />;
      case 'Bounce Text':
        return <BounceText key={key} {...commonProps} />;
      case 'Wave Text':
        return <WaveText key={key} {...commonProps} />;
      case 'Pulse Text':
        return <PulseText key={key} {...commonProps} />;
      case 'Slide Text':
        return <SlideText key={key} {...commonProps} />;
      case 'Flip Text':
        return <FlipText key={key} {...commonProps} />;
      case 'Zoom Text':
        return <ZoomText key={key} {...commonProps} />;
      case 'Fade In Text':
        return <FadeInText key={key} {...commonProps} />;
      case 'Scale Text':
        return <ScaleText key={key} {...commonProps} />;
      case 'Wiggle Text':
        return <WiggleText key={key} {...commonProps} />;
      case 'Elastic Text':
        return <ElasticText key={key} {...commonProps} />;
      case 'Spring Text':
        return <SpringText key={key} {...commonProps} />;
      case 'Magnetic Text':
        return <MagneticText key={key} {...commonProps} />;
      case 'Holographic Text':
        return <HolographicText key={key} {...commonProps} />;
      case 'Neon Text':
        return <NeonText key={key} {...commonProps} />;
      case 'Glow Text':
        return <GlowText key={key} {...commonProps} />;
      case 'Shadow Text':
        return <ShadowText key={key} {...commonProps} />;
      default:
        return <SplitText key={key} {...commonProps} />;
    }
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), animationDuration * 1000 + 500);
  };

  // Handle real-time updates when controls change
  const handleControlChange = () => {
    setAnimationKey(prev => prev + 1);
  };

  // Update animation key when any control changes
  React.useEffect(() => {
    handleControlChange();
  }, [customText, animationDuration, animationDelay, textColor, fontSize, activeAnimation, animationSize, animationStyle]);

  const getCLICommand = () => {
    const componentName = activeAnimation.replace(' ', '').toLowerCase();
    
    const cliCommands = {
      'splittext': 'npx jsrepo add split-text',
      'blurtext': 'npx jsrepo add blur-text',
      'circulartext': 'npx jsrepo add circular-text',
      'typewritertext': 'npx jsrepo add typewriter-text',
      'shuffetext': 'npx jsrepo add shuffle-text',
      'shinytext': 'npx jsrepo add shiny-text',
      'textpressure': 'npx jsrepo add text-pressure',
      'curvedloop': 'npx jsrepo add curved-loop',
      'fuzzytext': 'npx jsrepo add fuzzy-text',
      'gradienttext': 'npx jsrepo add gradient-text',
      'texttrail': 'npx jsrepo add text-trail',
      'fallingtext': 'npx jsrepo add falling-text',
      'textcursor': 'npx jsrepo add text-cursor',
      'decryptedtext': 'npx jsrepo add decrypted-text',
      'truefocus': 'npx jsrepo add true-focus',
      'scrollfloat': 'npx jsrepo add scroll-float',
      'scrollreveal': 'npx jsrepo add scroll-reveal',
      'asciitext': 'npx jsrepo add ascii-text',
      'scrambledtext': 'npx jsrepo add scrambled-text',
      'rotatingtext': 'npx jsrepo add rotating-text',
      'glitchtext': 'npx jsrepo add glitch-text',
      'scrollvelocity': 'npx jsrepo add scroll-velocity',
      'variableproximity': 'npx jsrepo add variable-proximity',
      'countup': 'npx jsrepo add count-up'
    };
    
    return cliCommands[componentName] || `npx jsrepo add ${componentName}`;
  };

  const getInstallCommand = (packageManager = 'npm') => {
    const componentName = activeAnimation.replace(' ', '').toLowerCase();
    
    // Different install commands for different animations
    const installCommands = {
      'splittext': '@react-bits/split-text',
      'blurtext': '@react-bits/blur-text',
      'circulartext': '@react-bits/circular-text',
      'typewritertext': '@react-bits/typewriter-text',
      'shuffetext': '@react-bits/shuffle-text',
      'shinytext': '@react-bits/shiny-text',
      'textpressure': '@react-bits/text-pressure',
      'curvedloop': '@react-bits/curved-loop',
      'fuzzytext': '@react-bits/fuzzy-text',
      'gradienttext': '@react-bits/gradient-text',
      'texttrail': '@react-bits/text-trail',
      'fallingtext': '@react-bits/falling-text',
      'textcursor': '@react-bits/text-cursor',
      'decryptedtext': '@react-bits/decrypted-text',
      'truefocus': '@react-bits/true-focus',
      'scrollfloat': '@react-bits/scroll-float',
      'scrollreveal': '@react-bits/scroll-reveal',
      'asciitext': '@react-bits/ascii-text',
      'scrambledtext': '@react-bits/scrambled-text',
      'rotatingtext': '@react-bits/rotating-text',
      'glitchtext': '@react-bits/glitch-text',
      'scrollvelocity': '@react-bits/scroll-velocity',
      'variableproximity': '@react-bits/variable-proximity',
      'countup': '@react-bits/count-up'
    };
    
    const packageName = installCommands[componentName] || `@react-bits/${componentName}`;
    
    switch (packageManager) {
      case 'npm': return `npm install ${packageName}`;
      case 'pnpm': return `pnpm add ${packageName}`;
      case 'yarn': return `yarn add ${packageName}`;
      case 'bun': return `bun add ${packageName}`;
      default: return `npm install ${packageName}`;
    }
  };

  const getUsageExample = () => {
    const componentName = activeAnimation.replace(' ', '');
    const colorClass = textColor === 'white' ? 'text-white' : 
                      textColor === '#a855f7' ? 'text-purple-500' :
                      textColor === '#3b82f6' ? 'text-blue-500' :
                      textColor === '#10b981' ? 'text-green-500' : 'text-white';
    
    return `import ${componentName} from "./${componentName}";

function handleAnimationComplete() {
  console.log("Animation completed!");
}

function MyComponent() {
  return (
    <${componentName}
      text="${customText}"
      className="${fontSize} font-bold ${colorClass}"
      delay={${animationDelay}}
      duration={${animationDuration}}
      onComplete={handleAnimationComplete}
    />
  );
}`;
  };

  const getComponentCode = () => {
    const componentName = activeAnimation.replace(' ', '');
    
    switch (activeAnimation) {
      case 'Split Text':
        return `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  easing?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  text, 
  delay = 0, 
  duration = 0.8, 
  stagger = 0.05,
  direction = "up",
  distance = 50,
  easing = "easeOut",
  className = "",
  style = {},
  onComplete
}) => {
  const words = text.split(' ');
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: distance, opacity: 0 };
      case "down": return { y: -distance, opacity: 0 };
      case "left": return { x: distance, opacity: 0 };
      case "right": return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up": return { y: 0, opacity: 1 };
      case "down": return { y: 0, opacity: 1 };
      case "left": return { x: 0, opacity: 1 };
      case "right": return { x: 0, opacity: 1 };
      default: return { y: 0, opacity: 1 };
    }
  };

  return (
    <div className={\`flex flex-wrap justify-center items-center gap-2 \${className}\`} style={style}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex gap-1">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial={getInitialPosition()}
              animate={getFinalPosition()}
              transition={{
                duration: duration,
                delay: delay + (wordIndex * 0.1) + (letterIndex * stagger),
                ease: easing,
                onComplete: letterIndex === word.length - 1 && wordIndex === words.length - 1 ? onComplete : undefined
              }}
            >
              {letter === ' ' ? '\\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ${componentName};`;
      
      case 'Blur Text':
        return `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  text: string;
  delay?: number;
  duration?: number;
  blurAmount?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  text, 
  delay = 0, 
  duration = 0.8, 
  blurAmount = 10,
  className = "",
  style = {},
  onComplete
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ filter: \`blur(\${blurAmount}px)\`, opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: "easeOut", onComplete }}
    >
      {text}
    </motion.div>
  );
};

export default ${componentName};`;

      case 'Circular Text':
        return `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  text: string;
  delay?: number;
  duration?: number;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  text, 
  delay = 0, 
  duration = 1,
  radius = 80,
  className = "",
  style = {},
  onComplete
}) => {
  const characters = text.split('');
  const angleStep = (2 * Math.PI) / characters.length;

  return (
    <motion.div
      className={\`relative flex items-center justify-center \${className}\`}
      style={{ width: radius * 2, height: radius * 2, ...style }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay, onComplete }}
    >
      {characters.map((char, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);
        
        return (
          <motion.span
            key={index}
            className="absolute text-sm font-bold"
            style={{
              left: x - 8,
              top: y - 8,
              color: style.color || 'white',
              transform: \`rotate(\${(angle * 180) / Math.PI + 90}deg)\`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: duration, 
              delay: delay + index * 0.1,
              type: 'spring',
              stiffness: 200
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default ${componentName};`;

      default:
        return `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {},
  onComplete
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration, delay: delay, onComplete }}
    >
      {text}
    </motion.div>
  );
};

export default ${componentName};`;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#100c18' }}>
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-800 sticky top-0 z-50" style={{ backgroundColor: '#100c18' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white">React Bits</span>
            </div>

            {/* Right side - Search and GitHub */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="flex items-center rounded-lg px-3 py-2" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    defaultValue="react"
                    className="bg-transparent text-white placeholder-gray-400 outline-none"
                  />
                  <div className="ml-2 text-xs text-gray-400">4/4</div>
                  <div className="ml-2 flex flex-col">
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                    <ChevronDown className="w-3 h-3 text-gray-400 rotate-180" />
                  </div>
                  <div className="ml-2 text-gray-400">×</div>
                </div>
              </div>

              {/* GitHub Star Button */}
              <Button className="text-white flex items-center space-x-2" style={{ backgroundColor: '#8b5cf6' }}>
                <Star className="w-4 h-4" />
                <span>Star On GitHub</span>
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#7c3aed' }}>28.5K</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div 
          className="w-64 h-screen overflow-y-auto sidebar-scroll" 
          style={{ 
            backgroundColor: '#1a1a1a', 
            borderRight: '1px solid #333'
          }}
        >
          <div className="p-6">
            {/* Get Started Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                GET STARTED
              </h3>
              <div className="space-y-1">
                {getStartedItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="cursor-pointer py-2 px-3 rounded-md hover:bg-gray-700 transition-colors" 
                    style={{ color: '#d1d5db' }}
                  >
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Animations Section */}
            <div>
              <h3 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                TEXT ANIMATIONS
              </h3>
              <div className="space-y-1">
                {textAnimations.map((animation, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                      activeAnimation === animation
                        ? 'text-white'
                        : 'hover:text-white hover:bg-gray-700'
                    }`}
                    style={{
                      backgroundColor: activeAnimation === animation ? '#374151' : 'transparent',
                      borderRadius: '6px'
                    }}
                    onClick={() => setActiveAnimation(animation)}
                  >
                    {/* Purple line indicator for active item */}
                    {activeAnimation === animation && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 rounded-r" 
                        style={{ 
                          backgroundColor: '#8b5cf6',
                          width: '3px',
                          borderRadius: '0 3px 3px 0'
                        }}
                      ></div>
                    )}
                    <span 
                      className="text-sm font-medium ml-1" 
                      style={{ color: activeAnimation === animation ? 'white' : '#d1d5db' }}
                    >
                      {animation}
                    </span>
                    {(animation === 'Shuffle' || animation === 'Bounce Text' || animation === 'Wave Text' || animation === 'Holographic Text' || animation === 'Neon Text' || animation === 'Magnetic Text') && (
                      <Badge 
                        variant="secondary" 
                        className="text-white text-xs px-2 py-1" 
                        style={{ 
                          backgroundColor: '#8b5cf6',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}
                      >
                        New
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8" style={{ backgroundColor: '#100c18' }}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-6 text-white">{activeAnimation}</h1>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant={activeTab === 'preview' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center space-x-2 ${
                    activeTab === 'preview' 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'preview' ? '#8b5cf6' : '#1a1a1a',
                    border: activeTab === 'preview' ? 'none' : '1px solid #333'
                  }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </Button>
                <Button 
                  variant={activeTab === 'code' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center space-x-2 ${
                    activeTab === 'code' 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'code' ? '#8b5cf6' : '#1a1a1a',
                    border: activeTab === 'code' ? 'none' : '1px solid #333'
                  }}
                >
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </Button>
              </div>
              
              {/* Contribute Button */}
              <Button 
                className="text-gray-300 hover:text-white flex items-center space-x-2"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              >
                <Heart className="w-4 h-4" />
                <span>Contribute</span>
              </Button>
            </div>
          </div>

          {/* Preview Window */}
          {activeTab === 'preview' && (
            <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
              <div className="relative">
                {/* Refresh Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 text-gray-400 hover:text-white"
                  style={{ backgroundColor: '#374151' }}
                  onClick={triggerAnimation}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>

                {/* Animation Preview */}
                <div className="flex items-center justify-center h-64">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={animationKey}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderAnimation()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Status Message */}
                {isAnimating && (
                  <motion.div 
                    className="absolute bottom-4 right-4 flex items-center space-x-2"
                    style={{ color: '#10b981' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                    <span className="text-sm">Animation Finished!</span>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div className="space-y-8">
              {/* Install Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Install</h3>
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-300 hover:text-white"
                    style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                  >
                    CLI
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-300 hover:text-white"
                    style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                  >
                    Manual
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  {['npm', 'pnpm', 'yarn', 'bun'].map((pm) => (
                    <Button
                      key={pm}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPackageManager(pm)}
                      className={`text-gray-300 hover:text-white ${
                        selectedPackageManager === pm ? 'border-purple-500' : ''
                      }`}
                      style={{ 
                        backgroundColor: selectedPackageManager === pm ? '#374151' : '#1a1a1a', 
                        border: selectedPackageManager === pm ? '1px solid #8b5cf6' : '1px solid #333' 
                      }}
                    >
                      {pm}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>CLI Command</label>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm text-white bg-gray-800 px-3 py-2 rounded flex-1">
                        {getCLICommand()}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(getCLICommand())}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Manual Install</label>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm text-white bg-gray-800 px-3 py-2 rounded flex-1">
                        {getInstallCommand(selectedPackageManager)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(getInstallCommand(selectedPackageManager))}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
                <div className="relative">
                  <pre className="rounded-lg p-4 overflow-x-auto" style={{ backgroundColor: '#100c18' }}>
                    <code className="text-sm" style={{ color: '#10b981' }}>{getUsageExample()}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(getUsageExample())}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Code Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Code</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                      style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                    >
                      TypeScript
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                      style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                    >
                      Tailwind
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <pre className="rounded-lg p-4 overflow-x-auto" style={{ backgroundColor: '#100c18' }}>
                    <code className="text-sm" style={{ color: '#10b981' }}>{getComponentCode()}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(getComponentCode())}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-2 right-2 text-gray-300 hover:text-white"
                    style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                  >
                    Expand Snippet
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Customize Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Customize</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Animation Settings */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h4 className="text-lg font-medium mb-4 text-white">Animation Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Duration: {animationDuration}s</label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={animationDuration}
                      onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Delay: {animationDelay}s</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={animationDelay}
                      onChange={(e) => setAnimationDelay(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Text Settings */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h4 className="text-lg font-medium mb-4 text-white">Text Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Text</label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full rounded-md px-3 py-2 text-white"
                      style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Font Size</label>
                    <select 
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full rounded-md px-3 py-2 text-white"
                      style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                    >
                      <option value="text-xs">Extra Small</option>
                      <option value="text-sm">Small</option>
                      <option value="text-base">Base</option>
                      <option value="text-lg">Medium</option>
                      <option value="text-xl">Large</option>
                      <option value="text-2xl">Extra Large</option>
                      <option value="text-3xl">3XL</option>
                      <option value="text-4xl">4XL</option>
                      <option value="text-5xl">5XL</option>
                      <option value="text-6xl">6XL</option>
                      <option value="text-7xl">7XL</option>
                      <option value="text-8xl">8XL</option>
                      <option value="text-9xl">9XL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Animation Size</label>
                    <select 
                      value={animationSize} 
                      onChange={(e) => setAnimationSize(e.target.value)}
                      className="w-full rounded-md px-3 py-2 text-white"
                      style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                    >
                      <option value="tiny">Tiny (Profile)</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="huge">Huge</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Animation Style</label>
                    <select 
                      value={animationStyle} 
                      onChange={(e) => setAnimationStyle(e.target.value)}
                      className="w-full rounded-md px-3 py-2 text-white"
                      style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                    >
                      <option value="default">Default</option>
                      <option value="subtle">Subtle</option>
                      <option value="dramatic">Dramatic</option>
                      <option value="minimal">Minimal</option>
                      <option value="playful">Playful</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Color Settings */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h4 className="text-lg font-medium mb-4 text-white">Color Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Text Color</label>
                    <div className="flex space-x-2">
                      <div 
                        className={`w-8 h-8 rounded border-2 cursor-pointer ${textColor === 'white' ? 'border-purple-500' : 'border-gray-600'}`}
                        style={{ backgroundColor: 'white' }}
                        onClick={() => setTextColor('white')}
                      ></div>
                      <div 
                        className={`w-8 h-8 rounded border-2 cursor-pointer ${textColor === '#a855f7' ? 'border-purple-500' : 'border-gray-600'}`}
                        style={{ backgroundColor: '#a855f7' }}
                        onClick={() => setTextColor('#a855f7')}
                      ></div>
                      <div 
                        className={`w-8 h-8 rounded border-2 cursor-pointer ${textColor === '#3b82f6' ? 'border-purple-500' : 'border-gray-600'}`}
                        style={{ backgroundColor: '#3b82f6' }}
                        onClick={() => setTextColor('#3b82f6')}
                      ></div>
                      <div 
                        className={`w-8 h-8 rounded border-2 cursor-pointer ${textColor === '#10b981' ? 'border-purple-500' : 'border-gray-600'}`}
                        style={{ backgroundColor: '#10b981' }}
                        onClick={() => setTextColor('#10b981')}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Component Variants Section */}
            <div className="mt-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h4 className="text-lg font-medium mb-4 text-white">Component Variants</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'js-css', label: 'JS + CSS', description: 'JavaScript with CSS' },
                    { id: 'js-tw', label: 'JS + TW', description: 'JavaScript with Tailwind' },
                    { id: 'ts-css', label: 'TS + CSS', description: 'TypeScript with CSS' },
                    { id: 'ts-tw', label: 'TS + TW', description: 'TypeScript with Tailwind' }
                  ].map((variant) => (
                    <div
                      key={variant.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        componentVariant === variant.id ? 'border-2 border-purple-500' : 'border border-gray-600'
                      }`}
                      style={{ backgroundColor: componentVariant === variant.id ? '#374151' : '#1a1a1a' }}
                      onClick={() => setComponentVariant(variant.id)}
                    >
                      <div className="text-white font-medium">{variant.label}</div>
                      <div className="text-sm" style={{ color: '#9ca3af' }}>{variant.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Props Documentation */}
            <div className="mt-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">Props Documentation</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowProps(!showProps)}
                    className="text-gray-300 hover:text-white"
                    style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                  >
                    {showProps ? 'Hide' : 'Show'} Props
                  </Button>
                </div>
                {showProps && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-white font-mono">text</span>
                      <span className="text-sm" style={{ color: '#9ca3af' }}>string (required)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-white font-mono">delay</span>
                      <span className="text-sm" style={{ color: '#9ca3af' }}>number (default: 0)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-white font-mono">duration</span>
                      <span className="text-sm" style={{ color: '#9ca3af' }}>number (default: 0.8)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-white font-mono">className</span>
                      <span className="text-sm" style={{ color: '#9ca3af' }}>string</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white font-mono">style</span>
                      <span className="text-sm" style={{ color: '#9ca3af' }}>object</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnimationsPage;