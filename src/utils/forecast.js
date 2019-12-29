const request = require("request");

const forecast = (lat, lon, callback) => {
  const weather_key = process.env.DARKSKY_TOKEN;
  const url = `https://api.darksky.net/forecast/${weather_key}/${lat},${lon}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const summary = body.daily.data[0].summary;
      const temperature = body.currently.temperature;
      const rainChance = body.currently.precipProbability * 100;
      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is ${rainChance}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
