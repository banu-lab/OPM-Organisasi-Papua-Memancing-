# Monitoring Firebase

Website monitoring sensor realtime berbasis **Firebase Realtime Database** dengan tampilan modern, elegan, dan responsif.

## ✨ Fitur

- 🔐 Login dengan **Firebase Authentication**
- 📡 Data sensor **realtime** dari Firebase Realtime Database
- 📊 Grafik interaktif dengan **Chart.js**
- 🎨 Desain modern (glassmorphism, gradient, responsif)
- 📱 Mobile friendly

## 📁 Struktur Folder

```
monitoring-firebase/
├── index.html          # Landing page
├── login.html          # Halaman login
├── dashboard.html      # Halaman dashboard utama
├── css/                # Stylesheet
├── js/                 # Script (Firebase, auth, chart, dashboard)
├── img/                # Aset gambar (logo, ikon, background)
├── components/         # Potongan HTML (navbar, sidebar, footer)
├── data/dummy.json     # Data dummy fallback
└── docs/               # Dokumentasi (flowchart, ERD, laporan)
```

## 🚀 Cara Menjalankan

1. **Clone / download** project ini.
2. Buka [Firebase Console](https://console.firebase.google.com) → buat project baru.
3. Aktifkan **Authentication (Email/Password)** dan **Realtime Database**.
4. Salin konfigurasi project ke `js/firebase-config.js`:
   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     databaseURL: "...",
     projectId: "...",
     ...
   };
   ```
5. Jalankan dengan **Live Server** (VSCode) atau:
   ```bash
   npx serve .
   ```
6. Buka `http://localhost:3000` di browser.

## 🗃 Struktur Database (contoh)

```json
{
  "sensor": {
    "suhu": 27.4,
    "kelembapan": 68,
    "tekanan": 1012,
    "cahaya": 540,
    "history": [
      { "waktu": "10:32", "sensor": "DHT22", "nilai": "27.4°C", "status": "OK" }
    ]
  }
}
```

## 🛠 Teknologi

- HTML5, CSS3, JavaScript (ES Modules)
- Firebase v10 (Auth + Realtime DB)
- Chart.js

## 📄 Lisensi

MIT © 2025
