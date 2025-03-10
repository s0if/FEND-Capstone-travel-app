// Fetch location coordinates from Geonames API
const fetchLocationCoordinates = async (apiEndpoint, location, apiKey) => {
  try {
    const response = await fetch(
      `${apiEndpoint}${location}&maxRows=10&username=${apiKey}`
    );
    const apiResponse = await response.json();

    if (apiResponse.geonames && apiResponse.geonames.length > 0) {
      const locationData = {
        latitude: apiResponse.geonames[0].lat,
        longitude: apiResponse.geonames[0].lng,
        country: apiResponse.geonames[0].countryName,
        city: apiResponse.geonames[0].toponymName,
      };
      console.log("Geonames API response:", apiResponse);
      return locationData;
    } else {
      throw new Error("No location data found");
    }
  } catch (error) {
    console.error("Failed to fetch location coordinates:", error);
    alert("Please enter a valid location.");
  }
};

export { fetchLocationCoordinates };
