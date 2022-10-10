const express = require('express')
const path = require('path')
const hbs = require('hbs')
const foreCast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 315

//directory path
const publicDirctoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views',  viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirctoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: "Weather",
        name: "Khalid Naseer"
    })
})
app.get('/about-us', (req, res) => {
    res.render('about',{
        title: "About Us",
        name: "Khalid Naseer"
    })
})
app.get('/contact-us', (req, res) => {
    res.render('contact',{
        title: "Contact Us",
        name: "Khalid Naseer"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "The location field is required!"
        })
    }
    foreCast(address, (error, {location, current} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            weatherDesc: 'The current temprature of the ' + location.name + ' (' + location.region + ' ' + location.country + ') is '+ current.temperature + '℃ and it is feels like ' + current.feelslike + '℃.' + ' The weather condition is ' + current.weather_descriptions[0] + ' with ' + current.cloudcover + '% cloud. ' + 'The wind direction is '+ current.wind_dir + ' with speed ' + current.wind_speed + ' km/h.',
            img: current.weather_icons[0],
            weatherInfo: current.weather_descriptions[0]
        })
    })
})


app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: "404",
        name: "Khalid Naseer",
        errorMessage: "Help article not found."
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: "404",
        name: "Khalid Naseer",
        errorMessage: "Page not found."
    })
})

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})

