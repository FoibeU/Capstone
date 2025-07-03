web:
  build: .
  command: ["./wait-for-it.sh", "db:5432", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
  volumes:
    - .:/app
  ports:
    - "8000:8000"
  depends_on:
    - db
  env_file:
    - .env
  networks:
    - app-network
