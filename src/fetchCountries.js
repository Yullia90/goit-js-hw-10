//*========== виносиммо в змінні данні URL і фільтра ===============
const URL = `https://restcountries.com/v3.1/name/`;
const OPTIONS = 'name,capital,population,flags,languages';

//*=========== повертає проміс і передаємо далі для обробки =============

export function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${OPTIONS}`).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}
