import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, getDocs, orderBy, query }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── FIREBASE CONFIG (Copied from dashboard.html) ──
const firebaseConfig = {
  apiKey:            "AIzaSyBmMZdC9WgVCnXAQb6Jvx_n_JmEHE3z2U8",
  authDomain:        "volunteerbridge-5a97c.firebaseapp.com",
  projectId:         "volunteerbridge-5a97c",
  storageBucket:     "volunteerbridge-5a97c.firebasestorage.app",
  messagingSenderId: "510303137686",
  appId:             "1:510303137686:web:00b136908afa7b48a477b7"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

let allNeeds = [];
let barChartInstance   = null;
let doughnutInstance   = null;

// ── REAL-TIME UPDATES ──
// We use onSnapshot for a "Live" feel, perfect for a hackathon demo
function initLiveFeed() {
  const q = query(collection(db, "needs"), orderBy("createdAt", "desc"));
  
  onSnapshot(q, (snapshot) => {
    allNeeds = [];
    snapshot.forEach(doc => allNeeds.push({ id: doc.id, ...doc.data() }));
    renderAll(allNeeds);
  }, (err) => {
    console.error("Firestore Listen Error:", err);
    document.getElementById("needsTable").innerHTML = `
      <div style="text-align:center; padding: 2rem; color: var(--danger);">
        <p>Could not load live data. Please check your Firebase rules.</p>
      </div>
    `;
  });

  // Also get volunteer count once
  getDocs(collection(db, "volunteers")).then(snap => {
    document.getElementById("countVolunteers").textContent = snap.size.toLocaleString();
  });
}

// ── RENDER ALL COMPONENTS ──
function renderAll(needs) {
  const filtered = applyFiltersLocally(needs);
  updateStats(filtered);
  renderCharts(filtered);
  renderTable(filtered);
  
  // Refresh Lucide icons for any newly added elements (like icons in badges)
  if (window.lucide) window.lucide.createIcons();
}

// ── FILTERING LOGIC ──
window.applyFilters = function() {
  renderAll(allNeeds);
};

function applyFiltersLocally(needs) {
  const urgency  = document.getElementById("filterUrgency").value;
  const category = document.getElementById("filterCategory").value;
  const location = document.getElementById("filterLocation").value.toLowerCase();
  
  return needs.filter(n =>
    (!urgency  || n.urgency  === urgency) &&
    (!category || n.category === category) &&
    (!location || (n.location||"").toLowerCase().includes(location))
  );
}

// ── STATS UPDATE ──
function updateStats(needs) {
  const high = needs.filter(n => n.urgency === "high").length;
  const medium = needs.filter(n => n.urgency === "medium").length;
  
  document.getElementById("countHigh").textContent = high.toLocaleString();
  document.getElementById("countMedium").textContent = medium.toLocaleString();
  document.getElementById("countTotal").textContent = needs.length.toLocaleString();
}

// ── CHART RENDERING ──
function renderCharts(needs) {
  renderBarChart(needs);
  renderDoughnut(needs);
}

function renderBarChart(needs) {
  const categories = ["Food","Medical","Education","Shelter","Water","Livelihood","Disaster","Other"];
  const counts = categories.map(c => needs.filter(n => n.category === c).length);
  const ctx = document.getElementById("barChart");
  
  if (barChartInstance) barChartInstance.destroy();
  barChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: categories,
      datasets: [{
        label: "Reported Needs",
        data: counts,
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "#10b981",
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: "#f3f4f6" }, ticks: { stepSize: 1, font: { size: 11, family: "'Inter'" } } },
        x: { grid: { display: false }, ticks: { font: { size: 10, family: "'Inter'" } } }
      }
    }
  });
}

function renderDoughnut(needs) {
  const high   = needs.filter(n => n.urgency === "high").length;
  const medium = needs.filter(n => n.urgency === "medium").length;
  const low    = needs.filter(n => n.urgency === "low").length;
  const ctx = document.getElementById("doughnutChart");
  
  if (doughnutInstance) doughnutInstance.destroy();
  doughnutInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["High","Medium","Low"],
      datasets: [{
        data: [high, medium, low],
        backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: { position: "bottom", labels: { padding: 20, font: { size: 12, family: "'Inter'", weight: '500' } } }
      }
    }
  });
}

// ── TABLE RENDERING ──
function renderTable(needs) {
  const container = document.getElementById("needsTable");
  if (needs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem; color: var(--text-muted);">
        <p>No reports found matching your filters.</p>
      </div>`;
    return;
  }

  const order = { high: 0, medium: 1, low: 2 };
  const sorted = [...needs].sort((a,b) => (order[a.urgency]??3) - (order[b.urgency]??3));

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Need Description</th>
          <th>Category</th>
          <th>Location</th>
          <th>Affected</th>
          <th>Urgency</th>
          <th>NGO Partner</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map(n => `
          <tr>
            <td style="font-weight: 600;">${n.title || "Untitled Need"}</td>
            <td>
              <span style="display:inline-flex; align-items:center; gap:0.25rem;">
                ${getCategoryIcon(n.category)} ${n.category || "General"}
              </span>
            </td>
            <td>${n.location || "Unknown"}</td>
            <td style="font-family: monospace;">${n.affected ? n.affected.toLocaleString() : "—"}</td>
            <td><span class="badge badge-${n.urgency}">${cap(n.urgency)}</span></td>
            <td style="color: var(--text-muted); font-size: 0.8rem;">${n.ngoName || "Independent"}</td>
          </tr>`).join("")}
      </tbody>
    </table>`;
}

// Helper: Capitalize
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }

// Helper: Icons for categories
function getCategoryIcon(cat) {
  const icons = {
    Food: "🍎", Medical: "🏥", Education: "📚", Shelter: "🏠",
    Water: "💧", Livelihood: "💼", Disaster: "🌪️", Other: "🎯"
  };
  return icons[cat] || "📍";
}

// Start the engine
initLiveFeed();
