/**
 * generate-assets.js
 * Generates icon.png, adaptive-icon.png, and splash.png for Expenzaa
 * Run: node scripts/generate-assets.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// ─── Shared wallet SVG content (1024×1024 viewport) ──────────────────────────

function walletContent() {
  return `
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#35CEC0"/>
      <stop offset="100%" stop-color="#1AA898"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1024" fill="url(#bgGrad)"/>

  <!-- Decorative circles -->
  <circle cx="900" cy="120" r="270" fill="rgba(255,255,255,0.07)"/>
  <circle cx="120" cy="910" r="210" fill="rgba(255,255,255,0.05)"/>

  <!-- Wallet body -->
  <rect x="208" y="330" width="608" height="384" rx="48" fill="white" opacity="0.95"/>

  <!-- Wallet flap (top-left tab) -->
  <path d="M252 330 L252 292 Q252 264 280 264 L468 264 Q496 264 496 292 L496 330 Z"
        fill="white" opacity="0.88"/>

  <!-- Right pocket area -->
  <rect x="616" y="380" width="150" height="284" rx="24" fill="rgba(46,196,182,0.2)"/>

  <!-- Coin in pocket (bottom of right pocket) -->
  <circle cx="691" cy="578" r="54" fill="rgba(46,196,182,0.3)"/>
  <circle cx="691" cy="578" r="38" fill="rgba(255,255,255,0.92)"/>
  <!-- Coin inner marks (avoid font dependency) -->
  <rect x="677" y="560" width="28" height="6" rx="3" fill="#1AA898" opacity="0.85"/>
  <rect x="677" y="575" width="28" height="6" rx="3" fill="#1AA898" opacity="0.85"/>
  <rect x="677" y="590" width="28" height="6" rx="3" fill="#1AA898" opacity="0.85"/>

  <!-- Card thumbnail in pocket (top of right pocket) -->
  <rect x="632" y="418" width="118" height="78" rx="10" fill="rgba(46,196,182,0.55)"/>
  <rect x="648" y="434" width="28" height="20" rx="4" fill="rgba(255,255,255,0.7)"/>

  <!-- Wallet content lines (left body area) -->
  <rect x="252" y="424" width="304" height="14" rx="7" fill="#E0F7F5"/>
  <rect x="252" y="454" width="208" height="14" rx="7" fill="#E0F7F5" opacity="0.75"/>

  <!-- Chip / card at bottom of wallet body -->
  <rect x="252" y="550" width="90" height="38" rx="10" fill="rgba(46,196,182,0.42)"/>
  <rect x="362" y="550" width="118" height="38" rx="10" fill="#E8F8F7"/>
  <rect x="498" y="550" width="74" height="38" rx="10" fill="#E8F8F7" opacity="0.7"/>
  `;
}

// ─── 1. App icon (1024×1024 — iOS + default Android) ─────────────────────────

async function generateIcon() {
  const svg = `
    <svg width="1024" height="1024" viewBox="0 0 1024 1024"
         xmlns="http://www.w3.org/2000/svg">
      ${walletContent()}
    </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(ASSETS_DIR, 'icon.png'));

  console.log('✓ icon.png  (1024×1024)');
}

// ─── 2. Adaptive icon foreground (1024×1024 — Android safe-zone padded) ───────

async function generateAdaptiveIcon() {
  // Android safe zone ≈ 66% of image; we scale the wallet to fit the inner
  // 640×640 area centred in a 1024×1024 transparent canvas.
  const scale = 640 / 1024;   // 0.625
  const offset = (1024 - 640) / 2; // 192

  const svg = `
    <svg width="1024" height="1024" viewBox="0 0 1024 1024"
         xmlns="http://www.w3.org/2000/svg">
      <!-- Transparent outer area; background supplied by app.json -->
      <g transform="translate(${offset},${offset}) scale(${scale})">
        ${walletContent()}
      </g>
    </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(ASSETS_DIR, 'adaptive-icon.png'));

  console.log('✓ adaptive-icon.png  (1024×1024, 640px safe zone)');
}

// ─── 3. Splash screen (1284×2778 — iPhone 14 Pro Max) ────────────────────────

async function generateSplash() {
  const W = 1284;
  const H = 2778;
  const cx = W / 2;
  const iconR = 180; // icon circle radius
  const iconY = H / 2 - 80;

  // Scale the wallet to fit inside a circle of radius iconR
  const iconScale = (iconR * 2) / 1024;
  const iconOffsetX = cx - iconR;
  const iconOffsetY = iconY - iconR;

  const svg = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
         xmlns="http://www.w3.org/2000/svg">

      <!-- App background -->
      <rect width="${W}" height="${H}" fill="#F4F5FA"/>

      <!-- Subtle top decoration -->
      <circle cx="${cx}" cy="-60" r="520" fill="rgba(46,196,182,0.06)"/>

      <!-- Icon circle -->
      <defs>
        <linearGradient id="splashGrad" x1="0" y1="0"
                        x2="${iconR*2}" y2="${iconR*2}"
                        gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#35CEC0"/>
          <stop offset="100%" stop-color="#1AA898"/>
        </linearGradient>
        <clipPath id="iconCircle">
          <circle cx="${cx}" cy="${iconY}" r="${iconR}"/>
        </clipPath>
      </defs>

      <!-- Icon drop shadow -->
      <circle cx="${cx}" cy="${iconY + 6}" r="${iconR}"
              fill="rgba(26,168,152,0.18)"/>

      <!-- Clipped wallet icon -->
      <g clip-path="url(#iconCircle)">
        <g transform="translate(${iconOffsetX},${iconOffsetY}) scale(${iconScale})">
          ${walletContent()}
        </g>
      </g>

      <!-- App name -->
      <text x="${cx}" y="${iconY + iconR + 80}"
            text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif"
            font-weight="800"
            font-size="96"
            letter-spacing="3"
            fill="#1E2A3A">Expenzaa</text>

      <!-- Tagline -->
      <text x="${cx}" y="${iconY + iconR + 152}"
            text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif"
            font-size="40"
            fill="#7B8794">Smart expense tracking</text>

      <!-- Bottom decoration -->
      <circle cx="${cx}" cy="${H + 80}" r="520"
              fill="rgba(46,196,182,0.05)"/>
    </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(ASSETS_DIR, 'splash.png'));

  console.log(`✓ splash.png  (${W}×${H})`);
}

// ─── Run ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log('\nGenerating Expenzaa assets...\n');
  try {
    await generateIcon();
    await generateAdaptiveIcon();
    await generateSplash();
    console.log('\nAll assets written to /assets — done!\n');
  } catch (err) {
    console.error('\nError generating assets:', err.message);
    process.exit(1);
  }
})();
