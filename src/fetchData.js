// export default function fetchData() {
//   return mdsStudents();
// }
import axios from 'axios';

export default function mdsStudents() {
  let i = 0;
  let students = [];
  console.log("fetch!");
    axios.get(`https://api.github.com/orgs/fga-gpp-mds/repos?page=${i}`)
    .then(function(response){
      console.log(response);
      students.push(response);
    })
    .catch(function(error){
      console.log(error);
    });

  let newDiv = document.createElement("div");
  newDiv.innerHTML = students;
  console.log(students);
  newDiv.id = "studentsList";

  return newDiv;
}