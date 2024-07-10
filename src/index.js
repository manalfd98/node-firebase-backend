const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Define the /auth route
router.get('/auth', (req, res) => {
  res.send('auth successful');
});

app.use("/",router)

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
