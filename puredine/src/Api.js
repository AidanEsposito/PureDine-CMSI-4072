const getResturants = async (query) => {
   // GOOGLE PLACES API
   const apiKey = "AIzaSyC3ZHeCUOEvn7aGtZuboOwcIvgIeeUJRTs"; //API Key
   const location = "40.7128,-74.0060";  // Default location 
   const radius = 1500;  // Radius of search area 

   // Fetch data from Google Places API
   const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location}&radius=${radius}&type=restaurant&key=${apiKey}`;

   if (!query) {
    console.error('Error: Search query is required');
   }

   const response = await fetch(url);


   //CORS PROXY ERROR -- NEED TO CALL API THROUGH BACKEND -- HIDE API KEY
   if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
   }

   const json = await response.json();

   if (json.status !== "OK") {
      console.error(`API error: ${json.status} - ${json.error_message || 'No error message provided'}`);
      return { results: [] }; 
   }

   return json;
   
};

// const getMenus = async (placeId) => {
//     //MenuME API
//     const apiKey =

//     const getAllergy = async (menuId) => {
    //Edamam API
    // const apiKey =

export { getResturants }