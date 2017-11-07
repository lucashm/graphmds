import axios from 'axios';

let mdsRepositories = [];
let mdsStudents = [];
let mdsStudentsSubscriptions = [];
let actualRepoName = "";
const config = { "lucasssm": "62915f793505d677297bba8eb0935243d6624da4" };

const mdsStudentsSubscriptionsCallback = (response) => {
  for (let j = 0; j < response.data.length; j++) {
    mdsStudentsSubscriptions.push(response.data[j].full_name);
  }
}

const asyncfetchMdsStudentsSubscriptions = (username, callback) => {
  axios.get(`https://api.github.com/users/${username}/subscriptions`, config)
    .then(function (response){
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function fetchMdsRepositories() {

  const callback = (response, i) => {
    if (response.data.length === 0) {
      console.log("Finish!");
      console.log(mdsRepositories);
      fetchMdsStudents();
    } else {
      for (let j = 0; j < response.data.length; j++) {
        mdsRepositories.push(response.data[j].full_name);
      }
      asyncfetchRepositories((i + 1), callback);
    }

  }

  asyncfetchRepositories(1, callback);
}

const asyncfetchRepositories = (i, callback) => {
  console.log("fetch!");
  axios.get(`https://api.github.com/orgs/fga-gpp-mds/repos?page=${i}`, config)
    .then(function (response) {
      callback(response, i);
    })
    .catch(function (error) {
      console.log(error);
    });
}


const fetchMdsStudents = () => {
  const callback = (repoCounter) => {
    if (repoCounter === mdsRepositories.length) {
      console.log(mdsStudents);
      console.log(mdsStudentsSubscriptions);
    } else {
      asyncfetchMdsStudents(repoCounter, callback);
    }
  }
  asyncfetchMdsStudents(1, callback);

}

const asyncfetchMdsStudents = (repoCounter, callback) => {
  axios.get(`https://api.github.com/repos/${mdsRepositories[repoCounter]}/contributors`, config)
    .then(function (response) {
      for (let z = 0; z < response.data.length; z++) {
        //asyncfetchMdsStudentsSubscriptions(response.data[z].login, mdsStudentsSubscriptionsCallback);
        mdsStudents.push(response.data[z].login);
      }
      callback(repoCounter + 1);
    })
    .catch(function (error) {
      console.log(error);
    });
}