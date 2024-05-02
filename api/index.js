const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({
  origin: "*"
}));
// Variable to store the ngrok address
let ngrokAddress = '';

// API endpoint to update the ngrok address
app.put('/', (req, res) => {
  console.log(req.body)
  const { address } = req.body;
  if (!address) {
    return res.status(400).send('Missing address in request body');
  }

  ngrokAddress = address;
  res.send('Ngrok address updated successfully');
});

// API endpoint to retrieve the ngrok address
app.get('/', (req, res) => {
  if (!ngrokAddress) {
    return res.status(404).send('Ngrok address not yet set');
  }

  res.send(ngrokAddress);
});

// Start the server on a specific port (replace with your desired port)
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});