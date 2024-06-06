const APIkey = "31c25f4a7bd937b617f354bf1365b99a";

const countryNames = {
    "br": "Brasil",
    "us": "Estados Unidos",
    "ca": "Canadá",
    "fr": "França",
    "de": "Alemanha",
    "es": "Espanha",
    "it": "Itália",
    // Adicione mais países conforme necessário
};

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.querySelector("#city-input");
    const search = document.querySelector("#search");
    const cityElement = document.querySelector("#city");
    const tempElement = document.querySelector("#temperature span");
    const descElement = document.querySelector("#description");
    const weatherIconElement = document.querySelector("#weather-icon");
    const countryElement = document.querySelector("#country");
    const countryNameElement = document.createElement('span'); // Elemento para exibir o nome do país
    countryElement.parentNode.insertBefore(countryNameElement, countryElement.nextSibling);
    const humidityElement = document.querySelector("#humidity span");
    const windElement = document.querySelector("#wind span");

    const getWeatherData = async (city) => {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}&lang=pt_br`;
        console.log("Fetching data from URL:", apiWeatherURL);
        try {
            const res = await fetch(apiWeatherURL);
            if (!res.ok) {
                const errorDetails = await res.json();
                throw new Error(`Erro ao buscar dados da API: ${errorDetails.message}`);
            }
            const data = await res.json();
            console.log("Data fetched from API:", data);
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
            return null;
        }
    };

    const showWeatherData = async (city) => {
        const data = await getWeatherData(city);
        if (data) {
            cityElement.textContent = data.name;
            tempElement.textContent = data.main.temp;
            descElement.textContent = data.weather[0].description;
            weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            const countryCode = data.sys.country.toLowerCase();
            console.log("Country code:", countryCode);

            countryElement.src = `https://flagcdn.com/w320/${countryCode}.png`;
            countryElement.alt = `Bandeira de ${data.sys.country}`;

            // Exibir o nome do país em português
            countryNameElement.textContent = countryNames[countryCode] ? ` (${countryNames[countryCode]})` : '';

            humidityElement.textContent = `${data.main.humidity}%`;
            windElement.textContent = `${data.wind.speed} m/s`;
        } else {
            console.error("No data returned from API");
        }
    };

    search.addEventListener("click", (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        console.log("City input before check:", city);
        if (city) {
            console.log("City input:", city);
            showWeatherData(city);
        } else {
            console.error("City input is empty");
        }
    });
});
