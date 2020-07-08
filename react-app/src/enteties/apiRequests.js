import axios from 'axios'

const apiUrl = 'http://localhost:8080/api/'
const config = { headers: { crossorigin: true }}

export const signup = async (data) => {
    try {
        const res = await axios.post(`${apiUrl}auth/signup`, data, config)
        config.headers.authorization = `Bearer ${res.data.token}`

        return {status: true, data: res.data.token}
    } catch (err) {
        console.log(err)
        return {status: false, data: err.response.data.message}
    }
   
}

export const signin = async (data) => {
    try {
        const res = await axios.post(`${apiUrl}auth/signin`, data, config)
        config.headers.authorization = `Bearer ${res.data.token}`

        return {status: true, data: res.data.token}
    } catch (err) {
        console.log(err)
        return {status: false, data: err.response.data.message}
    }
}

export const getCandidates = async () => {
    try {
        const res = await axios.get(`${apiUrl}candidates`, config)
        return res.data.data
    } catch (err) {
        console.log(err)
        return []
    }
}