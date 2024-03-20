
import axios from 'axios';

const API_URL = 'https://nd8vuzlb9h.execute-api.ap-south-1.amazonaws.com/default/mysecondfunction';

export const fetchNewsData = async (interests) => {
  try {
    const response = await axios.get(API_URL, { params: { interests: interests.join(',') } });
    if (response.status !== 200) {
      throw new Error(`API request failed with status code: ${response.status}`);
    }

   
    return response.data; 
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
};

export default fetchNewsData;





