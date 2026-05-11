import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Auth guard - initialize sensor listener only after auth is verified
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  // Initialize sensor listener only for authenticated users
  initializeSensorListener();
});

// Logout handler
document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Logout error:', error);
  }
});

// Initialize realtime data subscription
function initializeSensorListener() {
  const sensorRef = ref(db, 'sensor');

  onValue(
    sensorRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log('No sensor data available');
        return;
      }
      updateStats(data);
      updateTable(data.history || []);
      if (window.renderChart && data.chart) {
        window.renderChart(data.chart);
      }
    },
    (error) => {
      console.error('Database listener error:', error);
      loadDummy();
    }
  );
}

// Update stats display
function updateStats(data) {
  const elements = {
    'statSuhu': (data.suhu ?? '--') + '°C',
    'statKelembapan': (data.kelembapan ?? '--') + '%',
    'statTekanan': (data.tekanan ?? '--') + ' hPa',
    'statCahaya': (data.cahaya ?? '--') + ' lx'
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });
}

// Update table with sensor history
function updateTable(rows) {
  const tbody = document.getElementById('dataTable');
  if (!tbody) {
    console.warn('Table element not found');
    return;
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No data available</td></tr>';
    return;
  }

  tbody.innerHTML = rows.map(r => {
    // Validate row data
    const waktu = r.waktu || '--';
    const sensor = r.sensor || '--';
    const nilai = r.nilai !== undefined ? r.nilai : '--';
    const status = r.status || 'UNKNOWN';
    const statusClass = status === 'OK' ? 'ok' : status === 'WARN' ? 'warn' : 'err';

    return `
      <tr>
        <td>${waktu}</td>
        <td>${sensor}</td>
        <td>${nilai}</td>
        <td><span class="badge-pill ${statusClass}">${status}</span></td>
      </tr>
    `;
  }).join('');
}

// Fallback to dummy.json if Firebase is not configured
async function loadDummy() {
  try {
    const res = await fetch('data/dummy.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    updateStats(data);
    updateTable(data.history || []);
    window.__sensorData = data;
    
    if (window.renderChart && data.chart) {
      window.renderChart(data.chart);
    }
    
    console.log('Dummy data loaded successfully');
  } catch (error) {
    console.error('Error loading dummy data:', error);
  }
}
