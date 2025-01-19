/**
 * commonService - 公共service
 */
import request from '@utils/request';
import { API_PREFIX, API_PREFIX_SYS } from '@utils/constants';

import cityMaps from '@utils/city.json';

/**
 * fetchWeather - 获取天气信息
 * @returns {object} res
 */
export const fetchWeather = (city: any) => {
  let cityNum;
  let cityobj:any = cityMaps;
  if (city in cityobj) {
    cityNum = cityobj[city] || '101020100';
  }
  const res = request({
    method: 'get',
    url: `${API_PREFIX}${API_PREFIX_SYS}/sys-user/weather-info`,
    params: {
      cityNum,
    }
  });
  return res;
}

