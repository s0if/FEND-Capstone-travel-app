// Function to validate user input in the form
const checkFormInputs = () => {
  const destinationInput = document.getElementById("place").value.trim();
  const dateInput = document.getElementById("date").value.trim();

  console.log("Entered destination:", destinationInput);
  console.log("Entered date:", dateInput);

  // Check if destination input is empty or contains only spaces
  if (!destinationInput) {
    return false;
  }

  // Check if date input is empty or invalid
  if (!dateInput || isNaN(new Date(dateInput).getTime())) {
    return false;
  }

  // If all checks pass, return true
  return true;
};

export { checkFormInputs };
