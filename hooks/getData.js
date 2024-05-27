import axios from "axios"

export async function getData(url, headers) {
    try {
        const data = await axios.get(`http://127.0.0.1:8000/api${url}`, {
            headers
        })
        return data ?? []
    } catch (error) {
        console.log(error)
    }
}



export async function updateData(url, headers, datas) {
    try {

        const data = await axios.patch(`http://127.0.0.1:8000/api${url}`, datas, {
            headers
        })
        return data ?? []
    } catch (error) {
        console.log(error)
    }
}

export async function postData(url, datas, headers) {
    console.log(headers)
    try {

        const data = await axios.post(`http://127.0.0.1:8000/api${url}`, datas, { headers })
        return data ?? []
    } catch (error) {
        console.log(error)
    }
}