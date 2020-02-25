const fs = require('fs');

const cargarStore = () => {
    try {
        wheater = require('../db/stores.json');
    } catch (error) {
        wheater = [];
    }
}


const getStore = () => {
    cargarStore();
    return wheater;
}

const Getubi = (local) => {
    cargarStore();
    let index = wheater.findIndex(tarea => tarea.local === local);
    if (index >= 0) {
        return index;
    } else {
        return 0;
    }

}

module.exports = {
    Getubi,
    cargarStore,
    getStore
}
