const form = document.querySelector('form');
const searchField = document.querySelector('.searchField');
const tempratureField = document.querySelector('.temp');
const cityField = document.querySelector('.time_location p');
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather-icon img");
const weatherField = document.querySelector(".weather_condition span");

// Detail fields
const feelsLikeField = document.querySelector(".detail-item:nth-child(1) .value");
const humidityField = document.querySelector(".detail-item:nth-child(2) .value");
const windField = document.querySelector(".detail-item:nth-child(3) .value");
const visibilityField = document.querySelector(".detail-item:nth-child(4) .value");
const uvField = document.querySelector(".detail-item:nth-child(5) .value");
const pressureField = document.querySelector(".detail-item:nth-child(6) .value");

let target = 'Mumbai';

form.addEventListener('submit', search);

function search(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchData(target);
    }
}

async function fetchData(target) {
    try {
        const endpoint = `https://api.weatherapi.com/v1/current.json?key=35af7ff606db422880d141328231305&q=${encodeURIComponent(target)}&aqi=no`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();

    updateWeatherData(
        data.current.temp_c,
        data.location.name,
        data.location.region,
        data.location.country,
        data.location.localtime,
        data.current.condition.text,
        data.current.condition.icon,
        data.current.feelslike_c,
        data.current.humidity,
        data.current.wind_kph,
        data.current.vis_km,
        data.current.uv,
        data.current.pressure_mb
    );
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherData(currTemp, cityName, region, country, time, currentCondition, conditonLogo,
    feelsLike, humidity, wind, visibility, uv, pressure) {

    tempratureField.innerText = `${currTemp}°`;
    cityField.innerText = `${cityName}, ${region}, ${country}`;
    dateField.innerText = time;
    weatherField.innerText = currentCondition;
    emojiField.src = conditonLogo;

    feelsLikeField.innerText = `${feelsLike}°`;
    humidityField.innerText = `${humidity}%`;
    windField.innerText = `${wind} km/h`;
    visibilityField.innerText = `${visibility} km`;
    uvField.innerText = uv;
    pressureField.innerText = `${pressure} hPa`;
}


// Fetch default location on load
fetchData(target);
