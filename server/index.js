import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import newsRoutes from "./routes/news.js";
import searchInterestsRoutes from './routes/searchInterests.js';
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import fetchNewsData from "./api.js";

import getNewsFromMediastack from "./api1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post('/updateInterests', async (req, res) => {
  try {
    const interests = req.body.interests;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.interests = interests;
    await user.save();

    return res.status(200).json({ message: 'Interests updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/api/interests', async (req, res) => {
  try {
    const { interests } = req.query;
    
    if (!interests) {
      return res.status(400).json({ message: 'Interests are required' });
    }

    const interestsArray = interests.split(',');
    const articles = await fetchNewsData(interestsArray);
    res.json(articles);
  } catch (error) {
    console.error('Error in /api/interests route:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});




app.get('/api/search-interests', async (req, res) => {
  try {
    console.log(req.query);
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



app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use('/api/interests', newsRoutes);
app.use('/api/search-interests', searchInterestsRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect("mongodb+srv://interestNet:vBFo4fS3b3yD4rEi@minor.ioilrpi.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));


  })
  .catch((error) => console.log(`${error} did not connect`));
