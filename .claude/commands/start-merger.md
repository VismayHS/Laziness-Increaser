---
description: Start (or confirm) the Doc/PPT/PDF Converter & Merger frontend and backend
---

Start the Doc/PPT/PDF Converter & Merger app and confirm both sides are active. Project root: `C:\Users\LENOVO\Downloads\Ppt_to_pdf_converter_and_merger`.

This app runs as two separate servers:
- **Backend** (`server.js`, the `/process` convert+merge API) → port `10002`
- **Frontend** (Vite dev server) → port `10001`, proxies `/process` to the backend

Do this:

1. Check current status:
   - Backend: `curl -s -o /dev/null -w "%{http_code}" http://localhost:10002/`
   - Frontend: `curl -s -o /dev/null -w "%{http_code}" http://localhost:10001/`
2. For whichever isn't already responding `200`, start it in the background (`run_in_background: true`) from the project root:
   - Backend: `PORT=10002 node server.js` (set env var appropriately for the shell in use)
   - Frontend: `npm --prefix frontend run dev -- --port 10001`
3. Poll each background task's output for its ready line (`Server running at` for backend, `Local:` for Vite) or an error, then re-curl both URLs to confirm.
4. Report clearly and concisely:
   - **ACTIVE** — Frontend: http://localhost:10001
   - **ACTIVE** — Backend: http://localhost:10002
   - If either failed, show the actual error from its task output — don't guess.

Keep the report short: two status lines + URLs. No need to re-explain the architecture unless something went wrong.
