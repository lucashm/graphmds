import _ from 'lodash';
import './style.css';
import Vis from '../node_modules/vis/dist/vis.js';
import { asyncFetchUsers, mdsStudents, repositories, associations } from './fetchData.js';
// import '../node_modules/vis/dist/vis.css';

let pointOne = 0;
let pointTwo = 0;
let actualPoint = 0;

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


  for (let association in associations) {
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

  // let options = { , };

  // these are all options in full.
  let options = {
    nodes: { color: 'red' }, layout: { improvedLayout: false },
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0
      },
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09
      },
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: 'forceAtlas2Based',
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      },
      timestep: 0.5,
      adaptiveTimestep: true
    }
  }


  const network = new Vis.Network(container, data, options);

  network.setOptions(options);

  network.on("click", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = "Node: " + this.getNodeAt(params.pointer.DOM);
    console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
    actualPoint = this.getNodeAt(params.pointer.DOM);
  });


  return element;
}

const callback = () => {
  let mainComponent = component();
  document.body.appendChild(mainComponent);
  let buttonOne = document.createElement("button");
  buttonOne.innerHTML = "Assign to \"from\"";
  buttonOne.onclick = () => onClickEvent(1);

  let buttonTwo = document.createElement("button");
  buttonTwo.innerHTML = "Assign to \"to\"";
  buttonTwo.onclick = () => onClickEvent(2);

  let selectComponent = document.createElement("div");
  selectComponent.id = "selectDiv";
  selectComponent.innerHTML = '<p> from: ' + pointOne + ' to: ' + pointTwo
  document.body.appendChild(selectComponent);
  document.body.appendChild(buttonOne);
  document.body.appendChild(buttonTwo);
}

document.onload = asyncFetchUsers(callback);


const onClickEvent = (selector) => {
  let selectComponent = document.getElementById("selectDiv");
  if (selector == 1) {
    pointOne = actualPoint;
  } else {
    pointTwo = actualPoint;
  }
  selectComponent.innerHTML = '<p> from: ' + pointOne + ' to: ' + pointTwo
}