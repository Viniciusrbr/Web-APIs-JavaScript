const webAPIs = {
    // Web Speech API
    speak: function() {
        const text = document.getElementById('textToSpeak').value;
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'pt-BR';
        window.speechSynthesis.speak(speech);
    },

    stopSpeaking: function() {
        window.speechSynthesis.cancel();
    },

    // Geolocation API
    getLocation: function() {
        const locationResult = document.getElementById('locationResult');
        locationResult.textContent = 'Obtendo localização...';

        navigator.geolocation.getCurrentPosition(
            position => {
                locationResult.textContent = `
                    Latitude: ${position.coords.latitude}
                    Longitude: ${position.coords.longitude}
                `;
            },
            error => {
                locationResult.textContent = `Erro: ${error.message}`;
            }
        );
    },

    // Notifications API
    requestNotificationPermission: async function() {
        try {
            const permission = await Notification.requestPermission();
            alert(`Permissão ${permission === 'granted' ? 'concedida' : 'negada'}`);
        } catch (error) {
            alert('Erro ao solicitar permissão: ' + error);
        }
    },

    showNotification: function() {
        if (Notification.permission === 'granted') {
            new Notification('Olá!', {
                body: 'Esta é uma notificação de teste',
                icon: '/api/placeholder/64/64'
            });
        } else {
            alert('Por favor, permita as notificações primeiro.');
        }
    },

    // Battery Status API
    getBatteryStatus: async function() {
        const batteryResult = document.getElementById('batteryResult');
        batteryResult.textContent = 'Obtendo informações da bateria...';

        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                
                const updateBatteryInfo = () => {
                    batteryResult.textContent = `
                        Carregando: ${battery.charging ? 'Sim' : 'Não'} |
                        Nível: ${Math.round(battery.level * 100)}%
                    `;
                };

                updateBatteryInfo();
                battery.addEventListener('chargingchange', updateBatteryInfo);
                battery.addEventListener('levelchange', updateBatteryInfo);

            } catch (error) {
                batteryResult.textContent = 'Erro ao obter informações da bateria: ' + error;
            }
        } else {
            batteryResult.textContent = 'API de Bateria não suportada neste navegador.';
        }
    },

    // Clipboard API
    copyToClipboard: async function() {
        const text = document.getElementById('clipboardText').value;
        try {
            await navigator.clipboard.writeText(text);
            const button = document.querySelector('.card:nth-child(5) button');
            button.textContent = 'Copiado!';
            button.classList.add('copy-feedback');
            setTimeout(() => {
                button.textContent = 'Copiar';
                button.classList.remove('copy-feedback');
            }, 2000);
        } catch (err) {
            alert('Erro ao copiar: ' + err);
        }
    },

    pasteFromClipboard: async function() {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById('clipboardText').value = text;
        } catch (err) {
            alert('Erro ao colar: ' + err);
        }
    },

    // Vibration API
    vibrateShort: function() {
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        } else {
            alert('Vibration API não suportada');
        }
    },

    vibrateLong: function() {
        if ('vibrate' in navigator) {
            navigator.vibrate(1000);
        } else {
            alert('Vibration API não suportada');
        }
    },

    vibratePattern: function() {
        if ('vibrate' in navigator) {
            // Padrão SOS em Morse: ... --- ...
            navigator.vibrate([
                200, 200, 200, 200, 200, 200,  // Três pontos curtos
                500, 200, 500, 200, 500,       // Três traços longos
                200, 200, 200, 200, 200, 200   // Três pontos curtos
            ]);
        } else {
            alert('Vibration API não suportada');
        }
    },

    // Device Orientation API
    startOrientationTracking: function() {
        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', this.handleOrientation);
            document.getElementById('orientationResult').textContent = 'Mova seu dispositivo...';
        } else {
            alert('Device Orientation API não suportada');
        }
    },

    handleOrientation: function(event) {
        const result = document.getElementById('orientationResult');
        const box = document.querySelector('.orientation-box');
        
        const alpha = Math.round(event.alpha); // Z
        const beta = Math.round(event.beta);   // X
        const gamma = Math.round(event.gamma);  // Y

        result.textContent = `
            Rotação Z (alpha): ${alpha}°
            Rotação X (beta): ${beta}°
            Rotação Y (gamma): ${gamma}°
        `;

        box.style.transform = `
            rotateX(${beta}deg)
            rotateY(${gamma}deg)
            rotateZ(${alpha}deg)
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicação iniciada com sucesso!');
});