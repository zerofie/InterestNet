import axios from 'axios';

const api_key = '20bde9fcfaaa00a9750fee076eceaa2c';
const base_url = 'http://api.mediastack.com/v1/news';

const getNewsFromMediastack = async (query) => {
    try {
        const response = await axios.get(base_url, {
            params: {
                access_key: api_key,
                keywords: query,
                languages: 'en',
                limit: 10
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news data:', error);
        throw error;
    }
};

export default getNewsFromMediastack;
