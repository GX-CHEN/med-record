import axios from 'axios';

export const ADD_TIME = 'add_time';

const ROOT_URL = 'http://localhost:3050/api/patients';

export function addTime(values, callback) {
    const request = axios.put(ROOT_URL, values)
        .then(() => callback());

    return {
        type: ADD_TIME,
        payload: request
    };
}
