import Vis from '../node_modules/vis/dist/vis.js';
import { asyncFetchUsers, mdsStudents, associations } from './fetchData.js';


let newData = JSON.parse(localStorage.getItem("data"));

const component = () => {
    let element = document.createElement('div');
    element.id = "maindiv";
    let studentsObjects = [];
    let reposObjects = [];
    let associationsObjects = [];

    let container = document.getElementById('anothernetwork');

    for (let i = 0; i < newData.length; i++) {
        studentsObjects.push({ id: mdsStudents[newData[i] - 1].id, shape: 'circularImage', label: mdsStudents[newData[i] - 1].name, image: mdsStudents[newData[i] - 1].avatar_url })
    }
    console.log("WOOOOO");
    console.log(studentsObjects);

    for (let i = 0; i < newData.length-1; i++) {
        associationsObjects.push({ from: newData[i], to: newData[i+1] })
    }


    let nodes = studentsObjects;
    let edges = associationsObjects;
    let data = {
        nodes: nodes,
        edges: edges
    }

     let options = { nodes: { color: 'purple' }, layout: { improvedLayout: false } };


    const network = new Vis.Network(container, data, options);

    network.setOptions(options);

    network.on("click", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = "Node: " + this.getNodeAt(params.pointer.DOM);
        console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
    });


    return element;
}


const callback = () => {
    let mainComponent = component();
    document.body.appendChild(mainComponent);
    let test = document.createElement("div");
    test.innerHTML = (newData.length);
    document.body.appendChild(test);
    console.log("COEEEE");
    console.log(newData);
}

document.onload = asyncFetchUsers(callback);