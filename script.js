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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText); //destructure
//     console.log(data);

//     const html = `
//           <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//             <p class="country__row"><span>💰</span>${data.currencies.EUR}</p>
//           </div>
//         </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('Portugal');
// getCountryData('usa');
// getCountryData('germany');

const getCountrAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText); //destructure
    console.log(data);

    //render country
    renderCountry(data);

    const [neighbour] = data.borders;
    if (!neighbour) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(request2.responseText); //destructure
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountrAndNeighbour('usa');

// //...............
// const request1 = fetch(`https://restcountries.com/v3.1/name/Portugal`);
// console.log(request1);
// //...............
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('Portugal');

//Summarization
const getJSON = function (url, errorMSG = 'Something went worng') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMSG} (${response.status})`);
    return response.json();
  });
};
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Neighbour not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} ⚡⚡⚡`);
      renderError(`Something went wrong ⚡⚡ ${err.message}. Try again!`);
    })
    .finally(() => {});
};

btn.addEventListener('click', function () {
  getCountryData('iran');
});

// اجرای تابع با یک نام کشور وجود ندارد
getCountryData('hdshdh');
