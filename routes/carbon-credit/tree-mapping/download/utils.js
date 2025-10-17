const { default: axios } = require("axios");

const generateStaticMap = async (lat, lng) => {
    const apiUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const params = {
        size: '800x600',
        markers: `color:red|label:P|${lat},${lng}`,
        maptype: 'satellite',
        zoom: 15,
        key: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBxEppGyQ3YatmT9C8RJjXAh9HsVtpKLh4'
    };

    const response = await axios.get(apiUrl, { 
        params, 
        responseType: 'arraybuffer' 
    });

    return Buffer.from(response.data, 'binary').toString('base64');
}

module.exports = { generateStaticMap };