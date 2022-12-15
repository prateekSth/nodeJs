const request = require("request");
const forecast = (longitude, latitude, callback) => {
  const forecastUrl = "http://api.weatherstack.com/current?access_key=b6bbd52c57b4dfb687e7c74fc48800bd&query="+ latitude +','+longitude;
  request({ url: forecastUrl, json: true }, (error, {body}={}) => {
    if (error) {
        callback('Unable to connect to weather server',undefined)
    }else if(body.error ){
        callback('unable to find location',undefined);
    } 
    else {
        // const data =body.current;
        callback(undefined,`It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike + 5} degree out there.`)
    }
  });
};

module.exports = forecast;
