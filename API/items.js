const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());

// Supabase Setup
const supabaseUrl = process.SUPABASE_URL;
const supabaseKey = process.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/items", async (req, res) => {
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = app;
