import _ from 'lodash';
import './style.css';
import Vis from '../node_modules/vis/dist/vis.js';
import fetchData from './fetchData.js';
import CreateEvent from './creating.js';
// import '../node_modules/vis/dist/vis.css';

const component = () => {
  let element = document.createElement('div');
  element.id = "maindiv";
  let nodes = new Vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  let edges = new Vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
  ]);

  let container = document.getElementById('mynetwork');

  let data = {
    nodes: nodes,
    edges: edges
  }

  let options = { nodes: {color: 'red'} };


  const network = new Vis.Network(container, data, options);

  network.on("click", function (params) {
    params.event = "[original event]";
    document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4)
    console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
  });


  return element;
}


document.body.appendChild(component());
document.onload = fetchData();
