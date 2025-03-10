import { callApiViaServerSide } from "./postRequestToServer";

// Helper function to extract weather data from API response
const extractWeatherData = (apiResponse) => {
  const weatherData = apiResponse.location.values[0];
  return {
    date: weatherData.datetimeStr,
    conditions: weatherData.conditions,
    maxT: weatherData.maxt,
    minT: weatherData.mint,
    snow: weatherData.snowdepth,
    precipitation: weatherData.precip,
    precipitationCover: weatherData.precipcover,
  };
};

// Fetch historical weather data for the past three years
const fetchHistoricalWeather = async (
  locationData,
  apiUrl1,
  apiUrl2,
  apiUrl3
) => {
  try {
    const [responseOne, responseTwo, responseThree] = await Promise.all([
      callApiViaServerSide("/callAPI", { urlBase: apiUrl1 }),
      callApiViaServerSide("/callAPI", { urlBase: apiUrl2 }),
      callApiViaServerSide("/callAPI", { urlBase: apiUrl3 }),
    ]);

    locationData.oneYearPredictions = extractWeatherData(responseOne);
    locationData.twoYearPredictions = extractWeatherData(responseTwo);
    locationData.threeYearPredictions = extractWeatherData(responseThree);

    return locationData;
  } catch (error) {
    console.error("Failed to fetch historical weather data:", error);
    alert("Sorry, we couldn't complete your request. Please try again.");
  }
};

export { fetchHistoricalWeather };
