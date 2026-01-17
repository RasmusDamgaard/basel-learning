// Calculation Exercises
export const calculationExercises = [
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
    id: 'calc_lcr_2', title: 'LCR with Repo Funding', difficulty: 'intermediate', type: 'lcr',
    scenario: `HQLA:
• Government bonds: €400m
• Corporate bonds (AA-): €100m

FUNDING:
• Retail deposits (stable): €300m
• Repo funding (<30 days) secured by govt bonds: €150m
• Unsecured wholesale (financial, <30 days): €100m

ASSETS (non-HQLA):
• Reverse repo (<30 days) to financial, collateral = AA- corp bonds: €200m`,
    question: 'Calculate LCR including repo/reverse repo effects',
    hints: [
      'Repo secured by Level 1: 0% outflow',
      'Reverse repo: inflow = 100% - haircut on collateral',
      'Stable retail: 3% outflow',
      'Wholesale financial: 100% outflow',
      'Inflow cap at 75% of gross outflows'
    ],
    solution: {
      steps: [
        'HQLA: Level 1: €400m, Level 2A: €100m × 85% = €85m → Total = €485m',
        'Outflows: Stable retail: €300m × 3% = €9m',
        'Repo (Level 1 collateral): €150m × 0% = €0',
        'Unsecured wholesale: €100m × 100% = €100m',
        'Gross outflows = €109m',
        'Inflows: Reverse repo: €200m - (€200m × 15% haircut) = €170m',
        'Inflow cap: 75% × €109m = €81.75m → Use €81.75m',
        'Net outflows = €109m - €81.75m = €27.25m',
        'LCR = €485m / €27.25m = 1,780%'
      ],
      answer: 'LCR = 1,780%. Extremely strong due to repo funding with HQLA collateral.',
      keyInsight: 'Repo funding backed by Level 1 HQLA provides stable funding with 0% runoff. Reverse repos provide limited inflows due to 75% cap.'
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
    id: 'calc_nsfr_2', title: 'NSFR with Repo Activity', difficulty: 'intermediate', type: 'nsfr',
    scenario: `LIABILITIES & EQUITY:
• CET1 capital: €100m
• Covered bonds issued (3yr): €500m
• Repo funding (3 months): €200m
• Repo funding (9 months): €100m

ASSETS:
• Government bonds (unencumbered): €150m
• Mortgages in cover pool (encumbered to bondholders): €500m
• Reverse repo (3 months, to bank): €250m`,
    question: 'Calculate NSFR for this match-funded mortgage institution',
    hints: [
      'Covered bonds ≥1yr: 100% ASF',
      'Repo <6m: 0% ASF; 6-12m: 50% ASF',
      'Encumbered assets ≥1yr: 100% RSF',
      'Reverse repo <6m: 10% RSF'
    ],
    solution: {
      steps: [
        'ASF: CET1: €100m × 100% = €100m',
        'Covered bonds: €500m × 100% = €500m',
        'Repo 3m: €200m × 0% = €0',
        'Repo 9m: €100m × 50% = €50m',
        'Total ASF = €650m',
        '',
        'RSF: Govt bonds: €150m × 5% = €7.5m',
        'Mortgages (encumbered in cover pool): €500m × 100% = €500m',
        'Reverse repo: €250m × 10% = €25m',
        'Total RSF = €532.5m',
        '',
        'NSFR = €650m / €532.5m = 122.1%'
      ],
      answer: 'NSFR = 122.1%. Complies with minimum.',
      keyInsight: 'Encumbered mortgages in cover pool receive 100% RSF despite being high-quality. Short-term repo provides no ASF. Match-funding structure still achieves compliance.'
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
  },
  {
    id: 'calc_cap_1', title: 'Capital Ratio with Repo Book', difficulty: 'intermediate', type: 'capital',
    scenario: `CAPITAL:
• CET1 capital: €80m
• AT1: €20m
• Tier 2: €30m

ASSETS (calculate RWA):
• Residential mortgages: €800m (35% RW)
• Corporate bonds (AA-rated): €200m (20% RW)
• Repo exposures to bank (net of collateral): €100m (20% RW)
• Cash: €50m (0% RW)`,
    question: 'Calculate CET1, Tier 1, and Total Capital ratios',
    hints: [
      'RWA = sum of (exposure × risk weight)',
      'CET1 ratio = CET1 / RWA',
      'Tier 1 = CET1 + AT1',
      'Total capital = Tier 1 + Tier 2'
    ],
    solution: {
      steps: [
        'RWA calculation:',
        '  Mortgages: €800m × 35% = €280m',
        '  Corporate bonds: €200m × 20% = €40m',
        '  Repo: €100m × 20% = €20m',
        '  Cash: €50m × 0% = €0',
        '  Total RWA = €340m',
        '',
        'CET1 ratio = €80m / €340m = 23.5%',
        'Tier 1 ratio = (€80m + €20m) / €340m = 29.4%',
        'Total capital ratio = (€80m + €20m + €30m) / €340m = 38.2%'
      ],
      answer: 'CET1: 23.5%, Tier 1: 29.4%, Total: 38.2%. All well above minimums.',
      keyInsight: 'Repo exposures after collateral offset receive counterparty risk weight (20% for banks). High-quality mortgage/bond portfolios keep RWA low.'
    }
  },
  {
    id: 'calc_lev_1', title: 'Leverage Ratio Calculation', difficulty: 'intermediate', type: 'leverage',
    scenario: `TIER 1 CAPITAL: €150m

ON-BALANCE SHEET:
• Total accounting assets: €3,000m

REPOS/REVERSE REPOS (included in above):
• Repo borrowing (net accounting value): €200m
• Reverse repo lending (net accounting value): €300m
• SFT add-on for counterparty risk: €25m

OFF-BALANCE SHEET:
• Committed credit facilities: €400m (CCF 50%)`,
    question: 'Calculate the leverage ratio',
    hints: [
      'Exposure = accounting assets + SFT add-on + (off-BS × CCF)',
      'Leverage ratio = Tier 1 / Total exposure',
      'Minimum is 3%'
    ],
    solution: {
      steps: [
        'On-balance sheet: €3,000m',
        'Add: SFT add-on: €25m',
        'Off-balance sheet: €400m × 50% CCF = €200m',
        'Total exposure = €3,000m + €25m + €200m = €3,225m',
        '',
        'Leverage ratio = €150m / €3,225m = 4.65%'
      ],
      answer: 'Leverage ratio = 4.65%. Exceeds 3% minimum.',
      keyInsight: 'Repos are already in accounting assets but SFT add-on captures counterparty risk. Off-balance sheet commitments increase exposure through CCFs.'
    }
  }
];
