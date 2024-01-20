import axios from "axios";

const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_API_WEATHER_KEY}`
const getWeatherWhitCaptial = capital => {
    const options = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }
    const request = axios.get(`${url}&q=${capital}`, options)
    return request.then(response => response.statusText)
}

export default { getWeatherWhitCaptial }