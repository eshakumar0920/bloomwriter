# 🌱 BloomWriter

BloomWriter is a privacy-first journaling app I built for the Palo Alto Networks IT Hackathon.  
It’s designed to help people get past blank-page anxiety, reflect more easily, and see patterns in their daily lives — all while keeping their data on their own device.

---

## Demo Video
👉 [Watch the demo here](https://your-video-link.com)

---

## Features
- **Daily journaling** with mood tracking and optional smart prompts
- **On-device sentiment analysis** that tags entries and detects themes locally
- **Dashboard** with mood averages, sentiment trends, streaks, and common themes
- **Weekly reflection summaries** that highlight patterns and give gentle suggestions
- **Privacy & control**:
  - Local-only mode (default)
  - App passcode to protect insights
  - Export and delete options
  - Future: end-to-end encrypted sync (currently disabled)

For demo purposes there’s also a simple **Developer Mode** that simulates multiple entries so you can see weekly insights right away.

---

## Tech Stack
- Next.js + TypeScript + TailwindCSS
- IndexedDB for local storage
- Lightweight sentiment and keyword analysis running in the browser
- Privacy-first design — no server calls

---

## Why I Built It
A lot of journaling tools either feel too clinical or they don’t take privacy seriously.  
I wanted to show that you can still use AI to make journaling easier (like prompts and pattern-finding) without sending private thoughts to the cloud.  

---

## Notes
- I used **Lovable** to scaffold the app so I could focus on the main ideas: the privacy model, prompts, and dashboard insights.  
- The repo includes comments where I added or customized features.  

---

## Future Enhancements
- Implement true end-to-end encrypted sync across devices
- Swap heuristic sentiment analysis with a lightweight on-device ML model
- Add mobile PWA features (offline mode, push notifications)
- More advanced reflection summaries with trend comparisons over months

---
### Author
Built by Esha Kumar
