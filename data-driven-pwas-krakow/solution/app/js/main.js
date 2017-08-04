let container = document.getElementById('dynamic-content-container');
let offlineWarning = document.getElementById('offline');
let noDataWarning = document.getElementById('no-data');
const dbPromise = createIndexedDB();

// TODO change to getAll
fetch('api/getAll')
.then(readResponseAsJson)
.then(dataFromNetwork => {
  // display data on page
  createTable(dataFromNetwork);
  // update local copy of data
  saveIndexedDB(dataFromNetwork);
})
.catch(err => {
  // attempt to get local data
  getIndexedDB()
  .then(offlineData => {
    if (!offlineData.length) {
      // alert user if there is no local data
      alertNoData();
      return;
    }
    // alert user that offline data (possibly outdated) is being used
    alertOffline();
    // display data on page
    createTable(offlineData);
  });
});

function readResponseAsJson(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

function createTable(projectsData) {
  let rows = '';
  projectsData.forEach(json => {
    let row = [
      '<tr>',
        '<td>' + 'Title' + '<td>',
        '<td>' + json.title + '<td>',
      '</tr>',
      '<tr>',
        '<td>' + 'City' + '<td>',
        '<td>' + json.city + '<td>',
      '</tr>',
    ].join('\n');
    rows += row;
  });
  let table = document.createElement('table');
  table.innerHTML = rows;
  container.appendChild(table);
}

function saveIndexedDB(projectsData) {
  if (!('indexedDB' in window)) {
    // could update UI here to inform user
    return null;
  }
  dbPromise.then(db => {
    let tx = db.transaction('projects', 'readwrite');
    let store = tx.objectStore('projects');
    projectsData.forEach(function(project) {
      console.log('Adding project: ', project.title);
      store.put(project);
    });
    return tx.complete;
  }).then(() => {
    // TODO update UI
    console.log('Data saved for offline!');
  }).catch(err => {
    // could update UI here to inform user
    console.warn('Unable to save data offline!', err);
  });
}

function getIndexedDB() {
  if (!('indexedDB' in window)) {
    // could update UI here to inform user
    return null;
  }
  return dbPromise.then(db => {
    let tx = db.transaction('projects', 'readonly');
    let store = tx.objectStore('projects');
    return store.getAll();
  });
}

function createIndexedDB() {
  return idb.open('dashboardr', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('projects')) {
      let projectsOS = upgradeDb.createObjectStore('projects', {keyPath: 'title'});
      projectsOS.createIndex('due', 'due');
      projectsOS.createIndex('city', 'city');
    }
  });
}

function alertOffline() {
  // Alert user that data may not be current
  offlineWarning.style.visibility = 'visible';
}

function alertNoData() {
  // Alert user that there is no data available
  noDataWarning.style.visibility = 'visible';
}

// // for each card, add button w/ listener
// addEventListener('click', e => {
//   fetch('api/update/', {
//     method: 'POST',
//     body: JSON.stringify({
//       id: //get id from card,
//       notes: // get note input value
//     });
//   })
// });

// fetch('/api/update', {
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      method: 'POST',
//      body: JSON.stringify({
//        title: 'Opela',
//        notes: 'UPDATED NOTE!!!!!'
//      })
//    }).then(response => {
//      console.log(response);
//      return response.text();
//    }).then(text => {
//      console.log(text);
//    });

// TODO
// if (!('indexedDB' in window)) {
//   console.console.warn();('This browser doesn\'t support IndexedDB');
//   // update UI TODO
//   return;
// }
