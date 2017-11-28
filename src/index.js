import _ from 'lodash';
import './style.css';
import Vis from '../node_modules/vis/dist/vis.js';
import { asyncFetchUsers, mdsStudents, repositories, associations } from './fetchData.js';
// import '../node_modules/vis/dist/vis.css';

const component = () => {
  let element = document.createElement('div');
  element.id = "maindiv";
  let studentsObjects = [];
  let reposObjects = [];
  let associationsObjects = [];

  for (let user in mdsStudents) {
    studentsObjects.push({ id: mdsStudents[user].id, shape: 'circularImage', label: mdsStudents[user].name, image: mdsStudents[user].avatar_url })
  }
  console.log("WOOOOO");
  console.log(studentsObjects);


  let nodes = new Vis.DataSet(studentsObjects);


  for (let association in associations){
    associationsObjects.push({ from: associations[association].user_one_id, to: (associations[association].user_two_id) })
  }
  console.log("ASSOCIAÇÕES AAAAAAAAAAAAAAAA")
  console.log(associationsObjects);

  let edges = new Vis.DataSet(associationsObjects);

  let container = document.getElementById('mynetwork');

  let data = {
    nodes: nodes,
    edges: edges
  }

  let options = { nodes: { color: 'red' }, layout : { improvedLayout: false } };


  const network = new Vis.Network(container, data, options);

  network.on("click", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4)
    console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
  });


  return element;
}

const callback = () => {
  let mainComponent = component();
  document.body.appendChild(mainComponent);
}

document.onload = asyncFetchUsers(callback);

