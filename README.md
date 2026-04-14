# PPT/PDF Converter and Merger

Basic local website that does exactly this:

1. Accept multiple `.ppt`, `.pptx`, and `.pdf` files
2. Convert `.ppt` / `.pptx` to PDF
3. Merge all PDFs in the same order they were uploaded
4. Download one merged PDF

## Requirements

- Node.js 18+
- LibreOffice installed
  - Windows: make sure `soffice.exe` is in PATH
  - Default install path usually works automatically:
    - `C:\Program Files\LibreOffice\program\soffice.exe`

## Run

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Usage

1. Choose files directly OR choose a folder.
2. Reorder files in the list (drag and drop or use arrow buttons).
3. Click **Convert and Merge**.
4. Merged PDF downloads automatically.

## React Frontend (Enhanced)

An enhanced React + Tailwind UI is available in `frontend/` with drag-and-drop upload,
sortable file cards, progress UI, toasts, and dark mode.

Run everything on port 3000 with one command:

```bash
# From project root
npm.cmd start
```

Open `http://localhost:3000`.

## Hosting Note (Vercel)

This project uses a Node backend route (`/process`) and LibreOffice (`soffice`) to convert `.ppt/.pptx` to PDF.

- End users do **not** need LibreOffice installed.
- The **server host** running the backend must have LibreOffice installed and accessible in PATH.

### Important for Vercel

On standard Vercel serverless deployments, LibreOffice is typically not available, so PPT/PPTX conversion will fail.

If you still want to use Vercel:

1. Host only the frontend on Vercel, and run backend conversion on another host (VM/container) with LibreOffice.
2. Or limit uploads to PDF-only merge when running fully on Vercel.

## Proper Deployment (Recommended)

Use this architecture:

1. Frontend on Vercel (from `frontend/`)
2. Backend on a host that supports LibreOffice (Render/Railway/VM/Docker)

### 1) Deploy Backend with Docker (LibreOffice included)

This repo now includes:

1. `Dockerfile`
2. `.dockerignore`

You can test locally:

```bash
docker build -t ppt-pdf-merge-app .
docker run --rm -p 3000:3000 ppt-pdf-merge-app
```

Then open `http://localhost:3000`.

When deploying this Docker image to Render/Railway/VM:

1. Expose port `3000`
2. Start command is already in Docker (`node server.js`)

### 2) Deploy Frontend on Vercel

In Vercel:

1. Import this repo
2. Set **Root Directory** to `frontend`
3. Keep the default Vite build settings

This repo includes `frontend/vercel.json` with a rewrite for `/process`.
Before deploy, replace this value:

`https://REPLACE_WITH_YOUR_BACKEND_DOMAIN/process`

with your real backend URL, for example:

`https://ppt-backend.onrender.com/process`

### 3) Final Check

1. Open your Vercel site
2. Upload `.ppt/.pptx/.pdf`
3. Click **Convert + Merge**
4. If conversion fails, verify backend host has LibreOffice available as `soffice`
