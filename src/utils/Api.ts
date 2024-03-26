import axios from 'axios';

export const ApiRequest = async (method: string, url: string, data?: any) => {
  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });

    // Handle successful responses (2xx)
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    // Handle specific error statuses (optional)
    else if (response.status === 400) {
      throw new Error('Bad Request: Please check your data.');
    } else if (response.status === 401) {
      throw new Error('Unauthorized: Please check your credentials.');
    } else if (response.status === 404) {
      throw new Error('Not Found: The requested resource does not exist.');
    } else if (response.status === 500) {
      throw new Error(
        'Internal Server Error: Something went wrong on the server.'
      );
    }

    // Handle other errors
    throw new Error(`API request failed with status ${response.status}`);
  } catch (error) {
    // Handle any errors during the request
    throw error;
  }
};
