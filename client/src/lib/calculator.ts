export function calculateIllustrativeAnnualGross(loadValue: number, loadsPerWeek: number, deadheadPercent: number, truckCount: number) {
  const normalizedDeadhead = Math.max(0, Math.min(100, deadheadPercent));
  return Math.round(Math.max(0, loadValue) * Math.max(0, loadsPerWeek) * 52 * Math.max(0, truckCount) * (1 - normalizedDeadhead / 100));
}
