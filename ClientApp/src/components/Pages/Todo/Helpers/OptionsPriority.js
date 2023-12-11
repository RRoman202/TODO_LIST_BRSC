export const optionsPriority = [
  {
    value: "Высокий",
    label: "Высокий",
  },
  {
    value: "Средний",
    label: "Средний",
  },
  {
    value: "Низкий",
    label: "Низкий",
  },
];
export function getColorTask(prior) {
  if (prior === "Высокий") {
    return ["#ff4d4f", "#ffccc7", "#f5222d"];
  }
  if (prior === "Средний") {
    return ["#ffa940", "#ffe7ba", "#fa8c16"];
  }
  if (prior === "Низкий") {
    return ["#bae637", "#f4ffb8", "#a0d911"];
  }
}
