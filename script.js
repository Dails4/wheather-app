const apiKey = 'e9a5d3b74bf84418b11193028231901';

const header = document.querySelector('.header');
const form = document.querySelector('.form');
const input = document.querySelector('.input');

const cloud = document.querySelector('.clouds');


function removeCard() {
	const prevCard = document.querySelector('.card');
	if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
	const html = `<div class="card">${errorMessage}</div>`;

	header.insertAdjacentHTML('afterend', html);
}

function showCard({ name, country, temp, img, condition }) {
	const html = `<div class="card">
                                <h2 class="city">${name} <span>${country}</span></h2>

                                <div class="weather">
                                    <div class="value">${temp}<sup>°c</sup></div>
                                    <img class="card-img" src="${img}" alt="Weather">
                                </div>

                                <div class="description">${condition}</div>
                            </div>`;

	header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
    return data;
}

form.onsubmit = async function (e) {
	e.preventDefault();

	let city = input.value.trim();
    const data = await getWeather(city);

    if (data.error) {
		removeCard();
		showError(data.error.message);
	} else {
		removeCard();

        const weatherData = {
			name: data.location.name,
			country: data.location.country,
			temp: data.current.temp_c,
            img: data.current.condition.icon,
			condition: data.current.condition.text,
		};

		showCard(weatherData);
	}
};