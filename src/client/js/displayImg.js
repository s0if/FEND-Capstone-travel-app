createImageElement = (
  src,
  alt = "picture of the destination",
  className = "travel-img"
) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = className;
  return img;
};

displayImg = (primaryObj, id) => {
  try {
    const { destinationImg: placeImg, countryImg } = primaryObj;
    const travelDiv = document.querySelector(`[data-travel-number='${id}']`);

    const imageSrc =
      placeImg ||
      countryImg ||
      "https://cdn.pixabay.com/photo/2018/09/26/20/20/workplace-3705534_1280.jpg";
    const imageElement = createImageElement(imageSrc);
    travelDiv.insertAdjacentElement("afterbegin", imageElement);
  } catch (err) {
    console.error("Failed to display destination image:", err);
  }
};

export { displayImg };
