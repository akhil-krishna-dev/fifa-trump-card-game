FROM python:3.11-slim

WORKDIR /app

ENV PYTHONBUFFERED=1

COPY ./requirements.txt .

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]