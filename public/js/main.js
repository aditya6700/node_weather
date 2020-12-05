const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const cityOut = document.getElementById('cityOut');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');

const getInfo = async (e) => {
    e.preventDefault();

    let cityVal = cityName.value;
    if(cityVal === ''){
        cityOut.innerText = 'Enter city name and search again';
        dataHide.classList.add('data_hide');
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=4b21b8fb62017952d9b0f3c9ba7706f5`;
            const response = await fetch(url);
            const data = await response.json();
            const myArr = [data];

            cityOut.innerText = `${myArr[0].name}, ${myArr[0].sys.country}`;
            temp_real_val.innerText = myArr[0].main.temp;
            const tempStatus = myArr[0].weather[0].main;

            // condition to check sunny or cloudy
            if (tempStatus === "Clear") {
                temp_status.innerHTML =
                "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempStatus === "Clouds") {
                temp_status.innerHTML =
                "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus === "Rain") {
                temp_status.innerHTML =
                "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }else if (tempStatus === "Smoke") {
                temp_status.innerHTML =
                "<i class='fas fa-smog' style='color: #f1f2f6;'></i>";
            } else {
                temp_status.innerHTML =
                "<i class='fas fa-sun' style='color:#f1f2f6;'></i>";
            }

            dataHide.classList.remove('data_hide');
            cityVal = '';

        }catch(error){
            console.log(error)
            cityOut.innerText = 'Please enter city name correctly';
            dataHide.classList.add('data_hide');
        }      
    };

};

submitBtn.addEventListener('click',getInfo);