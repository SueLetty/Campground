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
    
}) //what is this closing brace for
        }

        //Code to remove carousel
        document.querySelector(".carousel").remove();

        //Fetch to get the time with the coordinates.
        let userUrl = `https://api.ipgeolocation.io/timezone?apiKey=8ae13e06e4a146dbb9bc8ee8617ed910&lat=${destinationCoords[0]}&long=${destinationCoords[1]}`;
        
        fetch(userUrl)
        .then((res) => res.json())
        .then((data) => {
            
            const destinationTime = data.date_time;

            //Creation of the left side coloumn.
            leftSide = document.createElement("div");
            leftSide.classList.add("col-md-2");
            leftSide.textContent = "Input information here";
            leftSide.style.color = "white";                                            //Placeholder for visuals 
            leftSide.style.paddingBottom = "600px";
            leftSide.style.border = "5px solid red";
            document.querySelector(".row").appendChild(leftSide);

            //Creation of the div within the left side column.
            timeDiv = document.createElement("div");
            timeDiv.setAttribute("id", "time_div");
            timeDiv.style.border = "5px solid white";                                  //Placeholder for visuals             
            timeDiv.textContent = destinationTime + " [Destinaion Weather Variable]";  //Place Weather variable here
            document.querySelector(".col-md-2").appendChild(timeDiv);

            //Creation of the right side div which will hold the cards.
            rightSide = document.createElement("div");
            rightSide.classList.add("col-md-10");
            rightSide.style.color = "white";                                           //Placeholder for visuals  
            rightSide.textContent = "[Destinaions Cards]";
            rightSide.style.paddingBottom = "600px";
            rightSide.style.border = "5px solid red";
            document.querySelector(".row").appendChild(rightSide);
            
            //Creation of cards
            cardTemplate = document.createElement("div");
            cardTemplate.classList.add("cardContainer")
            cardTemplate.style.width = "18rem";
            document.querySelector(".col-md-10").appendChild(cardTemplate);
            
            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.setAttribute("src", "...");
            cardImage.setAttribute("alt", "...");
            document.querySelector(".cardContainer").appendChild(cardImage);

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body")
            document.querySelector(".cardContainer").appendChild(cardBody);

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = "[Destination Title Variable]";
            document.querySelector(".card-body").appendChild(cardTitle);

            const cardParagraph = document.createElement("p");
            cardParagraph.classList.add("card-text");
            cardParagraph.textContent ="[This should be any dynamically pulled information from the campground api]";
            document.querySelector(".card-body").appendChild(cardParagraph);

            const linkTag = document.createElement("a");
            linkTag.classList.add("btn");
            linkTag.classList.add("btn-primary");
            linkTag.setAttribute("href", "...");                        //This needs a source
            linkTag.textContent = "More Information";
            document.querySelector(".card-body").appendChild(linkTag);
            //End of the card creation
    
        });

    }) //For out fetch
    
}) //For addEventListener    

//Code used to modify local current time.
let currentDate = new Date();
let currentTime = currentDate.getHours() + ":"  + currentDate.getMinutes();
document.querySelector("#local_time").textContent =`Local Time: ${currentTime}`;

