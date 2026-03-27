# VolunteerBridge — Setup Guide

## Your 5 files
- index.html       → Landing page
- ngo.html         → NGO data entry form
- volunteer.html   → Volunteer registration
- dashboard.html   → Needs dashboard + charts
- match.html       → AI volunteer matching

---

## Step 1 — Set up Firebase (free database)

1. Go to https://console.firebase.google.com
2. Click "Add project" → name it "volunteer-bridge" → click through
3. Click the </> (web) icon → name it "webapp" → click Register
4. Copy the firebaseConfig object shown on screen

It looks like this:
  const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456",
    appId: "1:123456:web:abcdef"
  };

5. Paste this config into ALL 5 html files
   (search for "YOUR_API_KEY" in each file and replace the whole config block)

6. In Firebase console → Firestore Database → Create database
   → Start in TEST MODE → Choose a region → Done

---

## Step 2 — Get your Anthropic API key (for AI matching)

1. Go to https://console.anthropic.com
2. Sign up for a free account
3. Go to API Keys → Create Key → Copy it
4. In match.html, find this line in the fetch() call:
      headers: { "Content-Type": "application/json" },
   And ADD your API key:
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_ANTHROPIC_KEY_HERE",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },

Note: For the hackathon demo, direct browser access is fine.
      In production, you'd use a backend server to protect your key.

---

## Step 3 — Run locally with VS Code

1. Open VS Code → File → Open Folder → select volunteer-bridge folder
2. Install the "Live Server" extension (search in Extensions panel)
3. Right-click index.html → "Open with Live Server"
4. Your app opens at http://127.0.0.1:5500

---

## What each page does (for your demo video / pitch)

| Page            | What to show judges                                      |
|-----------------|----------------------------------------------------------|
| index.html      | Clean landing, live stats pulled from Firebase           |
| ngo.html        | Submit a need → it appears in the table instantly        |
| volunteer.html  | Register with skill tags → appears in table instantly    |
| dashboard.html  | Bar chart + doughnut + filter by urgency/category        |
| match.html      | Click a need → AI returns ranked volunteers with reasons |

---

## Collections in Firestore

needs (written by ngo.html, read by dashboard.html + match.html)
  - title, category, location, affected, ngoName, description, urgency, createdAt

volunteers (written by volunteer.html, read by match.html)
  - name, phone, location, experience, skills[], availability[], about, createdAt

---

## Judging criteria checklist

Technical Merit (40%)   ✓ Firebase real-time DB, Chart.js, Anthropic AI API
Innovation (25%)        ✓ AI-powered matching with skill/location analysis
Cause Alignment (25%)   ✓ Directly solves the NGO volunteer coordination problem
UX (10%)                ✓ Clean UI, skill tags, urgency pills, responsive design
