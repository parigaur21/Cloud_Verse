# 🔐 AWS & GitHub CI/CD Deployment Guide

This guide covers the final steps to connect your local CloudVerse repository to a live AWS EC2 instance using GitHub Actions.

## Step 1: Generate SSH Keys (On your Local Machine)

To allow GitHub to securely log into your EC2 instance, you need an SSH key pair.

1.  **Open your terminal** and run:
    ```bash
    ssh-keygen -t ed25519 -C "cloudverse-deploy" -f ./cloudverse-key
    ```
    *This generates two files: `cloudverse-key` (Private Key) and `cloudverse-key.pub` (Public Key).*

2.  **Keep the Private Key secure**. You will need its content for GitHub.

---

## Step 2: Prepare the EC2 Instance

1.  **Launch an EC2 Instance**: Use Ubuntu 22.04 LTS (t2.micro is sufficient).
2.  **SSH into your EC2**:
    ```bash
    ssh -i your-existing-aws-key.pem ubuntu@your-ec2-ip
    ```
3.  **Authorize the New Key**:
    Open `~/.ssh/authorized_keys` on EC2 and paste the content of your **`cloudverse-key.pub`** (Public Key) at the end of the file.
4.  **Run the Setup Script**:
    ```bash
    curl -sSL https://raw.githubusercontent.com/your-username/CloudVerse/main/scripts/setup-ec2.sh | bash
    ```

---

## Step 3: Configure GitHub Secrets

Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions** and add these secrets:

| Secret Name | Value |
| :--- | :--- |
| `DOCKERHUB_USERNAME` | Your Docker Hub username. |
| `DOCKERHUB_TOKEN` | Your Docker Hub Access Token (generated in Docker Hub Settings). |
| `EC2_HOST` | The Public IP address of your EC2 instance. |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Copy-paste the entire content of your **`cloudverse-key`** (Private Key). |

---

## Step 4: Final Deployment

1.  Commit and push your changes to the `main` branch.
2.  Go to the **Actions** tab in your GitHub repository.
3.  Watch the `build-and-push-to-dockerhub` workflow run.
4.  Once finished, visit `http://your-ec2-ip` to see your live CloudVerse instance!

---

## 🔒 Security Best Practices

- **Security Groups**: Ensure your AWS Security Group allows inbound traffic on:
  - `80` (HTTP)
  - `22` (SSH - restrict this to your IP if possible)
- **Database Backups**: Since we use SQLite, your data is stored in `backend/data/cloudverse.db`. Consider backing this file up periodically.
- **SSL**: For real production, use Certbot to enable HTTPS on port 443.
