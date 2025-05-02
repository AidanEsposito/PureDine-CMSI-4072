
//functions to fetch data from the backend API
const getRestaurants = async (query) => {
    const url = `http://localhost:5000/api/restaurants?query=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};


    const getAllergy = async (menuId) => {
        // const url = `http://localhost:5000/api/restaurants?query=${encodeURIComponent(query)}`;

        // const response = await fetch(url);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        // return await response.json();
    };

export { getRestaurants, getAllergy };