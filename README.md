# ✈️ AI Trip Planner

An AI-powered travel planning web application that helps users generate personalized trip itineraries based on their travel preferences and destination ideas.

## 🌐 Live Demo

* **Frontend:** https://trip-planner-client-one.vercel.app
* **Backend API:** https://trip-planner-api-ybls.onrender.com

## 📌 About the Project

Planning a trip often involves searching through multiple websites, blogs, and guides. This project simplifies that process by generating structured travel itineraries from a simple text prompt.

Users can enter details such as:

* Destination
* Duration of the trip
* Travel style (solo, family, adventure, relaxation, etc.)
* Preferences and interests

The application then creates a day-wise itinerary with activities, food suggestions, accommodation recommendations, and travel plans.

To ensure a smooth user experience, the application also includes a fallback itinerary system in case the AI service is temporarily unavailable.

---

## ✨ Features

* 🤖 AI-generated travel itineraries
* 📅 Day-wise trip planning
* 🏨 Activity, food, hotel, and transport suggestions
* 🛡️ Fallback itinerary generation if AI service fails
* ⚡ Fast and responsive user interface
* 🌍 Personalized trip recommendations
* 🔗 Fully deployed frontend and backend

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* TypeScript
* Zod Validation
* OpenRouter API Integration

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```bash
Trip_Planner/
│
├── client/          # React frontend
├── server/          # Express backend
├── README.md
└── package.json
```

---

## ⚙️ Environment Variables

### Frontend (`client/.env`)

```env
VITE_API_URL=https://trip-planner-api-ybls.onrender.com
```

### Backend (`server/.env`)

```env
PORT=4000
CLIENT_ORIGIN=https://trip-planner-client-one.vercel.app
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=google/gemini-2.0-flash-001
```

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Uditi-Mani/Trip_Planner.git
cd Trip_Planner
```

### 2. Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

### 3. Start the backend server

```bash
npm run dev
```

### 4. Start the frontend

```bash
cd ../client
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

Backend will run on:

```text
http://localhost:4000
```

---

## 📷 Future Improvements

* User authentication
* Save and manage previous trips
* Budget estimation
* Interactive maps integration
* Weather recommendations
* PDF itinerary export
* Hotel and flight APIs integration

---

## 👩‍💻 Author

**Uditi Mani**

GitHub: https://github.com/Uditi-Mani

---

### If you like this project, feel free to star the repository ⭐
