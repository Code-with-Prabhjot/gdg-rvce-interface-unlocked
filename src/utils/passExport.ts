/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Client-Side High-DPI PNG Sample Pass Generator
 *
 * Renders a crisp 1200x630 studio-grade dark architectural GDG RVCE Sample Event Pass
 * via HTML5 Canvas and triggers a clean PNG download.
 *
 * COMPLIANCE & CHALLENGE RULES:
 * - Fictional sample token only (RVCE-GDG-2026-DEV)
 * - Explicit sample watermark: "SAMPLE UI PASS · INTERFACE UNLOCKED CHALLENGE"
 * - ZERO analytics, ZERO RSVP counts, ZERO personal attendee data
 * - Official chapter naming: "GDG on Campus RV College of Engineering" / "GDG RVCE"
 * - Four Google colors: #4285F4, #EA4335, #FBBC04 (paired with #111827 dark ink), #34A853
 */

import { GDGEvent, EventCategory } from '@/data/gdgData';

/**
 * Helper to draw a rounded rectangle path on canvas
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Helper to wrap text into multiple lines on canvas
 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 2
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lineCount++;
      if (lineCount >= maxLines) {
        // Truncate remaining
        ctx.fillText(line.trim() + '…', x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line.trim().length > 0) {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }

  return currentY;
}

/**
 * Draw official GDG Chevron brackets < >
 */
function drawGdgChevrons(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number = 1
) {
  ctx.save();
  ctx.lineWidth = 5 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Left Chevron '<' (Google Red top, Google Blue bottom)
  const leftX = cx;
  const leftTipX = cx - 14 * scale;
  const topY = cy - 14 * scale;
  const midY = cy;
  const botY = cy + 14 * scale;

  // Red upper segment
  ctx.beginPath();
  ctx.strokeStyle = '#EA4335';
  ctx.moveTo(leftX, topY);
  ctx.lineTo(leftTipX, midY);
  ctx.stroke();

  // Blue lower segment
  ctx.beginPath();
  ctx.strokeStyle = '#4285F4';
  ctx.moveTo(leftTipX, midY);
  ctx.lineTo(leftX, botY);
  ctx.stroke();

  // Right Chevron '>' (Google Green top, Google Yellow bottom)
  const rightX = cx + 18 * scale;
  const rightTipX = cx + 32 * scale;

  // Green upper segment
  ctx.beginPath();
  ctx.strokeStyle = '#34A853';
  ctx.moveTo(rightX, topY);
  ctx.lineTo(rightTipX, midY);
  ctx.stroke();

  // Yellow lower segment
  ctx.beginPath();
  ctx.strokeStyle = '#FBBC04';
  ctx.moveTo(rightTipX, midY);
  ctx.lineTo(rightX, botY);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw decorative pseudo-QR matrix pattern in 4 Google colors
 */
function drawDecorativeQrMatrix(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  size: number
) {
  ctx.save();
  // Draw background card for QR
  drawRoundedRect(ctx, startX - 8, startY - 8, size + 16, size + 16, 12);
  ctx.fillStyle = '#06080C';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const cols = 9;
  const rows = 9;
  const cellSize = size / cols;
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FFFFFF', '#64748B'];

  // Seeded pattern for deterministic rendering
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Finder patterns in corners
      const isTopLeft = r < 3 && c < 3;
      const isTopRight = r < 3 && c >= cols - 3;
      const isBottomLeft = r >= rows - 3 && c < 3;

      const px = startX + c * cellSize + 2;
      const py = startY + r * cellSize + 2;
      const pw = cellSize - 4;
      const ph = cellSize - 4;

      if (isTopLeft || isTopRight || isBottomLeft) {
        // Outline box
        if (
          r === 0 ||
          r === 2 ||
          r === rows - 3 ||
          r === rows - 1 ||
          c === 0 ||
          c === 2 ||
          c === cols - 3 ||
          c === cols - 1
        ) {
          ctx.fillStyle = '#FFFFFF';
        } else {
          ctx.fillStyle = '#4285F4';
        }
        drawRoundedRect(ctx, px, py, pw, ph, 2);
        ctx.fill();
      } else {
        // Data modules with Google accent highlights
        const hash = (r * 7 + c * 13 + (r ^ c)) % 17;
        if (hash % 2 === 0) {
          const colorIdx = (r + c * 3) % colors.length;
          ctx.fillStyle = colors[colorIdx];
          drawRoundedRect(ctx, px, py, pw, ph, 2);
          ctx.fill();
        }
      }
    }
  }

  ctx.restore();
}

/**
 * Get category badge color styling
 */
function getCategoryColors(category: EventCategory) {
  switch (category) {
    case 'Hackathon':
      return { bg: '#EA4335', text: '#FFFFFF' };
    case 'Workshop':
      return { bg: '#4285F4', text: '#FFFFFF' };
    case 'Study Jam':
      // Pair #FBBC04 with #111827 dark ink for WCAG AAA contrast
      return { bg: '#FBBC04', text: '#111827' };
    case 'Tech Talk':
      return { bg: '#34A853', text: '#FFFFFF' };
  }
}

/**
 * Downloads a high-resolution 1200x630 architectural PNG pass for the given session.
 */
export function downloadSamplePassPng(event: GDGEvent, passId?: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const width = 1200;
  const height = 630;
  const stubX = 890;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // -------------------------------------------------------------
  // 1. BACKGROUND & ARCHITECTURAL GRID
  // -------------------------------------------------------------
  // Deep obsidian surface
  ctx.fillStyle = '#0A0D12';
  ctx.fillRect(0, 0, width, height);

  // Subtle 32px blueprint dot grid
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  for (let x = 32; x < width; x += 32) {
    for (let y = 32; y < height; y += 32) {
      ctx.beginPath();
      ctx.arc(x, y, 1.25, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 8px Top Spectrum Bar (Google 4 Colors)
  const quarterWidth = width / 4;
  ctx.fillStyle = '#4285F4'; // Blue
  ctx.fillRect(0, 0, quarterWidth, 8);
  ctx.fillStyle = '#EA4335'; // Red
  ctx.fillRect(quarterWidth, 0, quarterWidth, 8);
  ctx.fillStyle = '#FBBC04'; // Yellow
  ctx.fillRect(quarterWidth * 2, 0, quarterWidth, 8);
  ctx.fillStyle = '#34A853'; // Green
  ctx.fillRect(quarterWidth * 3, 0, quarterWidth, 8);

  // Outer 1px architectural border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  // -------------------------------------------------------------
  // 2. TICKET PERFORATION & SEMICIRCULAR CUTOUTS
  // -------------------------------------------------------------
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(stubX, 36);
  ctx.lineTo(stubX, height - 36);
  ctx.stroke();
  ctx.restore();

  // Top semicircular cutout
  ctx.beginPath();
  ctx.arc(stubX, 0, 26, 0, Math.PI);
  ctx.fillStyle = '#040608';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Bottom semicircular cutout
  ctx.beginPath();
  ctx.arc(stubX, height, 26, Math.PI, 0);
  ctx.fillStyle = '#040608';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // -------------------------------------------------------------
  // 3. HEADER BRANDING (LEFT SIDE)
  // -------------------------------------------------------------
  // GDG Chevrons
  drawGdgChevrons(ctx, 72, 60, 1.2);

  // Chapter Wordmark & Full Name
  ctx.font = 'bold 24px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('GDG RVCE', 124, 58);

  ctx.font = '500 12px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText('GDG on Campus RV College of Engineering · Bengaluru', 124, 78);

  // Top-Right Pill on Main Ticket: SAMPLE UI PASS · INTERFACE UNLOCKED
  const pillText = 'SAMPLE UI PASS · INTERFACE UNLOCKED';
  ctx.font = 'bold 11px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  const pillMetrics = ctx.measureText(pillText);
  const pillW = pillMetrics.width + 24;
  const pillH = 28;
  const pillX = stubX - pillW - 40;
  const pillY = 46;

  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 8);
  ctx.fillStyle = 'rgba(66, 133, 244, 0.12)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(66, 133, 244, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#4285F4';
  ctx.fillText(pillText, pillX + 12, pillY + 18);

  // -------------------------------------------------------------
  // 4. EVENT TELEMETRY & CATEGORY BADGE
  // -------------------------------------------------------------
  const catColors = getCategoryColors(event.category);
  const catText = event.category.toUpperCase();
  ctx.font = 'bold 12px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  const catMetrics = ctx.measureText(catText);
  const catW = catMetrics.width + 20;
  const catH = 26;
  const badgeX = 64;
  const badgeY = 126;

  // Category Pill
  drawRoundedRect(ctx, badgeX, badgeY, catW, catH, 6);
  ctx.fillStyle = catColors.bg;
  ctx.fill();
  ctx.fillStyle = catColors.text;
  ctx.fillText(catText, badgeX + 10, badgeY + 17);

  // Mode Pill (In-Person / Hybrid / Online)
  const modeText = event.mode.toUpperCase();
  const modeMetrics = ctx.measureText(modeText);
  const modeW = modeMetrics.width + 18;
  const modeX = badgeX + catW + 10;

  drawRoundedRect(ctx, modeX, badgeY, modeW, catH, 6);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText(modeText, modeX + 9, badgeY + 17);

  // Session ID tag
  ctx.font = '600 11px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fillText(`SESSION // ${event.id.toUpperCase()}`, modeX + modeW + 16, badgeY + 17);

  // -------------------------------------------------------------
  // 5. EVENT TITLE & SUBTITLE
  // -------------------------------------------------------------
  ctx.font = 'bold 38px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  const titleEndY = drawWrappedText(ctx, event.title, 64, 202, stubX - 120, 46, 2);

  if (event.subtitle) {
    ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.fillText(event.subtitle, 64, titleEndY + 4);
  }

  // -------------------------------------------------------------
  // 6. STRUCTURED METADATA CARDS (DATE, TIME, VENUE, TRACK LEAD)
  // -------------------------------------------------------------
  const cardGridY = 320;
  const cardW = 176;
  const cardH = 92;
  const cardGap = 16;
  const metaCards = [
    {
      label: 'SESSION DATE',
      val1: event.date,
      val2: '2026/2027 TERM',
      accent: '#4285F4',
    },
    {
      label: 'TIME & DURATION',
      val1: event.time.split(' ')[0] || event.time,
      val2: 'IST TIMINGS',
      accent: '#34A853',
    },
    {
      label: 'CAMPUS VENUE',
      val1: event.venue.split(',')[0] || event.venue,
      val2: 'RVCE CAMPUS',
      accent: '#FBBC04',
    },
    {
      label: 'TRACK SPEAKER',
      val1: event.speaker.name,
      val2: event.speaker.role.split(' ')[0] || 'Technical Lead',
      accent: '#EA4335',
    },
  ];

  metaCards.forEach((card, idx) => {
    const cx = 64 + idx * (cardW + cardGap);
    // Card background
    drawRoundedRect(ctx, cx, cardGridY, cardW, cardH, 10);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Top indicator pip
    ctx.fillStyle = card.accent;
    ctx.beginPath();
    ctx.arc(cx + 14, cardGridY + 16, 3, 0, Math.PI * 2);
    ctx.fill();

    // Card label
    ctx.font = 'bold 9px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText(card.label, cx + 24, cardGridY + 19);

    // Primary value
    ctx.font = 'bold 14px "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(card.val1, cx + 12, cardGridY + 48, cardW - 24);

    // Secondary value
    ctx.font = '500 11px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fillText(card.val2, cx + 12, cardGridY + 70, cardW - 24);
  });

  // -------------------------------------------------------------
  // 7. FOOTER WATERMARK / DISCLAIMER (COMPLIANCE)
  // -------------------------------------------------------------
  const footerY = 580;
  ctx.save();
  ctx.font = '500 11px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText(
    '✦ SAMPLE UI PASS · INTERFACE UNLOCKED CHALLENGE · ZERO PERSONAL DATA STORED · RVCE CAMPUS DEV',
    64,
    footerY
  );
  ctx.restore();

  // -------------------------------------------------------------
  // 8. RIGHT TICKET STUB (AUTHENTICATION MATRIX & TOKEN)
  // -------------------------------------------------------------
  const stubContentX = stubX + 42;
  const qrSize = 180;
  const qrY = 110;

  // Stub Header Eyebrow
  ctx.font = 'bold 11px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = '#4285F4';
  ctx.fillText('AUTH MATRIX // DEV', stubContentX, 58);

  ctx.font = '500 10px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('OFFICIAL STUB VERIFICATION', stubContentX, 76);

  // Decorative QR Code
  drawDecorativeQrMatrix(ctx, stubContentX, qrY, qrSize);

  // Fictional Sample Token
  const tokenY = qrY + qrSize + 40;
  ctx.font = 'bold 10px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('AUTHENTICATION TOKEN', stubContentX, tokenY);

  ctx.font = 'bold 15px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
  ctx.fillStyle = '#4285F4';
  ctx.fillText(passId || 'RVCE-GDG-2026-DEV', stubContentX, tokenY + 22);

  // Stub Metadata Fields
  const stubInfoY = tokenY + 54;
  const stubItems = [
    { label: 'STATUS', value: 'CONFIRMED ✓', color: '#34A853' },
    { label: 'ACCESS', value: 'ALL-ACCESS PASS', color: '#FFFFFF' },
    { label: 'CHALLENGE', value: 'INTERFACE UNLOCKED', color: 'rgba(255, 255, 255, 0.7)' },
  ];

  stubItems.forEach((item, i) => {
    const iy = stubInfoY + i * 36;
    ctx.font = 'bold 9px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(item.label, stubContentX, iy);

    ctx.font = 'bold 12px "JetBrains Mono", ui-monospace, Menlo, Monaco, monospace';
    ctx.fillStyle = item.color;
    ctx.fillText(item.value, stubContentX, iy + 16);
  });

  // -------------------------------------------------------------
  // 9. CONVERT CANVAS TO PNG BLOB & TRIGGER DOWNLOAD
  // -------------------------------------------------------------
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.slug}-gdg-rvce-pass.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
