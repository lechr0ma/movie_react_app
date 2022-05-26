import axios from "axios";

class ItemsService {
    fetchTrendy = async () => {
        const data = {
            data: [], error: null
        }
        try {
            const response = await axios.get('http://115.178.77.231:19300/movie/trendy')
            data.data = response.data
        } catch (e) {
            data.error = e.message
        }
        return data
    }
    fetchMoreTrendy = async (offset) => {
        const data = {
            data: [], error: null
        }
        try {
            const response = await axios.get(`http://115.178.77.231:19300/movie/trendy?offset=${offset}`)
            data.data = response.data
        } catch (e) {
            data.error = e.message
        }
        return data
    }
    fetchByQuery = async (query) => {
        const data = {
            data: [], error: null
        }
        try {
            const response = await axios.get(`http://115.178.77.231:19300/${query.media_type}/search`, {
                params: query
            })
            data.data = response.data
        } catch (e) {
            data.error = e.message
        }
        return data
    }
    updateItem = async (item) => {
        const response = await axios.patch(`http://115.178.77.231:19300/${item.media_type}/id/`, item)
        return response.data
    }
    deleteItem = async (item) => {
        const response = await axios.delete(`http://115.178.77.231:19300/${item.media_type}/id/`, {
            data: {
                id: item.id
            }
        })
        return response.data
    }
    addItem = async (item) => {
        const response = await axios.post(`http://115.178.77.231:19300/${item.media_type}/id/`, item)
        return response.data.rows[0]
    }
}

export default new ItemsService()