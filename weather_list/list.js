const fs = require('fs');
let wheater = [];

const guardarDB = () => {
    let data = JSON.stringify(wheater);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        wheater = require('../db/data.json');
    } catch (error) {
        wheater = [];
    }
}


const crear = (local,clima) => {
    cargarDB();
    let index = wheater.findIndex(tarea => tarea.local === local);
    if (index >= 0) {
        wheater[index].clima = clima;
        guardarDB();
        return index;
    } else {
        return false;
    }

}


module.exports = {
    crear

}