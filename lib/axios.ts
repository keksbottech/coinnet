import axiosBase from 'axios'

export const axios = axiosBase.create({
    baseURL:'https://coinnet-server.onrender.com/api/'
})

// https://coinnet-server.onrender.com