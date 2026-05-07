import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Auth guard
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = 'login.html';
});

document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  await signOut(auth);
  window.location.href = 'login.html';
});

// Realtime data subscription (gunakan path /sensor di Firebase Realtime Database)
const sensorRef = ref(db, 'sensor');

onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    loadDummy();
    return;
  }
  updateStats(data);
  updateTable(data.history || []);
}, () => loadDummy());

function updateStats(data) {
  document.getElementById('statSuhu').textContent = (data.suhu ?? '--') + '°C';
  document.getElementById('statKelembapan').textContent = (data.kelembapan ?? '--') + '%';
  document.getElementById('statTekanan').textContent = (data.tekanan ?? '--') + ' hPa';
  document.getElementById('statCahaya').textContent = (data.cahaya ?? '--') + ' lx';
}

function updateTable(rows) {
  const tbody = document.getElementById('dataTable');
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.waktu}</td>
      <td>${r.sensor}</td>
      <td>${r.nilai}</td>
      <td><span class="badge-pill ${r.status === 'OK' ? 'ok' : r.status === 'WARN' ? 'warn' : 'err'}">${r.status}</span></td>
    </tr>
  `).join('');
}

// Fallback ke dummy.json jika Firebase belum dikonfigurasi
async function loadDummy() {
  try {
    const res = await fetch('data/dummy.json');
    const data = await res.json();
    updateStats(data);
    updateTable(data.history || []);
    window.__sensorData = data;
    if (window.renderChart) window.renderChart(data.chart);
  } catch (e) {
    console.warn('Tidak bisa memuat data dummy:', e);
  }
}
