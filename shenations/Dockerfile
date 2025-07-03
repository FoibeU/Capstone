# Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Make sure static folder exists
RUN mkdir -p /app/static

RUN pip install --no-cache-dir debugpy


# Expose port 8082
EXPOSE 8082

# Start the application using Gunicorn (for production)
CMD ["gunicorn", "--bind", "0.0.0.0:8082", "shenations.wsgi:application"]
