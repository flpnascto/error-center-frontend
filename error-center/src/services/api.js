import { getStorage } from './localSorage'

// const URL = 'localhost:3000';
const URL = 'https://cors-anywhere.herokuapp.com/https://api-error-manager.herokuapp.com';
// const URL = 'https://api-error-manager.herokuapp.com';


const ENDPOINT = {
  levels: '/level',
  login: '/login',
  newEvent: '/event',
  events: '/event/all',
  newUser: '/user',
  users: '/user/all',
  token: '/oauth/token'
}

async function getLevels() {
  const token = getStorage('token');
  console.log('token api', token)
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  console.log('requestOptions', requestOptions)
  const request = await fetch(URL + ENDPOINT.levels, requestOptions)
  const response = await request.json();
  console.log('fetLevels', response)
  return response;
}

async function getEvents() {
  const token = getStorage('token');
  const requestOptions = {
    authorization: token.token_type + token.access_token,
  }
  const requestResponse = fetch(URL + ENDPOINT.events, requestOptions)
    .then((response) => response.json)
  console.log('getEvents', requestResponse)
  return requestResponse;
}

async function addUser(userData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }
  const request = await fetch(URL + ENDPOINT.newUser, requestOptions);
  const response = request.json();
  return response;
}

async function addEvent(eventData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  }
  console.log(requestOptions)
  // const request = await fetch(`${ URL } ${ ENDPOINT.events } `, requestOptions);
  // const response = await request.json();
  // return response;
}

async function getToken({ email, password }) {
  const CLIENT = {
    ID: process.env.REACT_APP_ID,
    SECRET: process.env.REACT_APP_SECRET,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: `grant_type=password&username=${email}&password=${password}&scope=any` +
      `&client_id=${CLIENT.ID}&client_secret=${CLIENT.SECRET}`,
  }
  const request = await fetch(URL + ENDPOINT.token, requestOptions);
  const response = await request.json();
  return response;
}

export {
  getLevels,
  getEvents,
  addUser,
  addEvent,
  getToken,
}