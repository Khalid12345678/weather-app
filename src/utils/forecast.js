const request = require('postman-request')

const baseUrl = 'http://api.weatherstack.com/current'
const accessKey = 'ba93dc834dc9ca9727e29c4a33f6c8b5'

const foreCast = (address, callback) => {
    const url = baseUrl + '?access_key=' + accessKey + '&query=' + encodeURIComponent(address)

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.success === false){
            console.log(body)
            callback('Location not found please try with other location.', undefined)
        }
        else if(body.current.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, body)
        }
    });
}

//Export module
module.exports = foreCast