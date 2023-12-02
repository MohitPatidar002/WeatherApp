let TempDisplay = document.getElementById('showTemp');
let cloudImg = document.querySelector('[data-cloudImg]');
let CloudDisplay = document.getElementById('showCloud');
let CurrHumidity = document.getElementById('Humidity');
let pressure = document.getElementById('Pressure');
let windspeed = document.getElementById('WindSpeed');
let box = document.getElementById('mainDiv');
let submitForm = document.querySelector('[data-form]');
let inputvalue = document.querySelector('#searchCity');
let cityName = document.querySelector('#cityName');  
let countryflag = document.querySelector('#countryFlag');
let loadingImg = document.querySelector('#loadingImg');
let api = '3a88fa84b7d2ded2999d4212a3b2a9e8';



submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = inputvalue.value;

    if(city === ""){
        return;
    }
    else{
        showWeatherData(city); 
    }
})


async function showWeatherData(city){
    loadingImg.classList.add('active');
    cityName.classList.remove('active');
    countryflag.classList.remove('active');
    cloudImg.classList.remove('active');
    box.classList.remove('active');
    TempDisplay .classList.remove('active');


    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);
    let data = await response.json();
    console.log(data);
    
    loadingImg.classList.remove('active');
    TempDisplay .classList.add('active');
    cityName.classList.add('active');
    countryflag.classList.add('active');
    cloudImg.classList.add('active');
    box.classList.add('active');

    PutWeatherData(data);
}

function PutWeatherData(data){
    cityName.innerText = `${data?.name.toUpperCase()}`;
   countryflag.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;

   TempDisplay.innerText = `${data.main.temp.toFixed(2)} °C`;
   cloudImg.src=`https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;

   windspeed.innerText = `${data.wind.speed.toFixed(2)}m/s`;
   CurrHumidity.innerText = `${data.main.humidity}%`;
   CloudDisplay.innerText = `${data?.weather?.[0]?.main}`;
}

