const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;  // Default to 3000 if no PORT is set
app.use(cors());
// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Minecraft Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/items', async (req, res) => {
  const { data, error } = await supabase
    .from('items')
    .select('*');

  if (error) {
    return res.status(500).send({ error: error.message });
  }
  res.json(data);  // Sends the data as JSON
});

