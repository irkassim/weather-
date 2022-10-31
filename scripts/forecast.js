class Forecast{

	constructor(){
		this.key = 'B1LsmheJyIfGqtles64kXCdLLXphrARG';
		this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
		this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';	
	};

	async updateCity(city){

		const cityDets = await this.getCity(city);
		const weather = await this.getWeather(cityDets.Key);
		return{cityDets, weather};
	};

	async getCity(city){

		const query = `?apikey=${this.key}&q=${city}`;
		const response = await fetch(this.cityURI + query);
		const data = await response.json();
		return data[0];
	};

	async getWeather(id){

		const query = `${id}?apikey=${this.key}`;
		const response = await fetch(this.weatherURI + query);
		const data = await response.json();
		//console.log(data);
		return data[0];


	};
};



/*
const key = 'B1LsmheJyIfGqtles64kXCdLLXphrARG';

//get weather
const getWeather = async (id) =>{

	const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();
	//console.log(data);
	return data[0];
}

//Get city

const getCity = async (city) =>{

	const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
	const query = `?apikey=${key}&q=${city}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];
};



 getCity('accra').then( data =>{
 	return getWeather(data.Key);
 }).then(data => {
 	console.log(data);
 })
 .catch(err => console.log(err));

getWeather("178551");

*/


