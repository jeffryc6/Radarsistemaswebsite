const telemetry = document.getElementById('telemetry-target');
const pings = document.querySelectorAll('.radar-ping');
const anomalies = [
    'MALWARE_DETECTED: BLOCKED', 
    'COST_ANOMALY: OPTIMIZED', 
    'DB_LATENCY: RESOLVED', 
    'SYS_BUG: PATCHED', 
    'INFRA_RISK: NEUTRALIZED'
];

// Función para cambiar alertas aleatorias en la pantalla del Radar estilo Medal of Honor
if (telemetry && pings.length > 0) {
    setInterval(() => {
        const randomPing = pings[Math.floor(Math.random() * pings.length)];
    const randomAnomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
    
    // Iluminar ping detectado temporalmente
    randomPing.style.opacity = '1';
    randomPing.style.transform = 'scale(1.5)';
    telemetry.innerText = `OBJ_DETECTED: ${randomAnomaly}`;
    telemetry.style.color = '#84cc16'; // Verde oliva activo

    setTimeout(() => {
        randomPing.style.opacity = '0.3';
        randomPing.style.transform = 'scale(1)';
        telemetry.innerText = 'SYS_SCAN: NOMINAL';
        telemetry.style.color = '#475569';
    }, 2500);

    }, 5000);
}
