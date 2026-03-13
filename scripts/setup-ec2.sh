#!/bin/bash

# CloudVerse EC2 Setup Script
# This script installs Docker and Docker Compose on Ubuntu EC2 instances.

echo "🚀 Starting CloudVerse Environment Setup..."

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
echo "📦 Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce

# Allow user to run docker without sudo
sudo usermod -aG docker ${USER}

# Install Docker Compose
echo "🛠️ Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Print versions
docker --version
docker-compose --version

echo "✅ Setup complete! Please log out and back in for Docker group changes to take effect."
echo "➡️ Then, clone your repo and run: docker-compose up -d"
