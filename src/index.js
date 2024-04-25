function getWeather(searchTerm) {
    return fetch(`https://api.weatherapi.com/v1/current.json?key=d5b9738a700548f59f3165424242304&q=${searchTerm}`, { mode: 'cors' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Raw Weather Data:', data);
        const processedData = processWeatherData(data);
        console.log('Processed Weather Data:', processedData);
        updateWeatherUI(processedData);
        return processedData;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        throw error;
      });
  }
  

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchTerm = document.getElementById('search').value;

        if (searchTerm) {
            console.log(getWeather(searchTerm));
        } else {
            console.error('Search term is empty');
        }
    });
});

function processWeatherData(data) {
    if (!data || !data.location || !data.current) {
      throw new Error('Invalid weather data');
    }
  
    const {
      location: { name },
      current: { temp_f, condition, last_updated },
    } = data;
  
    return {
      locationName: name,
      temperature: temp_f,
      conditionText: condition.text,
      iconUrl: condition.icon,
      lastUpdated: last_updated,
    };
  }

  function updateWeatherUI(processedData) {
    const {
        locationName,
        temperature,
        conditionText,
        iconUrl,
        lastUpdated,
    } = processedData;

    document.getElementById('location-name').textContent = locationName;
    document.getElementById('temperature').textContent = `Temperature: ${temperature} F`;
    document.getElementById('condition').textContent = `Condition: ${conditionText}`;
    document.getElementById('weather-icon').src = `https:${iconUrl}`;
    document.getElementById('last-updated').textContent = `Last Updated: ${lastUpdated}`;
  }

  getWeather('New York');
  