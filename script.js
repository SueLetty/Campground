//code for getting user current coordinates
const onSuccess = (position) =>{
    const userLat = position.coords.latitude;
    const userLong = position.coords.longitude;

}

const onError = (error) => {
    console.error(error);
}
    
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//signup button event
function addUser(event){
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const uname = document.getElementById("uname").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    
    let currentList;
            
    if (window.localStorage.getItem("userLists")) {
        currentList = JSON.parse(window.localStorage.getItem("userLists"));
        console.log(currentList)
    } else {
        currentList = [];
    }
    
    const userData = {
        fName: fname,
        lName: lname,
        uName: uname,
        password: password,
        Email: email,
    }
    
    currentList.push(userData);
    window.localStorage.setItem("userLists", JSON.stringify(currentList));
    window.location = "login.html";
         
}

// login button event
    function loginEvent(event){
    event.preventDefault();
    
    let userList = JSON.parse(window.localStorage.getItem("userLists"));
    console.log(userList);
    const uname = document.getElementById("username_login").value;
    const password = document.getElementById("password_login").value;
    
    for(const i = 0; i < userList.length; i++){
        const name = userList[i].fName;
        
        if(userList[i].uName == uname){
            if(userList[i].passWord == password){
                
                window.location = "index.html";
            }
            else{
                alert("Your User name does not match your password!");
            }
        } 
        if(userList[i].password == password){
            if(userList[i].uName == uname){
                window.location = "index.html";
            }
            else{
                alert("Your User name does not match your password!");
            }
        }
    }
    const greeting = document.querySelector("#menu").createElement("p");
    
}

// using city name and state name to get longitude and latitude
function addEventToSearchBtn(event){
    event.preventDefault();

    //use this to call your API index 0 is latitude, index 1 is longitude
    // var destinationCoords = [];
    const cityName = city.value;
    const stateName = state.value;
    let newCityName;
    let destinationLat;
    let destinationLon;

    document.getElementById('form_btn').reset();

    let coord_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=6a78d426e59589643788ea1b6371579f`;

    if(cityName.includes(" ")){
        newCityName = cityName.replace(" ", "%20");
        coord_API = `http://api.openweathermap.org/geo/1.0/direct?q=${newCityName}&limit=10&appid=6a78d426e59589643788ea1b6371579f`;

    }

    fetch(coord_API)
    .then((res) => res.json())
    .then((data) => {
        for(const result of data){
            if(result["name"] === cityName && result["state"] === stateName){
                destinationLat = result["lat"]
                destinationLon = result["lon"];
                
            }
        }
    })
}