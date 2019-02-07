export const getCurrentLocation = async () => {
  const { fetch } = window;
  const locationResponse = await fetch(process.env.VUE_APP_IP_API_HOST);
  const { city, region, lat, lon } = await locationResponse.json();

  return { city, region, latitude: lat, longitude: lon };
};

export const getLocationByZipCode = async zipCode => {
  const { fetch } = window;
  const locationResponse = await fetch(
    `${process.env.VUE_APP_ZIP_CODE_HOST}/${zipCode}`,
  );
  const json = await locationResponse.json();
  const {
    places: [place],
  } = json;

  return {
    city: place['place name'],
    region: place['state abbreviation'],
    latitude: place['latitude'],
    longitude: place['longitude'],
  };
};

export const getImageForLocation = async ({ latitude, longitude }) => {
  const { fetch } = window;
  const imageResponse = await fetch(
    `${
      process.env.VUE_APP_IMAGE_API_HOST
    }/locations/${latitude},${longitude}/?embed=location:nearest-urban-areas/location:nearest-urban-area/ua:images`,
  );
  const json = await imageResponse.json();

  return json._embedded['location:nearest-urban-areas'][0]._embedded[
    'location:nearest-urban-area'
  ]._embedded['ua:images'].photos[0].image.web;
};
