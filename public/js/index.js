var formSelector = document.querySelector('form');
if(formSelector){
    formSelector.addEventListener('submit',(e)=>{
        e.preventDefault()
        var location = document.querySelector('input').value
        var error = document.querySelector('#error')
        var desc = document.querySelector('#desc')
        var weatherInfo = document.querySelector('#weather_info')
        var image = document.querySelector('#weather-img')
        var region = document.querySelector('#region')
    
        error.textContent = ""
        weatherInfo.textContent = ""
        image.src = ""
        region.textContent = ""
        desc.textContent = "Loading..."
        fetch("/weather?address=" + location).then((response) =>{
            response.json().then((data) => {
                if(data.error){
                    error.textContent = data.error
                    desc.textContent = ""
                }else{
                    region.textContent = data.region,
                    image.src = data.img,
                    desc.textContent = data.weatherDesc,
                    weatherInfo.textContent = data.weatherInfo
                }
            })
        })
    })
}



