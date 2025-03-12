const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GOOGLE_PLACDS_API_KEY;


let fetch;

(async () => {
    fetch = (await import('node-fetch')).default;

    app.get('/api/restaurants', async (req, res) => {
        const query = req.query.query || 'restaurant';
        const location = req.query.location || '34.0522,-118.2437';
        const radius = req.query.radius || 1500;

        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location}&radius=${radius}&type=restaurant&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();