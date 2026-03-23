const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Simulated /brand/config endpoint
app.get('/brand/config', async (req, res) => {
  try {
    // Normally would fetch from secure config service, here static example
    const config = {
      palette: {
        primary: "#004080",
        secondary: "#FFD700",
        accent: "#D32F2F",
        background: "#FFFFFF",
        text: "#000000"
      },
      typography: {
        fontFamily: "Roboto, sans-serif",
        baseFontSize: "16px"
      },
      spacing: {
        small: "8px",
        medium: "16px",
        large: "24px"
      },
      logoURL: "https://cdn.company.com/assets/logo.svg",
      tagline: "Quality You Can Trust"
    };
    res.json(config);
  } catch (error) {
    console.error('Error fetching brand config:', error);
    res.status(404).json({ error: "Brand configuration not found", fallback: true });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => console.log('App running on port 3000'));