import axios from 'axios'

const BASE_URL = "https://postman-api-learner.glitch.me"

const testPostmanGetAPI = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/info`)
            console.log("testPostmanGetAPI-response.status", response.status);
            if (response.status == 200) {
                resolve(response.data)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const testPostmanPostAPI = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${BASE_URL}/info`, body)
            console.log("testPostmanGetAPI-response.status", response.status);
            if (response.status == 200) {
                resolve(response.data)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export {
    testPostmanGetAPI,
    testPostmanPostAPI
}