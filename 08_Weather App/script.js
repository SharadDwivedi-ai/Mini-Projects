const result = document.getElementById('resultList');

const ul = document.querySelector('ul')
async function getWeather() {
    const input = document.getElementById('enterCity')
    const city = input.value.trim()
    // check if input is empty 
    if (!city) {
        alert('Please enter your location')
        return;
    }

    const apiKey = '1345e855168afb5b0f86c03b9f8b50df';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Show loading 
        result.textContent = 'Searching ...'

        const response = await fetch(url)
        const data = await response.json()

        if (data.cod !== 200) {
            result.textContent = 'City not Found'
            return;
        }

        // Extract data
        const temp = data.main.temp;
        const windSpd = data.wind.speed;
        const clouds = data.clouds.all;
        const weather = data.weather[0].description;
        const icon = data.weather[0].icon;


        result.innerHTML = `
          📍 City: ${city} <br>
           <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"><br>
           🌡 Temperature: ${temp}°C <br>
           💨 Wind Speed: ${windSpd} m/s <br>
           ☁ Clouds: ${clouds}% <br>
           🌈 Condition: ${weather}
       `;

        //    Create new li every time 
        const li = document.createElement('li')
        ul.appendChild(li)
        
        input.value = '';

    } catch (error) {
        result.textContent = 'Error Fetching Data...'
    }
}
