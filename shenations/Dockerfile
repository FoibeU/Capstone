FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*


# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

<<<<<<< HEAD
=======
# Copy wait script and app
#COPY wait-for-db.sh /wait-for-db.sh
# RUN chmod +x /wait-for-db.sh
>>>>>>> 355072aa099d743129ad43e31b9e7ea4ed68e942

COPY . .

# Ensure static directory exists
RUN mkdir -p /app/static

EXPOSE 8082

<<<<<<< HEAD

CMD ["gunicorn", "--bind", "0.0.0.0:8082", "shenations.wsgi:application"]
=======
# Use wait-for-db before launching Gunicorn
#ENTRYPOINT ["/wait-for-db.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:8082", "shenations.wsgi:application"]
>>>>>>> 355072aa099d743129ad43e31b9e7ea4ed68e942
