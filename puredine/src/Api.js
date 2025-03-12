const getRestaurants = async (query) => {
    const url = `http://localhost:5000/api/restaurants?query=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};

// const getMenus = async (placeId) => {
//     //MenuME API
//     const apiKey =

//     const getAllergy = async (menuId) => {
    //Edamam API
    // const apiKey =

export { getRestaurants };