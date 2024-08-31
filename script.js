'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(
      ', '
    )}</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)[0]].name
    }</p>
  </div>
</article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const key = '908799934974028841283x8131';
const whereAMI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1=xml&auth=${key}`)
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`problem with geocofing ${res.status}`);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`you are in ${data.city},${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`country not found (${Response.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} 🌟`));
};
whereAMI(19.037, 72.873);

//This program simulates a lottery draw randomly determining whether you win or lose after a brief suspense
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lotter draw is happening ✈');
  tsetTimeou(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🏆');
    } else {
      reject(new Error('you lost your money 💩'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//promisifying setTimeOut
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));
