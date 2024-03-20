import express from 'express';
import getNewsFromMediastack from '../api1.js'; 

const router = express.Router();

router.get('/api/search-interests', async (req, res) => {
  try {
    const { query } = req.query; 

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const articles = await getNewsFromMediastack(query); 
    res.json(articles);
  } catch (error) {
    console.error('Error in /api/search-interests:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

export default router;
