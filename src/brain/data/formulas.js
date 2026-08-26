/**
 * Formula sheets.
 *
 * The maths skill *computes* — it will work out 17% of 4,850. What it could
 * never do was tell you the formula for the volume of a cone, which is what a
 * student actually needs at eleven at night with no signal. These are the
 * sheets you would otherwise be searching for.
 *
 * Everything here is definitional and cannot go out of date, which is the bar
 * for anything shipped inside an app that may never be updated again.
 */

export const FORMULAS = [
  {
    id: 'area-formulas',
    q: [
      'area formulas',
      'formula for area',
      'how to find area',
      'area of a circle',
      'area of a triangle',
      'perimeter formulas',
    ],
    title: 'Area and perimeter',
    body:
      '| Shape | Area | Perimeter |\n| --- | --- | --- |\n' +
      '| Square | s² | 4s |\n' +
      '| Rectangle | l × w | 2(l + w) |\n' +
      '| Triangle | ½ × b × h | a + b + c |\n' +
      '| Parallelogram | b × h | 2(a + b) |\n' +
      '| Trapezoid | ½ × (a + b) × h | a + b + c + d |\n' +
      '| Circle | πr² | 2πr (circumference) |\n' +
      '| Rhombus | ½ × d₁ × d₂ | 4s |\n\n' +
      '**Heron\'s formula** — a triangle from its three sides alone:\n' +
      'A = √(s(s−a)(s−b)(s−c)), where s = (a + b + c) / 2',
  },
  {
    id: 'volume-formulas',
    q: [
      'volume formulas',
      'formula for volume',
      'volume of a cylinder',
      'volume of a sphere',
      'volume of a cone',
      'surface area formulas',
    ],
    title: 'Volume and surface area',
    body:
      '| Solid | Volume | Surface area |\n| --- | --- | --- |\n' +
      '| Cube | s³ | 6s² |\n' +
      '| Rectangular prism | l × w × h | 2(lw + lh + wh) |\n' +
      '| Cylinder | πr²h | 2πr² + 2πrh |\n' +
      '| Cone | ⅓πr²h | πr² + πrl |\n' +
      '| Sphere | ⁴⁄₃πr³ | 4πr² |\n' +
      '| Square pyramid | ⅓ × b² × h | b² + 2bl |\n' +
      '| Prism (any) | base area × h | 2×base + perimeter×h |\n\n' +
      'In the cone, **l** is the slant height: l = √(r² + h²).',
  },
  {
    id: 'algebra-formulas',
    q: [
      'algebra formulas',
      'quadratic formula',
      'algebraic identities',
      'laws of exponents',
      'difference of squares',
      'factoring formulas',
    ],
    title: 'Algebra',
    body:
      '**Quadratic formula** — for ax² + bx + c = 0:\n' +
      'x = (−b ± √(b² − 4ac)) / 2a\n\n' +
      'The **discriminant** b² − 4ac tells you the roots before you solve: ' +
      'positive → two real roots, zero → one repeated root, negative → no real roots.\n\n' +
      '**Identities**\n' +
      '- (a + b)² = a² + 2ab + b²\n' +
      '- (a − b)² = a² − 2ab + b²\n' +
      '- a² − b² = (a + b)(a − b)\n' +
      '- (a + b)³ = a³ + 3a²b + 3ab² + b³\n' +
      '- a³ + b³ = (a + b)(a² − ab + b²)\n' +
      '- a³ − b³ = (a − b)(a² + ab + b²)\n\n' +
      '**Laws of exponents**\n' +
      '- aᵐ × aⁿ = aᵐ⁺ⁿ · aᵐ ÷ aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ\n' +
      '- a⁰ = 1 (a ≠ 0) · a⁻ⁿ = 1/aⁿ · a^(1/n) = ⁿ√a\n\n' +
      '**Slope of a line** — m = (y₂ − y₁) / (x₂ − x₁); the line is y = mx + b.\n' +
      '**Distance between two points** — d = √((x₂ − x₁)² + (y₂ − y₁)²)',
  },
  {
    id: 'trig-formulas',
    q: [
      'trigonometry formulas',
      'sohcahtoa',
      'law of sines',
      'law of cosines',
      'trig identities',
      'sin cos tan formula',
    ],
    title: 'Trigonometry',
    body:
      '**SOH-CAH-TOA** — in a right triangle, relative to an angle θ:\n' +
      '- sin θ = opposite / hypotenuse\n' +
      '- cos θ = adjacent / hypotenuse\n' +
      '- tan θ = opposite / adjacent\n\n' +
      '**Pythagorean theorem** — a² + b² = c², where c is the hypotenuse.\n\n' +
      '**Identities**\n' +
      '- sin²θ + cos²θ = 1\n' +
      '- tan θ = sin θ / cos θ\n' +
      '- sin 2θ = 2 sin θ cos θ · cos 2θ = cos²θ − sin²θ\n\n' +
      '**Any triangle**\n' +
      '- Law of sines: a/sin A = b/sin B = c/sin C\n' +
      '- Law of cosines: c² = a² + b² − 2ab·cos C\n' +
      '- Area: ½ab·sin C\n\n' +
      '**Common angles**\n' +
      '| θ | 0° | 30° | 45° | 60° | 90° |\n| --- | --- | --- | --- | --- | --- |\n' +
      '| sin | 0 | ½ | √2/2 | √3/2 | 1 |\n' +
      '| cos | 1 | √3/2 | √2/2 | ½ | 0 |\n' +
      '| tan | 0 | √3/3 | 1 | √3 | — |',
  },
  {
    id: 'physics-formulas',
    q: [
      'physics formulas',
      'formula for speed',
      'newtons second law formula',
      'kinetic energy formula',
      'ohms law',
      'motion formulas',
    ],
    title: 'Physics',
    body:
      '**Motion**\n' +
      '- speed = distance / time · velocity = displacement / time\n' +
      '- acceleration a = (v − u) / t\n' +
      '- v = u + at · s = ut + ½at² · v² = u² + 2as\n' +
      '  (u = starting velocity, v = final, s = displacement, t = time)\n\n' +
      '**Forces and energy**\n' +
      '- Newton\'s second law: F = ma\n' +
      '- weight W = mg, with g ≈ 9.8 m/s² on Earth\n' +
      '- momentum p = mv · work W = F × d\n' +
      '- kinetic energy KE = ½mv² · potential energy PE = mgh\n' +
      '- power P = work / time\n' +
      '- density ρ = mass / volume · pressure P = force / area\n\n' +
      '**Electricity**\n' +
      '- Ohm\'s law: V = IR\n' +
      '- power P = VI = I²R\n' +
      '- charge Q = It\n\n' +
      '**Waves**\n' +
      '- v = fλ (speed = frequency × wavelength)\n' +
      '- period T = 1 / f',
  },
  {
    id: 'statistics-formulas',
    q: [
      'statistics formulas',
      'mean median mode',
      'standard deviation formula',
      'probability formula',
      'combinatorics formulas',
    ],
    title: 'Statistics and Probability',
    body:
      '**Measures of Central Tendency**\n' +
      '- Mean (average): x̄ = Σx / n\n' +
      '- Median: middle value when sorted\n' +
      '- Mode: most frequent value\n\n' +
      '**Measures of Spread**\n' +
      '- Range: max − min\n' +
      '- Variance: σ² = Σ(x − μ)² / N\n' +
      '- Standard deviation: σ = √(variance)\n' +
      '- Coefficient of variation: CV = (σ / μ) × 100%\n\n' +
      '**Probability**\n' +
      '- P(A) = favorable outcomes / total outcomes\n' +
      '- P(A and B) = P(A) × P(B) if independent\n' +
      '- P(A or B) = P(A) + P(B) − P(A and B)\n' +
      '- P(A|B) = P(A and B) / P(B) (conditional)\n' +
      '- Complement: P(not A) = 1 − P(A)\n\n' +
      '**Combinatorics**\n' +
      '- Permutations: P(n,r) = n! / (n−r)!\n' +
      '- Combinations: C(n,r) = n! / (r!(n−r)!)\n' +
      '- Binomial: P(X=k) = C(n,k) × pᵏ × (1−p)ⁿ⁻ᵏ',
  },
  {
    id: 'chemistry-formulas',
    q: [
      'chemistry formulas',
      'molarity formula',
      'ideal gas law',
      'pH formula',
      'stoichiometry formulas',
    ],
    title: 'Chemistry',
    body:
      '**Stoichiometry**\n' +
      '- Moles = mass (g) / molar mass (g/mol)\n' +
      '- Molarity (M) = moles of solute / liters of solution\n' +
      '- Dilution: M₁V₁ = M₂V₂\n\n' +
      '**Ideal Gas Law**\n' +
      '- PV = nRT\n' +
      '- P = pressure (atm), V = volume (L), n = moles, R = 0.0821 L·atm/(mol·K), T = temperature (K)\n\n' +
      '**pH and Acidity**\n' +
      '- pH = −log[H⁺]\n' +
      '- pOH = −log[OH⁻]\n' +
      '- pH + pOH = 14\n' +
      '- [H⁺] = 10⁻ᵖᴴ\n\n' +
      '**Thermochemistry**\n' +
      '- q = mcΔT (heat energy)\n' +
      '- ΔH = H(products) − H(reactants)\n\n' +
      '**Equilibrium**\n' +
      '- Kc = [products]ⁿ / [reactants]ᵐ\n' +
      '- Le Chatelier\'s principle: system shifts to counteract changes',
  },
  {
    id: 'finance-formulas',
    q: [
      'finance formulas',
      'compound interest formula',
      'simple interest formula',
      'present value formula',
      'future value formula',
    ],
    title: 'Finance',
    body:
      '**Simple Interest**\n' +
      '- I = P × r × t\n' +
      '- P = principal, r = rate (decimal), t = time (years)\n\n' +
      '**Compound Interest**\n' +
      '- A = P(1 + r/n)ⁿᵗ\n' +
      '- A = final amount, P = principal, r = annual rate, n = compounds per year, t = years\n\n' +
      '**Future Value**\n' +
      '- FV = PV × (1 + r)ⁿ\n\n' +
      '**Present Value**\n' +
      '- PV = FV / (1 + r)ⁿ\n\n' +
      '**Annuity**\n' +
      '- PV = PMT × [(1 − (1 + r)ⁿ) / r]\n' +
      '- FV = PMT × [((1 + r)ⁿ − 1) / r]\n\n' +
      '**Depreciation**\n' +
      '- Straight-line: (Cost − Salvage) / Useful life\n' +
      '- Declining balance: Book value × rate\n\n' +
      '**Break-even**\n' +
      '- Break-even point = Fixed costs / (Price − Variable cost per unit)',
  },
]
