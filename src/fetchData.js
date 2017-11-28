import axios from 'axios';

export let repositories = [];
export let mdsStudents = [];
export let associations = [];


export function asyncFetchUsers(callback) {
  axios.get("http://localhost:3000/users")
    .then(function (response) {
      console.log(response.data);
      mdsStudents = response.data;
      asyncFetchAssociations(callback);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const asyncFetchAssociations = (callback) => {
  axios.get("http://localhost:3000/association_with_users")
  .then(function (response) {
    console.log(response.data);
    associations = response.data;
    callback();
  })
  .catch(function (error) {
    console.log(error);
  });
}