import { encodeUrl } from "./urlEncoder";
import { fetchCoordinates } from "./callGeonamesApi";
import { sendApiRequest } from "./postRequestToServer";
import { calculateDays } from "./counter";
import { renderUI } from "./updateUI";
import { validateInputs } from "./formValidator";
import { fetchHistoricalWeather } from "./getHistoricWeather";
import { fetchLocationImage } from "./getPlaceImg";
import { showImage } from "./displayImg";
import { scrollPage } from "./footerButtons";

let mainData = {};

const geoNamesUrl = "https://secure.geonames.org/searchJSON?q=";
const geoNamesApiKey = "janainamj";
const weatherBitUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherBitApiKey = "723118fb280a46d5bc650aaaa26b3479";
const visualCrossingUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?";
const visualCrossingApiKey = "ZQFMC9TG68TNK7BM2YRMJJFE2";
const pixabayUrl = "https://pixabay.com/api/";
const pixabayApiKey = "22140600-67da7abf40f7e47eef517beac";

const createHistoricalApiUrls = (inputDate) => {
  const adjustDate = () => {
    if (calculateDays(inputDate) <= 365) {
      return inputDate;
    } else {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const travelDate = new Date(inputDate);
      const adjustedDate = travelDate.setFullYear(currentYear);
      return adjustedDate;
    }
  };

  const targetDate = adjustDate();
  const location = `${mainData.latitude},${mainData.longitude}`;
  const encodedLocation = encodeUrl(location);

  const getPastDate = (years) => {
    const pastDate = new Date(targetDate);
    pastDate.setFullYear(pastDate.getFullYear() - years);
    return pastDate.toISOString().split(".")[0];
  };

  const urls = {
    urlOne: `${visualCrossingUrl}&aggregateHours=24&startDateTime=${getPastDate(
      1
    )}&endDateTime=${getPastDate(
      1
    )}&unitGroup=metric&contentType=json&location=${encodedLocation}&locationMode=single&key=${visualCrossingApiKey}`,
    urlTwo: `${visualCrossingUrl}&aggregateHours=24&startDateTime=${getPastDate(
      2
    )}&endDateTime=${getPastDate(
      2
    )}&unitGroup=metric&contentType=json&location=${encodedLocation}&locationMode=single&key=${visualCrossingApiKey}`,
    urlThree: `${visualCrossingUrl}&aggregateHours=24&startDateTime=${getPastDate(
      3
    )}&endDateTime=${getPastDate(
      3
    )}&unitGroup=metric&contentType=json&location=${encodedLocation}&locationMode=single&key=${visualCrossingApiKey}`,
  };

  return urls;
};

let tripCount = 0;

const incrementTripCount = () => {
  return ++tripCount;
};

const initializeApp = () => {
  document.querySelector(".footer-link").addEventListener("click", scrollPage);

  document
    .getElementById("generate")
    .addEventListener("click", handleFormSubmission);

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    if (validateInputs()) {
      const departureDate = document.getElementById("date").value;
      const destination = document.getElementById("place").value;
      const encodedDestination = encodeUrl(destination);

      const resultsSection = document.getElementById("results");
      const tripInfoDiv = document.createElement("div");
      tripInfoDiv.classList.add("trip-holder");
      tripInfoDiv.setAttribute("data-trip-number", `${incrementTripCount()}`);
      resultsSection.prepend(tripInfoDiv);

      try {
        const coordinates = await fetchCoordinates(
          geoNamesUrl,
          encodedDestination,
          geoNamesApiKey
        );
        mainData = coordinates;

        await fetchLocationImage(mainData, pixabayUrl, pixabayApiKey);
        showImage(mainData, tripCount);

        if (calculateDays(departureDate) < 0) {
          alert("Please enter a valid date.");
        } else if (calculateDays(departureDate) <= 7) {
          const weatherData = await sendApiRequest("/callAPI", {
            urlBase: `${weatherBitUrl}lat=${mainData.latitude}&lon=${mainData.longitude}&key=${weatherBitApiKey}`,
          });
          renderUI(weatherData, departureDate, mainData, tripCount);
        } else {
          const apiUrls = createHistoricalApiUrls(departureDate);
          const historicalWeather = await fetchHistoricalWeather(
            mainData,
            apiUrls.urlOne,
            apiUrls.urlTwo,
            apiUrls.urlThree
          );
          renderUI(historicalWeather, departureDate, mainData, tripCount);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };
};

export { initializeApp, createHistoricalApiUrls };
