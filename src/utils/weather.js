import formatDate from 'date-fns/format';

const iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;

export const getCurrentWeatherForLocation = async ({ latitude, longitude }) => {
  const pointsResponse = await fetch(
    `${
      process.env.VUE_APP_WEATHER_API_HOST
    }/points/${latitude},${longitude}/forecast/hourly`,
  );
  const json = await pointsResponse.json();

  const {
    properties: {
      periods: [period],
    },
  } = json;

  return {
    icon: iconRegex.exec(period.icon)[2],
    name: period.name,
    shortForecast: period.shortForecast,
    temperature: period.temperature,
    temperatureUnit: period.temperatureUnit,
  };
};

export const getForecastForLocation = async ({ latitude, longitude }) => {
  const pointsResponse = await fetch(
    `${
      process.env.VUE_APP_WEATHER_API_HOST
    }/points/${latitude},${longitude}/forecast`,
  );
  const json = await pointsResponse.json();

  const {
    properties: { periods = [] },
  } = json;

  let temp = {};
  const forecast = [];

  periods.map(period => {
    const { isDaytime } = period;

    if (isDaytime) {
      temp = {
        high: period,
        icon: iconRegex.exec(period.icon)[2],
        name: formatDate(period.startTime, 'ddd'),
      };
    } else {
      temp = {
        ...temp,
        low: period,
        icon: iconRegex.exec(period.icon)[2],
        name: formatDate(period.startTime, 'ddd'),
      };

      forecast.push(temp);
    }
  });

  return forecast;
};
