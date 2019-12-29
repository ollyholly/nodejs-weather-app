const request = require("request");

const geocode = (location, callback) => {
  const map_key = process.env.MAPBOX_TOKEN;
  const address = encodeURIComponent(location);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${map_key}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Can not connect to geocoding services!", undefined);
    } else if (body.features.length === 0) {
      callback("Can not find this location, try other query", undefined);
    } else {
      const destination = body.features[0].place_name;
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      callback(undefined, { destination, latitude, longitude });
    }
  });
};

module.exports = geocode;
