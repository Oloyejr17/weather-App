document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherButton = document.getElementById('get-weather');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed'); // Corrected ID
    const errorMessage = document.getElementById('error-message');

    const API_KEY = '7301fba4f3eaa802e40e0d5286a18eff';

    // Fetching weather app function
    const fetchWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    };

    // Function to display weather data
    const displayWeather = (data) => {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp} °C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    };

    // Function to handle weather retrieval
    const getWeather = async () => {
        const city = cityInput.value.trim(); // Get city input value
        if (city) {
            try {
                const data = await fetchWeather(city);
                displayWeather(data);
            } catch (error) {
                errorMessage.textContent = error.message;
                errorMessage.classList.remove('hidden');
                weatherInfo.classList.add('hidden');
            }
        } else {
            errorMessage.textContent = 'Please enter a city name';
            errorMessage.classList.remove('hidden');
            weatherInfo.classList.add('hidden');
        }
    };

    // Add event listener to button
    getWeatherButton.addEventListener('click', getWeather);

    // Add event listener for Enter key on the input field
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
});
