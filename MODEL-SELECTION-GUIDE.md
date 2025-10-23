# 🤖 AI Model Selection System - How It Works

## Overview
The Website Builder now has a **smart model selection system** with 3 modes, similar to Cursor IDE.

---

## 🎯 Three Modes (Mutually Exclusive)

### 1. **🤖 Auto Mode** (Default - Recommended)
**What it does:**
- Automatically picks the **best AI model** based on your prompt complexity
- Simple prompts (< 100 chars) → Uses **GROQ** (0.1s - ultra fast!)
- Complex prompts (animations, interactive, advanced) → Uses **Gemini** (1s - smarter!)

**When to use:**
- ✅ Default for most users
- ✅ You want balanced speed & quality
- ✅ You don't care which model runs

**Visual indicator:**
```
🟢 Auto-selecting best model
```

**Console log example:**
```
🤖 AUTO MODE ACTIVE: Selected GROQ (complexity: LOW, overriding user selection)
```

---

### 2. **🔥 MAX Mode**
**What it does:**
- Uses **YOUR selected model** with enhanced prompts
- Adds special instructions to the AI for maximum quality
- Generates 8+ sections, advanced animations, premium designs

**When to use:**
- ✅ You want the absolute best quality
- ✅ You're willing to wait longer (2-3s)
- ✅ You want production-ready code

**Visual indicator:**
```
🟣 MAX Mode: GROQ (Llama 3.3)
```

**Console log example:**
```
🔥 MAX MODE ACTIVE: Using GROQ (Llama 3.3) with maximum context
```

**Enhanced prompt adds:**
```
- Advanced features and animations
- Multiple interactive sections (minimum 8)
- Professional polish and micro-interactions
- Stunning visual effects and transitions
- Complete, working code (NO placeholders)
- Premium design quality ($10k+ look)
```

---

### 3. **🎯 Manual Mode** (Both toggles OFF)
**What it does:**
- Uses **exactly the model YOU selected** from the dropdown
- No auto-selection, no enhancements
- Direct control

**When to use:**
- ✅ You want to test specific models
- ✅ You prefer a particular AI (GROQ vs Gemini)
- ✅ You want predictable behavior

**Visual indicator:**
```
🔵 Manual: Gemini 1.5 Flash
```

**Console log example:**
```
🎯 MANUAL MODE: Using user-selected model: Gemini 1.5 Flash
```

---

## 🔄 How It Works (Code Flow)

### Step 1: User submits prompt
```tsx
const handleGenerate = async (prompt: string) => {
  // ...
}
```

### Step 2: Determine which model to use
```tsx
let modelToUse = selectedModel; // Default to user selection

if (autoMode) {
  // Auto mode overrides user selection
  modelToUse = isComplex ? 'gemini' : 'groq';
} else if (maxMode) {
  // MAX mode uses user selection + enhanced prompt
  modelToUse = selectedModel;
} else {
  // Manual mode uses user selection
  modelToUse = selectedModel;
}
```

### Step 3: Call the AI service
```tsx
if (modelToUse === 'groq') {
  aiGeneratedCode = await groqService.generateWebsite({ prompt: enhancedPrompt });
} else {
  aiGeneratedCode = await geminiService.generateWebsite({ prompt: enhancedPrompt });
}
```

### Step 4: Fallback if primary fails
```tsx
catch (primaryError) {
  // Try the other model as backup
  if (modelToUse === 'groq') {
    aiGeneratedCode = await geminiService.generateWebsite({ prompt: enhancedPrompt });
  } else {
    aiGeneratedCode = await groqService.generateWebsite({ prompt: enhancedPrompt });
  }
}
```

---

## 🎨 UI Indicators

### Model Selector Button
```tsx
<button disabled={autoMode}>
  {autoMode ? '🤖 Auto' : '⚡ GROQ (Llama 3.3)'}
</button>
```
- **Disabled** when Auto mode is ON (grayed out)
- **Clickable** when Auto mode is OFF

### Status Badges
| Mode | Color | Text |
|------|-------|------|
| Auto | 🟢 Green | "Auto-selecting best model" |
| MAX | 🟣 Purple | "MAX Mode: [Model Name]" |
| Manual | 🔵 Blue | "Manual: [Model Name]" |

### Toggle Switches
```tsx
Auto: [ON] ⬅️ Turns OFF MAX automatically
MAX:  [OFF]

// User clicks MAX
Auto: [OFF]
MAX:  [ON] ⬅️ Turns OFF Auto automatically
```

---

## 🧪 Testing the System

### Test 1: Auto Mode (Simple Prompt)
1. Turn **Auto ON**
2. Type: "create a landing page"
3. Check console: Should see `🤖 AUTO MODE ACTIVE: Selected GROQ`

### Test 2: Auto Mode (Complex Prompt)
1. Turn **Auto ON**
2. Type: "create an interactive portfolio with animations"
3. Check console: Should see `🤖 AUTO MODE ACTIVE: Selected GEMINI`

### Test 3: Manual Mode
1. Turn **Auto OFF**, **MAX OFF**
2. Select **Gemini** from dropdown
3. Type any prompt
4. Check console: Should see `🎯 MANUAL MODE: Using user-selected model: Gemini 1.5 Flash`

### Test 4: MAX Mode
1. Turn **MAX ON** (Auto turns OFF automatically)
2. Select **GROQ** from dropdown
3. Type: "create a portfolio"
4. Check console: Should see `🔥 MAX MODE ACTIVE: Using GROQ (Llama 3.3) with maximum context`

---

## 🚀 Available Models

| Model | Emoji | Status | Speed | Best For |
|-------|-------|--------|-------|----------|
| GROQ (Llama 3.3) | ⚡ | ✅ Free | 0.1s | Simple prompts, speed |
| Gemini 1.5 Flash | 💎 | ✅ Free | 1s | Complex prompts, quality |

---

## 💡 Tips

1. **Leave Auto ON** for most tasks → Best balance
2. **Use MAX Mode** when you need production quality
3. **Use Manual Mode** to compare GROQ vs Gemini side-by-side
4. **Check console logs** to see which model was actually used
5. **Watch status badges** to confirm your selection

---

## 🐛 Troubleshooting

### "Model selector won't open"
→ **Turn OFF Auto mode** - Selector is disabled when Auto is ON

### "Selected Gemini but GROQ was used"
→ **Check if Auto mode is ON** - Auto overrides your selection

### "Switches not clickable"
→ **Fixed!** Make sure you're on the latest version

---

## 📝 Code Locations

- **Main logic**: `src/pages/WebsiteBuilder.tsx` (lines 200-256)
- **GROQ service**: `src/services/groqService.ts`
- **Gemini service**: `src/services/geminiService.ts`
- **UI toggles**: `src/pages/WebsiteBuilder.tsx` (lines 1727-1775)
- **Model list**: `src/pages/WebsiteBuilder.tsx` (lines 39-68)

---

**Last Updated:** October 22, 2025
**Status:** ✅ Fully Functional

