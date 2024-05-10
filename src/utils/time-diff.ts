const units: [string, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

/**
 * Calculate the difference with the current date and returns it a string in relative time format.
 */
export default function timeDiff(date: Date) {
  const diff = Date.now() - date.getTime();
  const seconds = diff / 1000;

  for (const [unit, threshold] of units) {
    if (seconds >= threshold) {
      const value = Math.floor(seconds / threshold);
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
