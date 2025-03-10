import { encodeUrl } from "./urlEncoder";

// Function to fetch images for a given location from Pixabay
const fetchLocationImages = async (locationData, baseUrl, apiKey) => {
  try {
    const { city, country } = locationData;
    const encodedCity = encodeUrl(city);
    const encodedCountry = encodeUrl(country);

    const fetchImage = async (query) => {
      const response = await fetch(
        `${baseUrl}?key=${apiKey}&q=${query}&per_page=3&category=nature&safesearch=true&orientation=horizontal`
      );
      const data = await response.json();
      return data.hits[0]?.largeImageURL || null;
    };

    // Fetch city image
    locationData.destinationImg = await fetchImage(encodedCity);
    console.log("Location data with city image:", locationData);

    // Fetch country image
    locationData.countryImg = await fetchImage(encodedCountry);
    console.log("Location data with country image:", locationData);

    return locationData;
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    throw new Error("Failed to fetch images for the specified location.");
  }
};

export { fetchLocationImages };
