# ⚡ CloudVerse: Next-Gen Cloud Orchestration

CloudVerse is a high-performance, Vercel-inspired cloud management platform designed for modern engineering teams. It provides real-time deployment monitoring, global edge network visualization, and robust infrastructure orchestration.

![CloudVerse Preview](https://raw.githubusercontent.com/parii/CloudVerse/main/preview.png)

## 🚀 Features

- **Real-time Deployments**: Monitor build sequences and logs in real-time.
- **Vercel-Grade UI**: Minimalist, dark-mode first design with smooth micro-animations.
- **Multi-Stage Docker Builds**: Optimized production images for backend (Node.js/SQLite) and frontend (Vite/Nginx).
- **Edge Network Monitoring**: Built-in global latency and regional status tracking.
- **Automated CI/CD**: Seamless deployment to AWS EC2 via GitHub Actions.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Vite.
- **Backend**: Node.js, Express, SQLite3 (Native), Winston (Logging).
- **Infrastructure**: Docker, Docker Compose, Nginx (Reverse Proxy).
- **CI/CD**: GitHub Actions, Docker Hub.

## 📦 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/CloudVerse.git
   cd CloudVerse
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   The app will be available at `http://localhost`.

## 🌐 Production Deployment (AWS EC2)

1. **Prepare your EC2**:
   - Launch an Ubuntu instance.
   - Run the setup script:
     ```bash
     curl -sSL https://raw.githubusercontent.com/your-username/CloudVerse/main/scripts/setup-ec2.sh | bash
     ```

2. **Configure GitHub Secrets**:
   Add the following to your GitHub repo settings:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username.
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token.
   - `EC2_HOST`: Public IP of your EC2 instance.
   - `EC2_USER`: `ubuntu`
   - `EC2_SSH_KEY`: Your private SSH key content (`.pem`).

3. **Deploy**:
   Push any change to the `main` branch, and GitHub Actions will automatically:
   - Build & push Docker images to Docker Hub.
   - SSH into EC2 and update the containers.

## 🛡️ Security

CloudVerse is built with production security in mind:
- **Helmet.js**: Secure HTTP headers.
- **Rate Limiting**: Protects sensitive deployment endpoints.
- **Graceful Shutdown**: Prevents database corruption during updates.
- **Nginx Reverse Proxy**: Isolates backend services from direct public exposure.

## 📄 License

MIT License - Copyright (c) 2024 CloudVerse Team.
