const getResturants = async () => {
   //GOOGLE PLACES API
   
    const apiKey = "AIzaSyC3ZHeCUOEvn7aGtZuboOwcIvgIeeUJRTs"
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7128,-74.0060&radius=1500&type=restaurant&key=${apiKey}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json()
    return json
}

// const getMenus = async (placeId) => {
//     //MenuME API
//     const apiKey =

//     const getAllergy = async (menuId) => {
    //Edamam API
    // const apiKey =

export { getResturants }