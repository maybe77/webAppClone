const API_KEY="e5c3da00503a128364a08770c9616f72";
const weatherArray=["Thunderstorm","Drizzle","Rain","Snow","Mist","Smoke","Clear","Clouds"];
const icons={"Thunderstorm":"icon_01.png","Drizzle":"icon_02.png","Rain":"icon_03.png","Snow":"icon_04.png","Mist":"icon_05.png","Smoke":"icon_05.png","Clear":"icon_06.png","Clouds":"icon_07.png"};
const weatherContainer=document.querySelector(".weather");

// return corresponding weather icon
function checkWeather(weather){
    for(let i=0;i<weatherArray.length;i++){
        if(weather===weatherArray[i]) return icons[weatherArray[i]];
    }
    return false;
}

// fetch weather data and append new element to .weather node
function onGeoOk(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    const data_URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const iconURL="http://openweathermap.org/img/wn/10d@2x.png"
    let name,temp,weather;
    fetch(data_URL).then(response=>response.json()).then(data=>{
        name=data.name;
        temp=data.main.temp;
        weather=data.weather[0].main;
        let icon=document.createElement("img");
        let description=document.createElement("span")
        let location=document.createElement("span")
        icon.classList.add("icon");
        icon.setAttribute("src",`./src/img/${checkWeather(weather)}`)
        description.classList.add("description");
        description.innerText=`${Math.round(temp)}℃`;
        location.classList.add("location");
        location.innerText=`${name}`;

        // remove nodes that have previous weather data  
        while (weatherContainer.hasChildNodes()){
            weatherContainer.removeChild( weatherContainer.firstChild ); 
        }
        weatherContainer.appendChild(icon);
        weatherContainer.appendChild(description);
        weatherContainer.appendChild(location);
        console.log("weather reloaded");
    });
}

function onGeoError(){
console.log("Cannot get geolocation");
}

function weatherInfo(){
    navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
}

weatherInfo();
setInterval(weatherInfo,10000);
