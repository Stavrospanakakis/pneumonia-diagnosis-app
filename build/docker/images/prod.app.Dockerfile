FROM python:3.8

# SET THE WORK DIRECTORY
WORKDIR /app

# COPY THE REQUIREMENTS TO THE WORK DIRECTORY
COPY ./build/requirements.txt ./

# INSTALL REQUIREMENTS
RUN pip install --no-cache-dir -r requirements.txt

# COPY APP TO THE WORK DIRECTORY
COPY app . 

# EXPOSE PORT 8000
EXPOSE 8000

# RUN THE SERVER
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "wsgi:app"]
