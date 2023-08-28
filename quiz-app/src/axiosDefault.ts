import axios from 'axios'

const axiosExternal = axios.create({})

export function setAxiosDefault() {
    console.log('api url= ', "http://localhost:5000")
    axios.defaults.baseURL = "http://localhost:5000"
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json'
}

export function setToken(token: string) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export function getToken() {
    return axios.defaults.headers.common['Authorization']
}

export { axiosExternal }