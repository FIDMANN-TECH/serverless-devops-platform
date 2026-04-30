# 🚀 Serverless DevOps Platform

A **production-grade, full-stack serverless application** deployed on AWS, demonstrating real-world DevOps practices including **Infrastructure as Code, CI/CD automation, secure cloud architecture, and incident recovery**.

🔗 **Live Demo:** https://fidmann-digitalboost.com

---

## 📌 Project Overview

This project showcases the design and deployment of a **scalable, secure, and globally distributed cloud-native system**.

It combines:

* A **React frontend** delivered via CDN
* A **serverless backend** powered by AWS Lambda
* Fully automated infrastructure and deployment workflows

---

## 🏗️ Architecture Overview

```text
User → CloudFront → S3 (Private, OAC)
             ↓
        API Gateway → Lambda → DynamoDB
```

---

## ⚙️ Technology Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)

### Backend

* AWS Lambda (Node.js)
* Amazon API Gateway (HTTP API)

### Cloud & DevOps

* Amazon S3 (private static hosting)
* Amazon CloudFront (CDN)
* Amazon DynamoDB (NoSQL database)
* AWS Route 53 (DNS)
* AWS Certificate Manager (SSL/TLS)
* Terraform (Infrastructure as Code)
* GitHub Actions (CI/CD)

---

## 🔐 Security & Best Practices

* Private S3 bucket (no public access)
* CloudFront Origin Access Control (OAC)
* HTTPS enforced via ACM
* Least-privilege IAM roles
* Secure API communication with CORS configuration
* Environment variables managed securely

---

## 🚀 CI/CD Pipeline

Automated deployment pipeline triggered on every push to `main`.

```text
Push → GitHub Actions → Build → Deploy → Invalidate Cache
```

### Key Capabilities:

* Automated React build (`npm run build`)
* Deployment via `aws s3 sync`
* CloudFront cache invalidation
* Secure credentials using GitHub Secrets

---

## 🧠 Real-World Incident & Recovery (Key Highlight)

During development, the **API Gateway was accidentally deleted**, causing complete backend failure.

### Impact:

* Frontend displayed **“Failed to fetch”**
* Backend became unreachable

### Resolution:

* Recreated infrastructure using **Terraform**
* Identified and fixed missing **CORS configuration**
* Restored full system functionality without manual rebuild

💡 **Key Insight:**
This reinforced the importance of **Infrastructure as Code (IaC)** for reproducibility, disaster recovery, and production reliability.

---

## 🔄 DevOps Highlights

* Infrastructure fully defined using **Terraform**
* Stateless backend using Lambda
* Automated deployment pipeline with GitHub Actions
* Debugging of real production-like failures (CORS, API Gateway deletion)
* DNS and domain integration (Namecheap → Route 53)
* Global content delivery via CloudFront

---

## 🌐 Domain & Networking

* Custom domain via Namecheap
* DNS managed in Route 53
* CloudFront distribution with HTTPS
* ACM certificate (us-east-1)

---

## 🧪 Testing & Validation

* DNS propagation verified using `dig` and `nslookup`
* API endpoints tested via frontend and Postman
* CloudFront caching behavior validated
* S3 access restrictions confirmed

---

## 📂 Project Structure

```text
serverless-devops-platform/
│
├── infrastructure/        # Terraform IaC
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── frontend/              # React app
│   ├── src/
│   └── dist/
│
├── backend/               # Lambda functions
│
├── .github/workflows/     # CI/CD pipeline
│   └── deploy.yml
│
├── screenshots/
└── README.md
```

---

## 📸 Key Screenshots

* Live application (custom domain)
* CloudFront distribution
* Private S3 bucket configuration
* API Gateway routes
* Lambda functions
* DynamoDB table
* GitHub Actions pipeline execution

---

## 📈 Future Improvements

* Multi-environment setup (dev/staging/prod)
* JWT-based authentication
* Monitoring with CloudWatch dashboards & alarms
* CI/CD with OIDC (no static credentials)
* Infrastructure modularization

---

## 👨‍💻 Author

**Fidelis Erubami**
DevOps Engineer | AWS | Terraform | CI/CD

---

## ⭐ Why This Project Matters

This is not a tutorial project.

It demonstrates:

* Real-world **system design**
* Hands-on **cloud engineering**
* Practical **DevOps problem-solving**
* Ability to **recover from infrastructure failures**

## Below are screenshots of workflow:
![Terraform Initialization](./img/01-terraform-init-success.png)
![Infrastructure Provisioning](./img/02-terraform-infrastructure-deployment.png)
![DynamoDB Schema](./img/03-dynamodb-table-design.png)
![Lambda Overview](./img/04-lambda-function-overview.png)
![Lambda Logic](./img/05-lambda-function-code.png)
![API Gateway Endpoint](./img/06-api-gateway-endpoint.png)
![Lambda Integration Response](./img/07-api-gateway-lambda-response.png)
![CORS Configuration](./img/08-api-gateway-cors-config.png)
![S3 Access Control (Private)](./img/09-s3-private-access-control.png)
![Frontend Deployment](./img/10-s3-frontend-deployment.png)
![CloudFront Distribution](./img/11-cloudfront-distribution.png)
![Live CDN Deployment](./img/12-cloudfront-distribution-live.png)
![Local Dev Environment](./img/13-local-development-environment.png)
![DNS Delegation (Namecheap → Route 53)](./img/14-domain-nameserver-delegation.png)
![Route 53 DNS Configuration](./img/15-route53-dns-records.png)
![DNS Resolution Validation](./img/16-dns-resolution-verification.png)
![Production Domain (Live App)](./img/17-live-application-production-domain.png)
![CI/CD Pipeline Execution](./img/18-github-actions-cicd-success.png)