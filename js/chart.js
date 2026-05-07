// Chart.js renderer
window.renderChart = function (chartData) {
  const ctx = document.getElementById('sensorChart');
  if (!ctx) return;

  const labels = chartData?.labels || ['00','03','06','09','12','15','18','21'];
  const suhu = chartData?.suhu || [26,26.5,27,27.8,28.2,28,27.5,27];
  const kelembapan = chartData?.kelembapan || [70,72,71,68,65,67,69,71];

  if (window.__chartInstance) window.__chartInstance.destroy();

  window.__chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Suhu (°C)',
          data: suhu,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,.12)',
          fill: true, tension: .4, borderWidth: 2, pointRadius: 3
        },
        {
          label: 'Kelembapan (%)',
          data: kelembapan,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6,182,212,.10)',
          fill: true, tension: .4, borderWidth: 2, pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true } }
      },
      scales: {
        y: { grid: { color: '#eef0f5' } },
        x: { grid: { display: false } }
      }
    }
  });
};

// Auto-render setelah data dimuat
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.__sensorData?.chart) window.renderChart(window.__sensorData.chart);
    else window.renderChart();
  }, 600);
});
