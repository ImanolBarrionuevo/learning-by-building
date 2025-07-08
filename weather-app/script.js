// DOM element references
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Event listener triggered when user clicks the search button
search.addEventListener('click', () => {
    const APIKey = 'f72fe90c7c1af9a6137e836bc02d5c41'; // OpenWeatherMap API key
    const city = document.querySelector('.search-box input').value; // User-entered city name

    // If input is empty, exit early
    if (city === '') {
        return;
    }

    // Make API request to fetch weather data for the entered city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`).then(response => response.json()).then(json => {

        // If the city is not found, show the error block and hide weather data
        if (json.cod === '404') {
            container.style.height = '28rem';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        // If the city is valid, hide any previous error message
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        // Select UI elements to insert data
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        // Choose appropriate weather image based on weather condition
        switch (json.weather[0].main) {

            case 'Clear': image.src = 'images/clear.png'; break;
            case 'Rain': image.src = 'images/rain.png'; break;
            case 'Snow': image.src = 'images/snow.png'; break;
            case 'Clouds': image.src = 'images/cloud.png'; break;
            case 'Haze': image.src = 'images/haze.png'; break;
            case 'Mist': image.src = 'images/haze.png'; break;
            case 'Drizzle': image.src = 'images/drizzle.png'; break;
            case 'Thunderstorm': image.src = 'images/thunderstorm.png'; break;
            case 'Smoke': image.src = 'images/smoke.png'; break;
            case 'Dust': image.src = 'images/dust.png'; break;
            case 'Sand': image.src = 'images/sand.png'; break;
            case 'Tornado': image.src = 'images/tornado.png'; break;

            default: image.src = ''; // If condition not recognized, show nothing
        }

        // Insert data into HTML elements
        temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>°C</span>`; // Convert Kelvin to Celsius
        description.innerHTML = `${json.weather[0].description}`; // Weather description (e.g. "light rain")
        humidity.innerHTML = `${json.main.humidity}%`; // Humidity value
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`; // Wind speed

        // Make weather sections visible with animation
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '36.875rem';

    });

})