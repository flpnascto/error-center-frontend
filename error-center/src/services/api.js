const URL = 'localhost:3000';

const ENDPOINT = {
  levels: '/level',
  login: '/login',
  newEvent: '/event',
  events: '/event/all',
}

async function getLevels(key) {
  const requestResponse = fetch(`${URL}${ENDPOINT['levels']}`)
    .then((response) => response.json)
  return requestResponse;
}

async function getEvents() {
  const requestResponse = fetch(`${URL}${ENDPOINT['events']}`)
    .then((response) => response.json)
  return requestResponse;
}

async function addUser(userData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }
  console.log(requestOptions)
  // const request = await fetch(`${URL}${ENDPOINT['user']}`, requestOptions);
  // const reponse = await request.json();
  // return reponse;
}

async function addEvent(eventData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  }
  console.log(requestOptions)
  // const request = await fetch(`${URL}${ENDPOINT['events']}`, requestOptions);
  // const reponse = await request.json();
  // return reponse;
}

async function login(loginData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  }
  console.log(requestOptions)
  // const request = await fetch(`${URL}${ENDPOINT['login']}`, requestOptions);
  // const reponse = await request.json();
  // return reponse;
}

export {
  getLevels,
  getEvents,
  addUser,
  addEvent,
  login,
}