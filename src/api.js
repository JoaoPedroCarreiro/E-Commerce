import axios from "axios"

const cache = {}

function createApi() {
    const api = axios.create({ baseURL: "https://apiecommerce-4zp0u4mh.b4a.run" })
    
    return {
        get: async (url) => {
            if(cache[url]) return cache[url]

            const res = await api.get(url)
            cache[url] = res

            return res
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