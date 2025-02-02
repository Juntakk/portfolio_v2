require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS to allow frontend to fetch from backend

// Weather API route
app.get("/weather", async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = "Montreal"; // Replace with dynamic city if needed
  try {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send weather data to frontend
  } catch (error) {
    console.error("Weather API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch weather data", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
