const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amounts-one"); 
const amountEl_two = document.getElementById("amounts-two"); 
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rates and update the DOM

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://prime.exchangerate-api.com/v5/de368c37acfa20d9977eb61c/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rates = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rates} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rates).toFixed(2);
    })
}



//event listeners

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);

currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const swapCurrency = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = swapCurrency;
  calculate();
})

calculate();