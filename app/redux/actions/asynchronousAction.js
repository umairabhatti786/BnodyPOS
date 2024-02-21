import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const isLive = true;
export const apiUrl = isLive
  ? 'https://restaurantapi.bnody.com/api/'
  : 'https://restaurantapi.bnody.com/api/';

export const fetchService = async (url, method, token) => {
  try {
    console.log('url, method, token', url, method, token);
    let response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log('GET request response =========>', response);
    let responseJson = await response.json();
    // console.log('api response for response....', responseJson);
    if (responseJson) {
      // console.log('api responseJson for product', responseJson);
      if (response.ok) {
        responseJson.success = true;
      } else {
        responseJson.success = false;
      }
    }

    return responseJson;
  } catch (error) {
    // Alert.alert("Error", "Something went wrong", error);
    console.log('Something went wrong', error);
    return error;
  }
};

export const ServerCall = (token, urlPath, method, body) => {
  let url = apiUrl + urlPath;

  return async dispatch => {
    try {
      dispatch({
        type: 'SERVER_LOADING',
      });
      var response;
      if (method === 'GET' || method === 'DELETE') {
        response = await fetchService(url, method, token);
      } else {
        console.log(
          'POST request response =========> ',
          token,
          url,
          method,
          body,
        );
        let res = await fetch(url, {
          method: 'POST',
          headers: token
            ? {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
              }
            : {
                'Content-Type': 'application/json',
              },
          // body: body,
          body: JSON.stringify(body),
        });
        console.log('api request response', res);
        response = await res.text();
        console.log('api request response', response);

        if (res.ok) {
          response.success = true;
        } else {
          response.success = false;
        }
      }
      console.log('address of servers', response);
      if (response?.success) {
        dispatch({
          type: 'SERVER_SUCCESS',
        });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: 'SERVER_FAIL',
      });
      return error;
    }
  };
};

export const SaveAllData = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SAVE_DATA',
        payload,
      });
    } catch (error) {
      return error;
    }
  };
};
export const getQuantity = async uri => {
  const apiUrl = 'http://192.168.30.4:8070/api/';
  let token = await AsyncStorage.getItem('ACCESS_TOKEN');
  try {
    let url = apiUrl + uri;
    console.log('URL :', url);
    let resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log('resp =========>', resp);
    let response = await resp.json();
    console.log('response', response);
    return response;
  } catch (e) {
    console.log(e, 'error');
  }
};
