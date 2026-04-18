export const fmt = (n: number): string => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export const stars = (r: number): string =>
  "★".repeat(Math.floor(r)) +
  (r % 1 >= 0.5 ? "½" : "") +
  "☆".repeat(5 - Math.ceil(r));

export const daysLeft = (deadline: string): number =>
  Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
