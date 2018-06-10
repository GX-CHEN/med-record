import axios from 'axios';

// place all the service calls in this model folder.
// If it's a small app (within 10 calls), it's OK to put them in a single file. If there are many calls, better to place in seprate files
const baseURL = 'http://localhost:3050';

// credential part
export function registerService(username, password) {
  const user = {
    username,
    password
  };
  return axios.post(`${baseURL}/api/signup`, user).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function loginService(username, password) {
  const user = {
    username,
    password
  };
  return axios.post(`${baseURL}/api/login`, user).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function reportTimeService(patientId, dateString) {
  return axios.put(`${baseURL}/api/timeReport`, { patient_id: patientId, date_report: dateString }).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function addMedService(medName) {
  return axios.post(`${baseURL}/api/med/add`, { name: medName }).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function deleteMedService(medId) {
  return axios.put(`${baseURL}/api/med/delete`, { medId }).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function listMedService() {
  return axios.get(`${baseURL}/api/med/list`).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}

export function listMedHistoryService(values) {
  return axios.post(`${baseURL}/api/listMedHistory`, { values }).then(function(res) {
    if (res.status !== 200) throw new Error('bad response from server' + res.status);
    return res.data;
  });
}
