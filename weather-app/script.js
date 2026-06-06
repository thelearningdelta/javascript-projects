// Get from open weathermap api key 
const apiKey = "";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const errorMsg = document.getElementById("errorMsg");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const minmax = document.getElementById("minmax");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    try {
        errorMsg.classList.add("hidden");

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} m/s`;

        minmax.textContent =
            `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        weatherCard.classList.remove("hidden");
    }
    catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    weatherCard.classList.add("hidden");
    errorMsg.textContent = message;
    errorMsg.classList.remove("hidden");
}
