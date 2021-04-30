import axios from 'axios';

export const debitsApi = axios.create({
  //baseURL: 'http://localhost:3333'
  baseURL: 'https://provadev.xlab.digital/api/v1/divida',
  params: {uuid: '90a30852-b65c-4349-af73-242200ed16b3'}
});

export const usersApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users'
});
