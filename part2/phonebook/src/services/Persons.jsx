import axios from 'axios'

const url = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(r => r.data)
}

const update = (id, object) => {
    const request = axios.put(`${url}/${id}`, object)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.statusText)
}

export default { getAll, create, update, deletePerson }