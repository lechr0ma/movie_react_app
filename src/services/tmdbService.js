import axios from "axios";

class tmdbService {
    async fetchQuery(query) {
        const response = await axios.get(`https://api.themoviedb.org/3/search/${query.media}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query: query.search,
                page: query.page
            }
        })
        return response.data
    }
}
export default new tmdbService()