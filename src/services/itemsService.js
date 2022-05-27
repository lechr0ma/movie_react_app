import axios from "axios";

class ItemsService {
    fetchTrendy = async () => {
        const response = await axios.get('http://115.178.77.231:19300/movie/trendy')
        return response.data
    }
    fetchMoreTrendy = async (offset) => {
        const response = await axios.get(`http://115.178.77.231:19300/movie/trendy?offset=${offset}`)
        return response.data
    }
    fetchByQuery = async (query) => {
        const response = await axios.get(`http://115.178.77.231:19300/${query.media_type}/search`, {
            params: query
        })
        return response.data
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