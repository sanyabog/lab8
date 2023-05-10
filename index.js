// підключаємо бібліотеку Axios щоб робити HTTP-запити
const axios = require('axios').default;
// підключаємо вбудовану бібліотеку readline
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// API url
const urlBase = 'https://restcountries.com/v3.1/name/';
// вводимо назву країни
readline.question('Enter country: ', country => {
  // визначаємо url
  const url = urlBase + country;
  // робимо HTTP-запит
  axios.get(url)
    // якщо сталася помилка, виводимо повідомлення
    .catch(err => console.log('Country not found!'))
    .then(response => {
      // якщо запит невдалий, або статус код не 200(коли все норм)
      // тоді нічого виводити не потрібно, виходимо з функції
      if (!response || response.status != 200)
        return;
      // достаємо перший елемент з масиву даних
      const data = response.data[0];
      // достаємо офіційну назву країни
      const name = data.name.official;
      // достаємо назву регіона
      const region = data.region;
      // достаємо назву столиці
      const capital = data.capital;
      // виводимо інформацію
      console.log('Name: ' + name);
      console.log('Capital: ' + capital);
      console.log('Region: ' + region);
    })
    // в кінці потрібно виконати функцію close
    .finally(() => readline.close())
});
