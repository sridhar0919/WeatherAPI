
// Default content to show on page
fetch(`https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=1b813feff865be1b336b23041fc06699`)
.then(response => response.json())
.then(res => executeContent(res));


// Adding event listener to fetch new city details entered in input field
document.querySelector('.btn').addEventListener('click', getWeather);


async function getWeather() {
  
  let input = document.querySelector('#city-search').value;

  if(input){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=1b813feff865be1b336b23041fc06699`);

    const res = await response.json();
    executeContent(res);
  }
  
}

// Building up the web content with response
function executeContent(res) {
  let temp = document.getElementById('temp');
  let temp_calc = Math.round((res.main.temp) - 273.15);
  temp.innerHTML = `<p>${temp_calc}&#176C<p>`;
  
  // Fetching weather data
  let weather = document.getElementById('weather');
  weather.innerHTML = `${res.weather[0].main}`;
  weather.setAttribute('class','display-4 ml-3');
  
  // Setting weather icon
  let icon1 = document.querySelector('#climate-icon1');
  if(String(res.weather[0].main) === 'Clouds' || String(res.weather[0].main) === 'Clear' ){
    icon1.innerHTML = `<i class="fas fa-cloud fa-6x"></i>`;
  }
  else if(String(res.weather[0].main) === 'Rain') {
    icon1.innerHTML = `<i class="fas fa-cloud-showers-heavy fa-6x"></i>`;
  }
  else if(String(res.weather[0].main) === 'Haze'){
    icon1.innerHTML = '<i class="fas fa-smog fa-6x"></i>';
  }
  else if(String(res.weather[0].main) === 'Thunderstorm'){
    icon1.innerHTML = '<i class="fas fa-bolt fa-6x"></i>';
  }
  else if(String(res.weather[0].main) === 'Drizzle'){
    icon1.innerHTML = '<i class="fas fa-cloud-rain fa-6x"></i>`';
  }
  else if(String(res.weather[0].main) === 'Snow') {
    icon1.innerHTML = '<i class="fas fa-snowflake fa-6x"></i>`';
  }
  else {
    icon1.innerHTML = `<i class="fas fa-cloud fa-6x"></i>`;
  }
  
  // Fetching city and country name
  let city = document.getElementById('city');
  city.innerHTML = `${res.name}, ${res.sys.country}`;
  city.setAttribute('class','p-3 border border-dark bg-primary rounded text-center')

  // Fetching sunrise and sunset
  let sunrise = document.querySelector('.sunrise');
  let utc = res.sys.sunrise;
  let date = new Date(utc * 1000);
  let timeStr = date.toLocaleTimeString();

  sunrise.innerHTML = `
    <i class="fas fa-cloud-sun"></i>
    ${timeStr}
  `;

  let sunset = document.querySelector('.sunset');
  let utc1 = res.sys.sunset;
  let date1 = new Date(utc1 * 1000);
  let timeStr1 = date1.toLocaleTimeString();

  sunset.innerHTML = `
    <i class="fas fa-cloud-moon"></i>
    ${timeStr1}
  `;

  // Wind speed and degree

  let speed = document.querySelector('.speed');
  speed.innerHTML = `
    ${res.wind.speed} m/sec`;

  // Humidity, Pressure and Visibility
  let humidity = document.querySelector('.humidity');
  humidity.innerHTML = `${res.main.humidity}%`;

  let pressure = document.querySelector('.pressure');
  pressure.innerHTML = `${res.main.pressure} hPa`;

  let visibility = document.querySelector('.visibility');
  visibility.innerHTML = `${Math.round(res.visibility/1000)} KM`;

}


















