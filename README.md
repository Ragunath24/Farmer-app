# PoultryCare Farmer App (PWA)

## Files
- `index.html`              : the whole app (same screens as the prototype)
- `manifest.webmanifest`    : app name, colors, icons (makes it installable)
- `sw.js`                   : service worker (offline support, fast loading)
- `icons/`                  : app icons (192, 512, maskable 512, apple-touch, favicon)
- `vercel.json`             : correct headers for sw.js and manifest

## Deploy (2 ways)
1. **Drag and drop:** vercel.com/new -> "Deploy" -> drop this whole folder. Framework preset: **Other**. No build command, no output directory.
2. **CLI:** `npm i -g vercel`, then inside this folder run `vercel --prod`.

Vercel gives HTTPS automatically. PWA install needs HTTPS.

## Check after deploy
- Android Chrome/Edge: open the URL -> Install App button -> "1-Click Install App" -> native install popup.
- iPhone: Safari -> Share -> Add to Home Screen (iOS has no install popup, this is an Apple limit).
- Desktop Chrome/Edge: install icon in the address bar.
- Chrome DevTools -> Application tab -> Manifest / Service Workers should show no errors.

## Real APK (optional, later)
After the site is live, go to pwabuilder.com, enter your Vercel URL, choose Android, download the signed package.
Upload the APK to Play Store (or host it in `public/` and link it). Users must allow "Install unknown apps" for a hosted APK.

## Before real customers use it
- Replace the "PC" placeholder icons in `icons/` with your logo (keep the same file names and sizes).
- Data is dummy and lives only in browser memory. Connect a backend / database for real entries, login and payments.
- The "Web view / Mobile view" switch at the bottom is a preview tool. To hide it for customers, delete the `<div class="vs" id="vs">...</div>` line in index.html.
- After you change any file, change `const V = 'poultrycare-v1'` in sw.js (for example to v2) so users get the update.
