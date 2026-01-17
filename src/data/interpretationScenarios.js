// Interpretation Scenarios - Advanced regulatory cases
export const interpretationScenarios = [
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
  },
  {
    id: 'interp_4', title: 'Repo Roll Risk in Stress', category: 'lcr', difficulty: 'advanced',
    scenario: `Your bank funds €500m of corporate bonds via overnight repo with dealer banks, posting the bonds as collateral.
• Bonds are AA-rated corporate (Level 2A)
• Repo counterparties are large investment banks
• Repo funding is renewed daily
During market stress, dealers increase haircuts from 5% to 20%.`,
    question: 'How does this repo structure affect LCR? What are the risks?',
    guidance: [
      'Consider outflow rate for repo secured by Level 2A',
      'Consider haircut changes during stress',
      'Consider procyclicality of secured funding'
    ],
    modelAnswer: `**LCR Treatment:**
• Repo <30 days secured by Level 2A: 15% outflow rate
• Expected outflow: €500m × 15% = €75m
• Must hold €75m in HQLA to cover potential non-rollover

**Stress Risks:**
1. Haircut Procyclicality: Haircut increase from 5% to 20% requires posting €75m additional collateral
2. Collateral Calls: If corporate bonds fall in value, face margin calls
3. Wrong-Way Risk: Dealer stress correlates with corporate bond market stress
4. Liquidation Risk: If cannot roll, forced to sell bonds into weak market

**Mitigants:**
• Diversify repo counterparties
• Use central counterparties (CCPs) where possible
• Maintain HQLA buffer
• Establish backup unsecured funding lines`,
    regulations: ['LCR40.47', 'LCR40.50', 'SRP50.15']
  },
  {
    id: 'interp_5', title: 'Reverse Repo vs Securities Purchase', category: 'lcr', difficulty: 'advanced',
    scenario: `Your treasury has €200m to invest for 3 months. Two options:
Option A: Purchase €200m AA-rated government bonds
Option B: €200m reverse repo (lend cash) to bank, receive AA-rated govt bonds as collateral`,
    question: 'How do these options differ for LCR? Which is preferable?',
    guidance: [
      'Consider whether reverse repo collateral counts as HQLA',
      'Consider inflow treatment',
      'Consider operational control'
    ],
    modelAnswer: `**Option A (Outright Purchase):**
• Bonds are Level 1 HQLA: €200m × 100% = €200m HQLA
• No maturity, no inflows
• Full operational control

**Option B (Reverse Repo):**
• Collateral CAN count as HQLA if:
  - Legally able to re-hypothecate without time limit
  - Operationally able to monetize within 30 days
• Assuming conditions met: €200m Level 1 HQLA
• Also creates inflow at maturity: €200m (subject to 75% cap)
• Counterparty credit risk (though collateralized)

**LCR Impact:**
• Both provide same HQLA (€200m)
• Reverse repo also provides inflow (capped)
• But reverse repo has operational complexity and counterparty risk

**Recommendation:**
Outright purchase is simpler and eliminates counterparty risk. Reverse repo only if:
• Need the inflow for LCR calculation
• Counterparty is very high quality
• Have robust collateral management`,
    regulations: ['LCR30.15', 'LCR40.56', 'LCR50.2']
  },
  {
    id: 'interp_6', title: 'Cover Pool Encumbrance vs NSFR', category: 'nsfr', difficulty: 'advanced',
    scenario: `Your mortgage bank operates under balance principle:
• €10bn mortgages originated
• €10bn covered bonds issued (backed by mortgage pool)
• Mortgages legally encumbered to bondholders
• Bonds trade at spreads of OIS +5bps due to high credit quality
CFO asks: "Why is our NSFR only 100% when we are perfectly match-funded?"`,
    question: 'Explain the NSFR treatment and whether it is appropriate for balance principle institutions.',
    guidance: [
      'Consider RSF for encumbered assets',
      'Consider ASF for covered bonds',
      'Consider policy rationale'
    ],
    modelAnswer: `**NSFR Calculation:**

ASF:
• Covered bonds (30yr): €10bn × 100% = €10bn ASF

RSF:
• Mortgages (encumbered in cover pool): €10bn × 100% = €10bn RSF
  - Despite being 65% if unencumbered
  - Encumbrance ≥1 year → 100% RSF

NSFR = €10bn / €10bn = 100%

**Why Not Better?**
Encumbered assets receive 100% RSF because they cannot be:
• Sold to generate liquidity
• Used as collateral elsewhere
• Used to meet other funding needs

The balance principle legally ties mortgages to bondholders, creating structural illiquidity.

**Is This Fair?**
Arguments FOR current treatment:
• Encumbrance genuinely limits asset fungibility
• Prevents regulatory arbitrage (can't count same assets twice)
• Encourages some unencumbered liquidity buffer

Arguments AGAINST:
• Balance principle is structurally sound (no liquidity transformation)
• Low refinancing risk due to match-funding
• May penalize stable business models

**Practical Impact:**
To exceed 100% NSFR, need:
• Equity/retained earnings
• Excess covered bond funding beyond mortgages
• Unencumbered HQLA buffer`,
    regulations: ['NSF30.19', 'NSF30.10', 'SRP31.15']
  },
  {
    id: 'interp_7', title: 'Interest Rate Risk in Match-Funded Book', category: 'pillar2', difficulty: 'advanced',
    scenario: `Your mortgage institution match-funds:
• Mortgages: 30yr, floating rate (3m CIBOR + 1%)
• Bonds: 30yr, floating rate (3m CIBOR + 0.5%)

CFO claims: "We have no interest rate risk - everything is floating and match-funded."

However, you notice:
• 15% of mortgages have 1% rate caps
• If CIBOR >5%, caps bind and mortgages earn flat 6%
• Bonds continue to pay CIBOR + 0.5%`,
    question: 'What interest rate risks exist? How should Pillar 2 assessment address this?',
    guidance: [
      'Consider option risk embedded in mortgage caps',
      'Consider basis risk',
      'Consider Pillar 2 IRRBB principles'
    ],
    modelAnswer: `**Interest Rate Risks:**

1. **Embedded Option Risk (Rate Caps):**
   - 15% of mortgages have 1% caps → in high rate scenario, earn only 6%
   - Bonds pay CIBOR + 0.5% with no cap
   - If CIBOR = 7%: Bonds cost 7.5%, capped mortgages earn 6%
   - Loss = 1.5% on 15% of book

2. **Basis Risk:**
   - Even without caps, spread compression risk exists
   - Mortgage spread (1%) vs bond spread (0.5%) = 0.5% margin
   - Competitive pressure or regulation could compress mortgage margins

3. **Prepayment Risk:**
   - If rates rise, prepayments slow (mortgages in-the-money)
   - Reduces ability to reprice
   - But bonds may be called by investors

**Pillar 2 Assessment Should Include:**

• Stress testing: CIBOR scenarios from -1% to +10%
• Identify cap binding scenarios
• Model prepayment sensitivity to rates
• Assess basis risk between indices
• Calculate economic value impact and earnings impact
• Determine Pillar 2 capital add-on if material

**Recommended Actions:**
• Hedge interest rate caps using swaptions
• Model and disclose option risk in Pillar 3
• Set internal risk limits on capped mortgages
• Consider offering uncapped products
• Maintain Pillar 2 capital buffer for IRRBB`,
    regulations: ['SRP31.15-31.28', 'SRP98.5', 'DIS85']
  },
  {
    id: 'interp_8', title: 'Repo with Central Counterparty', category: 'capital', difficulty: 'advanced',
    scenario: `Your bank executes €1bn repo trades:
Option A: Bilateral repo with dealer bank (A-rated)
Option B: Cleared repo through qualifying CCP (QCCP)

Both secured by government bonds with 2% haircut.`,
    question: 'Compare the capital treatment and operational considerations.',
    guidance: [
      'Consider risk weights for QCCP vs bilateral',
      'Consider CVA and margin requirements',
      'Consider operational complexity'
    ],
    modelAnswer: `**Capital Treatment:**

**Option A (Bilateral):**
• Exposure after collateral: €1,000m - €980m (collateral) = €20m
• Counterparty RW: 50% (for A-rated bank)
• RWA: €20m × 50% = €10m
• + CVA capital charge (additional ~€2m)
• Total RWA ≈ €12m

**Option B (QCCP):**
• Trade exposure RW: 2% (for QCCP)
• RWA: €1,000m × 2% = €20m
• + Default fund contribution (1250% RW on allocated portion)
• No bilateral CVA
• Total RWA ≈ €20-25m depending on default fund

**Operational Differences:**

Bilateral:
• Direct negotiation of terms
• Bilateral margining (delays possible)
• Counterparty limit management
• CSA agreements
• Lower initial margin

QCCP:
• Standardized terms
• Daily variation margin + initial margin
• Multilateral netting benefits
• Central guarantee
• Higher initial margin requirements

**LCR Impact:**
• Bilateral: Higher outflow potential
• QCCP: More predictable margining, better netting

**Recommendation:**
QCCP generally preferred for:
• Standard government bond repos
• High-volume activities
• Operational efficiency
• Systemic risk reduction

Bilateral may be better for:
• Bespoke collateral
• Relationship-based pricing
• Avoiding high CCP initial margins`,
    regulations: ['CRE54.3', 'CRE51.15', 'LEV30.25']
  }
];
