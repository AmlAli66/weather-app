const apiKey = '1228b0c7766e434683292832240207';
let locationInput = document.querySelector('#locationInput');

locationInput.addEventListener("change", () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationInput.value}&days=3`;
    getData(url)
})

navigator.geolocation.getCurrentPosition(currentPosition)

function currentPosition(location) {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let currentlocation = `${lat},${lon}`
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${currentlocation}&days=3`;
    getData(url)

}

async function getData(url) {
    let api = await fetch(url);
    let response = await api.json();
    console.log(response);
    displayWeather(response);
}

function displayWeather(data) {
    const forecastRow = document.querySelector('#forecastRow');
    const todayWeather = document.querySelector('#todayWeather');
    let forecastData = data.forecast.forecastday
    console.log(forecastData);
    var todayBox = `
        <div class="card  w-75 m-auto p-1">
            <div class=" row w-100 ">
                <div class="col-md-3 ps-5">
                    <img src="images/Sunny day-bro.png" class="style-img w-100 " alt="">
                </div>
                <div class="col-md-9 ">
                    <div class="container fs-6">
                        <div class="today-card">
                            <p class=" city fs-3 mb-0">${data.location.name}</p>
                            <p class="city">Today</p>
                            <div class="weather m-0">${data.current.condition.text} <img src="${data.current.condition.icon}" alt=""></div>
                            <p class="temp fs-1 m-0 p-0">${data.current.temp_c}°</p>
                            <div class="row">
                                <div class=" col-md-3 ">
                                    <div class="minn  d-flex justify-content-center align-items-center gap-2"></div>
                                    <div class="minHeading"><img src="images/wind.png" class="wind-icon" alt="">
                                    </div>
                                    <p class="minTemp fs-6">${data.current.wind_kph} km/h</p>
                                </div>
                                <div class=" col-md-3 ">
                                <div class="maxx d-flex justify-content-center align-items-center gap-2 ">
                                    <div class="maxHeading"><img src="images/humidity.png" class="wind-icon" alt="">
                                    </div>
                                    <p class="maxTemp fs">${data.current.humidity} %</p>
                                </div>
                            </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    `;
    var forecastBox = ``;
    for (var i = 0; i < forecastData.length; i++) {
        let date = new Date(forecastData[i].date);
        let day = date.toLocaleDateString("en-us", { weekday: "long" });
        let month = date.toLocaleDateString("en-us", { month: "short" });
        forecastBox += `
                        <div class="col-md-4 overflow-hidden">
                    <div class="cardContainer overflow-hidden">
                        <div class="card overflow-hidden">
                            <p class="day">${day}</p>
                            <p class="day">${forecastData[i].date.slice(-2)} ${month}</p>
                            <p class="weather text-uppercase">${forecastData[i].day.condition.text}</p>

                            <img src="${forecastData[i].day.condition.icon}" alt="">
                            <p class="temp">${forecastData[i].day.avgtemp_c}°</p>
                            <div class="minmaxContainer">
                                <div class="min">
                                    <p class="minHeading mb-1">Min</p>
                                    <p class="minTemp ">${forecastData[i].day.mintemp_c}°</p>
                                </div>
                                <div class="max">
                                    <p class="maxHeading mb-1">Max</p>
                                    <p class="maxTemp">${forecastData[i].day.maxtemp_c}°</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        `
    }
    forecastRow.innerHTML = forecastBox;
    todayWeather.innerHTML = todayBox

}



