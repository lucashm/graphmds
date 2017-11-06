import axios from 'axios';

let mdsRepositories = [];
let mdsStudents = [];
let repoCounter = "";
const config = { "lucasssm": "62915f793505d677297bba8eb0935243d6624da4" } ;

export default function fetchMdsRepositories() {

  const callback = (response, i) => {
    if (response.data.length === 0) {
      console.log("Finish!");
      console.log(mdsRepositories);
      fetchMdsStudents();
    } else {
      for (let j = 0; j < response.data.length; j++)
        mdsRepositories.push(response.data[j].full_name);

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
  for (let repo in mdsRepositories) {
    repoCounter = mdsRepositories[repo];
    asyncfetchMdsStudents(repoCounter);
  }
}

const asyncfetchMdsStudents = (repoCounter) => {
  axios.get(`https://api.github.com/repos/${repoCounter}/contributors`, config)
    .then(function (response) {
      for (let z = 0; z < response.data.length; z++) {
        mdsStudents.push(response.data[z].login);
      }
      console.log(mdsStudents);
    })
    .catch(function (error) {
      console.log(error);
    });
}