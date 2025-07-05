# ---------- Dockerfile ----------
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Python deps
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Project
COPY . .

# Static dir for collectstatic
RUN mkdir -p /app/static

EXPOSE 8082 
  # doc-only—for local docker run -p 8082:8082

# Gunicorn binds to $PORT on Render, falls back to 8082 locally
CMD ["sh", "-c", "gunicorn shenations.wsgi:application --bind 0.0.0.0:${PORT:-8082}"]
