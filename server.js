const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.static('public'));

const categories = ['general', 'programming', 'knock-knock'];

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Joke endpoint
app.get('/joke', async (req, res) => {
  let category = req.query.category;
  if (!category || category.toLowerCase() === 'random') {
    category = categories[Math.floor(Math.random() * categories.length)];
  }

  try {
    const apiUrl = `https://official-joke-api.appspot.com/jokes/${encodeURIComponent(category)}/random`;
    const apiResp = await fetch(apiUrl, { timeout: 5000 });

    if (!apiResp.ok) {
      // External API returned non-200 -> treat as service unavailable
      return res.status(503).json({ error: 'Unable to fetch joke. Please try again later.' });
    }

    const jokes = await apiResp.json();

    if (!Array.isArray(jokes) || jokes.length === 0) {
      // No jokes found -> category empty
      return res.status(404).json({ error: 'No jokes available in this category' });
    }

    const jokeObj = jokes[0];
    const jokeText = jokeObj.setup && jokeObj.punchline
      ? `${jokeObj.setup} ${jokeObj.punchline}`
      : (jokeObj.joke || '');

    // Basic validation
    if (!jokeText) {
      return res.status(503).json({ error: 'Unable to fetch joke. Please try again later.' });
    }

    res.json({ joke: jokeText, category, id: jokeObj.id || null });
  } catch (err) {
    // Network or fetch error
    return res.status(503).json({ error: 'Unable to fetch joke. Please try again later.' });
  }
});

app.listen(3000, () => {
  console.log('Joke app running on port 3000');
});