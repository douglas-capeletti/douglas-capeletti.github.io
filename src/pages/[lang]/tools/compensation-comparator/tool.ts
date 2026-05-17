// --- 1. DATA STRUCTURES (TAX BRACKETS) ---

interface InssBracket {
  upperLimit: number
  taxRate: number
}

interface IrpfBracket {
  upperLimit: number
  taxRate: number
}

const INSS_TABLE_2026: InssBracket[] = [
  { upperLimit: 1621.00, taxRate: 0.075 },
  { upperLimit: 2902.84, taxRate: 0.09 },
  { upperLimit: 4354.27, taxRate: 0.12 },
  { upperLimit: 8475.55, taxRate: 0.14 }
]

const IRPF_TABLE_2026: IrpfBracket[] = [
  { upperLimit: 5000.00, taxRate: 0.0 },
  { upperLimit: 6500.00, taxRate: 0.075 },
  { upperLimit: 8000.00, taxRate: 0.15 },
  { upperLimit: 10000.00, taxRate: 0.225 },
  { upperLimit: Infinity, taxRate: 0.275 }
]


// --- 2. DYNAMIC AND PROGRESSIVE CALCULATION FUNCTIONS BY BRACKETS ---

function calculateProgressiveInss(grossSalary: number, table: InssBracket[] = INSS_TABLE_2026): number {
  let totalInss = 0
  let previousLimit = 0

  for (const bracket of table) {
    if (grossSalary > bracket.upperLimit) {
      totalInss += (bracket.upperLimit - previousLimit) * bracket.taxRate
      previousLimit = bracket.upperLimit
    } else {
      totalInss += (grossSalary - previousLimit) * bracket.taxRate
      break
    }
  }
  return totalInss
}

function calculateDynamicProgressiveIrpf(calculationBase: number, table: IrpfBracket[] = IRPF_TABLE_2026): number {
  let totalIrpf = 0
  let previousLimit = 0

  for (const bracket of table) {
    if (bracket.upperLimit === Infinity) {
      if (calculationBase > previousLimit) {
        totalIrpf += (calculationBase - previousLimit) * bracket.taxRate
      }
      break
    }

    if (calculationBase > bracket.upperLimit) {
      totalIrpf += (bracket.upperLimit - previousLimit) * bracket.taxRate
      previousLimit = bracket.upperLimit
    } else {
      totalIrpf += (calculationBase - previousLimit) * bracket.taxRate
      break
    }
  }
  return totalIrpf
}

/**
 * Helper to calculate the annual composition and also return the liquidity of a common month
 */
function getCltMetrics(monthlyGross: number) {
  const monthlyInss = calculateProgressiveInss(monthlyGross)
  const monthlyIrrf = calculateDynamicProgressiveIrpf(monthlyGross - monthlyInss)
  const monthlyNet = monthlyGross - monthlyInss - monthlyIrrf
  const monthlyFgts = monthlyGross * 0.08

  const inss13th = calculateProgressiveInss(monthlyGross)
  const irrf13th = calculateDynamicProgressiveIrpf(monthlyGross - inss13th)
  const net13th = monthlyGross - inss13th - irrf13th

  const vacationGross = monthlyGross + (monthlyGross / 3)
  const vacationInss = calculateProgressiveInss(vacationGross)
  const vacationIrrf = calculateDynamicProgressiveIrpf(vacationGross - vacationInss)
  const totalVacationNet = vacationGross - vacationInss - vacationIrrf
  const netVacationThirdOnly = totalVacationNet - monthlyNet

  const totalAnnualLiquidity = (monthlyNet * 12) + (monthlyFgts * 12) + net13th + netVacationThirdOnly

  return {
    monthlyNet,
    totalAnnualLiquidity
  }
}


// --- 3. HIRING MODELS ---

export interface ComparisonResult {
  model: string
  monthlyGrossOrRevenue: number
  monthlyLiquidity: number;
  annualLiquidity: number
  monthlyAverageReal: number
  monthlyTaxesAndFees: number
}

function calculateFullClt(targetAnnualLiquidity: number, modelName: string = "CLT"): ComparisonResult {
  let cltFullGross = 0
  let monthlyLiquidity = 0

  for (let gross = 1000; gross < 100000; gross += 10) {
    const metrics = getCltMetrics(gross)

    if (metrics.totalAnnualLiquidity >= targetAnnualLiquidity) {
      cltFullGross = gross
      monthlyLiquidity = metrics.monthlyNet
      break
    }
  }

  const finalInss = calculateProgressiveInss(cltFullGross)
  const finalIrrf = calculateDynamicProgressiveIrpf(cltFullGross - finalInss)

  return {
    model: modelName,
    monthlyGrossOrRevenue: cltFullGross,
    monthlyLiquidity: monthlyLiquidity,
    annualLiquidity: targetAnnualLiquidity,
    monthlyAverageReal: targetAnnualLiquidity / 12,
    monthlyTaxesAndFees: finalInss + finalIrrf
  }
}

function calculateSimplePj(targetAnnualLiquidity: number, pjTaxRate: number = 0.06, modelName: string = "PJ (Simples Nacional)"): ComparisonResult {
  const pjTargetNetMonthly = targetAnnualLiquidity / 12
  const pjRevenue = pjTargetNetMonthly / (1 - pjTaxRate)
  const pjMonthlyTax = pjRevenue * pjTaxRate
  const monthlyLiquidity = pjRevenue - pjMonthlyTax

  return {
    model: modelName,
    monthlyGrossOrRevenue: pjRevenue,
    monthlyLiquidity: monthlyLiquidity, // No PJ sem provisão, a liquidez mensal é igual à média
    annualLiquidity: targetAnnualLiquidity,
    monthlyAverageReal: targetAnnualLiquidity / 12,
    monthlyTaxesAndFees: pjMonthlyTax
  }
}

function calculateCooperative(
  targetAnnualLiquidity: number,
  coopAdminFeeRate: number = 0.03,
  businessVacationDays: number = 10,
  proLaboreValue: number = 2500.00,
  modelName: string = "Cooperado"
): ComparisonResult {
  const coopMonthsFactorWithVacation = 12 + (businessVacationDays / 22)
  const coopTargetNetMonthly = targetAnnualLiquidity / coopMonthsFactorWithVacation

  const proLaboreInss = calculateProgressiveInss(proLaboreValue)
  const proLaboreIrrf = calculateDynamicProgressiveIrpf(proLaboreValue - proLaboreInss)
  const totalTaxesProLabore = proLaboreInss + proLaboreIrrf

  const cooperativeRevenue = (coopTargetNetMonthly + totalTaxesProLabore) / (1 - coopAdminFeeRate)
  const coopMonthlyAdminFee = cooperativeRevenue * coopAdminFeeRate
  const monthlyLiquidity = cooperativeRevenue - coopMonthlyAdminFee - totalTaxesProLabore

  return {
    model: modelName,
    monthlyGrossOrRevenue: cooperativeRevenue,
    monthlyLiquidity: monthlyLiquidity,
    annualLiquidity: targetAnnualLiquidity,
    monthlyAverageReal: targetAnnualLiquidity / 12,
    monthlyTaxesAndFees: coopMonthlyAdminFee + totalTaxesProLabore
  }
}


// --- 4. EXECUTION ---

export interface ComparatorOptions {
  targetLiquidity: number
  pjTaxRate?: number
  coopAdminFeeRate?: number
  businessVacationDays?: number
  proLaboreValue?: number
  modelNames?: {
    clt: string
    pj: string
    coop: string
  }
}

export function generateComparison(options: ComparatorOptions): ComparisonResult[] {
  const modelNames = options.modelNames || { clt: "CLT", pj: "PJ (Simples Nacional)", coop: "Cooperado" }
  return [
    calculateFullClt(options.targetLiquidity, modelNames.clt),
    calculateSimplePj(options.targetLiquidity, options.pjTaxRate, modelNames.pj),
    calculateCooperative(options.targetLiquidity, options.coopAdminFeeRate, options.businessVacationDays, options.proLaboreValue, modelNames.coop)
  ]
}