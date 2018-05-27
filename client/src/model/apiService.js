import axios from 'axios';

// place all the service calls in this model folder.
// If it's a small app (within 10 calls), it's OK to put them in a single file. If there are many calls, better to place in seprate files
const baseURL = 'https://itstime.mobi';

// credential part
export function registerService(username, password) {
  const user = {
    username,
    password
  };
  return axios.post(`${baseURL}/v1/signup`, user).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function loginService(username, password) {
  const user = {
    username,
    password
  };
  return axios.post(`${baseURL}/v1/login`, user).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function addTime(values) {
  return axios.put(`http://localhost:3050/api/patiens`, values).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}
