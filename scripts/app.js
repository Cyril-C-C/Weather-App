const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // Destructure Properties

    const { cityDets, weather } = data;

    // Update details template

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
            <section class="my-3">${weather.WeatherText}</section>
            <section class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </section>
    `;

    // Update the night/day & icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null;
    // if (weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    
    // Ternary Operator
    
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // Remove the d-none class if present

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    };

};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};

};

cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();

    // Update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});