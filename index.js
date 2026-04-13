// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

function fetchWeatherAlerts(state) {
            
    fetch(`${weatherApi}${state.toUpperCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const display = document.getElementById('alerts-display');
            const errorDiv = document.getElementById('error-message');
            errorDiv.textContent = '';
            errorDiv.classList.add('hidden');
            display.innerHTML = `Weather Alerts: ${data.features.length}<br>` + data.features.map(f => f.properties.headline).join('<br>');
            errorDiv.classList.add('hidden');
        })
        .catch(error => {
            console.log('Error fetching weather alerts:', error);
            const errorDiv = document.getElementById('error-message');
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('hidden');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetch-alerts');
    const input = document.getElementById('state-input');

    button.addEventListener('click', () => {
        const state = input.value.trim();
        if (state) {
            fetchWeatherAlerts(state);
            input.value = '';
        }
    });
});