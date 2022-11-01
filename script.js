
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
    })
    console.log(destinationCoords);



})


