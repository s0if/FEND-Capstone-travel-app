// Calculate the difference in days between today and the user's input date
const calculateDateDifference = inputDate => {
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);

  const travelDate = new Date(inputDate);
  const formattedTravelDate = formatDate(travelDate);

  const timeDifference = travelDate - currentDate;
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
};

// Helper function to format dates as YYYY-MM-DD
const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export { calculateDateDifference };