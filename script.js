let quotePopupVisible = false; // Flag to track if quote popup is visible
let calculatingInProgress = false; // Flag to track if calculation is in progress

// Function to calculate the dowry
function calculateDowry() {
  // Check if calculation is already in progress
  if (calculatingInProgress) return;

  // Set the flag to true to prevent multiple calculations
  calculatingInProgress = true;

  const girlsEducation = document.getElementById("girlsEducation").value;
  const boysEducation = document.getElementById("boysEducation").value;
  const boysJobStatus = document.getElementById("boysJobStatus").value;
  const doesBoyOwnHouse = document.getElementById("doesBoyOwnHouse").value;

  let monthlyIncome = parseInt(document.getElementById("monthlyIncome").value.replace(/,/g, ""));
  if (isNaN(monthlyIncome) || monthlyIncome < 0) {
    monthlyIncome = 0;
  }

  let dowry = 0;

  // Special condition: Joke on boy if monthly income < 10,000 and no house
  if (monthlyIncome < 10000 && doesBoyOwnHouse === "no") {
    displayFunnyMessage();
    return; // Stop further calculation
  }

  showLoadingBar(); // Show loading bar and calculating text

  // Dowry calculation logic
  // Girl's education
  if (girlsEducation === "illiterate") dowry += 500000;
  else if (girlsEducation === "undergraduate") dowry += 200000;
  else if (girlsEducation === "graduate") dowry += 100000;
  else if (girlsEducation === "doctorate") dowry += 20000;

  // Boy's education
  if (boysEducation === "illiterate") dowry += 5000;
  else if (boysEducation === "undergraduate") dowry += 50000;
  else if (boysEducation === "graduate") dowry += 150000;
  else if (boysEducation === "doctorate") dowry += 200000;

  // Boy's job status
  if (boysJobStatus === "private") dowry += 50000;
  else if (boysJobStatus === "government") dowry += 250000;
  else if (boysJobStatus === "self-employed") dowry += 150000;

  // Boy owns a house
  if (doesBoyOwnHouse === "yes") dowry += 500000;

  // Add monthly income
  dowry += monthlyIncome;

  const result = document.getElementById("result");

  if (
    girlsEducation === "select" ||
    boysEducation === "select" ||
    boysJobStatus === "select" ||
    doesBoyOwnHouse === "select"
  ) {
    result.innerHTML = "Please select all required fields.";
  } else {
    result.innerHTML = `Dowry Amount: ₹${formatINR(dowry)}`;
    // Show a random quote after calculation
    const quotes = [
      "Say no to dowry, yes to equality",
      "The Dowry Prohibition Act was passed in 1961",
      "Real love doesn't come with a price tag",
      "It is an offence to both take dowry and give dowry",
      "As long as she is wise and good, a girl has sufficient dowry",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    showQuotePopup(randomQuote);
  }

  // Hide the loading bar and calculating text after results are displayed
  setTimeout(() => {
    hideLoadingBar(); // Properly hide the loading bar
    calculatingInProgress = false; // Reset flag once calculation is complete

    // Re-enable the "Calculate Dowry" button after results are displayed
    document.getElementById("calculateBtn").disabled = false;
  }, 500); // Slight delay to ensure it hides immediately after dowry amount is calculated
}

// Function to display the funny message
function displayFunnyMessage() {
  const result = document.getElementById("result");
  const funnyMessages = [
    "Bro, focus on your career before dowry dreams! 🫢",
    "No house? No money? Better luck next life! 😅",
    "Maybe work on building your net worth first? 🤷‍♂️",
    "Looks like you're on the 'No Dowry' plan by default! 😂",
  ];
  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  result.innerHTML = randomMessage;

  // Show a funny quote popup
  showQuotePopup(" Dowry Prohibited: Earn first, then dream! 🤣");

  // Hide the loading bar and calculating text immediately
  hideLoadingBar();

  // Reset calculation flag
  calculatingInProgress = false;

  // Re-enable the "Calculate Dowry" button
  document.getElementById("calculateBtn").disabled = false;
}

// Function to format INR
function formatINR(number) {
  number = number.toString().replace(/[^0-9]/g, "");
  if (!number) return "";
  if (number.length <= 3) return number;

  let [integer, decimal] = number.split(".");
  let lastThreeDigits = integer.slice(-3);
  let otherDigits = integer.slice(0, integer.length - 3);
  if (otherDigits !== "") lastThreeDigits = "," + lastThreeDigits;
  let formattedInteger = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
  return formattedInteger + (decimal ? "." + decimal : "");
}

// Function to show the loading bar
function showLoadingBar() {
  const calculatingText = document.getElementById("calculatingText");
  const loadingBar = document.getElementById("loadingBar");

  calculatingText.style.display = "block";
  loadingBar.style.display = "block";
  loadingBar.style.width = "0%";

  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += 5;
    loadingBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(loadingInterval);
    }
  }, 100);
}

// Function to hide the loading bar
function hideLoadingBar() {
  document.getElementById("calculatingText").style.display = "none";
  document.getElementById("loadingBar").style.display = "none";
}

// Function to show a quote popup
function showQuotePopup(quote) {
  // Only show the popup if it isn't already visible
  if (quotePopupVisible) return;

  const quotePopup = document.getElementById("quotePopup");
  const quoteText = document.getElementById("quoteText");

  quoteText.textContent = quote;
  quotePopup.style.display = "block";
  quotePopupVisible = true;

  // Disable the calculate button while the quote is visible
  document.getElementById("calculateBtn").disabled = true;

  // Attach a click event to hide the quote and enable the button when "Calculate" is clicked again
  document.getElementById("calculateBtn").addEventListener("click", () => {
    if (quotePopupVisible) {
      quotePopup.style.display = "none";
      quotePopupVisible = false;

      // Re-enable the calculate button
      document.getElementById("calculateBtn").disabled = false;
    }
  });
}

// Attach the calculate button event
document.getElementById("calculateBtn").addEventListener("click", () => {
  if (!calculatingInProgress) {  // Ensure that we don't trigger loading again
    showLoadingBar();
    setTimeout(calculateDowry, 5000); // Simulate loading for 5 seconds
  }
});
