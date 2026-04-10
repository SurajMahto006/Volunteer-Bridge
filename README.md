# 🤝 VolunteerBridge
**Connecting Local Hearts to Local Needs**

> **Built for the Google Solution Challenge 2026** — Transforming community coordination into a smart, AI-driven experience.

---

## 📌 The Quick Pitch
**The Problem:** Local NGOs struggle to find specific skills quickly during urgent needs, while neighbors want to help but don't know where to start.  
**The Solution:** A unified "Smart Community" platform that maps NGO requirements to volunteer skills using real-time data and AI matching.

---

## ⚖️ Judges' Cheat Sheet
| Criteria | My Implementation |
| :--- | :--- |
| **Google Tech** | **Firebase Firestore** (Real-time DB) & GCP Infrastructure |
| **Technical Merit** | **AI Matching Engine** (Anthropic Claude API) + **Chart.js** Analytics |
| **Innovation** | Predicting community needs based on real-time urgency trends |
| **UN SDGs** | Addressing **Goal 11** (Sustainable Cities) & **Goal 17** (Partnerships) |

---

## 🛠️ How it Works (The Bridge Workflow)
1.  **Report (NGO):** NGOs post missions in the **Helping Hub**.
2.  **Analyze (System):** Data is stored in **Firestore** and visualized on the **Community Map**.
3.  **Bridge (AI):** The **Smart Match** engine ranks the best volunteers for the specific job.

---

## 📂 Project Structure (Simple Guide)
- 🏠 `index.html` → **The Welcome Mat**: Live stats and project vision.
- 🏢 `ngo.html` → **Helping Hub**: Where needs are reported.
- 👥 `volunteer.html` → **Bridge Builders**: Where neighbors join the movement.
- 📊 `dashboard.html` → **Community Map**: Real-time impact & urgency charts.
- 🧠 `match.html` → **Smart Match**: Advanced AI volunteer ranking.

---

## ⚙️ 2-Minute Setup

### 1. Database (Google Firebase)
1.  Create a Firestore DB in "Test Mode" via the [Firebase Console](https://console.firebase.google.com).
2.  Replace the `firebaseConfig` block in all 5 HTML files with your project keys.

### 2. AI Intelligence
1.  Add your Anthropic API Key to the `headers` section in `match.html`.

### 3. Run It
1.  Open `index.html` with VS Code **Live Server** to see it in action.

---

## 🌟 Tech Stack
- **Database:** Firebase Firestore (Google)
- **AI:** Claude-3 (Anthropic API)
- **Frontend:** HTML5, CSS3, JS (Vanilla)
- **Visualization:** Chart.js
- **Icons:** Lucide-icons

---
**Connecting hearts, crossing bridges. Together.**


