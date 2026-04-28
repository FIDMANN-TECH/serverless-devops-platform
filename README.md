# 🚀 Serverless DevOps Platform

A production-grade **serverless full-stack application** deployed on AWS, demonstrating modern DevOps practices including secure infrastructure, CI/CD automation, and global content delivery.

🔗 **Live Demo:** https://fidmann-digitalboost.com

---

## 📌 Project Summary

This project showcases how to design, build, and deploy a **scalable and secure cloud-native application** using AWS services.

It includes:

* A React frontend served via a global CDN
* A serverless backend powered by AWS Lambda
* Secure API communication via API Gateway
* Automated deployment using GitHub Actions (CI/CD)

---

## 🏗️ Architecture Overview

```text
User → CloudFront → S3 (Private)
             ↓
        API Gateway → Lambda
```

### Key Design Decisions:

* **CloudFront CDN** for low-latency global delivery
* **Private S3 bucket** secured via Origin Access Control (OAC)
* **Serverless backend** to eliminate infrastructure management
* **Custom domain + HTTPS** using Route 53 and ACM

---

## ⚙️ Technology Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* CSS

### Backend

* AWS Lambda (Node.js)
* Amazon API Gateway (REST)

### Cloud & DevOps

* Amazon S3 (static hosting)
* Amazon CloudFront (CDN)
* AWS Route 53 (DNS management)
* AWS Certificate Manager (SSL/TLS)
* GitHub Actions (CI/CD automation)
* IAM (least-privilege access control)

---

## 🔐 Security Implementation

* Private S3 bucket (no public access)
* CloudFront Origin Access Control (OAC)
* HTTPS enforced using ACM certificates
* Least-privilege IAM policy for CI/CD
* Secure environment variable handling
* CORS properly configured for API access

---

## 🚀 CI/CD Pipeline (GitHub Actions)

Automated deployment pipeline triggered on every push to `main`.

### Workflow:

```text
Push → GitHub Actions → Build → Deploy to S3 → CloudFront Invalidation
```

### Key Features:

* Automated React build (`npm run build`)
* S3 sync deployment (`aws s3 sync`)
* CloudFront cache invalidation
* Secure credentials via GitHub Secrets

---

## 🌐 Domain & Networking

* Domain purchased via Namecheap
* DNS delegated to AWS Route 53
* A records (Alias) mapped to CloudFront
* HTTPS enabled with ACM (us-east-1)

---

## 🧪 Testing & Validation

* Verified DNS propagation using `dig` and `nslookup`
* Confirmed backend connectivity via frontend API calls
* Validated CloudFront caching and invalidation
* Ensured zero public access to S3 bucket

---

## 📂 Project Structure

```text
serverless-devops-platform/
│
├── frontend/              # React application
│   ├── src/
│   ├── public/
│   └── dist/              # Build output
│
├── backend/              # Lambda functions
│   └── lambda/
│
├── .github/workflows/    # CI/CD pipeline
│   └── deploy.yml
│
├── screenshots/          # Project proof
│
├── README.md
└── .gitignore
```

---

## 📸 Key Screenshots

* Live application (custom domain)
* CloudFront distribution
* S3 bucket (private configuration)
* Route 53 hosted zone
* API Gateway endpoints
* Lambda functions
* CI/CD pipeline execution

---

## 🧠 Key Learnings

* Implementing secure S3 + CloudFront integration using OAC
* Managing DNS delegation (Namecheap → Route 53)
* Debugging real-world issues (CORS, AccessDenied, DNS propagation)
* Designing scalable serverless architectures
* Building automated CI/CD pipelines with GitHub Actions

---

## 🔄 Future Enhancements

* Multi-environment deployment (dev/staging/prod)
* IAM role-based authentication (OIDC) for CI/CD
* CloudFront logging and monitoring
* Performance optimization via cache-control headers
* JWT-based authentication system

---

## 👨‍💻 Author

**Fidelis Erubami**
DevOps Engineer

---

## ⭐ Project Value

This project demonstrates **real-world DevOps capabilities**, including:

* End-to-end cloud deployment
* Infrastructure security best practices
* Automated delivery pipelines
* Production-ready architecture

---
## Below are screenshots of workflow:

> This is not a tutorial project — it reflects hands-on experience building and troubleshooting a real cloud system.
