// 8) Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується,
// а розмітка списку країн або інформації про країну зникає

// 10) Якщо у відповіді бекенд повернув більше ніж 10 країн,
// в інтерфейсі з'являється повідомлення про те, що назва повинна бути специфічнішою.

// 13) Якщо результат запиту - це масив з однією країною, в інтерфейсі відображається розмітка картки з даними про країну:
// прапор, назва, столиця, населення і мови.

//! fetch не вважає 404 помилкою, тому необхідно явно відхилити проміс, щоб можна було зловити і обробити помилку.
// 15) Додай мінімальне оформлення елементів інтерфейсу

import './css/styles.css';
// 14) Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив, а помилку
// овідомлення "Oops, there is no country with that name"
// використовуючи бібліотеку notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//7) Використовуй пакет lodash.debounce.
var debounce = require('lodash.debounce');
//* імпорт функції fetchCountries  // 2) Винеси її в окремий файл fetchCountries.js і зроби іменований експорт
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
//*===================== доступ до тегів =========================================
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// /*===================== слухач на інпут =========================================
input.addEventListener('input', debounce(onLookingForCountry, DEBOUNCE_DELAY));
//*===============================================================================
function onLookingForCountry(event) {
  let inputValue = '';
  //   Виконай санітизацію введеного рядка методом trim()
  inputValue = event.target.value.trim();
  //* очищаємо сторінку перед новим пошуком і при очищенні інпута
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  //* якщо порожній рядок запит не робимо
  if (inputValue.length === 0) return;

  fetchCountries(inputValue)
    .then(country => markupSelectionCountries(country))
    .catch(onFetchError);
}
//*================= логіка присвоєння розмітки ======================
function markupSelectionCountries(data) {
  if (data.length === 1) {
    createMarkupCountriInfo(data);
  } else if (data.length > 1 && data.length <= 10) {
    createMarkupCountries(data);
  } else {
    onFetchInfo();
  }
}
//*================= виводимо помилки ================================
function onFetchInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
//*==================== розмітка для одної або 10 країн ==============
function createMarkupCountriInfo(array) {
  const markup = array
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
          <h2>Name: ${name.official}</h2>
          <p><span class="style">Capital:</span> ${capital}</p>
          <p><span class="style">Population:</span> ${population}</p>
          <img src ="${flags.svg}"alt="${flags.svg}"width="70" heigth ="50">
          <p><span class="style">Languages:</span> ${Object.values(
            languages
          ).join('', '')}
          </p>
        </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
// 12) Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
// Кожен елемент списку складається з прапора та назви країни.
function createMarkupCountries(array) {
  const markup = array
    .map(({ name, flags }) => {
      return `<li>
    <h2>Name: ${name.official}</h2>
    <img src ="${flags.svg}"alt="${flags.svg}"width="70" heigth ="50">
    </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
