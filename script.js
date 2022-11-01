//code for getting user current coordinates

const onSuccess = (position) =>{
    let userLong =position.coords.longitude; 
    let userLat = position.coords.latitude;
    // API URL
    let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=6a78d426e59589643788ea1b6371579f`;
    const kelvin = 273;

	// Calling the API
	fetch(weatherAPI)
		.then((response) => response.json())
		.then((data) => {
            console.log(data);
            let temperature = Math.floor(data["main"]["temp"] - kelvin) *1.8 + 32;
            local_temperature.textContent = "Current Local Temperature: " + temperature  +"°F";
        });
}
const onError = (error) => {
    console.error(error);
}
    
navigator.geolocation.getCurrentPosition(onSuccess, onError);

// using city name and state name to get longitude and latitude
form_btn.addEventListener("submit",(event) => {
    event.preventDefault();

    //use this to call your API index 0 is latitude, index 1 is longitude
    let destinationCoords = [];
    const cityName = city.value;
    const stateName = state.value;
    let newCityName;

    document.getElementById('form_btn').reset();

    let coord_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=6a78d426e59589643788ea1b6371579f`;

    if(cityName.includes(" ")){
        newCityName = cityName.replace(" ", "%20");
        const coord_API = `http://api.openweathermap.org/geo/1.0/direct?q=${newCityName}&limit=10&appid=6a78d426e59589643788ea1b6371579f`;

    }
    fetch(coord_API)
    .then((res) => res.json())
    .then((data) => {
        for(const result of data){
            if(result["name"] === cityName && result["state"] === stateName){
                destinationCoords[0] = result["lat"];
                destinationCoords[1] = result["lon"];
                
            }
        } 
        let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=6a78d426e59589643788ea1b6371579f`;
        const kelvin = 273;

        // Calling the API
        fetch(weatherAPI)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let temperature = Math.floor(data["main"]["temp"] - kelvin) *1.8 + 32;
                //insert thiz into the left bracket 
            });
        })
    
    console.log(destinationCoords);
    
})



