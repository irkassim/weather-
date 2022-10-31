
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//update UI with weather info

console.log(time, icon);

const updateUI = (data)=>{
	//const cityDets = data.cityDets;
	//const weather = data.weather;

	const {cityDets, weather} = data;

	details.innerHTML= `
		<div class="text-muted text-uppercase text-center details">
				<h5 class="my-3">${cityDets.EnglishName}</h5>
				<div class="my-3">${weather.WeatherText}</div>
				<div class="display-4 my-4">
					<span>${weather.Temperature.Metric.Value}</span>
					<span>&deg;</span>
				</div>
	`;

	

	//update the night/day & icon images
	let timeSrc = weather.IsDayTime ? 'img/day.svg.webp' : 'img/night.svg.webp';

	//if(weather.IsDayTime){
	//	timeSrc='img/night.svg.webp';
	////	timeSrc='img/night.svg.webp';
	//}

	time.setAttribute('src', timeSrc);

	if(card.classList.contains('d-none')){
		card.classList.remove('d-none');
	};

	//setting icon for weather conditions

	  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	  icon.setAttribute('src', iconSrc);
};


//updating city

//const updateCity = async(city) =>{
//	const cityDets = await getCity(city);
//	const weather = await getWeather(cityDets.Key);

//	return{
//		cityDets,
//		weather};
//};

 if(localStorage.getItem('city')){

	forecast.updateCity(localStorage.getItem('city'))
		.then(data => updateUI(data))
		.catch(err=> console.log(err));
}
	  

cityForm.addEventListener('submit', e =>{

	//prevent defautl action
	e.preventDefault();
	

	//getCity value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	//update UI with new city
	forecast.updateCity(city)
		.then(data => updateUI(data))
		.catch(err => console.log(err));

	//setting local storage

	localStorage.setItem('city', city);
	localStorage.clear();
});

