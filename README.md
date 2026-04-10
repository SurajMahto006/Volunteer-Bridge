# 🤝 VolunteerBridge
**Connecting Community Needs with Neighbor Skills**

> **Technical Submission: Google Solution Challenge 2026** — An intelligent community coordination platform powered by real-time data and generative AI.

---

## 📌 Project Overview
**Problem Statement:** Non-Profit Organizations (NGOs) often face critical delays in identifying specialized skills during urgent needs, while community members lack a streamlined channel to offer their expertise.
**Solution:** VolunteerBridge provides a centralized "Smart Community" infrastructure that synchronizes NGO requirements with volunteer capabilities using real-time synchronization and advanced AI matching.

---

## ⚖️ Project Evaluation Overview
| Component | Implementation Details |
| :--- | :--- |
| **Google Cloud Tech** | **Firebase Firestore** (Real-time Database) & GCP Cloud Infrastructure |
| **Artificial Intelligence** | **Google Gemini 2.0 Flash** (Intelligent Match Ranking) |
| **Data Visualization** | **Chart.js** (Impact Analytics & Urgency Trends) |
| **SDG Alignment** | **Goal 11** (Sustainable Cities) & **Goal 17** (Partnerships for the Goals) |

---

## 🛠️ Operational Workflow (The Bridge Model)
1.  **Requirement Reporting (NGO):** Mission-critical needs are logged via the **Helping Hub**.
2.  **Data Analysis (System):** Records are persisted in **Firestore** and analyzed via the **Community Map** dashboard.
3.  **Intelligent Matching (AI):** The **Smart Match** engine utilizes Gemini AI to rank and recommend the most qualified volunteers.

---

## 📂 Project Structure
- 🏠 `index.html` → **Landing Portal**: Project mission and real-time community statistics.
- 🏢 `ngo.html` → **Helping Hub**: Administrative interface for mission reporting.
- 👥 `volunteer.html` → **Partner Portal**: Skill-based registration for community members.
- 📊 `dashboard.html` → **Community Map**: Real-time analytical dashboard using Chart.js.
- 🧠 `match.html` → **Smart Match**: Gemini AI integration for strategic resource allocation.

---

## ⚙️ Deployment & Setup

### 1. Database Integration (Firebase)
1.  Configure a Firestore instance in the [Firebase Console](https://console.firebase.google.com).
2.  Update the `firebaseConfig` object across the application files with your project credentials.

### 2. AI Intelligence (Gemini API)
1.  Obtain an API Key from the [Google AI Studio](https://aistudio.google.com/).
2.  Insert the key into the `GEMINI_KEY` constant within the script section of `match.html`.

### 3. Local Execution
1.  Launch the application using a local development server (e.g., VS Code Live Server).
2.  Access the interface at `http://127.0.0.1:5500`.

---

## 🌟 Technical Stack
- **Database:** Google Firebase Firestore
- **Intelligence:** Google Gemini 2.0 Flash API
- **Frontend Architecture:** Semantic HTML5, CSS3, JavaScript (ES6+)
- **Data Visualization:** Chart.js
- **Iconography:** Lucide-icons

---
**Connecting hearts, crossing bridges. Collaborative Community Building.**



