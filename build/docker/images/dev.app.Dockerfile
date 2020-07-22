FROM python:3.8

# SET WORK DIRECTORY
WORKDIR /app

# COPY THE DEPENDENCIES TO THE WORK DIRECTORY
COPY ./build/requirements.txt ./

# INSTALL DEPENDENCIES
RUN pip install --no-cache-dir -r requirements.txt

# COPY APP TO THE WORK DIRECTORY
COPY app . 

# EXPOSE PORT 8000
EXPOSE 8000

# RUN THE SERVER
CMD ["python", "wsgi.py"]
