import axios from 'axios'
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`

const getWeatherData = (capital, key, lang) => {
    const request = axios.get(`${baseUrl}?q=${capital},&APPID=${key}&units=metric&lang=${lang}`)
    return request.then(response => response.data)
}

export default {getWeatherData}