import express from "express";
import { fetchNewsData } from "../api.js"; 

const router = express.Router();

router.get('/interests', async (req, res) => {
  try {
    const { interests } = req.query;
    if (!interests) {
      return res.status(400).json({ message: 'Interests are required' });
    }

    const interestsArray = interests.split(',');
    const newsData = await fetchNewsData(interestsArray);
    res.json(newsData);
  } catch (error) {
    console.error('Error in /api/interests route:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

export default router;



// // server/routes/news.js
// import express from "express";
// import { fetchUserDataAndGenerateHtml } from '../api.js'; // Make sure the path is correct

// const router = express.Router();

// router.get('/interests', async (req, res) => {
//   const { interests } = req.query;

//   try {
//     // Call the function from api.js
//     const htmlContent = await fetchUserDataAndGenerateHtml(interests.split(','));

//     res.status(200).send(htmlContent);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching interests', error: error.message });
//   }
// });

// export default router;

// import express from "express";
// import makeApiCall from "../api.js";
// const router = express.Router();

// router.get('/interests', async (req, res) => {
//   const { interests } = req.query; // Ensure that interests are sent as a query parameter

//   try {
//     const articles = await makeApiCall(interests.split(',')); // Split the string into an array
//     res.json(articles);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching interests', error: error.message });
//   }
// });

// export default router;
