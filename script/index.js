//listen for submits

const submit = document.querySelector("#loan-form");
submit.addEventListener("submit", function (e) {
  document.querySelector("#results").style.display = "none";

  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

//calculating results

function calculateResults() {
  console.log("calculating...");
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#Years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const mpay = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * mpay * calculatedInterest) / (mpay - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.querySelector("#results").style.display = "block";

    document.querySelector("#loading").style.display = "none";
  } else {
    showError("please check your number");
  }
}

function showError(error) {
  document.querySelector("#results").style.display = "none";

  document.querySelector("#loading").style.display = "none";

  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 2000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
