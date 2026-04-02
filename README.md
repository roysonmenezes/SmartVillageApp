# 🏡 Smart Village Application

<p align="center">
  A digital solution for rural development through transparent donations and smart management
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20Native%20(Expo)-blue" />
  <img src="https://img.shields.io/badge/Backend-Django-green" />
  <img src="https://img.shields.io/badge/Platform-Mobile%20App-orange" />
  <img src="https://img.shields.io/badge/Status-Completed-brightgreen" />
</p>

---

## 📌 Project Overview

The **Smart Village Application** is a mobile-based platform designed to support rural development through digital solutions. It enables users to contribute to various village development funds such as education, infrastructure, and community welfare.

The application ensures **transparency and efficiency** by allowing users to track donations while providing an admin panel to monitor and manage activities. The project integrates modern technologies including mobile development, backend APIs, and blockchain concepts.

---

## 🌟 Key Features

- 👤 User Authentication (Login / Register)
- 💰 Donation System with Multiple Categories
- 🏗️ Village Development Funds (Education, Infrastructure, etc.)
- 🛠️ Admin Dashboard for Monitoring
- 🔐 Secure and Transparent Transactions
- 📱 Mobile-First Application (Expo)

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|------|
| React Native (Expo) | Frontend Mobile App |
| Django | Backend API |
|  PostgreSQL | Database |
| Web3 | Blockchain Integration |
| Git & GitHub | Version Control |

---



## 🚀 How to Run the Project Locally

### 🔽 Step 1: Clone the Repository
use main-3 branch for latest updates
```
git clone https://github.com/roysonmenezes/SmartVillageApp.git
cd SmartVillageApp
```

## 🧠 Step 2: Setup Backend (Django)
```
cd backend
python -m venv venv
```

Activate virtual environment

Windows:
```
venv\Scripts\activate
```

Mac/Linux:
```
source venv/bin/activate
```

Install dependencies
```
pip install -r requirements.txt
```

Run migrations
```
python manage.py migrate
```

Start backend server
```
python manage.py runserver
```
Backend will run at:
http://127.0.0.1:8000/

## 📱 Step 3: Setup Frontend (Expo)

Open a new terminal:
```
cd frontend
npm install
```
Start Expo:
```
npx expo start
```
Scan QR using Expo Go app on your phone  
OR press a to open Android emulator  

---

## 🔗 Important Configuration

Make sure your frontend API URL is set to:
http://127.0.0.1:8000/api/

## Notes
The project is optimized for mobile (Expo Go)
Web version may have limited support
Backend must be running for full functionality

---

## 📝 Technical Articles

I have documented the development and concepts behind this project through technical articles:

- 📖 Read on Dev.to: https://dev.to/royson_menezes_479ed50941

These articles cover:
- Project architecture
- Implementation details
- Challenges and solutions
- Learning outcomes

---
