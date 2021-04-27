import { getStorage } from './localSorage'

const URL = process.env.REACT_APP_ENDPOINT;

const ENDPOINT = {
  levels: '/level',
  login: '/login',
  newEvent: '/event',
  events: '/event',
  newUser: '/user',
  users: '/user',
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
  const request = await fetch(URL + ENDPOINT.levels, requestOptions)
  const response = await request.json();
  return response;
}

async function addLevel(levelData) {
  const token = getStorage('token');
  console.log('token api', token)
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(levelData),
  }
  const request = await fetch(URL + ENDPOINT.levels, requestOptions)
  const response = await request.json();
  return response;
}

async function getEvents(filterOptions) {
  const token = getStorage('token');
  console.log('token api', token)
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  const { description, origin, date, quantity, user, level } = filterOptions;
  const query = `?description=${description}&origin=${origin}&date=${date}&quantity=${quantity}` +
    `&user=${user}&level=${level}`;
  console.log('endpoit', URL + ENDPOINT.events + query)
  const request = await fetch(URL + ENDPOINT.events + query, requestOptions)
  const response = await request.json();
  console.log('getEvents', response)
  if (response.message) return []
  return response;
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
  const token = getStorage('token');
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  }
  console.log(requestOptions)
  const request = await fetch(URL + ENDPOINT.newEvent, requestOptions);
  const response = await request.json();
  return response;
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

async function login() {
  const token = getStorage('token');
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  const request = await fetch(URL + ENDPOINT.login, requestOptions)
  const reponse = await request.json();
  console.log('api Login', reponse)
  return reponse;
}

export {
  getLevels,
  addLevel,
  getEvents,
  addUser,
  addEvent,
  getToken,
  login
}