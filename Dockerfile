FROM node:20-bookworm-slim

WORKDIR /app

# Install LibreOffice for PPT/PPTX to PDF conversion
RUN apt-get update \
    && apt-get install -y --no-install-recommends libreoffice \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY frontend/package*.json ./frontend/
RUN npm --prefix frontend ci

COPY . .
RUN npm --prefix frontend run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]