// Flashcards for spaced repetition learning
export const flashcards = {
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
    { front: 'Inflow Cap', back: 'Total inflows capped at 75% of gross outflows' },
    { front: 'Repo Outflow - Level 1 Collateral', back: '0% outflow (can roll over in stress)' },
    { front: 'Repo Outflow - Level 2A Collateral', back: '15% outflow (some haircut risk)' },
    { front: 'Reverse Repo as HQLA', back: 'Collateral can count as HQLA if unrestricted right to rehypothecate' }
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
    { front: 'RSF 100%', back: 'NPLs, assets encumbered ≥1yr, all other' },
    { front: 'Repo Funding ASF', back: '<6m: 0%, 6-12m: 50%, ≥1yr: 100%' },
    { front: 'Reverse Repo RSF', back: 'To financials <6m: 10%, to non-financials <6m: 15%' },
    { front: 'Encumbered Assets in Cover Pool', back: '100% RSF regardless of asset quality (if encumbered ≥1yr)' }
  ],
  almm: [
    { front: 'ALMM Components', back: 'Maturity mismatch, Funding concentration, Unencumbered assets, LCR by currency, Market monitoring, Intraday' },
    { front: 'Significant Counterparty', back: '>1% of total balance sheet' },
    { front: 'Significant Instrument', back: '>1% of total balance sheet' },
    { front: 'Significant Currency', back: '≥5% of total liabilities' },
    { front: 'Concentration Time Bands', back: '<1m, 1-3m, 3-6m, 6-12m, >12m' },
    { front: 'Intraday Reporting', back: 'Monthly, alongside LCR' },
    { front: 'Maturity Mismatch Assumptions', back: 'No rollover, no new contracts, raw contractual data' }
  ],
  capital: [
    { front: 'Minimum CET1 Ratio', back: '4.5% of risk-weighted assets' },
    { front: 'Minimum Tier 1 Ratio', back: '6% (4.5% CET1 + 1.5% AT1)' },
    { front: 'Minimum Total Capital Ratio', back: '8% (6% Tier 1 + 2% Tier 2)' },
    { front: 'Capital Conservation Buffer', back: '2.5% of RWA (CET1). Distribution constraints if breached.' },
    { front: 'Total Minimum CET1 with CCB', back: '7% (4.5% + 2.5% buffer)' },
    { front: 'Residential Mortgage RW', back: '35% (if LTV≤80%, prudential standards met)' },
    { front: 'Covered Bond RW', back: '10-20% (dual recourse, strict cover pool criteria)' },
    { front: 'Repo with QCCP RW', back: '2% (qualifying central counterparty)' },
    { front: 'Sovereign Bond RW (AAA)', back: '0% (highest quality sovereign)' },
    { front: 'Corporate Bond RW (AA)', back: '20% (high investment grade)' },
    { front: 'Corporate Bond RW (A)', back: '50% (investment grade)' },
    { front: 'Bank Exposure RW (<3m)', back: '20% (short-term interbank)' }
  ],
  leverage: [
    { front: 'Minimum Leverage Ratio', back: '3% (Tier 1 capital / Total exposure)' },
    { front: 'Leverage Ratio Purpose', back: 'Non-risk-based backstop to prevent excessive balance sheet growth' },
    { front: 'Leverage Exposure - Repos', back: 'Accounting value (net of cash) + SFT add-on for counterparty risk' },
    { front: 'Leverage Exposure - Off-Balance Sheet', back: 'Notional × Credit Conversion Factor (CCF)' },
    { front: 'CCF for Commitments', back: '0%, 20%, 50%, or 100% depending on type and maturity' }
  ],
  repos: [
    { front: 'What is a Repo?', back: 'Sale of securities with agreement to repurchase at specified price. Economically a secured loan.' },
    { front: 'Repo vs Reverse Repo', back: 'Repo = borrow cash (post collateral). Reverse repo = lend cash (receive collateral).' },
    { front: 'Repo LCR Treatment (Funding)', back: 'Outflow rate depends on collateral quality: 0% (L1), 15% (L2A), 50% (L2B), 100% (other)' },
    { front: 'Reverse Repo LCR Inflow', back: '100% minus collateral haircut (subject to 75% inflow cap)' },
    { front: 'Repo NSFR ASF', back: '<6m: 0%, 6-12m: 50%, ≥1yr: 100%' },
    { front: 'Reverse Repo NSFR RSF', back: 'To FI <6m: 10%, to non-FI <6m: 15%' },
    { front: 'Repo Capital Treatment', back: 'Net exposure (after collateral offset) × counterparty RW. Lower if cleared through CCP.' },
    { front: 'Repo Haircut', back: 'Difference between collateral market value and loan amount. Protects lender from collateral price decline.' }
  ],
  bonds: [
    { front: 'Covered Bond Structure', back: 'Dual recourse: claim on dedicated cover pool + general claim on issuer' },
    { front: 'Danish SDRO Bonds', back: 'Særligt Dækkede Realkreditobligationer - strict Danish covered bonds with mortgage cover pool' },
    { front: 'Balance Principle', back: 'Match-funding principle: bond cash flows = mortgage cash flows (amount, timing, rate)' },
    { front: 'Cover Pool Encumbrance', back: 'Mortgages in cover pool are legally encumbered to bondholders (bankruptcy remote)' },
    { front: 'Own-Issued Bonds in HQLA', back: 'CANNOT count own bonds as HQLA (wrong-way risk)' },
    { front: 'Competitor Covered Bonds HQLA', back: 'Can be Level 2A if AA- or higher rated, 15% haircut' },
    { front: 'Covered Bond Risk Weight', back: '10-20% (vs 20-50% for unsecured bank bonds)' },
    { front: 'Match-Funded NSFR Impact', back: 'No special treatment. Bonds: 100% ASF. Mortgages in pool: 100% RSF (encumbered).' },
    { front: 'Prepayment Risk', back: 'Borrowers repay early (typically when rates fall), creating reinvestment risk for bond investors' }
  ]
};
