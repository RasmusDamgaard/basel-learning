# CLAUDE.md - AI Assistant Guide for Basel III Learning Platform

> **Last Updated:** 2026-01-19
> **Purpose:** Comprehensive guide for AI assistants working with this codebase

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Codebase Architecture](#codebase-architecture)
3. [Development Workflows](#development-workflows)
4. [Data Structures & Content Management](#data-structures--content-management)
5. [Code Conventions & Patterns](#code-conventions--patterns)
6. [Common Tasks](#common-tasks)
7. [Basel III Domain Knowledge](#basel-iii-domain-knowledge)
8. [Git Workflow](#git-workflow)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [Deployment](#deployment)

---

## Project Overview

### What is This Project?

**Basel III Learning Assistant** is an interactive Single Page Application (SPA) designed to teach Basel III banking regulations, with a focus on liquidity requirements (LCR, NSFR, ALMM) for Danish mortgage institutions.

**Key Characteristics:**
- **Type:** Educational web application
- **Framework:** React 18.2.0 + Vite 5.0.0
- **Styling:** Tailwind CSS 3.4.0
- **Icons:** lucide-react 0.263.1
- **State Management:** React hooks only (no Redux/Context)
- **Architecture:** Single-component monolith (all logic in `App.jsx`)
- **Data:** Separated into `/src/data/` modules
- **Deployment:** Static files (no backend required)

### Target Audience

- Banking students studying regulatory compliance
- Risk management professionals
- Compliance officers at financial institutions
- Specifically focused on Danish mortgage bond (SDRO) context

### Educational Approach

The platform implements **4 complementary learning modules**:

1. **Conceptual Mastery** - Quiz-based learning with explanations
2. **Classification Practice** - Drill exercises for regulatory categorization
3. **Calculation Exercises** - Step-by-step numerical problem solving
4. **Regulatory Interpretation** - Real-world case studies

Plus **Flashcards** for spaced repetition learning.

---

## Codebase Architecture

### Directory Structure

```
basel-learning/
├── public/
│   └── favicon.svg                      # Browser icon
├── src/
│   ├── App.jsx                          # Main component (314 lines) - ALL UI logic
│   ├── main.jsx                         # React entry point
│   ├── index.css                        # Tailwind imports + custom scrollbar
│   └── data/                            # Content modules (756 total lines)
│       ├── index.js                     # Central export hub (6 lines)
│       ├── conceptualQuestions.js       # Quiz questions (65 lines, 64 questions)
│       ├── classificationItems.js       # Classification drills (80 lines, 50+ items)
│       ├── calculationExercises.js      # Numerical problems (224 lines, 8+ exercises)
│       ├── interpretationScenarios.js   # Case studies (295 lines, 4+ scenarios)
│       └── flashcards.js                # Study cards (86 lines, 60+ cards)
├── index.html                           # HTML entry point
├── package.json                         # Dependencies & scripts
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind configuration
├── postcss.config.js                    # PostCSS pipeline
├── BaselFramework.pdf                   # 10-page reference guide (10.3 MB)
└── README.md                            # User-facing documentation
```

### Component Architecture

**IMPORTANT:** This is a **monolithic single-component application**.

- **Main Component:** `BaselLearningAssistant` (default export from `App.jsx`)
- **No component decomposition:** All logic resides in one 314-line component
- **No separate components:** Helper functions exist but aren't separate components
- **State management:** Pure React `useState` hooks (27 state variables)

**Helper Factory Functions in App.jsx:**
- `ModuleButton` - Renders module selection buttons
- `ApproachButton` - Renders learning approach selection buttons
- `TopicSelector` - Renders topic selection buttons (12 topics)

**Rendering Functions:**
- `renderQuiz()` - Quiz interface with scoring
- `renderClassification()` - Classification drill interface
- `renderCalculation()` - Calculation exercise interface
- `renderInterpretation()` - Scenario interpretation interface
- Flashcard rendering (inline in main render)

### State Management

**27 State Variables** (all using `useState`):

```javascript
// Navigation & Module Selection
activeModule              // 'home' | 'conceptual' | 'classification' | 'calculation' | 'interpretation'
activeApproach           // 'quiz' | 'scenarios' | 'flashcards' | null
activeTopic              // 'lcr' | 'nsfr' | 'almm' | 'capital' | 'leverage' | etc. (12 options)

// Quiz Module State
currentQuestionIndex     // Current question index
selectedAnswer           // User's selected answer index
showExplanation          // Boolean toggle for answer explanation
score                    // { correct: number, total: number }
quizCompleted            // Boolean for quiz completion state

// Classification Module State
classificationCategory   // 'hqla' | 'asf' | 'rsf' | 'outflows' | 'riskweights'
currentClassificationIndex
classificationAnswer     // User's classification answer
showClassificationAnswer // Boolean toggle
classificationScore      // { correct: number, total: number }

// Calculation Module State
currentExerciseIndex     // Current exercise index
showHints                // Boolean toggle for hints display
showSolution             // Boolean toggle for solution display

// Interpretation Module State
currentScenarioIndex     // Current scenario index
showGuidance             // Boolean toggle for guidance display
showModelAnswer          // Boolean toggle for model answer display

// Flashcard Module State
currentFlashcardIndex    // Current flashcard index
isFlipped                // Boolean for card flip state
shuffledCards            // Array of shuffled flashcard objects
```

### Data Flow

**Simple unidirectional flow:**

```
Data Modules (src/data/*.js)
    ↓ (imported into)
App.jsx
    ↓ (filtered by activeTopic & activeModule)
Render Functions
    ↓ (conditional rendering based on state)
Browser UI
```

**No external state management libraries** - everything is local React state.

---

## Development Workflows

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd basel-learning

# Install dependencies
npm install

# Start development server
npm run dev
# App runs at http://localhost:5173
```

### Available NPM Scripts

```json
{
  "dev": "vite",              // Start dev server with HMR
  "build": "vite build",      // Production build → dist/
  "preview": "vite preview"   // Preview production build locally
}
```

### Development Server Features

- **Hot Module Replacement (HMR):** Changes reflect instantly
- **Fast Refresh:** React component state preserved on edit
- **Port:** Default localhost:5173
- **Vite Dev Server:** Extremely fast cold starts

### Build Process

```bash
npm run build
```

**Output:**
- Creates `dist/` directory with optimized static files
- Code splitting applied automatically
- Tree shaking removes unused code
- CSS minified and extracted
- Assets hashed for cache busting

---

## Data Structures & Content Management

### Topic Taxonomy

**12 Basel III Topics** (used across all modules):

```javascript
const topics = [
  { id: 'lcr', label: 'LCR' },              // Liquidity Coverage Ratio
  { id: 'nsfr', label: 'NSFR' },            // Net Stable Funding Ratio
  { id: 'almm', label: 'ALMM' },            // Additional Liquidity Monitoring Metrics
  { id: 'capital', label: 'Capital' },      // Minimum capital requirements
  { id: 'leverage', label: 'Leverage' },    // Leverage ratio
  { id: 'creditrisk', label: 'Credit Risk' },
  { id: 'marketrisk', label: 'Market Risk' },
  { id: 'operational', label: 'Op Risk' },  // Operational Risk
  { id: 'pillar2', label: 'Pillar 2' },     // Supervisory Review Process
  { id: 'pillar3', label: 'Pillar 3' },     // Market Discipline
  { id: 'repos', label: 'Repos' },          // Repurchase Agreements
  { id: 'bonds', label: 'Bonds' }           // Fixed Income Securities
];
```

### Conceptual Questions Structure

**File:** `src/data/conceptualQuestions.js`

```javascript
export const conceptualQuestions = {
  lcr: [
    {
      id: 'lcr_c1',                                    // Unique identifier
      question: 'What is the primary objective...',    // Question text
      options: ['Option A', 'Option B', 'Option C', 'Option D'], // 4 options
      correct: 1,                                      // Index of correct answer (0-3)
      explanation: 'The LCR promotes short-term...',   // Why answer is correct
      reference: 'LCR20.1',                            // Basel regulation citation
      difficulty: 'basic'                              // 'basic' | 'intermediate' | 'advanced'
    },
    // ... more questions
  ],
  nsfr: [ /* ... */ ],
  almm: [ /* ... */ ],
  // ... other topics
};
```

**Key Fields:**
- `id`: Unique identifier (format: `{topic}_{module_abbreviation}{number}`)
- `question`: Full question text
- `options`: Array of exactly 4 answer choices
- `correct`: Index (0-3) of correct option
- `explanation`: Educational explanation of why answer is correct
- `reference`: Basel III regulation reference (e.g., 'LCR20.1', 'NSF30.2')
- `difficulty`: Difficulty level for badge display

### Classification Items Structure

**File:** `src/data/classificationItems.js`

```javascript
export const classificationItems = {
  hqla: [
    {
      id: 'hqla_1',
      item: 'Cash',
      category: 'Level 1',              // Correct classification
      explanation: 'Cash is the most liquid asset...',
      haircut: '0%'                     // Regulatory haircut if applicable
    },
    // ... more items
  ],
  asf: [ /* Available Stable Funding items */ ],
  rsf: [ /* Required Stable Funding items */ ],
  outflows: [ /* LCR outflow rate items */ ],
  riskweights: [ /* Capital risk weight items */ ]
};
```

**Categories:**
- **hqla**: High-Quality Liquid Assets (Level 1, Level 2A, Level 2B, Not HQLA)
- **asf**: Available Stable Funding factors (0%, 50%, 65%, 90%, 95%, 100%)
- **rsf**: Required Stable Funding factors (0%, 5%, 10%, 15%, 50%, 65%, 85%, 100%)
- **outflows**: LCR outflow rates (0%, 3%, 5%, 10%, 25%, 40%, 100%)
- **riskweights**: Capital risk weights (0%, 10%, 20%, 35%, 50%, 75%, 100%, 150%)

### Calculation Exercises Structure

**File:** `src/data/calculationExercises.js`

```javascript
export const calculationExercises = [
  {
    id: 'calc_lcr_1',
    title: 'Basic LCR Calculation',
    difficulty: 'basic',
    type: 'lcr',                        // Links to topic
    scenario: 'A bank has the following...',  // Multi-line scenario with data
    question: 'Calculate the LCR ratio',
    hints: [
      'Start by identifying Level 1 and Level 2 assets',
      'Apply haircuts to Level 2 assets',
      'Sum weighted outflows for 30-day period'
    ],
    solution: {
      steps: [
        'Step 1: Calculate HQLA numerator...',
        'Step 2: Calculate total net cash outflows...',
        'Step 3: Divide HQLA by outflows...'
      ],
      answer: '125.5%',
      keyInsight: 'The bank exceeds minimum LCR of 100%...'
    }
  },
  // ... more exercises
];
```

**Key Fields:**
- `scenario`: Detailed problem setup with all necessary data
- `hints`: Array of progressive hints (toggle-able in UI)
- `solution.steps`: Step-by-step solution walkthrough
- `solution.answer`: Final numerical result
- `solution.keyInsight`: Educational takeaway

### Interpretation Scenarios Structure

**File:** `src/data/interpretationScenarios.js`

```javascript
export const interpretationScenarios = [
  {
    id: 'interp_1',
    title: 'Currency Mismatch in HQLA Portfolio',
    category: 'lcr',
    difficulty: 'advanced',
    scenario: 'A Danish mortgage bank holds EUR 500m...',
    question: 'Evaluate the regulatory compliance and risk...',
    guidance: [
      'LCR10.9: HQLA currency must match operational needs',
      'LCR20.5: Supervisors may require currency-specific buffers',
      'Danish FSA guidelines on foreign currency liquidity'
    ],
    modelAnswer: 'This scenario presents several concerns...',
    regulations: ['LCR10.9', 'LCR30.29', 'NSF20.15']
  },
  // ... more scenarios
];
```

**Key Fields:**
- `guidance`: Array of regulatory references to consult
- `modelAnswer`: Comprehensive answer demonstrating regulatory interpretation
- `regulations`: Specific Basel III regulation citations

### Flashcards Structure

**File:** `src/data/flashcards.js`

```javascript
export const flashcards = {
  lcr: [
    {
      id: 'flash_lcr_1',
      front: 'What does LCR stand for?',
      back: 'Liquidity Coverage Ratio - measures 30-day survival...'
    },
    // ... more cards
  ],
  nsfr: [ /* ... */ ],
  // ... other topics
};
```

### Data Module Exports

**File:** `src/data/index.js`

```javascript
// Central export hub - DO NOT delete this file
export { conceptualQuestions } from './conceptualQuestions';
export { classificationItems } from './classificationItems';
export { calculationExercises } from './calculationExercises';
export { interpretationScenarios } from './interpretationScenarios';
export { flashcards } from './flashcards';
```

**IMPORTANT:** Always import from `./data` (index.js), not individual files:

```javascript
// ✅ CORRECT
import { conceptualQuestions, flashcards } from './data';

// ❌ WRONG - breaks encapsulation
import { conceptualQuestions } from './data/conceptualQuestions';
```

---

## Code Conventions & Patterns

### React Patterns

**1. Functional Components Only**
- No class components in codebase
- All components use React hooks

**2. State Management Pattern**
```javascript
// State declaration at component top
const [activeModule, setActiveModule] = useState('home');

// State updates in event handlers
onClick={() => setActiveModule('conceptual')}

// Conditional rendering based on state
{activeModule === 'conceptual' && <TopicSelector />}
```

**3. Reset Functions**
```javascript
// Pattern: Arrow functions that reset multiple related state variables
const resetQuiz = () => {
  setCurrentQuestionIndex(0);
  setSelectedAnswer(null);
  setShowExplanation(false);
  setScore({ correct: 0, total: 0 });
  setQuizCompleted(false);
};
```

**4. Factory Functions for Repeated UI**
```javascript
// Pattern: Functions that return JSX elements (NOT components)
const ModuleButton = ({ module, icon: Icon, title, description }) => (
  <button onClick={() => { /* ... */ }}>
    {/* ... JSX ... */}
  </button>
);
```

### Styling Conventions

**Tailwind CSS Class Patterns:**

```javascript
// Color Scheme by Module
'bg-blue-600'    // Primary actions, default module
'bg-green-500'   // Success states, correct answers
'bg-red-500'     // Error states, incorrect answers
'bg-yellow-500'  // Warnings, hints
'bg-purple-600'  // Classification module
'bg-orange-600'  // Calculation module
'bg-indigo-600'  // Interpretation module

// Interactive States
'hover:bg-blue-700'         // Hover states
'border-blue-500 bg-blue-50'  // Active/selected states
'border-gray-200'           // Inactive states

// Spacing Pattern
'p-4'    // Padding for cards
'gap-2'  // Small gaps
'gap-4'  // Medium gaps
'mb-4'   // Margin bottom

// Typography
'text-sm'        // Small text
'text-lg'        // Large text
'font-semibold'  // Headings
'font-medium'    // Buttons
```

### Naming Conventions

**Variables:**
```javascript
// State: camelCase with descriptive names
currentQuestionIndex
showExplanation
activeModule

// State setters: set + PascalCase
setCurrentQuestionIndex
setShowExplanation
setActiveModule
```

**Functions:**
```javascript
// Actions: verb + noun (camelCase)
resetQuiz()
shuffleArray()
handleAnswerSelection()

// Renderers: render + ComponentName (camelCase)
renderQuiz()
renderClassification()
```

**IDs in Data:**
```javascript
// Format: {topic}_{module}_{number}
'lcr_c1'      // LCR conceptual question 1
'calc_nsfr_2' // NSFR calculation exercise 2
'interp_3'    // Interpretation scenario 3
'flash_lcr_5' // LCR flashcard 5
```

### Conditional Rendering Patterns

**Pattern 1: Ternary for two states**
```javascript
{quizCompleted ? (
  <CompletionScreen />
) : (
  <QuizInterface />
)}
```

**Pattern 2: Logical AND for conditional display**
```javascript
{showExplanation && (
  <div className="explanation">
    {question.explanation}
  </div>
)}
```

**Pattern 3: Early return in render functions**
```javascript
const renderQuiz = () => {
  const questions = conceptualQuestions[activeTopic];
  if (!questions?.length) return <p>No questions available.</p>;

  // ... rest of logic
};
```

### Event Handler Patterns

**Inline onClick handlers:**
```javascript
// Simple state toggle
<button onClick={() => setIsFlipped(!isFlipped)}>Flip</button>

// Multiple state updates
<button onClick={() => {
  setActiveModule('conceptual');
  setActiveApproach(null);
  resetQuiz();
}}>
  Start Quiz
</button>

// State update with computation
<button onClick={() => setScore(prev => ({
  ...prev,
  correct: prev.correct + 1
}))}>
  Correct
</button>
```

---

## Common Tasks

### Adding New Questions

**Step 1:** Edit `src/data/conceptualQuestions.js`

```javascript
export const conceptualQuestions = {
  lcr: [
    // ... existing questions
    {
      id: 'lcr_c99',  // Use next available number
      question: 'Your new question text here?',
      options: [
        'Option A - must have exactly 4 options',
        'Option B',
        'Option C',
        'Option D'
      ],
      correct: 2,  // Index 0-3 of correct option
      explanation: 'Detailed explanation of why this answer is correct and why others are wrong.',
      reference: 'LCR20.15',  // Basel regulation citation
      difficulty: 'intermediate'  // basic | intermediate | advanced
    }
  ]
};
```

**Step 2:** Test in browser (no code changes needed)
- Start dev server: `npm run dev`
- Navigate to Conceptual Mastery → Select topic → Verify question appears

### Adding New Calculation Exercises

**Edit:** `src/data/calculationExercises.js`

```javascript
export const calculationExercises = [
  // ... existing exercises
  {
    id: 'calc_lcr_99',
    title: 'Short Descriptive Title',
    difficulty: 'intermediate',
    type: 'lcr',  // Must match a topic id
    scenario: `
      Provide a detailed scenario with all data needed.
      Use backticks for multi-line strings.

      Example data:
      - Level 1 HQLA: EUR 500m
      - Total outflows: EUR 420m
      - Total inflows: EUR 250m (capped at 75% of outflows)
    `,
    question: 'Calculate the LCR ratio and determine compliance.',
    hints: [
      'First hint - directional guidance',
      'Second hint - more specific',
      'Third hint - almost gives away the answer'
    ],
    solution: {
      steps: [
        'Step 1: Calculate HQLA numerator = EUR 500m',
        'Step 2: Net outflows = EUR 420m - min(EUR 250m, EUR 315m) = EUR 105m',
        'Step 3: LCR = EUR 500m / EUR 105m = 476%'
      ],
      answer: '476% (well above 100% minimum)',
      keyInsight: 'Banks with strong HQLA positions and limited net outflows achieve high LCR ratios, providing substantial liquidity buffers.'
    }
  }
];
```

### Adding New Topics

**IMPORTANT:** Adding a new topic requires changes in multiple places.

**Step 1:** Add topic to topic selector in `src/App.jsx` (line ~68-83)

```javascript
const TopicSelector = () => (
  <div className="flex gap-2 mb-4 flex-wrap">
    {[
      // ... existing topics
      { id: 'newtopic', label: 'New Topic' }  // Add here
    ].map(t => (
      <button key={t.id} /* ... */>
        {t.label}
      </button>
    ))}
  </div>
);
```

**Step 2:** Add data for the new topic in relevant data files

```javascript
// src/data/conceptualQuestions.js
export const conceptualQuestions = {
  // ... existing topics
  newtopic: [
    { /* question structure */ }
  ]
};

// src/data/flashcards.js
export const flashcards = {
  // ... existing topics
  newtopic: [
    { /* flashcard structure */ }
  ]
};
```

**Step 3:** Test thoroughly - new topic should appear in all modules

### Modifying Styling

**Global Styles:** Edit `src/index.css`

```css
/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar (already present) */
::-webkit-scrollbar { width: 8px; }
/* ... */
```

**Component Styles:** Modify Tailwind classes directly in JSX

```javascript
// Before
<button className="px-4 py-2 bg-blue-600 text-white">

// After - change to green
<button className="px-4 py-2 bg-green-600 text-white">
```

**Tailwind Config:** Extend theme in `tailwind.config.js`

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'basel-blue': '#1e40af',  // Custom color
      }
    }
  },
  plugins: []
};
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update react

# Update all packages (be cautious)
npm update

# Update to specific version
npm install react@18.3.0
```

**IMPORTANT:** Test thoroughly after dependency updates, especially:
- React version changes (may affect hooks behavior)
- Tailwind updates (may change default styles)
- Vite updates (may change build behavior)

---

## Basel III Domain Knowledge

### Key Regulations Covered

**Liquidity Ratios:**
1. **LCR (Liquidity Coverage Ratio)** - LCR10-LCR50
   - Ensures 30-day survival in stress scenario
   - HQLA ÷ Net Cash Outflows ≥ 100%

2. **NSFR (Net Stable Funding Ratio)** - NSF10-NSF40
   - Ensures stable funding over 1 year
   - Available Stable Funding ÷ Required Stable Funding ≥ 100%

3. **ALMM (Additional Liquidity Monitoring Metrics)** - SRP50
   - Contractual maturity mismatch
   - Concentration of funding
   - Available unencumbered assets
   - LCR by currency
   - Market-related monitoring tools

**Capital & Risk:**
4. **Capital Requirements** - CAP10
   - CET1 minimum: 4.5%
   - Total capital minimum: 8%
   - Conservation buffer: 2.5%

5. **Leverage Ratio** - LEV10-LEV30
   - Non-risk-based backstop: 3%
   - Tier 1 Capital ÷ Total Exposure

6. **Credit Risk** - CRE20-CRE54
   - Standardized approach risk weights
   - Internal ratings-based approach
   - Credit risk mitigation

7. **Market Risk** - MAR10-MAR30
   - Value-at-Risk (VaR)
   - Stressed VaR
   - Incremental risk charge

**Supervisory Framework:**
8. **Pillar 2** - Supervisory Review Process
9. **Pillar 3** - Market Discipline & Disclosure

### Danish Mortgage Context

**Key Concepts:**
- **SDROs:** Særligt Dækkede Realkreditobligationer (Covered Mortgage Bonds)
- **Balance Principle:** Match-funding requirement (assets ≈ liabilities)
- **Cover Pool:** Ring-fenced mortgage assets backing bonds
- **Dual Recourse:** Bondholders have claim on both cover pool and issuer

**Regulatory Bodies:**
- **BCBS:** Basel Committee on Banking Supervision (international)
- **Danish FSA:** Finanstilsynet (national supervisor)
- **EBA:** European Banking Authority (EU level)

### Regulation Reference Format

**Citation Pattern:** `{Standard}{Chapter}.{Paragraph}`

Examples:
- `LCR20.1` = LCR standard, Chapter 20, Paragraph 1
- `NSF30.25` = NSFR standard, Chapter 30, Paragraph 25
- `CRE54.3` = Credit Risk standard, Chapter 54, Paragraph 3

### Common Acronyms

```
HQLA  = High-Quality Liquid Assets
ASF   = Available Stable Funding
RSF   = Required Stable Funding
RWA   = Risk-Weighted Assets
CET1  = Common Equity Tier 1
AT1   = Additional Tier 1
CCB   = Capital Conservation Buffer
QCCP  = Qualifying Central Counterparty
CVA   = Credit Valuation Adjustment
VaR   = Value at Risk
```

---

## Git Workflow

### Branch Structure

**Main Branch:** `main` (or `master`)
- Production-ready code
- Protected branch (no direct pushes)

**Feature Branches:** `claude/feature-name-{sessionId}`
- Format: `claude/add-new-questions-Ab3X9`
- All development happens on feature branches
- Session ID suffix ensures uniqueness

### Standard Workflow

```bash
# 1. Ensure you're on the correct branch
git status
# Should show: On branch claude/add-claude-documentation-AbRnq

# 2. Make changes to files
# (edit files using your tools)

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "Add comprehensive CLAUDE.md documentation

- Added project overview and architecture details
- Documented data structures and conventions
- Included Basel III domain knowledge
- Added common tasks guide"

# 5. Push to remote
git push -u origin claude/add-claude-documentation-AbRnq
```

### Commit Message Conventions

**Format:**
```
Short summary (imperative mood, 50 chars or less)

Optional detailed explanation:
- Bullet point 1
- Bullet point 2
- Bullet point 3
```

**Examples:**

```bash
# Good - specific and clear
git commit -m "Add 15 new LCR questions covering HQLA classification"

# Good - explains why
git commit -m "Refactor quiz reset logic

Move reset functions to useCallback hooks to prevent
unnecessary re-renders when switching topics"

# Bad - too vague
git commit -m "Update files"

# Bad - multiple unrelated changes
git commit -m "Add questions, fix styling, update README"
```

### Pull Request Workflow

**When to Create PR:**
- Feature is complete and tested
- All changes committed and pushed
- Ready for review/merge

**Using GitHub CLI:**
```bash
# Create PR from current branch
gh pr create --title "Add Claude documentation" --body "
## Summary
- Added comprehensive CLAUDE.md file
- Documented codebase architecture
- Included Basel III domain knowledge

## Test Plan
- Verified all links and references
- Checked formatting in GitHub Markdown renderer
"
```

### Git Best Practices for This Repo

1. **Never commit to main directly** - always use feature branches
2. **Keep commits atomic** - one logical change per commit
3. **Test before committing** - run `npm run dev` and verify changes
4. **Don't commit build artifacts** - `dist/` is in `.gitignore`
5. **Don't commit sensitive data** - no API keys, credentials
6. **Write clear commit messages** - future you will thank you

---

## Testing & Quality Assurance

### Current Testing Status

**⚠️ No automated testing infrastructure exists**

- No test files present
- No testing libraries in `package.json`
- No test runners configured
- No CI/CD pipeline

### Manual Testing Checklist

When making changes, manually verify:

**✅ Visual Testing**
```bash
npm run dev
# Then test in browser:
```

1. **Navigation Flow**
   - [ ] Home screen loads correctly
   - [ ] All 4 modules accessible
   - [ ] Topic selector works for all 12 topics
   - [ ] Back to home navigation works

2. **Quiz Module**
   - [ ] Questions load for selected topic
   - [ ] All 4 answer options clickable
   - [ ] Correct/incorrect feedback displays
   - [ ] Explanation shows after answer
   - [ ] Score increments correctly
   - [ ] Quiz completion screen appears
   - [ ] "Try Again" resets quiz properly

3. **Classification Module**
   - [ ] Category selector works (5 categories)
   - [ ] Items load correctly
   - [ ] Answer options display
   - [ ] Feedback shows after classification
   - [ ] Score tracks correctly

4. **Calculation Module**
   - [ ] Exercises load for topic
   - [ ] Exercise selector tabs work
   - [ ] Hints toggle on/off
   - [ ] Solution toggle on/off
   - [ ] Scenario text displays properly

5. **Interpretation Module**
   - [ ] Scenarios load correctly
   - [ ] Guidance toggles
   - [ ] Model answer toggles
   - [ ] All scenario text readable

6. **Flashcards**
   - [ ] Cards load for topic
   - [ ] Flip animation works
   - [ ] Shuffle function works
   - [ ] Navigation between cards works

**✅ Data Integrity**
- [ ] All questions have 4 options
- [ ] All `correct` indices are 0-3
- [ ] All references are valid format
- [ ] No missing `id` fields
- [ ] No duplicate `id` values

**✅ Responsive Design**
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1920px)
- [ ] All buttons accessible
- [ ] Text readable at all sizes

**✅ Browser Compatibility**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if accessible)

### Code Quality Checks

**Linting (Manual):**
```bash
# Currently no ESLint configured
# Check for console.log statements
grep -r "console.log" src/

# Check for TODO comments
grep -r "TODO" src/
```

**Build Validation:**
```bash
# Ensure production build succeeds
npm run build

# Check build output
ls -lh dist/

# Preview production build
npm run preview
```

### Future Testing Recommendations

If implementing automated testing, consider:

**Unit Testing:**
- Test data structure validity (all required fields present)
- Test score calculation logic
- Test shuffle algorithm
- Test reset functions

**Component Testing:**
- Test quiz answer selection and feedback
- Test topic switching
- Test module navigation
- Test state transitions

**Integration Testing:**
- Test full user flows (home → quiz → completion)
- Test data loading for all topics
- Test all module interactions

**Suggested Stack:**
- **Framework:** Vitest (Vite-native, fast)
- **Component Testing:** React Testing Library
- **E2E:** Playwright or Cypress

---

## Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Output location: ./dist/
# Contains: index.html, assets/*.js, assets/*.css
```

### Deployment Options

**Option 1: Vercel (Recommended)**
```bash
# 1. Push to GitHub
git push origin main

# 2. Import on Vercel
# - Go to vercel.com
# - New Project → Import from GitHub
# - Select repository
# - Framework preset: Vite
# - Click Deploy

# Live at: https://your-project.vercel.app
```

**Option 2: Netlify**
```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy on Netlify
# - Go to netlify.com
# - New site from Git
# - Build command: npm run build
# - Publish directory: dist
# - Click Deploy

# Live at: https://your-project.netlify.app
```

**Option 3: GitHub Pages**
```bash
# 1. Update vite.config.js base path
# Add: base: '/repository-name/'

# 2. Install gh-pages
npm install -D gh-pages

# 3. Add deploy script to package.json
# "deploy": "npm run build && gh-pages -d dist"

# 4. Deploy
npm run deploy

# 5. Enable GitHub Pages in repo settings
# Settings → Pages → Source: gh-pages branch

# Live at: https://username.github.io/repository-name/
```

**Option 4: Generic Static Hosting**
```bash
# After npm run build, upload dist/ contents to:
# - AWS S3 + CloudFront
# - Google Cloud Storage + CDN
# - Azure Static Web Apps
# - Traditional web server (Apache/Nginx)
# - Cloudflare Pages
# - Firebase Hosting
```

### Environment Configuration

**Base Path Configuration:**

If deploying to subdirectory, update `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // Current: relative paths (works anywhere)
  // base: '/basel-learning/',  // Use if deploying to subdirectory
});
```

### Post-Deployment Verification

**Checklist:**
- [ ] Site loads at deployed URL
- [ ] All navigation works
- [ ] All topics load correctly
- [ ] No 404 errors in console
- [ ] Icons display correctly (lucide-react)
- [ ] Tailwind styles applied
- [ ] Responsive design works
- [ ] All modules functional

### Rollback Procedure

**Vercel/Netlify:**
- Use platform UI to rollback to previous deployment
- Deployments are immutable and versioned

**GitHub Pages:**
```bash
# Revert to previous commit
git revert HEAD
npm run deploy
```

**Manual Hosting:**
```bash
# Keep previous dist/ as backup
mv dist dist-backup-2026-01-19

# Build previous version
git checkout previous-commit
npm install
npm run build

# Upload new dist/ to server
```

---

## Key Conventions Summary

### File Organization
- ✅ **DO:** Keep all data in `src/data/` modules
- ✅ **DO:** Export data through `src/data/index.js`
- ❌ **DON'T:** Put content data in `App.jsx`
- ❌ **DON'T:** Create new top-level directories without discussion

### Code Style
- ✅ **DO:** Use functional components with hooks
- ✅ **DO:** Use Tailwind utility classes for styling
- ✅ **DO:** Follow existing naming conventions
- ❌ **DON'T:** Add class components
- ❌ **DON'T:** Add external state management libraries without discussion
- ❌ **DON'T:** Write custom CSS (use Tailwind)

### Content Additions
- ✅ **DO:** Add questions to appropriate topic in data files
- ✅ **DO:** Include all required fields (id, question, options, correct, explanation, reference, difficulty)
- ✅ **DO:** Use proper Basel III citations
- ❌ **DON'T:** Create questions without explanations
- ❌ **DON'T:** Use duplicate IDs
- ❌ **DON'T:** Have more or less than 4 options

### Git Workflow
- ✅ **DO:** Work on feature branches (claude/*)
- ✅ **DO:** Write descriptive commit messages
- ✅ **DO:** Test before committing
- ❌ **DON'T:** Commit directly to main
- ❌ **DON'T:** Commit build artifacts (dist/)
- ❌ **DON'T:** Force push to shared branches

---

## Troubleshooting Common Issues

### Development Issues

**Issue:** `npm run dev` fails
```bash
# Solution 1: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev

# Solution 2: Check Node.js version (need 18+ for Vite 5)
node --version
```

**Issue:** Changes not reflecting in browser
```bash
# Solution: Hard refresh browser
# Chrome/Firefox: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
# Or clear browser cache
```

**Issue:** Tailwind styles not applying
```bash
# Check that content paths in tailwind.config.js are correct
# Should be: './index.html', './src/**/*.{js,ts,jsx,tsx}'

# If changed, restart dev server
npm run dev
```

### Build Issues

**Issue:** Build fails with "out of memory"
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**Issue:** Build succeeds but site blank after deployment
```bash
# Check base path in vite.config.js
# If deployed to subdirectory, base must match

# Check browser console for 404 errors
# May need to adjust base path
```

### Data Issues

**Issue:** Questions not appearing
```javascript
// Check that topic ID matches exactly
// In App.jsx TopicSelector: { id: 'lcr', label: 'LCR' }
// In conceptualQuestions: lcr: [ /* questions */ ]

// Check that data is exported in src/data/index.js
export { conceptualQuestions } from './conceptualQuestions';

// Check import in App.jsx
import { conceptualQuestions } from './data';
```

**Issue:** "No questions available" message
```javascript
// Ensure questions array is not empty
export const conceptualQuestions = {
  lcr: [
    // Must have at least one question
    { id: 'lcr_c1', /* ... */ }
  ]
};

// Check for JavaScript syntax errors in data file
// Run: npm run dev and check console
```

---

## Quick Reference

### File Locations

| What | Where |
|------|-------|
| Main component | `/src/App.jsx` |
| Quiz questions | `/src/data/conceptualQuestions.js` |
| Classification items | `/src/data/classificationItems.js` |
| Calculation exercises | `/src/data/calculationExercises.js` |
| Interpretation scenarios | `/src/data/interpretationScenarios.js` |
| Flashcards | `/src/data/flashcards.js` |
| Data exports | `/src/data/index.js` |
| Styles | `/src/index.css` |
| Tailwind config | `/tailwind.config.js` |
| Vite config | `/vite.config.js` |
| Dependencies | `/package.json` |

### Command Reference

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build

# Git
git status           # Check current status
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push -u origin branch-name  # Push to remote

# Deployment
npm run build        # Build for production
# Then upload dist/ to hosting provider
```

### Color Reference

```javascript
// Module Colors
'blue'    // Default, primary, LCR
'green'   // Success, correct answers
'red'     // Errors, incorrect answers
'yellow'  // Warnings, hints
'purple'  // Classification module
'orange'  // Calculation module
'indigo'  // Interpretation module

// State Colors
'gray'    // Inactive, disabled
'blue'    // Active, selected
```

---

## Additional Resources

### Basel III Documentation
- **Official Basel Framework:** https://www.bis.org/basel_framework/
- **LCR Standard:** Basel Framework → LCR10-LCR50
- **NSFR Standard:** Basel Framework → NSF10-NSF40
- **Capital Standards:** Basel Framework → CAP10+

### Technical Documentation
- **React Docs:** https://react.dev/
- **Vite Docs:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/icons/

### Repository Resources
- **README.md:** User-facing quick start guide
- **BaselFramework.pdf:** 10-page Basel III reference guide
- **package.json:** Full dependency list

---

## Changelog

### 2026-01-19 - Initial CLAUDE.md Creation
- Added comprehensive project overview
- Documented complete architecture
- Included all data structures
- Added development workflows
- Documented Basel III domain knowledge
- Created troubleshooting guide
- Added quick reference sections

---

**Document Status:** ✅ Complete and up-to-date
**Last Reviewed:** 2026-01-19
**Maintained By:** AI Assistants working with this codebase

*This document should be updated whenever significant changes are made to the project structure, data formats, or conventions.*
