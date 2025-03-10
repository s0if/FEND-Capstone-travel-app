// Function to handle smooth scrolling to a section
const handleSmoothScroll = (event) => {
  event.preventDefault();

  const clickedElement = event.target;

  // Ensure the clicked element is an anchor tag
  if (clickedElement.tagName !== "A") {
    return;
  }

  // Get the target section ID from the anchor's href attribute
  const targetSectionId = clickedElement.getAttribute("href");
  const targetSection = document.querySelector(targetSectionId);

  // Scroll to the target section smoothly
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

export { handleSmoothScroll };
