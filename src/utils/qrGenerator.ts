/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Genuine Phone-Scannable 4-Colour GDG QR Code Renderer
 *
 * Uses `qrcode` (Error Correction Level "M") to compute a standards-compliant
 * QR boolean module matrix and renders it onto a high-DPI offscreen <canvas>
 * with a 4-module white quiet zone (#FFFFFF), crisp obsidian (#0F172A) finder
 * rings with Google-coloured inner cores, and >4.5:1 contrast data modules.
 */

import QRCode from 'qrcode';

const FINDER_COLORS = {
  topLeft: '#EA4335', // Google Red
  topRight: '#4285F4', // Google Blue
  bottomLeft: '#34A853', // Google Green
} as const;

// High-contrast (>4.5:1 against #FFFFFF) module tones for reliable smartphone decoding
const PRIMARY_INK = '#0F172A';
const ACCENT_INKS = ['#1D4ED8', '#B91C1C', '#15803D'] as const;

function drawRoundedModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawFinderPattern(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  cellSize: number,
  coreColor: string
) {
  const outerSize = cellSize * 7;
  const gapSize = cellSize * 5;
  const innerSize = cellSize * 3;

  // 7x7 outer obsidian ring
  ctx.fillStyle = PRIMARY_INK;
  drawRoundedModule(ctx, startX, startY, outerSize, outerSize, cellSize * 0.9);
  ctx.fill();

  // 5x5 crisp white inner cutout
  ctx.fillStyle = '#FFFFFF';
  drawRoundedModule(
    ctx,
    startX + cellSize,
    startY + cellSize,
    gapSize,
    gapSize,
    cellSize * 0.55
  );
  ctx.fill();

  // 3x3 Google-coloured core
  ctx.fillStyle = coreColor;
  drawRoundedModule(
    ctx,
    startX + cellSize * 2,
    startY + cellSize * 2,
    innerSize,
    innerSize,
    cellSize * 0.45
  );
  ctx.fill();
}

function isInFinderZone(row: number, col: number, count: number): boolean {
  const topLeft = row < 7 && col < 7;
  const topRight = row < 7 && col >= count - 7;
  const bottomLeft = row >= count - 7 && col < 7;
  return topLeft || topRight || bottomLeft;
}

/**
 * Renders a real, phone-scannable 4-colour GDG QR code onto an offscreen canvas.
 */
export async function renderBrandedQrToCanvas(
  url: string,
  size: number = 200
): Promise<HTMLCanvasElement> {
  if (typeof document === 'undefined') {
    throw new Error('renderBrandedQrToCanvas requires a browser DOM environment.');
  }

  const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const { modules } = qr;
  const count = modules.size;
  const data = modules.data;

  // Standards-compliant 4-module white quiet zone around all 4 sides
  const quietZoneModules = 4;
  const totalModules = count + quietZoneModules * 2;

  // High-DPI 2x backing resolution for crisp module edges
  const scale = 2;
  const canvasPixels = Math.max(size, 120) * scale;
  const cellSize = canvasPixels / totalModules;
  const offset = quietZoneModules * cellSize;

  const canvas = document.createElement('canvas');
  canvas.width = canvasPixels;
  canvas.height = canvasPixels;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not initialize 2D canvas context for QR generation.');
  }

  // Solid high-contrast white quiet-zone background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvasPixels, canvasPixels);

  // Draw the three 7x7 Finder Patterns with Google-coloured inner cores
  drawFinderPattern(ctx, offset, offset, cellSize, FINDER_COLORS.topLeft);
  drawFinderPattern(
    ctx,
    offset + (count - 7) * cellSize,
    offset,
    cellSize,
    FINDER_COLORS.topRight
  );
  drawFinderPattern(
    ctx,
    offset,
    offset + (count - 7) * cellSize,
    cellSize,
    FINDER_COLORS.bottomLeft
  );

  // Draw all data/timing/format modules outside the 3 finder regions
  const overlap = Math.max(0.2, cellSize * 0.04);
  const modRadius = cellSize * 0.16;

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (isInFinderZone(r, c, count)) continue;

      const isDark = Boolean(data[r * count + c]);
      if (!isDark) continue;

      const x = offset + c * cellSize;
      const y = offset + r * cellSize;

      // Keep timing patterns strictly obsidian for instant camera lock
      if (r === 6 || c === 6) {
        ctx.fillStyle = PRIMARY_INK;
      } else {
        const deterministicBucket = (r * 7 + c * 13 + (r ^ c)) % 11;
        if (deterministicBucket === 0) {
          ctx.fillStyle = ACCENT_INKS[0]; // Deep Blue #1D4ED8
        } else if (deterministicBucket === 3) {
          ctx.fillStyle = ACCENT_INKS[1]; // Deep Red #B91C1C
        } else if (deterministicBucket === 7) {
          ctx.fillStyle = ACCENT_INKS[2]; // Deep Green #15803D
        } else {
          ctx.fillStyle = PRIMARY_INK; // Obsidian #0F172A
        }
      }

      drawRoundedModule(
        ctx,
        x - overlap / 2,
        y - overlap / 2,
        cellSize + overlap,
        cellSize + overlap,
        modRadius
      );
      ctx.fill();
    }
  }

  return canvas;
}

/**
 * Generates a PNG data URL for inline <img> preview of the branded scannable QR code.
 */
export async function generateBrandedQrDataUrl(
  url: string,
  size: number = 136
): Promise<string> {
  const canvas = await renderBrandedQrToCanvas(url, size);
  return canvas.toDataURL('image/png');
}
