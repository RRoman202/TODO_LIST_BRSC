export function calculatePercentage(endDate) {
  const today = new Date();

  if (endDate < today) {
    return 100;
  }

  const totalDays = (endDate - today) / (1000 * 60 * 60 * 24) + 1;

  return 100 / totalDays;
}
