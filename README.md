# Cristjhon O. Rodriguez — E-Portfolio

A dark, code-editor-inspired portfolio built with plain HTML5, CSS3, and vanilla JavaScript (ES6). No build step, no dependencies to install — just open `index.html`, or serve the folder with any static server.

## Folder structure

```
/portfolio
│
├── index.html            → all page content and structure
├── css/
│   ├── style.css          → design tokens, layout, components, animations
│   └── responsive.css     → breakpoints (1024 / 768 / 480px)
├── js/
│   └── script.js          → nav, typing effect, filters, modal, form, particles, theme
├── images/                → profile photo + project screenshots
├── certificates/          → certificate images shown in the Certificates grid
├── resume/                → your downloadable resume PDF
└── assets/                → anything else (favicon, extra icons, etc.)
```

## Where to put your real content

| What | Where | Notes |
|---|---|---|
| Profile photo | `images/profile.jpg` | Square image, ~800×800px recommended. Until it's added, a placeholder shows automatically. |
| Project screenshots | `images/project-*.jpg` | 1200×750px (16:10) works best with the card crop. |
| Certificate images | `certificates/cert-*.jpg` | 4:3 works best. Clicking "View Certificate" opens a larger preview automatically — no extra wiring needed. |
| Resume PDF | `resume/Cristjhon_Rodriguez_Resume.pdf` | Both "Download Resume" buttons already point here. |
| Favicon | `assets/favicon.ico` | Add a `<link rel="icon" href="assets/favicon.ico">` in the `<head>` once you have one. |

All images use `onerror` fallbacks to a labeled placeholder graphic, so the site never breaks or shows a broken-image icon while you're still gathering real assets — just replace the file at the same path and the placeholder disappears.

## Things to personalize before publishing

1. **Text content** — name, bio, university, email, phone, and all project/certificate copy in `index.html` are placeholders drawn from your brief. Search for `Your University Name`, `Company Name`, and similar bracket-free placeholders and swap them.
2. **Links** — GitHub/LinkedIn/Facebook URLs, project demo links, and project repo links are currently `#` or generic profile URLs. Update every `href="#"` and `href="https://github.com/"` etc.
3. **Contact form** — `js/script.js` (section 13) currently only validates and shows a success toast; it does not send email anywhere. Wire it to a form backend (e.g. Formspree, EmailJS, or your own server endpoint) by replacing the comment marked `NOTE` with a `fetch()` call.
4. **Google Map** — the embedded map in the Contact section uses a generic Philippines bounding box. Replace the `src` on the `<iframe>` with your actual area, or delete the `.map-embed` block if you'd rather not show a map.

## Features included

- Sticky nav with active-section highlighting (scroll-spy) and smooth scrolling
- Animated typing text cycling through roles
- Scroll progress bar, back-to-top button, cursor glow (desktop only)
- Lightweight canvas particle background in the hero (disabled automatically if the visitor has "reduce motion" turned on)
- Scroll-reveal animations, animated counters, animated skill bars
- Project and certificate filtering, certificate preview modal
- Accessible, validated contact form with inline errors and a toast notification
- Light/dark theme toggle (persisted via `localStorage`)
- Fully responsive down to small mobile, semantic HTML, ARIA labels, visible focus states, `alt` text throughout, lazy-loaded images

## Suggested next steps

- Swap the terminal "about-me.js" snippet content for a short bio if you'd rather not lean on the code-editor motif everywhere.
- Add real GitHub repo READMEs/case studies and link the "Live Demo" buttons to actual deployed projects (Netlify/Vercel/GitHub Pages are all free for static sites).
- Compress final images (TinyPNG or `squoosh.app`) before publishing — the CSS already lazy-loads everything below the fold.
- Consider adding a small blog or "notes" section later if you want to demonstrate writing/communication skills alongside code.
- Run a Lighthouse audit once real images are in place to confirm performance/accessibility scores.
