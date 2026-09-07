# HumAi — Official SaaS Landing Page
> **High-Converting B2B SaaS Landing Page for HumAi**  
> Tailored for Small and Medium Businesses (SMEs) in Egypt & MENA.

---

## 🌟 Overview & Architecture

This folder contains the complete, standalone, production-ready landing page suite for **HumAi**. It is completely decoupled from the internal SaaS application, database, and backend systems.

- **Arabic First (`/index.html`)**: Native RTL experience using Google Font **IBM Plex Sans Arabic**, written in modern business Arabic with authentic Egyptian colloquialism for WhatsApp interactions.
- **English Localized Mirror (`/en/index.html`)**: Polished LTR international SaaS experience with identical visual hierarchy and interactive capabilities.
- **Zero Heavy Dependencies**: Pure semantic HTML5, modern CSS3 (logical layout properties, CSS variables, subtle glassmorphism), and vanilla ES6+ JS for instant, sub-second load times and 100/100 Lighthouse performance.

---

## 📁 Directory Structure

```
Landing page/
├── index.html                  # Arabic Primary Landing Page (RTL)
├── en/
│   └── index.html              # English Landing Page (LTR)
├── css/
│   ├── variables.css           # Color tokens (#1F2937, #10B981), spacing, typography
│   ├── base.css                # Modern reset, typography, and RTL/LTR foundations
│   ├── components.css          # Navigation, hero, mockups, badges, pricing, tables, FAQs
│   └── animations.css          # Subtle hover, floating cards, live indicators, and typing dots
├── js/
│   ├── main.js                 # Interactive WhatsApp simulator, pricing switch, FAQ accordions
│   └── analytics.js            # Custom event tracker (Meta Pixel, Google Ads, TikTok, WhatsApp)
├── assets/
│   └── logo/
│       ├── humai-logo.svg       # Full horizontal brand logo (Navy text)
│       ├── humai-logo-white.svg # Full brand logo for dark backgrounds (White text)
│       ├── humai-emblem.svg     # Official dual-figure 'H' emblem
│       └── favicon.svg          # High-res vector favicon
└── README.md                   # Documentation & Tracking Configuration Guide
```

---

## 🎯 Conversion Tracking & Performance Marketing

The landing page includes an integrated analytics engine (`js/analytics.js`) with pre-wired conversion tracking.

### Supported Tracking Platforms:
1. **Meta Pixel (Facebook/Instagram Ads)**: Dispatches `fbq('trackCustom', eventName, params)`
2. **Google Analytics 4 & Google Ads**: Dispatches `gtag('event', eventName, params)`
3. **TikTok Pixel**: Dispatches `ttq.track(eventName, params)`
4. **Native Custom Events**: Dispatches `window.dispatchEvent(new CustomEvent('humai_conversion', ...))`

### Pre-Configured Conversion Events:
| Event Name | Trigger Condition |
|---|---|
| `view_hero` | Automatically dispatched when Hero enters viewport (35% threshold). |
| `click_start_trial` | Dispatched on any "Start Free Trial" CTA click (records location: nav, hero, pricing, etc.). |
| `click_demo` | Dispatched when clicking "See How HumAi Works". |
| `click_whatsapp` | Dispatched on direct WhatsApp chat initiations. |
| `view_ai_section` | Dispatched when visitor scrolls to the WhatsApp AI assistant section. |
| `view_pricing` | Dispatched when visitor views the pricing table. |
| `select_monthly` | Dispatched when toggling the monthly plan (600 EGP/mo). |
| `select_annual` | Dispatched when toggling the annual plan (4,000 EGP/yr). |
| `faq_open` | Dispatched when expanding an FAQ item (records question text). |
| `ai_simulator_action_confirmed` | Dispatched when visitor interacts with the bonus confirmation button in the simulator. |

### Adding Your Pixel IDs:
In `index.html` and `en/index.html`, simply paste your standard pixel snippets into the `<head>` tag:
```html
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){...}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXXX');
</script>
```

---

## 📱 Updating WhatsApp Links & Phone Number

To change the target WhatsApp phone number, search for `201099887766` across `index.html` and `en/index.html` and replace it with your official support or sales WhatsApp number:
```html
https://wa.me/YOUR_PHONE_NUMBER?text=Your%20Custom%20Message
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using any local HTTP server:

```bash
# Using Python (built-in):
python -m http.server 8080

# Or using Node.js npx:
npx serve .
```
Then visit `http://localhost:8080`.

---

## ☁️ Deployment

Since this project consists of pure static HTML, CSS, JS, and SVG assets:
- **Cloudflare Pages**: Point your build output to `/Landing page` with build command left empty.
- **Vercel / Netlify**: Drag and drop the `Landing page` folder or link the repository and set root directory to `Landing page`.
- **cPanel / Apache / Nginx**: Upload the contents directly into `public_html/`.

---

© 2026 HumAi Platform. All Rights Reserved.
