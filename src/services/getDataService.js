import { ZIP_CODE_URL, GET_IP_URL } from './api';

export const getZipCodeInfo = async (code) => {
  if (code === '') {
    return { message: 'Please enter Zip code', error: 'emptyField' };
  }
  try {
    const response = await fetch(`${ZIP_CODE_URL}${code}`);
    const body = await response.json();
    const result = body.results[code][0];
    return {
      city: result.city,
      region: result.state,
      countryCode: result.country_code,
    };
  } catch (e) {
    return { message: 'Something went wrong with your Zip code', error: e };
  }
};

export const getIpInfo = async () => {
  try {
    const response = await fetch(GET_IP_URL);

    const ipInfo = await response.json();

    return {
      ip: ipInfo.ip,
      country: ipInfo.country,
      countryName: ipInfo.country_name,
      isp: ipInfo.org,
      city: ipInfo.city,
      region: ipInfo.region,
    };
  } catch (e) {
    return { message: 'Something went wrong while defining your IP', error: e };
  }
};
