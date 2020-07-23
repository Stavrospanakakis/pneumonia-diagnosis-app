# Get docker
curl -fsSL https://get.docker.com -o get-docker.sh

# Install docker
chmod +x get-docker.sh
sudo sh get-docker.sh

# Create project file
mkdir pneumonia-diagnosis-app
cd pneumonia-diagnosis-app

# Get docker compose files
wget https://raw.githubusercontent.com/Stavrospanakakis/pneumonia-diagnosis-app/master/build/docker/docker-compose.prod.yml
wget https://raw.githubusercontent.com/Stavrospanakakis/pneumonia-diagnosis-app/master/build/docker/docker-compose.yml
