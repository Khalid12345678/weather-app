var formSelector = document.querySelector('form');
if(formSelector){
    formSelector.addEventListener('submit',(e)=>{
        e.preventDefault()
        var location = document.querySelector('input').value
        var error = document.querySelector('#error')
        var desc = document.querySelector('#desc')
        var weatherInfo = document.querySelector('#weather_info')
        var image = document.querySelector('#weather-img')
    
        error.textContent = ""
        weatherInfo.textContent = ""
        image.src = ""
        desc.textContent = "Loading..."
        fetch("/weather?address=" + location).then((response) =>{
            response.json().then((data) => {
                if(data.error){
                    error.textContent = data.error
                    desc.textContent = ""
                }else{
                    
                    image.src = data.img,
                    desc.textContent = data.weatherDesc,
                    weatherInfo.textContent = data.weatherInfo
                }
            })
        })
    })
}



