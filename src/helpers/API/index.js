import axios from 'axios';




const API_BASE_URL = 'http://localhost:8000/dcs.abu.edu.ng'
const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const login = (params) => {
   return client.post('/user/login',params)
}

export const postComplain = (params) => {
   return client.post('/email/send-complain',params)
}

export const fetchAdmin = () => {
   return client.get('/user/admin')
}
export const fetchComplain = () => {
   return client.get('/user/email')
}

export const account = () => {
   return client.post('/user/register')
}


