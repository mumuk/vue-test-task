import { ZIP_CODE_URL, GET_IP_URL } from './api';

export const getUTMTags = () => {
  const url = window.location.toString();
  // const url = 'https://www.example.com/page?id=32167&utm_content=buffercf3b2&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer';

  if (url.includes('utm_')) {
    const params = url.split('?')[1];
    const stringPairs = params.split('&');

    const result = {};
    stringPairs.forEach((item) => {
      const pair = item.split('=');
      if (pair[0].includes('utm_')) {
        result[pair[0]] = pair[1].toString();
      }
    });
    return result;
  }
  return null;
};

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
      zip: result.postal_code,
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
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    };
  } catch (e) {
    return { message: 'Something went wrong while defining your IP', error: e };
  }
};
