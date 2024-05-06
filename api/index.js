const express = require('express');
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(express.json());
const mongoose = require("mongoose");
app.use(cors({
  origin: "*"
}));
// Variable to store the ngrok address
let ngrokAddress = '';
// Define Mongoose schema
const ngrokSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  }
});

// Create Mongoose model
const Ngrok = mongoose.model('Ngrok', ngrokSchema);


// API endpoint to update the ngrok address
app.put('/', async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).send('Missing address in request body');
  }

  try {
    // Create or update ngrok address in the database
    let ngrok = await Ngrok.findOne();
    if (!ngrok) {
      ngrok = new Ngrok({ address });
    } else {
      ngrok.address = address;
    }
    await ngrok.save();
    res.send('Ngrok address updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to retrieve the ngrok address
app.get('/', async (req, res) => {
  try {
    // Retrieve ngrok address from the database
    const ngrok = await Ngrok.findOne();
    if (!ngrok) {
      return res.status(404).send('Ngrok address not yet set');
    }
    res.send(ngrok.address);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server on a specific port (replace with your desired port)
const port = 3000;
mongoose
  .connect(process.env.Mongo_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on ${port}`);
    });
    console.log("Connect DB sucessfully");
  })
  .catch((error) => console.log(error));