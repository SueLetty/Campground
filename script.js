//code for getting user current coordinates

const onSuccess = (position) => {
  let userLong = position.coords.longitude;
  let userLat = position.coords.latitude;
  // API URL
  let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=6a78d426e59589643788ea1b6371579f`;
  const kelvin = 273;

  // Calling the API
  fetch(weatherAPI)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let temperature = Math.floor(data["main"]["temp"] - kelvin) * 1.8 + 32;
      local_temperature.textContent =
        "Current Local Temperature: " + temperature + "°F";
    });
};
const onError = (error) => {
  console.error(error);
};

navigator.geolocation.getCurrentPosition(onSuccess, onError);

//Code used to modify local current time.
let currentDate = new Date();
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let currentTime = hour + ":" + minutes;
document.querySelector(
  "#local_time"
).textContent = `Local Time: ${currentTime}`;

//signup button event
function addUser(event) {
  event.preventDefault();

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const uname = document.getElementById("uname").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  let currentList;

  if (window.localStorage.getItem("userLists")) {
    currentList = JSON.parse(window.localStorage.getItem("userLists"));
    console.log(currentList);
  } else {
    currentList = [];
  }

  const userData = {
    fName: fname,
    lName: lname,
    uName: uname,
    password: password,
    Email: email,
  };

  currentList.push(userData);
  window.localStorage.setItem("userLists", JSON.stringify(currentList));
  window.location = "login.html";
}

// login button event
function loginEvent(event) {
  event.preventDefault();

  let userList = JSON.parse(window.localStorage.getItem("userLists"));
  const uname = document.getElementById("username_login").value;
  const password = document.getElementById("password_login").value;

  let flag = false;

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].uName === uname && userList[i].password === password) {
      flag = true;
      window.location = "index.html";
    }
  }

  if (!flag) {
    alert("Your User name does not match your password!");
    window.location = "login.html";
  }
}

let deleteCounter = 0;
// using city name and state name to get longitude and latitude
function addEventToSearchBtn(event) {
 event.preventDefault();

 deleteCounter++;

  //use this to call your API index 0 is latitude, index 1 is longitude
  let destinationCoords = [];
  const inputCity = city.value;
  const inputState = state.value;
  const cityName =
    inputCity.charAt(0).toUpperCase() + inputCity.substring(1).toLowerCase();
  const stateName =
    inputState.charAt(0).toUpperCase() + inputState.substring(1).toLowerCase();
  let newCityName;

  document.getElementById("form_btn").reset();
  
  let coord_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=6a78d426e59589643788ea1b6371579f`;

  if (cityName.includes(" ")) {
    newCityName = cityName.replace(" ", "%20");
    coord_API = `http://api.openweathermap.org/geo/1.0/direct?q=${newCityName}&limit=10&appid=6a78d426e59589643788ea1b6371579f`;
  }

  fetch(coord_API)
    .then((res) => res.json())
    .then((data) => {

        for(const result of data){
            if(result["name"] === cityName && result["state"] === stateName){

                destinationCoords[0] = result["lat"]
                destinationCoords[1] = result["lon"];
                
            }
        } 
        //Code to remove carousel
        const carouselRemoval = document.getElementById("carouselExampleCaptions");
      
        if(deleteCounter === 1) {
          carouselRemoval.parentElement.removeChild(carouselRemoval);
        }



        //Creation of the left side coloumn.
        leftSide = document.querySelector(".col-md-2");

        leftSide.textContent = cityName + ", " + stateName;
        leftSide.style.color = "white";                                            //Placeholder for visuals 
        leftSide.style.paddingBottom = "600px";
        document.querySelector(".row").appendChild(leftSide);

        let leftTitle = document.createElement("h2");
        leftTitle.style.color = "white";
        leftTitle.style.display = "flex";
        leftTitle.style.justifyContent = "center";
        leftTitle.textContent = "Available Campgrounds"


        //Creation of the right side div which will hold the cards.
        rightSide = document.querySelector(".col-md-10");
        //rightSide.style.color = "white";                                           //Placeholder for visuals  
        //rightSide.textContent = "[Destinaions Cards]";
        rightSide.style.paddingBottom = "600px";
        rightSide.style.border = "5px solid red";
        document.querySelector(".row").appendChild(rightSide);
        
        //Flag to only add the Title once.
        if(deleteCounter === 1) {
          rightSide.appendChild(leftTitle);
        }
        
        
       

        let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${destinationCoords[0]}&lon=${destinationCoords[1]}&appid=6a78d426e59589643788ea1b6371579f`;
        const kelvin = 273;

        // Calling the API
        fetch(weatherAPI)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let temperature =
            Math.floor(data["main"]["temp"] - kelvin) * 1.8 + 32;
          let lowTemp =
            Math.floor(data["main"]["temp_min"] - kelvin) * 1.8 + 32;
          let highTemp =
            Math.floor(data["main"]["temp_max"] - kelvin) * 1.8 + 32;
          //insert thiz into the left bracket
          //Creation of the div within the left side column.
          weatherDiv = document.createElement("div");
          weatherDiv.setAttribute("id", "weather_div");
          weatherDiv.textContent =
            "Current Temp: " +
            temperature +
            "°F" +
            "          Low: " +
            lowTemp +
            "°F" +
            "\n High: " +
            highTemp +
            "°F"; //Place Weather variable here
          document.querySelector(".col-md-2").appendChild(weatherDiv);
        });

      //Fetch to get the time with the coordinates.
      let userUrl = `https://api.ipgeolocation.io/timezone?apiKey=8ae13e06e4a146dbb9bc8ee8617ed910&lat=${destinationCoords[0]}&long=${destinationCoords[1]}`;

      fetch(userUrl)
        .then((res) => res.json())
        .then((data) => {
            const destinationTime = data.date_time;

            //Creation of the div within the left side column.
            timeDiv = document.createElement("div");
            timeDiv.setAttribute("id", "time_div");            
            timeDiv.textContent = destinationTime;  //Place Weather variable here
            document.querySelector(".col-md-2").appendChild(timeDiv);
        });
        
        let baseUrl = `https://camp-sight7.herokuapp.com/`;
        let facilitiesParam = `facilities?`;
        let neededParam = 'query=Campground&full=true';
        let offsetLimit = 'limit=10&offset=0'
        let cityCoordinates = `latitude=${destinationCoords[0]}&longitude=${destinationCoords[1]}`;
        let radiusMiles = 25;
        let radiusParam = `radius=${radiusMiles}`;
        let updateReq = 'lastupdated=10-01-2018';
        let primaryFetch= baseUrl + `${facilitiesParam}${offsetLimit}&${cityCoordinates}&${radiusParam}&${updateReq}&${neededParam}`;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        let imageUrl;
        let campName;
        let description;

        let address;
        let phone;
        let facilitySite;

        fetch(primaryFetch, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
            for(const facility of data.RECDATA){
                
                imageUrl = facility.MEDIA[0].URL;
                campName = facility.FacilityName;
                description = facility.FacilityDescription;
                address = facility.FACILITYADDRESS[0].FacilityStreetAddress1; // take whole object and convert to string?
                phone = facility.FacilityPhone;
                //facilitySite = facility.ORGANIZATION[0].OrgURLAddress; //possible change for different address within object or diff api
                facilitySite = facility.FacilityID;

                createCard(imageUrl, campName, description, address, phone, facilitySite);
            }
        })
        .catch(error => console.log('error', error));

        

    }) //For out fetch
    
}    

function createCard(imageUrl, campName, description, address, phone, facilitySite) {
     //Creation of cards
     const cardTemplate = document.createElement("div");
     cardTemplate.classList.add("card"); //change from
     cardTemplate.style.width = "18rem";
     
     const cardImage = document.createElement("img");
     cardImage.classList.add("card-img-top");
     cardImage.setAttribute("src", imageUrl);
     cardImage.setAttribute("alt", imageUrl);
     cardTemplate.appendChild(cardImage);
     
     const cardBody = document.createElement("div");
     cardBody.classList.add("card-body")
     cardTemplate.appendChild(cardBody);
     
     const cardTitle = document.createElement("h5");
     cardTitle.classList.add("card-title");
     cardTitle.textContent = campName;
     cardBody.appendChild(cardTitle);
     
     const cardParagraph = document.createElement("p");
     cardParagraph.classList.add("card-text");
     cardParagraph.textContent = address;           //information in card
     cardBody.appendChild(cardParagraph);
     
     const linkTag = document.createElement("a");
     linkTag.classList.add("btn");
     linkTag.classList.add("btn-primary");
     linkTag.setAttribute("href", `https://www.recreation.gov/camping/campgrounds/${facilitySite}`);   
     linkTag.setAttribute("target", '_blank')     
     linkTag.textContent = "More Information";
     cardBody.appendChild(linkTag);
     
     document.querySelector(".col-md-10").appendChild(cardTemplate);
}
