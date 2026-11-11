// Contiguous rows preserve the photographer's sequence at every screen width.
export function layoutRows(photos, width) {
  if (!photos.length || width <= 0) return [];
  const gap = width < 600 ? 10 : 18;
  const target = width < 480 ? 340 : width < 800 ? 300 : 350;
  const maxItems = width < 480 ? 2 : width < 800 ? 3 : 4;
  const costs = Array(photos.length + 1).fill(Infinity);
  const choices = Array(photos.length).fill(1);
  costs[photos.length] = 0;
  for (let start = photos.length - 1; start >= 0; start--) {
    let ratio = 0;
    for (let n = 1; n <= maxItems && start + n <= photos.length; n++) {
      ratio += photos[start + n - 1].width / photos[start + n - 1].height;
      const height = (width - gap * (n - 1)) / ratio;
      const cost = Math.pow((height - target) / target, 2) + costs[start + n];
      if (cost < costs[start]) { costs[start] = cost; choices[start] = n; }
    }
  }
  const rows = [];
  for (let i = 0; i < photos.length;) {
    const items = photos.slice(i, i + choices[i]);
    const ratio = items.reduce((sum, p) => sum + p.width / p.height, 0);
    const height = Math.min((width - gap * (items.length - 1)) / ratio, target * 1.2);
    rows.push({ items, height, width: height * ratio + gap * (items.length - 1), gap });
    i += items.length;
  }
  return rows;
}
