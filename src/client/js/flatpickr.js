import flatpickr from "flatpickr";

// Initialize date picker with custom configuration
const initializeDatePicker = () => {
  flatpickr(".flatpickr.js-flatpickr-dateTime", {
    enableTime: false, // Disable time selection
    time_24hr: false, // Use 12-hour format (if time is enabled)
    altInput: true, // Show user-friendly date format
    altFormat: "d M Y", // Format for the alternate input
    dateFormat: "Y-m-d", // Format for the actual input value
    minDate: "today", // Disable past dates
  });
};

export { initializeDatePicker };
