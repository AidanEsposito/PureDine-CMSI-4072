require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const apiRestaurantKey = process.env.GOOGLE_PLACES_API_KEY;
const apiHealthKey = process.env.EDAMAM_API_KEY;
const apiHealthId = process.env.EDAMAM_APP_ID;


console.log('Google API Key:', apiRestaurantKey); 
console.log('Edamam API Key:', apiHealthKey);

let fetch;


(async () => {
    fetch = (await import('node-fetch')).default;

   
    app.get('/api/restaurants', async (req, res) => {
        const query = req.query.query || 'restaurant';
        const location = req.query.location || '34.0522,-118.2437'; // Default to LA
        const radius = req.query.radius || 1500; // Default radius 1500m

       
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location}&radius=${radius}&type=restaurant&key=${apiRestaurantKey}`;

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

    app.get('/api/place-photo', async (req, res) => {
        const { photoReference, maxwidth = 400 } = req.query;

        if (!photoReference) {
            return res.status(400).json({ error: 'photoReference is required' });
        }

        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${apiRestaurantKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Google Photo API Error: ${response.statusText}`);
            }

            
            response.body.pipe(res);
        } catch (error) {
            console.error('Error fetching photo:', error.message);
            res.status(500).json({ error: 'Failed to fetch photo' });
        }
    });

    app.post('/api/analyze-menu', async (req, res) => {
        const {items} = req.body;
        
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        try{
            const results = [];

            for (const item of items){
                const url = `https://api.edamam.com/api/nutrition-data?app_id=${apiHealthId}&app_key=${apiHealthKey}&ingr=${encodeURIComponent(item)}`;
                const response = await fetch(url);
                const data = await response.json();

                results.push({ item, data });
            }
            res.json(results);

        } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });
        
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
