FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Optional: expose port (helpful for local Docker runs)
EXPOSE 8080

# Run the app using gunicorn with the factory pattern
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers=4", "app:create_app"]
