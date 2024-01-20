import axios from 'axios'

const url = import.meta.env.VITE_APP_COUNTRIES_API_URL
const getCountries = () => {
    return axios.get(`${url}/all`)
}

const getWithName = name => {
    return axios.get(`${url}/name/${name}`)
}

const countrieLike = likeName => {
    return axios.get(`${url}/name/${likeName}`)
}

export default { getCountries, countrieLike, getWithName }