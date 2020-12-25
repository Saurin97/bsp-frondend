import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import { QueryParameters } from '../interface';

const API_CONFIG = {
  // baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  baseUrl: '',
  path: {
    login: 'auth/login',
  },
};

export const getUrl = (url: string, params: QueryParameters = {}): string => {
  if (!url.includes('https')) {
    let urlString = `${API_CONFIG.baseUrl}/${url}`;
    if (params && !isEmpty(params)) {
      urlString += `?${queryString.stringify(params)}`;
    }
    return urlString;
  }

  return url;
};

const WINDOW_WIDTH = window.innerWidth;

export {
  WINDOW_WIDTH,
  API_CONFIG,
};