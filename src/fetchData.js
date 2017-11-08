import axios from 'axios';

export let repositories = [];
export let mdsStudents = [];
export let associations = [];


export function asyncFetchUsers(callback) {
  axios.get("http://localhost:3000/users")
    .then(function (response) {
      console.log(response.data);
      mdsStudents = response.data;
      asyncFetchRepos(callback);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const asyncFetchRepos = (callback) => {
  axios.get("http://localhost:3000/repositories")
    .then(function (response) {
      console.log(response.data);
      repositories = response.data;
      asyncFetchAssociations(callback);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const asyncFetchAssociations = (callback) => {
  axios.get("http://localhost:3000/associations")
  .then(function (response) {
    console.log(response.data);
    associations = response.data;
    callback();
  })
  .catch(function (error) {
    console.log(error);
  });
}