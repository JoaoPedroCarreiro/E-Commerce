import axios from "axios"

const cache = {}

function createApi() {
    const api = axios.create({ baseURL: "https://apiecommerce-4zp0u4mh.b4a.run"})
    
    return {
        get: async (url) => {
            if(cache[url]) return cache[url]

            const res = await fetch("https://apiecommerce-4zp0u4mh.b4a.run")
            const data = await res.json()
            console.log(data)

            // const res = await axios.get("https://apiecommerce-4zp0u4mh.b4a.run").then(res => {
            //     console.log("res data", res.data)
            //     return res
            // }).catch(err => {
            //     if (err.response) {
            //         console.log("Error Response")
            //         console.log(err.response.data)
            //         console.log(err.response.status)
            //         console.log(err.response.headers)
            //     } else if (err.request) {
            //         console.log("Error Request")
            //         console.log(err.request)
            //     } else {
            //         console.log("err Message")
            //         console.log('Error', err.message)
            //     }
            // })
            // cache[url] = res

            // return res
        },

        post: async (url, data) => {
            const res = await api.post(url, data)
            cache["/" + url.split("/")[1]] = res

            return res
        },

        delete: async (url) => {
            const res = await api.delete(url)
            cache["/" + url.split("/")[1]] = res

            return res
        },
    }
}

const api = createApi()

export default api