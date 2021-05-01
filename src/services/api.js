import { getStorage } from './localSorage'

const URL = process.env.REACT_APP_ENDPOINT;

const tokenKeyStorage = 'token';

const ENDPOINT = {
  levels: '/level',
  login: '/login',
  newEvent: '/event',
  events: '/event',
  user: '/user',
  token: '/oauth/token'
}

async function getLevels() {
  const token = getStorage(tokenKeyStorage);
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  const request = await fetch(URL + ENDPOINT.levels, requestOptions)
  const response = await request.json();
  console.log('API: Level|getAll', response);
  return response;
}

async function addLevel(levelData) {
  const token = getStorage(tokenKeyStorage);
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
  console.log('API: Level|getAll', response);

  return response;
}

async function updateLevel({ id, description }) {
  const token = getStorage(tokenKeyStorage);
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  }
  console.log('requestOptions', requestOptions)
  console.log(URL + ENDPOINT.levels + `/${parseInt(id, 10)}`)
  const request = await fetch(URL + ENDPOINT.levels + `/${parseInt(id, 10)}`, requestOptions)
  const response = await request.json();
  console.log('API: Level|updateById', response);

  return response;
}

async function getEvents(filterOptions) {
  const token = getStorage(tokenKeyStorage);
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  const { description, origin, date, quantity, user, level } = filterOptions;
  const query = `?description=${description}&origin=${origin}&date=${date}&quantity=${quantity}` +
    `&user=${user}&level=${level}`;
  const request = await fetch(URL + ENDPOINT.events + query, requestOptions)
  const response = await request.json();
  console.log('API: Events|getAll', response);
  if (response.message) return []
  return response;
}

async function getUser() {
  const token = getStorage(tokenKeyStorage);
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  const request = await fetch(URL + ENDPOINT.user
    , requestOptions)
  const response = await request.json();
  console.log('API: User|getAll', response);
  return response;
}

async function addUser(userData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }
  const request = await fetch(URL + ENDPOINT.user, requestOptions);
  const response = request.json();
  return response;
}

async function addEvent(eventData) {
  const token = getStorage(tokenKeyStorage);
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  }
  const request = await fetch(URL + ENDPOINT.newEvent, requestOptions);
  const response = await request.json();
  console.log('API: Events|register', response);

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
  const token = getStorage(tokenKeyStorage);
  console.log('API: Token|request', token);
  const requestOptions = {
    headers: {
      Authorization: token.token_type + ' ' + token.access_token,
    }
  }
  const request = await fetch(URL + ENDPOINT.login, requestOptions)
  const response = await request.json();
  console.log('API: Login|request', response);
  return response;
}

export {
  getLevels,
  addLevel,
  updateLevel,
  getEvents,
  getUser,
  addUser,
  addEvent,
  getToken,
  login
}