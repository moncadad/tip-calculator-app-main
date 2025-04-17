const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("qty-of-ppl");
const customTipPercent = document.getElementById("customTip");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("totalAmount");
const resetButton = document.getElementById("resetButton");
const tipButtons = document.querySelectorAll(".tip .tip__btn");

const erroMessage = document.querySelector(".error-msg");

tipButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    if (billAmount.value === "") return;

    if (numberOfPeople.value === "") {
      addError();
      // numberOfPeople.value = 1;
    }

    calculateTip(
      parseFloat(billAmount.value),
      parseInt(tipValue),
      parseInt(numberOfPeople.value)
    );
  });
});

customTipPercent.addEventListener("blur", (e) => {
  if (billAmount.value === "") {
    resetEverything();
    return;
  }
  if (numberOfPeople.value === "") {
    addError();
    // numberOfPeople.value = 1;
  }

  calculateTip(
    parseFloat(billAmount.value),
    parseFloat(e.target.value),
    parseInt(numberOfPeople.value)
  );
});

numberOfPeople.addEventListener("blur", (e) => {
  removeError();
});

function calculateTip(billAmount, tipPercentage, numberOfPeople) {
  resetButton.classList.add("active");
  let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `${tip}`;
  billTotalPerPerson.innerHTML = `${totalAmount}`;
}

resetButton.addEventListener("click", resetEverything);

function resetEverything() {
  billTipAmount.innerHTML = "$0.00";
  billTotalPerPerson.innerHTML = "$0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercent.value = "";
  resetButton.classList.remove("active");
  removeError();
}

function removeError() {
  erroMessage.classList.remove("on");
  numberOfPeople.classList.remove("on");
}

function addError() {
  erroMessage.classList.add("on");
  numberOfPeople.classList.add("on");
}
