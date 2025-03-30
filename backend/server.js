


require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const passport = require('passport');
require('./auth/githubAuth');  // Load GitHub Auth
// require('./auth/googleAuth');  // Load Google Auth
const authRoutes = require('./authRoutes');
const cors  = require('cors')
const app = express();
const TexttoImage = require('./models/TextToImage')
const User = require('./models/User')
const bodyParser = require('body-parser');
connectDB()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/api/images/:githubId', async (req, res) => {
  try {
    const { githubId } = req.params;

    const images = await TexttoImage.find({ githubId:githubId });

    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No images found for this GitHub ID' ,error:true});
    }

    res.json({error:false,images:images});
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.post('/api/upload-image', async (req, res) => {
  try {
    
    // await TexttoImage.collection.dropIndex("githubId_1");
    const { githubId, base64Image } = req.body;
    console.log(req.body)
    if (!githubId) {

      return res.status(400).json({ message: 'GitHub ID and image are required',error:true });
    }

    let user = await User.findOne({ githubId });

    if (!user) {
      return res.status(404).json({ error:true,message: 'User not found' });
    }


     TTI = new TexttoImage({
                githubId: user.githubId,
                username: user.username,
                email: user.image,
                avatar: user.avatar,
                image:base64Image
              });
              await TTI.save();

    res.json({ message: 'Image uploaded successfully',error:false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:true,message: 'Internal Server Error' });
  }
});


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
