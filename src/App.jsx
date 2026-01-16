import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Calculator, Scale, FileText, ChevronRight, ChevronLeft, Check, X, RotateCcw, Lightbulb, Award, Target, Layers, HelpCircle, AlertTriangle, Shuffle, Home } from 'lucide-react';

// ==================== DATA ====================
const conceptualQuestions = {
  lcr: [
    { id: 'lcr_c1', question: 'What is the primary objective of the Liquidity Coverage Ratio (LCR)?', options: ['To ensure banks maintain adequate capital ratios', 'To promote short-term resilience by ensuring banks have sufficient HQLA to survive a 30-day stress scenario', 'To limit banks\' exposure to market risk', 'To ensure banks have stable long-term funding'], correct: 1, explanation: 'The LCR promotes short-term resilience of a bank\'s liquidity risk profile by ensuring it has sufficient high-quality liquid assets (HQLA) to survive a significant stress scenario lasting 30 calendar days.', reference: 'LCR20.1', difficulty: 'basic' },
    { id: 'lcr_c2', question: 'What stress scenario does the LCR assume?', options: ['Only an idiosyncratic (bank-specific) shock', 'Only a market-wide systemic shock', 'A combined idiosyncratic and market-wide shock', 'A gradual deterioration over 90 days'], correct: 2, explanation: 'The LCR scenario entails a combined idiosyncratic AND market-wide shock including: run-off of retail deposits, partial loss of wholesale funding, collateral posting requirements from rating downgrades, and more.', reference: 'LCR20.2', difficulty: 'intermediate' },
    { id: 'lcr_c3', question: 'Can banks use their HQLA buffer during stress periods, thereby falling below 100% LCR?', options: ['No, banks must always maintain LCR at or above 100%', 'Yes, but only with prior written approval', 'Yes, this is entirely appropriate during periods of stress', 'Only if the shortfall is less than 10%'], correct: 2, explanation: 'During periods of stress, "it would be entirely appropriate for banks to use their stock of HQLA, thereby falling below the minimum." The HQLA is intended as a defense against liquidity stress.', reference: 'LCR20.5', difficulty: 'intermediate' },
    { id: 'lcr_c4', question: 'What is the relationship between Level 1 and Level 2 assets in the HQLA cap structure?', options: ['Level 2 assets can comprise up to 60% of HQLA', 'Level 2 assets can comprise up to 40% of HQLA, with Level 2B limited to 15%', 'There is no limit on Level 2 assets', 'Level 1 and Level 2 must be equal'], correct: 1, explanation: 'Level 1 assets can be included without limit, while Level 2 assets can only comprise up to 40% of total HQLA. Level 2B assets are further limited to 15% of total HQLA. These caps apply after haircuts.', reference: 'LCR30.30-30.34', difficulty: 'intermediate' },
    { id: 'lcr_c5', question: 'Why should HQLA currency composition match operational needs?', options: ['It\'s only a suggestion', 'Because currencies may not remain transferable/convertible during stress', 'To maximize interest income', 'To reduce operational costs'], correct: 1, explanation: 'Banks and supervisors cannot assume currencies will remain transferable and convertible in a stress period. HQLA currency composition should match operational needs to ensure availability when needed.', reference: 'LCR10.9', difficulty: 'advanced' }
  ],
  nsfr: [
    { id: 'nsfr_c1', question: 'What is the primary purpose of the NSFR?', options: ['To ensure banks survive a 30-day stress scenario', 'To require banks to maintain a stable funding profile over a one-year horizon', 'To limit concentration of funding sources', 'To measure intraday liquidity'], correct: 1, explanation: 'The NSFR requires banks to maintain a stable funding profile in relation to their assets and off-balance sheet activities over a one-year time horizon, complementing the LCR\'s 30-day focus.', reference: 'NSF20.1-20.2', difficulty: 'basic' },
    { id: 'nsfr_c2', question: 'Why do retail deposits receive higher ASF factors than wholesale funding?', options: ['Retail deposits are government insured', 'Retail deposits are behaviorally more stable than wholesale funding', 'Wholesale funding is more expensive', 'Political decision to favor retail banks'], correct: 1, explanation: 'The NSFR assumes short-term deposits from retail customers are behaviorally more stable than wholesale funding of the same maturity. Retail depositors tend not to withdraw as quickly during stress.', reference: 'NSF30.2', difficulty: 'intermediate' },
    { id: 'nsfr_c3', question: 'What does an RSF factor of 0% indicate?', options: ['The asset is worthless', 'The asset requires no stable funding - highly liquid or will mature soon', 'The asset cannot be included in NSFR', 'The asset has been written off'], correct: 1, explanation: 'A 0% RSF factor indicates the asset is so liquid or short-dated that it does not require stable funding. Examples: cash, central bank reserves, claims on central banks <6 months.', reference: 'NSF30.25', difficulty: 'intermediate' },
    { id: 'nsfr_c4', question: 'How should investor call options on funding be treated?', options: ['Assume options will not be exercised', 'Assume investors redeem at the earliest possible date', 'Split 50/50 between early and late redemption', 'Ignore options in NSFR'], correct: 1, explanation: 'Banks must assume investors will redeem call options at the earliest possible date. This conservative approach ensures banks don\'t overstate funding stability.', reference: 'NSF30.7', difficulty: 'advanced' },
    { id: 'nsfr_c5', question: 'What determines RSF treatment of encumbered assets?', options: ['Only asset type matters', 'The remaining encumbrance period and unencumbered RSF factor', 'Whether held domestically or abroad', 'Counterparty credit rating'], correct: 1, explanation: 'Encumbered assets receive RSF based on duration and underlying quality. ≥1 year encumbrance = 100% RSF; 6-12 months = higher of 50% or unencumbered factor; <6 months = unencumbered factor.', reference: 'NSF30.19', difficulty: 'advanced' }
  ],
  almm: [
    { id: 'almm_c1', question: 'What is the purpose of the contractual maturity mismatch metric?', options: ['To replace the LCR calculation', 'To identify gaps between contractual inflows and outflows across time bands', 'To measure credit risk exposure', 'To calculate capital requirements'], correct: 1, explanation: 'The contractual maturity mismatch identifies gaps between contractual inflows and outflows for defined time bands, showing how much liquidity a bank would need if all outflows occurred at the earliest date.', reference: 'SRP50.6', difficulty: 'basic' },
    { id: 'almm_c2', question: 'How is a "significant counterparty" defined for funding concentration?', options: ['Any counterparty rated below A', 'A counterparty accounting for >1% of total balance sheet', 'The top 10 counterparties', 'Only central banks and governments'], correct: 1, explanation: 'A significant counterparty is a single counterparty or connected group accounting for more than 1% of the bank\'s total balance sheet.', reference: 'SRP50.17', difficulty: 'intermediate' },
    { id: 'almm_c3', question: 'What threshold defines "significant currency" in ALMM?', options: ['1% or more of total liabilities', '5% or more of total liabilities', '10% or more of total assets', 'Any currency on major exchanges'], correct: 1, explanation: 'A currency is "significant" if aggregate liabilities in that currency amount to 5% or more of total liabilities.', reference: 'SRP50.21', difficulty: 'intermediate' },
    { id: 'almm_c4', question: 'Why does contractual maturity mismatch use raw data without behavioral assumptions?', options: ['To reduce complexity', 'To allow supervisors to apply own assumptions and enable cross-bank comparisons', 'Behavioral data unavailable', 'Regulations prohibit assumptions'], correct: 1, explanation: 'Standardized raw data enables supervisors to build a market-wide view, apply their own assumptions, and identify outliers. Banks separately conduct their own behavioral analyses.', reference: 'SRP50.10-50.11', difficulty: 'advanced' }
  ]
};

const classificationItems = {
  hqla: [
    { item: 'Coins and banknotes', level: 'Level 1', haircut: '0%', explanation: 'Cash is the most liquid asset.' },
    { item: 'Central bank reserves', level: 'Level 1', haircut: '0%', explanation: 'Immediately accessible deposits at central banks.' },
    { item: 'Sovereign debt rated AA- or higher', level: 'Level 1', haircut: '0%', explanation: 'High-quality sovereign debt with minimal risk.' },
    { item: 'Sovereign debt rated A+ to A-', level: 'Level 2A', haircut: '15%', explanation: 'Lower-rated but still investment grade.' },
    { item: 'Corporate bonds rated AA- or higher', level: 'Level 2A', haircut: '15%', explanation: 'High-quality corporate bonds.' },
    { item: 'Covered bonds rated AA- or higher (not own-issued)', level: 'Level 2A', haircut: '15%', explanation: 'Dual recourse securities.' },
    { item: 'RMBS rated AA or higher', level: 'Level 2B', haircut: '25%', explanation: 'Securitized assets face liquidity concerns.' },
    { item: 'Corporate bonds rated A+ to BBB-', level: 'Level 2B', haircut: '50%', explanation: 'Investment grade but higher risk.' },
    { item: 'Major index equities', level: 'Level 2B', haircut: '50%', explanation: 'Volatile but liquid if in major indices.' },
    { item: 'Own-issued securities', level: 'Ineligible', haircut: 'N/A', explanation: 'Cannot count own securities as HQLA.' },
    { item: 'Claims on financial institutions', level: 'Ineligible', haircut: 'N/A', explanation: 'High wrong-way risk in stress.' }
  ],
  asf: [
    { item: 'CET1 capital', factor: '100%', explanation: 'Permanent, loss-absorbing capital.' },
    { item: 'Tier 2 instruments (maturity ≥1 year)', factor: '100%', explanation: 'Long-term subordinated debt.' },
    { item: 'Secured/unsecured borrowings (≥1 year)', factor: '100%', explanation: 'Locked-in funding.' },
    { item: 'Stable retail deposits (insured)', factor: '95%', explanation: 'Strong relationship, unlikely to withdraw.' },
    { item: 'Less stable retail deposits', factor: '90%', explanation: 'Retail not meeting stability criteria.' },
    { item: 'Wholesale funding 6-12 months (non-financial)', factor: '50%', explanation: 'Medium-term, some rollover risk.' },
    { item: 'Operational deposits', factor: '50%', explanation: 'Sticky but can be withdrawn.' },
    { item: 'Wholesale funding <6 months (financial)', factor: '0%', explanation: 'Highly flight-prone in stress.' },
    { item: 'NSFR derivative liabilities', factor: '0%', explanation: 'Captured through separate treatment.' },
    { item: 'Tier 2 instruments (<1 year)', factor: '0%', explanation: 'Will mature soon; not stable.' }
  ],
  rsf: [
    { item: 'Cash and coins', factor: '0%', explanation: 'Immediately usable.' },
    { item: 'Central bank reserves', factor: '0%', explanation: 'Can be drawn down immediately.' },
    { item: 'Unencumbered Level 1 assets', factor: '5%', explanation: 'Highly liquid, small buffer for market risk.' },
    { item: 'Unencumbered Level 2A assets', factor: '15%', explanation: 'Liquid but subject to haircuts.' },
    { item: 'Unencumbered Level 2B RMBS', factor: '25%', explanation: 'Less liquid securitized assets.' },
    { item: 'Unencumbered Level 2B corporate/equity', factor: '50%', explanation: 'Volatile values.' },
    { item: 'Loans to FIs <6 months', factor: '10%', explanation: 'Short-term, highly liquid claims.' },
    { item: 'Residential mortgages (RW≤35%, ≥1yr)', factor: '65%', explanation: 'Long-term but high quality.' },
    { item: 'Other retail loans (≥1yr)', factor: '85%', explanation: 'Long-term retail, relatively illiquid.' },
    { item: 'Non-performing loans', factor: '100%', explanation: 'Highly illiquid.' },
    { item: 'Assets encumbered ≥1 year', factor: '100%', explanation: 'Cannot use during encumbrance.' }
  ],
  outflows: [
    { item: 'Stable retail deposits (insured)', factor: '3%', explanation: 'Deposit insurance provides confidence.' },
    { item: 'Less stable retail deposits', factor: '10%', explanation: 'Higher withdrawal risk in stress.' },
    { item: 'Operational deposits (financial)', factor: '25%', explanation: 'Portion needed for operations stays.' },
    { item: 'Non-operational deposits (financial)', factor: '100%', explanation: 'Fully assumed to run.' },
    { item: 'Unsecured wholesale (non-financial)', factor: '40%', explanation: 'Less flighty than financial.' },
    { item: 'Secured funding - Level 1 collateral', factor: '0%', explanation: 'Can roll with high-quality collateral.' },
    { item: 'Secured funding - Level 2A collateral', factor: '15%', explanation: 'Some haircut risk.' },
    { item: 'Committed credit facilities (retail)', factor: '5%', explanation: 'Retail draws less than corporates.' },
    { item: 'Committed credit facilities (non-fin corp)', factor: '10%', explanation: 'Corporates may draw to hoard.' },
    { item: 'Committed liquidity facilities (non-fin corp)', factor: '30%', explanation: 'Designed for liquidity; higher draw.' },
    { item: 'Committed facilities (financial)', factor: '100%', explanation: 'FIs draw aggressively in stress.' }
  ]
};

const calculationExercises = [
  {
    id: 'calc_lcr_1', title: 'Basic LCR Calculation', difficulty: 'basic', type: 'lcr',
    scenario: `HQLA:
• Cash: €50m
• Central bank reserves: €100m  
• AA-rated government bonds: €200m
• AA-rated corporate bonds: €80m
• A-rated corporate bonds: €40m

Net Cash Outflows: €300m`,
    question: 'Calculate the bank\'s LCR. Does it meet the minimum requirement?',
    hints: ['Level 1 assets have 0% haircut', 'Level 2A (AA- corporate) have 15% haircut', 'Level 2B (A-rated) have 50% haircut', 'Check 40% Level 2 cap'],
    solution: {
      steps: [
        'Level 1 (0% haircut): €50m + €100m + €200m = €350m',
        'Level 2A (15% haircut): €80m × 85% = €68m',
        'Level 2B (50% haircut): €40m × 50% = €20m',
        'Level 2 cap check: €88m < (2/3 × €350m) = €233m ✓',
        'Total HQLA = €350m + €68m + €20m = €438m',
        'LCR = €438m / €300m = 146%'
      ],
      answer: 'LCR = 146%. Exceeds 100% minimum.',
      keyInsight: 'Level 2 caps were not binding. Banks with large Level 2 holdings may find HQLA capped.'
    }
  },
  {
    id: 'calc_nsfr_1', title: 'Basic NSFR Calculation', difficulty: 'basic', type: 'nsfr',
    scenario: `LIABILITIES & EQUITY:
• CET1 capital: €50m
• Tier 2 (5yr maturity): €30m
• Stable retail deposits: €200m
• Less stable retail: €100m
• Wholesale <6 months: €120m

ASSETS:
• Cash: €20m
• CB reserves: €30m
• AA-rated govt bonds: €80m
• Level 2A corporate: €50m
• Mortgages (RW≤35%, ≥1yr): €250m
• Other retail loans (≥1yr): €70m`,
    question: 'Calculate the bank\'s NSFR.',
    hints: ['Calculate ASF by applying factors to liabilities', 'Calculate RSF by applying factors to assets', 'NSFR = ASF / RSF'],
    solution: {
      steps: [
        'ASF: CET1(100%): €50m + Tier2(100%): €30m + Stable(95%): €190m + LessStable(90%): €90m + Wholesale(0%): €0 = €360m',
        'RSF: Cash(0%): €0 + CB(0%): €0 + L1(5%): €4m + L2A(15%): €7.5m + Mortgages(65%): €162.5m + Retail(85%): €59.5m = €233.5m',
        'NSFR = €360m / €233.5m = 154.2%'
      ],
      answer: 'NSFR = 154.2%. Exceeds 100% minimum.',
      keyInsight: 'Strong NSFR from stable retail deposits. Wholesale <6m provides zero ASF.'
    }
  },
  {
    id: 'calc_almm_1', title: 'Funding Concentration', difficulty: 'basic', type: 'almm',
    scenario: `Total liabilities: €10 billion
Top counterparties:
• A (financial): €300m
• B (pension fund): €150m  
• C (non-fin corp): €80m
• D (connected group): €120m
• E (retail aggregator): €50m`,
    question: 'Which counterparties are "significant" (>1% threshold)?',
    hints: ['Calculate 1% of €10bn', 'Compare each counterparty', 'Connected parties aggregate'],
    solution: {
      steps: [
        '1% threshold = €100m',
        'A: €300m / €10bn = 3.0% ✓ SIGNIFICANT',
        'B: €150m / €10bn = 1.5% ✓ SIGNIFICANT',
        'C: €80m / €10bn = 0.8% ✗',
        'D: €120m / €10bn = 1.2% ✓ SIGNIFICANT',
        'E: €50m / €10bn = 0.5% ✗'
      ],
      answer: 'A (3.0%), B (1.5%), and D (1.2%) are significant counterparties.',
      keyInsight: 'Funding concentration metrics identify single points of failure.'
    }
  }
];

const interpretationScenarios = [
  {
    id: 'interp_1', title: 'HQLA Currency Mismatch', category: 'lcr', difficulty: 'advanced',
    scenario: `Your Danish mortgage institution has:
• Operational needs: 80% DKK, 15% EUR, 5% USD
• Current HQLA: 50% DKK, 40% EUR, 10% USD
FX swap markets have tightened. Danish central bank doesn't accept EUR assets.`,
    question: 'What regulatory concerns does this create? How should the bank address them?',
    guidance: ['Consider LCR10.9 on currency matching', 'Consider LCR30.29 on HQLA diversification', 'Consider convertibility assumptions in stress'],
    modelAnswer: `**Concerns:**
1. Currency Mismatch Risk: HQLA (50/40/10) deviates from needs (80/15/5)
2. Central Bank Eligibility: EUR assets ineligible for Danish facilities
3. Wrong-Way Risk: May be unable to convert EUR to DKK precisely when needed

**Actions:**
1. Increase DKK HQLA to 70-80%
2. Establish committed FX swap facilities
3. Confirm central bank emergency access
4. Report currency mismatch under ALMM`,
    regulations: ['LCR10.9', 'LCR30.29', 'SRP50.20-21']
  },
  {
    id: 'interp_2', title: 'Covered Bond Eligibility for SDRO Issuer', category: 'lcr', difficulty: 'advanced',
    scenario: `Your institution issues SDRO bonds (Danish covered bonds). An analyst asks if:
1. Your own SDROs can be included in HQLA
2. Competitor SDRO bonds can be included`,
    question: 'What are the rules around covered bonds in HQLA?',
    guidance: ['Consider prohibition on own-issued securities', 'Consider Level 2A criteria for covered bonds', 'Consider wrong-way risk'],
    modelAnswer: `**Own-Issued SDROs:** CANNOT include. LCR30.41 excludes securities issued by the bank itself.

**Competitor SDROs:** CAN qualify as Level 2A if:
• Rated AA- or higher
• Not issued by bank or related entities
• Meet LCR30.43 covered bond criteria
• Apply 15% haircut
• Subject to 40% Level 2 cap`,
    regulations: ['LCR30.41', 'LCR30.43']
  },
  {
    id: 'interp_3', title: 'Match-Funding and NSFR', category: 'nsfr', difficulty: 'advanced',
    scenario: `Your institution uses match-funding:
• Issue 30-year covered bond at fixed rate
• Originate matching 30-year mortgage
• Cash flows are matched
Bond is callable by borrower (passed through). Historical prepayment: 5-7% annually.`,
    question: 'How should match-funded positions be treated for NSFR?',
    guidance: ['Consider ASF treatment of long-dated funding', 'Consider RSF treatment of mortgages', 'Consider prepayment impact on effective maturity'],
    modelAnswer: `**ASF (30-Year Bond):** 100% factor (maturity >1 year)
Note: Investor call options → assume earliest redemption

**RSF (30-Year Mortgage):** 65% factor (RW≤35%, ≥1yr)

**Key Points:**
• Match-funding doesn't provide special NSFR benefit
• Each side treated independently
• Prepayments create temporary cash but reduce future ASF
• NSFR contribution: (100% × Bond) / (65% × Mortgage) ≈ 154%`,
    regulations: ['NSF30.7', 'NSF30.10', 'NSF30.29']
  }
];

const flashcards = {
  lcr: [
    { front: 'LCR Formula', back: 'LCR = Stock of HQLA / Total Net Cash Outflows (30 days) ≥ 100%' },
    { front: 'LCR Stress Duration', back: '30 calendar days of combined idiosyncratic and market-wide stress' },
    { front: 'Level 1 Assets', back: 'Cash, CB reserves, sovereign securities (0% RW). No haircut, no cap.' },
    { front: 'Level 2A Haircut', back: '15%. Includes sovereign (20% RW), AA- corporate, qualifying covered bonds.' },
    { front: 'Level 2B Haircut', back: '25-50%. Includes RMBS, A+ to BBB- corporate, qualifying equities.' },
    { front: 'Level 2 Cap', back: 'Maximum 40% of total HQLA (after haircuts)' },
    { front: 'Level 2B Cap', back: 'Maximum 15% of total HQLA (after haircuts)' },
    { front: 'Stable Retail Outflow', back: '3% (fully insured with established relationship)' },
    { front: 'Less Stable Retail Outflow', back: 'At least 10%' },
    { front: 'Non-operational Wholesale (FI)', back: '100% assumed to run' },
    { front: 'Inflow Cap', back: 'Total inflows capped at 75% of gross outflows' }
  ],
  nsfr: [
    { front: 'NSFR Formula', back: 'NSFR = ASF / RSF ≥ 100%' },
    { front: 'NSFR Time Horizon', back: 'One-year structural funding horizon' },
    { front: 'ASF 100%', back: 'CET1/AT1/Tier2(≥1yr), borrowings ≥1yr' },
    { front: 'ASF 95%', back: 'Stable retail deposits' },
    { front: 'ASF 90%', back: 'Less stable retail deposits' },
    { front: 'ASF 50%', back: 'Operational deposits, non-fin corp 6-12m' },
    { front: 'ASF 0%', back: 'Wholesale <6m, derivative liabilities' },
    { front: 'RSF 0%', back: 'Cash, central bank reserves' },
    { front: 'RSF 5%', back: 'Unencumbered Level 1 assets' },
    { front: 'RSF 65%', back: 'Residential mortgages RW≤35%, ≥1yr' },
    { front: 'RSF 100%', back: 'NPLs, assets encumbered ≥1yr, all other' }
  ],
  almm: [
    { front: 'ALMM Components', back: 'Maturity mismatch, Funding concentration, Unencumbered assets, LCR by currency, Market monitoring, Intraday' },
    { front: 'Significant Counterparty', back: '>1% of total balance sheet' },
    { front: 'Significant Instrument', back: '>1% of total balance sheet' },
    { front: 'Significant Currency', back: '≥5% of total liabilities' },
    { front: 'Concentration Time Bands', back: '<1m, 1-3m, 3-6m, 6-12m, >12m' },
    { front: 'Intraday Reporting', back: 'Monthly, alongside LCR' },
    { front: 'Maturity Mismatch Assumptions', back: 'No rollover, no new contracts, raw contractual data' }
  ]
};

// ==================== MAIN COMPONENT ====================
export default function BaselLearningAssistant() {
  const [activeModule, setActiveModule] = useState('home');
  const [activeApproach, setActiveApproach] = useState(null);
  const [activeTopic, setActiveTopic] = useState('lcr');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [classificationCategory, setClassificationCategory] = useState('hqla');
  const [currentClassificationIndex, setCurrentClassificationIndex] = useState(0);
  const [classificationAnswer, setClassificationAnswer] = useState('');
  const [showClassificationAnswer, setShowClassificationAnswer] = useState(false);
  const [classificationScore, setClassificationScore] = useState({ correct: 0, total: 0 });
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  const shuffleArray = (arr) => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  useEffect(() => {
    if (activeApproach === 'flashcards' && activeTopic) {
      setShuffledCards(shuffleArray(flashcards[activeTopic]));
      setCurrentFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [activeApproach, activeTopic]);

  const resetQuiz = () => { setCurrentQuestionIndex(0); setSelectedAnswer(null); setShowExplanation(false); setScore({ correct: 0, total: 0 }); setQuizCompleted(false); };
  const resetClassification = () => { setCurrentClassificationIndex(0); setClassificationAnswer(''); setShowClassificationAnswer(false); setClassificationScore({ correct: 0, total: 0 }); };

  const ModuleButton = ({ module, icon: Icon, title, description }) => (
    <button onClick={() => { setActiveModule(module); setActiveApproach(null); }} className={`p-4 rounded-lg border-2 transition-all text-left w-full ${activeModule === module ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-6 h-6 ${activeModule === module ? 'text-blue-600' : 'text-gray-600'}`} />
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );

  const ApproachButton = ({ approach, icon: Icon, title }) => (
    <button onClick={() => { setActiveApproach(approach); resetQuiz(); resetClassification(); setShowSolution(false); setShowHints(false); setShowGuidance(false); setShowModelAnswer(false); }} className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${activeApproach === approach ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-green-300'}`}>
      <Icon className="w-5 h-5" /><span className="font-medium">{title}</span>
    </button>
  );

  const TopicSelector = () => (
    <div className="flex gap-2 mb-4">
      {[{ id: 'lcr', label: 'LCR' }, { id: 'nsfr', label: 'NSFR' }, { id: 'almm', label: 'ALMM' }].map(t => (
        <button key={t.id} onClick={() => { setActiveTopic(t.id); resetQuiz(); resetClassification(); }} className={`px-4 py-2 rounded-lg font-medium ${activeTopic === t.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{t.label}</button>
      ))}
    </div>
  );

  const renderQuiz = () => {
    const questions = conceptualQuestions[activeTopic];
    if (!questions?.length) return <p>No questions available.</p>;
    if (quizCompleted) {
      const pct = Math.round((score.correct / score.total) * 100);
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <Award className={`w-16 h-16 mx-auto mb-4 ${pct >= 80 ? 'text-green-500' : 'text-yellow-500'}`} />
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-xl mb-4">Score: {score.correct}/{score.total} ({pct}%)</p>
          <button onClick={resetQuiz} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><RotateCcw className="w-4 h-4" /> Try Again</button>
        </div>
      );
    }
    const q = questions[currentQuestionIndex];
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1}/{questions.length}</span>
          <span className={`text-xs px-2 py-1 rounded ${q.difficulty === 'basic' ? 'bg-green-100 text-green-700' : q.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{q.difficulty}</span>
        </div>
        <h3 className="text-lg font-semibold mb-4">{q.question}</h3>
        <div className="space-y-2 mb-4">
          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => !showExplanation && setSelectedAnswer(idx)} disabled={showExplanation} className={`w-full p-3 text-left rounded-lg border transition-all ${showExplanation ? (idx === q.correct ? 'border-green-500 bg-green-50' : selectedAnswer === idx ? 'border-red-500 bg-red-50' : 'border-gray-200') : (selectedAnswer === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300')}`}>
              <div className="flex items-center gap-2">
                {showExplanation && idx === q.correct && <Check className="w-5 h-5 text-green-600" />}
                {showExplanation && selectedAnswer === idx && idx !== q.correct && <X className="w-5 h-5 text-red-600" />}
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
        {!showExplanation && selectedAnswer !== null && <button onClick={() => { setShowExplanation(true); setScore(p => ({ correct: p.correct + (selectedAnswer === q.correct ? 1 : 0), total: p.total + 1 })); }} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Check Answer</button>}
        {showExplanation && (
          <div className="mt-4">
            <div className={`p-4 rounded-lg ${selectedAnswer === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-5 h-5 text-amber-500" /><span className="font-semibold">Explanation</span></div>
              <p className="text-gray-700 mb-2">{q.explanation}</p>
              <p className="text-sm text-gray-500">Reference: {q.reference}</p>
            </div>
            <button onClick={() => { if (currentQuestionIndex < questions.length - 1) { setCurrentQuestionIndex(p => p + 1); setSelectedAnswer(null); setShowExplanation(false); } else setQuizCompleted(true); }} className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Results'} <ChevronRight className="w-4 h-4" /></button>
          </div>
        )}
      </div>
    );
  };

  const renderClassification = () => {
    const categories = { hqla: { title: 'HQLA Classification', options: ['Level 1', 'Level 2A', 'Level 2B', 'Ineligible'] }, asf: { title: 'ASF Factors', options: ['100%', '95%', '90%', '50%', '0%'] }, rsf: { title: 'RSF Factors', options: ['0%', '5%', '10%', '15%', '25%', '50%', '65%', '85%', '100%'] }, outflows: { title: 'Outflow Rates', options: ['0%', '3%', '5%', '10%', '15%', '25%', '30%', '40%', '100%'] } };
    const items = classificationItems[classificationCategory];
    const current = items[currentClassificationIndex];
    const cat = categories[classificationCategory];
    if (classificationScore.total > 0 && classificationScore.total === items.length) {
      const pct = Math.round((classificationScore.correct / classificationScore.total) * 100);
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <Award className={`w-16 h-16 mx-auto mb-4 ${pct >= 80 ? 'text-green-500' : 'text-yellow-500'}`} />
          <h3 className="text-2xl font-bold mb-2">Practice Complete!</h3>
          <p className="text-xl mb-4">Score: {classificationScore.correct}/{classificationScore.total} ({pct}%)</p>
          <button onClick={resetClassification} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><RotateCcw className="w-4 h-4" /> Again</button>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(categories).map(([k, c]) => <button key={k} onClick={() => { setClassificationCategory(k); resetClassification(); }} className={`px-3 py-1 rounded text-sm font-medium ${classificationCategory === k ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{c.title}</button>)}
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between mb-4"><span className="text-sm text-gray-500">Item {currentClassificationIndex + 1}/{items.length}</span><span className="text-sm font-medium text-purple-600">{cat.title}</span></div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4"><h3 className="text-lg font-semibold">{current.item}</h3></div>
          <p className="text-gray-600 mb-4">Select the correct classification:</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {cat.options.map(opt => <button key={opt} onClick={() => !showClassificationAnswer && setClassificationAnswer(opt)} disabled={showClassificationAnswer} className={`p-2 rounded-lg border text-sm ${showClassificationAnswer ? (opt === (current.level || current.factor) ? 'border-green-500 bg-green-50' : classificationAnswer === opt ? 'border-red-500 bg-red-50' : 'border-gray-200') : (classificationAnswer === opt ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300')}`}>{opt}</button>)}
          </div>
          {!showClassificationAnswer && classificationAnswer && <button onClick={() => { setShowClassificationAnswer(true); setClassificationScore(p => ({ correct: p.correct + (classificationAnswer === (current.level || current.factor) ? 1 : 0), total: p.total + 1 })); }} className="w-full py-2 bg-purple-600 text-white rounded-lg">Check</button>}
          {showClassificationAnswer && (
            <div className="mt-4">
              <div className={`p-4 rounded-lg ${classificationAnswer === (current.level || current.factor) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="font-medium mb-2">{classificationAnswer === (current.level || current.factor) ? '✓ Correct!' : `✗ Answer: ${current.level || current.factor}`}</p>
                <p className="text-gray-700">{current.explanation}</p>
                {current.haircut && <p className="text-sm text-gray-500 mt-1">Haircut: {current.haircut}</p>}
              </div>
              <button onClick={() => { if (currentClassificationIndex < items.length - 1) { setCurrentClassificationIndex(p => p + 1); setClassificationAnswer(''); setShowClassificationAnswer(false); } }} disabled={currentClassificationIndex >= items.length - 1} className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300">Next <ChevronRight className="w-4 h-4 inline" /></button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCalculations = () => {
    const exercises = calculationExercises.filter(e => e.type === activeTopic || activeTopic === 'almm');
    if (!exercises.length) return <p className="text-gray-500">No exercises for this topic.</p>;
    const ex = exercises[currentExerciseIndex % exercises.length];
    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">{exercises.map((e, i) => <button key={e.id} onClick={() => { setCurrentExerciseIndex(i); setShowHints(false); setShowSolution(false); }} className={`px-3 py-1 rounded text-sm ${currentExerciseIndex === i ? 'bg-orange-600 text-white' : 'bg-gray-100'}`}>Ex {i + 1}</button>)}</div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between mb-4"><h3 className="text-lg font-bold">{ex.title}</h3><span className={`text-xs px-2 py-1 rounded ${ex.difficulty === 'basic' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{ex.difficulty}</span></div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-line font-mono text-sm">{ex.scenario}</div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4"><div className="flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-blue-600" /><span className="font-semibold">Question</span></div><p>{ex.question}</p></div>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setShowHints(!showHints)} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg flex items-center gap-2"><Lightbulb className="w-4 h-4" />{showHints ? 'Hide' : 'Show'} Hints</button>
            <button onClick={() => setShowSolution(!showSolution)} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"><Check className="w-4 h-4" />{showSolution ? 'Hide' : 'Show'} Solution</button>
          </div>
          {showHints && <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-amber-200"><h4 className="font-semibold mb-2">Hints:</h4><ul className="space-y-1">{ex.hints.map((h, i) => <li key={i} className="flex items-start gap-2"><span className="text-amber-600">•</span>{h}</li>)}</ul></div>}
          {showSolution && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3">Solution:</h4>
              <div className="space-y-2">{ex.solution.steps.map((s, i) => <div key={i} className="bg-white p-3 rounded border text-sm font-mono">{s}</div>)}</div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg"><p className="font-semibold text-green-800">{ex.solution.answer}</p></div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200"><div className="flex items-center gap-2 mb-1"><Lightbulb className="w-4 h-4 text-blue-600" /><span className="font-semibold text-blue-800">Key Insight</span></div><p className="text-blue-700 text-sm">{ex.solution.keyInsight}</p></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInterpretation = () => {
    const scenarios = interpretationScenarios.filter(s => activeTopic === 'almm' || s.category === activeTopic);
    if (!scenarios.length) return <p className="text-gray-500">No scenarios for this topic.</p>;
    const sc = scenarios[currentScenarioIndex % scenarios.length];
    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap mb-4">{scenarios.map((s, i) => <button key={s.id} onClick={() => { setCurrentScenarioIndex(i); setShowGuidance(false); setShowModelAnswer(false); }} className={`px-3 py-1 rounded text-sm ${currentScenarioIndex === i ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>{s.title.substring(0, 15)}...</button>)}</div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between mb-4"><h3 className="text-lg font-bold">{sc.title}</h3><span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">{sc.difficulty}</span></div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-line">{sc.scenario}</div>
          <div className="bg-indigo-50 p-4 rounded-lg mb-4"><div className="flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-indigo-600" /><span className="font-semibold">Question</span></div><p>{sc.question}</p></div>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setShowGuidance(!showGuidance)} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg flex items-center gap-2"><Lightbulb className="w-4 h-4" />{showGuidance ? 'Hide' : 'Show'} Guidance</button>
            <button onClick={() => setShowModelAnswer(!showModelAnswer)} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg flex items-center gap-2"><FileText className="w-4 h-4" />{showModelAnswer ? 'Hide' : 'Model'} Answer</button>
          </div>
          {showGuidance && <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-amber-200"><h4 className="font-semibold mb-2">Regulatory References:</h4><ul className="space-y-1">{sc.guidance.map((g, i) => <li key={i}>• {g}</li>)}</ul><p className="text-sm text-amber-700 mt-3">Regulations: {sc.regulations.join(', ')}</p></div>}
          {showModelAnswer && <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"><h4 className="font-semibold mb-3">Model Answer:</h4><div className="whitespace-pre-line text-gray-700">{sc.modelAnswer}</div></div>}
        </div>
      </div>
    );
  };

  const renderFlashcards = () => {
    const cards = shuffledCards.length > 0 ? shuffledCards : flashcards[activeTopic];
    if (!cards?.length) return <p>No flashcards.</p>;
    const card = cards[currentFlashcardIndex];
    return (
      <div className="space-y-4">
        <div className="flex justify-between"><span className="text-sm text-gray-500">Card {currentFlashcardIndex + 1}/{cards.length}</span><button onClick={() => { setShuffledCards(shuffleArray(flashcards[activeTopic])); setCurrentFlashcardIndex(0); setIsFlipped(false); }} className="px-3 py-1 bg-gray-100 rounded text-sm flex items-center gap-1"><Shuffle className="w-4 h-4" />Shuffle</button></div>
        <div onClick={() => setIsFlipped(!isFlipped)} className="bg-white rounded-xl p-8 shadow-lg border-2 min-h-48 flex items-center justify-center cursor-pointer hover:shadow-xl">
          <div className="text-center">
            {!isFlipped ? (<><p className="text-xs text-gray-400 mb-2">QUESTION</p><p className="text-xl font-semibold">{card.front}</p><p className="text-sm text-gray-400 mt-4">Click to reveal</p></>) : (<><p className="text-xs text-gray-400 mb-2">ANSWER</p><p className="text-lg">{card.back}</p></>)}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => { setCurrentFlashcardIndex(p => p > 0 ? p - 1 : cards.length - 1); setIsFlipped(false); }} className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Prev</button>
          <button onClick={() => { setCurrentFlashcardIndex(p => p < cards.length - 1 ? p + 1 : 0); setIsFlipped(false); }} className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2">Next<ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Basel III Liquidity Learning Assistant</h1>
        <p className="text-gray-600">Master LCR, NSFR, and ALMM through interactive learning</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ModuleButton module="conceptual" icon={Brain} title="1. Conceptual Mastery" description="Understand the 'why' behind the requirements" />
        <ModuleButton module="classification" icon={Layers} title="2. Classification Practice" description="Drill HQLA tiers, ASF/RSF factors, outflow rates" />
        <ModuleButton module="calculation" icon={Calculator} title="3. Calculation Exercises" description="Work through ratio computations" />
        <ModuleButton module="interpretation" icon={Scale} title="4. Regulatory Interpretation" description="Handle ambiguous cases" />
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
        <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-blue-600" /><span className="font-semibold text-blue-800">Study Tips</span></div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start with conceptual mastery for foundations</li>
          <li>• Use classification practice to memorize factors</li>
          <li>• Apply through calculation exercises</li>
          <li>• Challenge with interpretation scenarios</li>
        </ul>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    if (activeModule === 'home') return renderHome();
    const configs = {
      conceptual: { title: 'Conceptual Mastery', icon: Brain, desc: 'Test your understanding of Basel III liquidity concepts', showTopic: true },
      classification: { title: 'Classification Practice', icon: Layers, desc: 'Practice classifying assets, liabilities, and flows', showTopic: false },
      calculation: { title: 'Calculation Exercises', icon: Calculator, desc: 'Work through step-by-step ratio calculations', showTopic: true },
      interpretation: { title: 'Regulatory Interpretation', icon: Scale, desc: 'Apply regulations to complex scenarios', showTopic: true }
    };
    const cfg = configs[activeModule];
    const Icon = cfg.icon;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Icon className="w-8 h-8 text-blue-600" /><div><h2 className="text-2xl font-bold">{cfg.title}</h2><p className="text-gray-600 text-sm">{cfg.desc}</p></div></div>
          <button onClick={() => setActiveModule('home')} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-1 text-sm"><Home className="w-4 h-4" />Home</button>
        </div>
        {cfg.showTopic && <TopicSelector />}
        <div className="flex gap-2 flex-wrap mb-4">
          <ApproachButton approach="quiz" icon={BookOpen} title="Quiz" />
          <ApproachButton approach="scenarios" icon={Target} title="Scenarios" />
          <ApproachButton approach="flashcards" icon={FileText} title="Flashcards" />
        </div>
        {activeApproach === 'quiz' && activeModule === 'conceptual' && renderQuiz()}
        {activeApproach === 'scenarios' && activeModule === 'conceptual' && renderQuiz()}
        {activeApproach === 'flashcards' && renderFlashcards()}
        {activeModule === 'classification' && renderClassification()}
        {activeModule === 'calculation' && renderCalculations()}
        {activeModule === 'interpretation' && renderInterpretation()}
        {!activeApproach && activeModule === 'conceptual' && <div className="bg-gray-50 p-6 rounded-lg text-center"><p className="text-gray-600">Select an approach above to begin</p></div>}
      </div>
    );
  };

  return (<div className="min-h-screen bg-gray-100 p-4"><div className="max-w-4xl mx-auto">{renderModuleContent()}</div></div>);
}
