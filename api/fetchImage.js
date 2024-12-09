const fetch = require('node-fetch');

export default async function handler(req, res) {
  const apiKey = process.env.UNSPLASH_API_KEY;
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&orientation=landscape&query=nature`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching image' });
    }
    const data = await response.json();
    return res.status(200).json({ imageUrl: data.urls.full });
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}