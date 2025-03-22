require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const apiKey = process.env.GOOGLE_PLACES_API_KEY;


console.log('Google API Key:', apiKey); 

let fetch;


(async () => {
    fetch = (await import('node-fetch')).default;

   
    app.get('/api/restaurants', async (req, res) => {
        const query = req.query.query || 'restaurant';
        const location = req.query.location || '34.0522,-118.2437'; // Default to LA
        const radius = req.query.radius || 1500; // Default radius 1500m

       
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location}&radius=${radius}&type=restaurant&key=${apiKey}`;

        try {
            const response = await fetch(url);

            
            if (!response.ok) {
                throw new Error(`Google API Error: ${response.statusText}`);
            }

            const data = await response.json();

            
            if (data.status === 'REQUEST_DENIED') {
                console.error('Google API Error:', data.error_message);
                res.status(403).json({ error: data.error_message });
                return;
            }

            
            res.json(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });

    
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
