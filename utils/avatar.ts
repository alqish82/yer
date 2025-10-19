// Simple hash function to get a number from a string
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Generates a random color based on a seed
const getColor = (seed: number, offset: number): string => {
  const hue = ((seed + offset) * 137.508) % 360;
  return `hsl(${hue}, 50%, 60%)`;
};

// Generates a unique SVG avatar based on a seed string
export const generateAvatar = (seed: string): string => {
  const hash = simpleHash(seed);
  const size = 100;
  const backgroundColor = getColor(hash, 0);
  const shape1Color = getColor(hash, 100);
  const shape2Color = getColor(hash, 200);

  const shape1Type = hash % 3;
  const shape2Type = (hash + 1) % 3;

  let shape1, shape2;

  // Shape 1
  switch (shape1Type) {
    case 0: // Circle
      shape1 = `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 4}" fill="${shape1Color}" />`;
      break;
    case 1: // Rectangle
      shape1 = `<rect x="${size / 4}" y="${size / 4}" width="${size / 2}" height="${size / 2}" fill="${shape1Color}" transform="rotate(${hash % 90} ${size / 2} ${size / 2})" />`;
      break;
    case 2: // Triangle
    default:
      shape1 = `<polygon points="${size / 2},${size / 4} ${size * 3 / 4},${size * 3 / 4} ${size / 4},${size * 3 / 4}" fill="${shape1Color}" />`;
      break;
  }
  
  // Shape 2
  switch (shape2Type) {
    case 0: // smaller circle
        shape2 = `<circle cx="${(hash % 2 === 0 ? size / 3 : size * 2 / 3)}" cy="${size / 2}" r="${size / 8}" fill="${shape2Color}" />`;
        break;
    case 1: // line
        shape2 = `<line x1="${size / 4}" y1="${size / 4}" x2="${size * 3 / 4}" y2="${size * 3 / 4}" stroke="${shape2Color}" stroke-width="5" />`;
        break;
    case 2: // smaller rect
    default:
        shape2 = `<rect x="${size / 3}" y="${size / 3}" width="${size / 4}" height="${size / 4}" fill="${shape2Color}" />`;
        break;
  }

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" />
      ${shape1}
      ${shape2}
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
