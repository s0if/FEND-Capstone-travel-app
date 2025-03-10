import { dayCounter } from "./counter";
import { buildHistoricApiURLs } from "./app";
import { getHistoricWeather } from "./getHistoricWeather";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const handleSnowData = (snowData) => {
  return snowData === null ? "0" : snowData;
};

const displayHistoricalWeather = (weatherData, id) => {
  const section = document.querySelector(`[weather-travel-number='${id}']`);
  const weatherContainer = document.createElement("div");
  weatherContainer.className = "weather-holder";
  weatherContainer.innerHTML = `
        <h3 class="result-subtitle">Historical weather on this same day for the past 3 years:</h3>
        ${[1, 2, 3]
          .map(
            (year) => `
            <div class="past-years-holder">
                <div class="weather-past-years">
                    <i class="icon-travel-weather far fa-calendar"></i>
                    <h4 class="result-year">${formatDate(
                      weatherData[`${year}YearPredictions`].date
                    )}</h4>
                </div>
                <p class="low-temp">Low: ${
                  weatherData[`${year}YearPredictions`].minT
                } °C</p>
                <p class="high-temp">High: ${
                  weatherData[`${year}YearPredictions`].maxT
                } °C</p>
                <p class="chance-of-rain">Rain record: It rained over ${
                  weatherData[`${year}YearPredictions`].precipitationCover
                }% of the day.</p>
                <p class="snow-record">Snow record: ${handleSnowData(
                  weatherData[`${year}YearPredictions`].snow
                )} cm</p>
                <div class="weather-description">
                    <i class="icon-travel-weather fas fa-cloud"></i>
                    <p class="round-box large-box">${
                      weatherData[`${year}YearPredictions`].conditions
                    }</p>
                </div>
            </div>
        `
          )
          .join("")}
    `;
  section.insertAdjacentElement("beforeend", weatherContainer);
};

const updateUI = (apiData, userInputDate, locationData, id) => {
  const { country, city } = locationData;
  const travelDiv = document.querySelector(`[data-travel-number='${id}']`);

  const removeTrip = () => {
    travelDiv.remove();
  };

  const appendHistoricalWeather = () => {
    const apiUrls = buildHistoricApiURLs(userInputDate);
    getHistoricWeather(
      locationData,
      apiUrls.apiURL1,
      apiUrls.apiURL2,
      apiUrls.apiURL3
    ).then((data) => displayHistoricalWeather(data, id));
  };

  const formatTravelDate = (date) => {
    const travelDate = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      months[travelDate.getMonth()]
    } ${travelDate.getDate()}, ${travelDate.getFullYear()}`;
  };

  const calculateDaysAway = () => {
    const days = dayCounter(userInputDate);
    return days === 1 ? `${days} day away!` : `${days} days away!`;
  };

  if (dayCounter(userInputDate) <= 7) {
    const forecast = apiData.data.find(
      (day) => day.valid_date === userInputDate
    );

    if (forecast) {
      const formatTime = (timestamp, timezone) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString("en-UK", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone,
        });
      };

      const weatherInfo = document.createElement("div");
      weatherInfo.className = "holder info-holder";
      weatherInfo.setAttribute("weather-travel-number", id);
      weatherInfo.innerHTML = `
                <div class="holder result-header">
                    <div class="travel-data">
                        <i class="icon-travel-info fas fa-map-marker-alt"></i>
                        <h2 class="travel-summary"><span class="travel-summary-info">My trip to: </span>${city}, ${country}</h2>
                    </div>
                    <div class="travel-data">
                        <i class="icon-travel-info far fa-calendar-check"></i>
                        <h2 class="travel-summary"><span class="travel-summary-info">Departing: </span>${formatTravelDate(
                          userInputDate
                        )}</h2>
                    </div>
                </div>
                <div class="result-body">
                    <div class="counter">
                        <i class="counter-icon far fa-clock"></i>
                        <p class="counter-text">${city}, ${country} is ${calculateDaysAway()}</p>
                    </div>
                    <div class="weather-holder">
                        <h3 class="result-subtitle">Weather forecast for then is:</h3>
                        <p class="low-temp">Low: ${forecast.min_temp} °C</p>
                        <p class="high-temp">High: ${forecast.max_temp} °C</p>
                        <p class="chance-of-rain">Chance of Rain: ${
                          forecast.pop
                        }%</p>
                        <p class="snow-record">Snowfall: ${
                          forecast.snow
                        } mm/hr</p>
                        <p class="sunrise">Sunrise: ${formatTime(
                          forecast.sunrise_ts,
                          apiData.timezone
                        )}</p>
                        <p class="sunset">Sunset: ${formatTime(
                          forecast.sunset_ts,
                          apiData.timezone
                        )}</p>
                        <div class="weather-description">
                            <i class="icon-travel-weather fas fa-cloud"></i>
                            <h4 class="round-box large-box">${
                              forecast.weather.description
                            }</h4>
                        </div>
                    </div>
                    <button id="btn-get-historical">Check past years</button>
                    <div id="travel-info-historical" class="holder entry-holder"></div>
                </div>
            `;

      const removeButton = document.createElement("button");
      removeButton.className = "remove-trip";
      removeButton.textContent = "Delete Trip";
      removeButton.onclick = removeTrip;

      travelDiv.append(weatherInfo, removeButton);
      document
        .getElementById("btn-get-historical")
        .addEventListener("click", appendHistoricalWeather);
    }
  } else {
    displayHistoricalWeather(apiData, id);
  }
};

export { updateUI };
